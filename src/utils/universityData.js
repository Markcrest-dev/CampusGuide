import universitiesData from '../data/universities.json';

/**
 * Get all universities
 * @returns {Array} Array of university objects
 */
export const getAllUniversities = () => {
  return universitiesData.universities;
};

/**
 * Get university by ID
 * @param {string} id - University ID
 * @returns {Object|null} University object or null if not found
 */
export const getUniversityById = (id) => {
  return universitiesData.universities.find(uni => uni.id === id) || null;
};

/**
 * Search universities by name
 * @param {string} query - Search query
 * @returns {Array} Array of matching universities
 */
export const searchUniversities = (query) => {
  if (!query) return getAllUniversities();
  
  const lowercaseQuery = query.toLowerCase();
  return universitiesData.universities.filter(uni =>
    uni.name.toLowerCase().includes(lowercaseQuery) ||
    uni.location.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Search within university data
 * @param {string} universityId - University ID
 * @param {string} query - Search query
 * @returns {Object} Search results categorized by type
 */
export const searchUniversityContent = (universityId, query) => {
  const university = getUniversityById(universityId);
  if (!university || !query) return {};

  const lowercaseQuery = query.toLowerCase();
  const results = {
    campus_map: [],
    hostels: [],
    transport: [],
    food: [],
    services: [],
    academics: []
  };

  // Search campus map
  results.campus_map = university.campus_map.filter(item =>
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.type.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery)
  );

  // Search hostels
  results.hostels = university.hostels.filter(hostel =>
    hostel.name.toLowerCase().includes(lowercaseQuery) ||
    hostel.gender.toLowerCase().includes(lowercaseQuery)
  );

  // Search transport
  results.transport = university.transport.filter(transport =>
    transport.type.toLowerCase().includes(lowercaseQuery) ||
    transport.route.toLowerCase().includes(lowercaseQuery)
  );

  // Search food
  results.food = university.food.filter(food =>
    food.name.toLowerCase().includes(lowercaseQuery) ||
    food.type.toLowerCase().includes(lowercaseQuery) ||
    food.location.toLowerCase().includes(lowercaseQuery)
  );

  // Search services
  results.services = university.services.filter(service =>
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.type.toLowerCase().includes(lowercaseQuery) ||
    service.location.toLowerCase().includes(lowercaseQuery)
  );

  // Search academics
  const facultyMatches = university.academics.faculty_contacts.filter(faculty =>
    faculty.faculty.toLowerCase().includes(lowercaseQuery) ||
    faculty.email.toLowerCase().includes(lowercaseQuery)
  );
  
  const officeMatches = university.academics.important_offices.filter(office =>
    office.office.toLowerCase().includes(lowercaseQuery) ||
    office.location.toLowerCase().includes(lowercaseQuery)
  );

  if (facultyMatches.length > 0 || officeMatches.length > 0) {
    results.academics = {
      faculty_contacts: facultyMatches,
      important_offices: officeMatches
    };
  }

  return results;
};

/**
 * Get university statistics
 * @param {string} universityId - University ID
 * @returns {Object} Statistics object
 */
export const getUniversityStats = (universityId) => {
  const university = getUniversityById(universityId);
  if (!university) return {};

  return {
    totalLocations: university.campus_map.length,
    totalHostels: university.hostels.length,
    totalTransportOptions: university.transport.length,
    totalFoodOptions: university.food.length,
    totalServices: university.services.length,
    totalFaculties: university.academics.faculty_contacts.length
  };
};

/**
 * Filter locations by type
 * @param {string} universityId - University ID
 * @param {string} type - Location type (hostel, library, faculty, bank, etc.)
 * @returns {Array} Filtered locations
 */
export const getLocationsByType = (universityId, type) => {
  const university = getUniversityById(universityId);
  if (!university) return [];

  return university.campus_map.filter(location => location.type === type);
};

/**
 * Get nearby locations
 * @param {string} universityId - University ID
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radius - Search radius in km (default: 0.5)
 * @returns {Array} Nearby locations
 */
export const getNearbyLocations = (universityId, lat, lng, radius = 0.5) => {
  const university = getUniversityById(universityId);
  if (!university) return [];

  return university.campus_map.filter(location => {
    const distance = calculateDistance(lat, lng, location.lat, location.lng);
    return distance <= radius;
  });
};

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude 1
 * @param {number} lng1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lng2 - Longitude 2
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
