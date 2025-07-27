import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

// Fix for default markers in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const InteractiveMap = ({ 
  locations = [], 
  center = [6.5244, 3.3792], // Default to Lagos coordinates
  zoom = 15,
  height = '400px',
  onLocationClick = null 
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Custom icons for different location types
  const getLocationIcon = (type) => {
    const iconColors = {
      hostel: '#3B82F6', // Blue
      library: '#10B981', // Green
      faculty: '#F59E0B', // Yellow
      bank: '#EF4444', // Red
      restaurant: '#8B5CF6', // Purple
      default: '#6B7280' // Gray
    };

    const color = iconColors[type] || iconColors.default;
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -13]
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    locations.forEach(location => {
      const marker = L.marker([location.lat, location.lng], {
        icon: getLocationIcon(location.type)
      }).addTo(mapInstanceRef.current);

      // Add popup
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1F2937;">${location.name}</h3>
          <p style="margin: 0 0 4px 0; color: #6B7280; text-transform: capitalize;">${location.type}</p>
          <p style="margin: 0 0 8px 0; color: #4B5563; font-size: 14px;">${location.description || ''}</p>
          ${onLocationClick ? `
            <button 
              onclick="window.handleLocationClick('${location.id}')"
              style="
                background-color: #3B82F6;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
              "
            >
              View Details
            </button>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);

      // Add click handler
      if (onLocationClick) {
        marker.on('click', () => {
          onLocationClick(location);
        });
      }
    });

    // Fit map to show all markers if there are any
    if (locations.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [locations, onLocationClick]);

  // Global function for popup button clicks
  useEffect(() => {
    window.handleLocationClick = (locationId) => {
      const location = locations.find(loc => loc.id === locationId);
      if (location && onLocationClick) {
        onLocationClick(location);
      }
    };

    return () => {
      delete window.handleLocationClick;
    };
  }, [locations, onLocationClick]);

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="rounded-lg border border-gray-200 shadow-sm"
      />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
        <div className="space-y-1">
          {[
            { type: 'hostel', label: 'Hostels', color: '#3B82F6' },
            { type: 'library', label: 'Libraries', color: '#10B981' },
            { type: 'faculty', label: 'Faculties', color: '#F59E0B' },
            { type: 'bank', label: 'Banks', color: '#EF4444' },
          ].map(item => (
            <div key={item.type} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
