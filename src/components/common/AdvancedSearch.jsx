import { BookOpen, Building, Filter, MapPin, Navigation, Search, Users, Utensils, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { searchUniversityContent } from '../../utils/universityData';

const AdvancedSearch = ({ isOpen, onClose }) => {
  const {
    selectedUniversityId,
    updateSearchQuery,
    updateSearchResults,
    updateActiveSection
  } = useUniversity();

  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    {
      id: 'campus_map',
      label: 'Campus Locations',
      icon: MapPin,
      selectedClasses: 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/20 dark:border-primary-700 dark:text-primary-300',
      defaultClasses: 'bg-secondary-50 border-secondary-200 text-secondary-700 hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700'
    },
    {
      id: 'hostels',
      label: 'Hostels',
      icon: Building,
      selectedClasses: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300',
      defaultClasses: 'bg-secondary-50 border-secondary-200 text-secondary-700 hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700'
    },
    {
      id: 'transport',
      label: 'Transport',
      icon: Navigation,
      selectedClasses: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-300',
      defaultClasses: 'bg-secondary-50 border-secondary-200 text-secondary-700 hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700'
    },
    {
      id: 'food',
      label: 'Food & Dining',
      icon: Utensils,
      selectedClasses: 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300',
      defaultClasses: 'bg-secondary-50 border-secondary-200 text-secondary-700 hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700'
    },
    {
      id: 'academics',
      label: 'Academics',
      icon: BookOpen,
      selectedClasses: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-700 dark:text-indigo-300',
      defaultClasses: 'bg-secondary-50 border-secondary-200 text-secondary-700 hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Users,
      selectedClasses: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300',
      defaultClasses: 'bg-secondary-50 border-secondary-200 text-secondary-700 hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700'
    }
  ];

  const handleSearch = async () => {
    if (!query.trim() || !selectedUniversityId) return;

    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const searchResults = searchUniversityContent(selectedUniversityId, query);
      
      // Filter results by selected categories if any
      let filteredResults = {};
      if (selectedCategories.length > 0) {
        selectedCategories.forEach(category => {
          if (searchResults[category]) {
            filteredResults[category] = searchResults[category];
          }
        });
      } else {
        filteredResults = searchResults;
      }
      
      setResults(filteredResults);
      updateSearchQuery(query);
      updateSearchResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleResultClick = (category, item) => {
    updateActiveSection(category);
    onClose();
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
    setSelectedCategories([]);
    updateSearchQuery('');
    updateSearchResults(null);
  };

  const getResultCount = () => {
    if (!results) return 0;
    return Object.values(results).reduce((total, categoryResults) => {
      if (Array.isArray(categoryResults)) {
        return total + categoryResults.length;
      } else if (typeof categoryResults === 'object') {
        return total + Object.values(categoryResults).flat().length;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    if (query.trim()) {
      const debounceTimer = setTimeout(() => {
        handleSearch();
      }, 300);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setResults(null);
    }
  }, [query, selectedCategories, selectedUniversityId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="card-academic w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden shadow-academic-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-800">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">Advanced Search</h2>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 dark:text-secondary-500 dark:hover:text-secondary-300 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for locations, services, information..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-300 dark:border-secondary-700 rounded-2xl bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              autoFocus
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-800">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">Filter by Category</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              const isSelected = selectedCategories.includes(category.id);

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`flex items-center space-x-2 p-3 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? category.selectedClasses
                      : category.defaultClasses
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="mt-3 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {isSearching && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
              <span className="ml-3 text-secondary-600 dark:text-secondary-400">Searching...</span>
            </div>
          )}

          {!isSearching && query && results && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                  Search Results ({getResultCount()} found)
                </h3>
                <button
                  onClick={clearSearch}
                  className="text-sm text-secondary-600 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-200 transition-colors duration-200"
                >
                  Clear search
                </button>
              </div>

              {Object.entries(results).map(([category, categoryResults]) => {
                if (!categoryResults || (Array.isArray(categoryResults) && categoryResults.length === 0)) {
                  return null;
                }

                const categoryInfo = categories.find(cat => cat.id === category);
                const Icon = categoryInfo?.icon || MapPin;

                return (
                  <div key={category} className="mb-6 last:mb-0">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                      <h4 className="text-md font-medium text-secondary-900 dark:text-secondary-100 capitalize">
                        {category.replace('_', ' ')}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {Array.isArray(categoryResults) ? (
                        categoryResults.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleResultClick(category, item)}
                            className="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-2xl hover:bg-secondary-100 dark:hover:bg-secondary-700 cursor-pointer transition-all duration-200 border border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600"
                          >
                            <h5 className="font-medium text-secondary-900 dark:text-secondary-100">
                              {item.name || item.type || 'Item'}
                            </h5>
                            {item.description && (
                              <p className="text-sm text-secondary-600 dark:text-secondary-300 mt-1">{item.description}</p>
                            )}
                            {item.location && (
                              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">📍 {item.location}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-2xl border border-secondary-200 dark:border-secondary-700">
                          <p className="text-sm text-secondary-600 dark:text-secondary-300">
                            Found {Object.keys(categoryResults).length} academic results
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {getResultCount() === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-secondary-300 dark:text-secondary-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">No results found</h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Try adjusting your search terms or removing some filters.
                  </p>
                </div>
              )}
            </div>
          )}

          {!query && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-secondary-300 dark:text-secondary-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">Start searching</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Enter a search term to find locations, services, and information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
