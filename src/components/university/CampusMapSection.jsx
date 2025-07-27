import { Filter, MapPin, Navigation, Phone } from 'lucide-react';
import { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import InteractiveMap from '../map/InteractiveMap';

const CampusMapSection = () => {
  const { selectedUniversity } = useUniversity();
  const [selectedLocationTypes, setSelectedLocationTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  if (!selectedUniversity) return null;

  // Get unique location types
  const locationTypes = [...new Set(selectedUniversity.campus_map.map(loc => loc.type))];

  // Filter locations based on selected types
  const filteredLocations = selectedLocationTypes.length === 0 
    ? selectedUniversity.campus_map 
    : selectedUniversity.campus_map.filter(loc => selectedLocationTypes.includes(loc.type));

  // Handle location type filter toggle
  const toggleLocationType = (type) => {
    setSelectedLocationTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Handle location click from map
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  // Get center coordinates for the map
  const getMapCenter = () => {
    if (selectedUniversity.campus_map.length === 0) return [6.5244, 3.3792];
    
    const avgLat = selectedUniversity.campus_map.reduce((sum, loc) => sum + loc.lat, 0) / selectedUniversity.campus_map.length;
    const avgLng = selectedUniversity.campus_map.reduce((sum, loc) => sum + loc.lng, 0) / selectedUniversity.campus_map.length;
    
    return [avgLat, avgLng];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <MapPin className="h-8 w-8 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Campus Map & Directory</h2>
        </div>
        <p className="text-gray-600">
          Explore {selectedUniversity.name} campus with our interactive map and location directory.
        </p>
      </div>

      {/* Location Type Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Locations</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {locationTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleLocationType(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                selectedLocationTypes.includes(type)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
          {selectedLocationTypes.length > 0 && (
            <button
              onClick={() => setSelectedLocationTypes([])}
              className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Campus Map</h3>
        <InteractiveMap
          locations={filteredLocations}
          center={getMapCenter()}
          zoom={16}
          height="500px"
          onLocationClick={handleLocationClick}
        />
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">{selectedLocation.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-primary-700 mb-1">
                <span className="font-medium">Type:</span> <span className="capitalize">{selectedLocation.type}</span>
              </p>
              <p className="text-sm text-primary-700 mb-1">
                <span className="font-medium">Description:</span> {selectedLocation.description}
              </p>
            </div>
            <div>
              <p className="text-sm text-primary-700 mb-1">
                <span className="font-medium">Coordinates:</span> {selectedLocation.lat}, {selectedLocation.lng}
              </p>
              <button className="mt-2 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Locations Directory */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campus Locations Directory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location) => (
            <div 
              key={location.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{location.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{location.type}</p>
                  <p className="text-sm text-gray-500 mt-1">{location.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Navigation className="h-5 w-5 text-primary-600" />
            <span className="font-medium">Get Directions</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="h-5 w-5 text-primary-600" />
            <span className="font-medium">Find Nearest ATM</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="h-5 w-5 text-primary-600" />
            <span className="font-medium">Emergency Contacts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusMapSection;
