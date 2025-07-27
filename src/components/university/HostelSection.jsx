import { Building, Home, Shield, Users, Wifi } from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

const HostelSection = () => {
  const { selectedUniversity } = useUniversity();

  if (!selectedUniversity) return null;

  const getFacilityIcon = (facility) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'security':
      case '24/7 security':
        return <Shield className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Building className="h-8 w-8 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Hostel Guide</h2>
        </div>
        <p className="text-gray-600">
          Find the perfect accommodation at {selectedUniversity.name} with our comprehensive hostel guide.
        </p>
      </div>

      {/* Hostels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedUniversity.hostels.map((hostel, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{hostel.name}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      hostel.gender === 'Male' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      {hostel.gender}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {hostel.capacity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">{hostel.price}</div>
                  <div className="text-sm text-gray-500">per session</div>
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {hostel.facilities.map((facility, facilityIndex) => (
                    <div key={facilityIndex} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-700">
                      {getFacilityIcon(facility)}
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hostel Tips */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hostel Application Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Application Process</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Apply early during registration period</li>
              <li>• Complete all required documentation</li>
              <li>• Pay accommodation fees on time</li>
              <li>• Check hostel-specific requirements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">What to Bring</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bedding and personal items</li>
              <li>• Study materials and laptop</li>
              <li>• Basic cooking utensils (if allowed)</li>
              <li>• Personal security items</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">Need Help with Accommodation?</h3>
        <p className="text-primary-700 mb-4">
          Contact the Student Affairs office for assistance with hostel applications and accommodation issues.
        </p>
        <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
          Contact Student Affairs
        </button>
      </div>
    </div>
  );
};

export default HostelSection;
