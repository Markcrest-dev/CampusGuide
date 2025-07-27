import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import AcademicSection from '../components/university/AcademicSection';
import CampusMapSection from '../components/university/CampusMapSection';
import FoodSection from '../components/university/FoodSection';
import HostelSection from '../components/university/HostelSection';
import Navigation from '../components/university/Navigation';
import ServicesSection from '../components/university/ServicesSection';
import TransportSection from '../components/university/TransportSection';
import { useUniversity } from '../context/UniversityContext';
import { getUniversityById } from '../utils/universityData';

const UniversityDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    selectedUniversity, 
    selectUniversity, 
    activeSection,
    searchQuery,
    searchResults 
  } = useUniversity();

  useEffect(() => {
    if (id) {
      const university = getUniversityById(id);
      if (university) {
        selectUniversity(id);
      } else {
        // University not found, redirect to home
        navigate('/');
      }
    }
  }, [id, selectUniversity, navigate]);

  if (!selectedUniversity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading university information...</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    if (searchQuery && searchResults) {
      return <SearchResults />;
    }

    switch (activeSection) {
      case 'campus_map':
        return <CampusMapSection />;
      case 'hostels':
        return <HostelSection />;
      case 'transport':
        return <TransportSection />;
      case 'food':
        return <FoodSection />;
      case 'academics':
        return <AcademicSection />;
      case 'services':
        return <ServicesSection />;
      default:
        return <CampusMapSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* University Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedUniversity.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {selectedUniversity.description}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Navigation />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for search results
const SearchResults = () => {
  const { searchQuery, searchResults } = useUniversity();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Search Results for "{searchQuery}"
      </h2>
      <div className="space-y-4">
        {Object.entries(searchResults).map(([category, results]) => {
          if (!results || (Array.isArray(results) && results.length === 0)) return null;
          
          return (
            <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-lg font-medium text-gray-800 mb-2 capitalize">
                {category.replace('_', ' ')}
              </h3>
              <div className="space-y-2">
                {Array.isArray(results) ? (
                  results.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <p className="font-medium">{item.name || item.type || 'Item'}</p>
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      Found {Object.keys(results).length} academic results
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UniversityDashboard;
