import { Filter, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { searchUniversityContent } from '../../utils/universityData';
import AdvancedSearch from './AdvancedSearch';

const SearchBar = () => {
  const { 
    selectedUniversityId, 
    searchQuery, 
    updateSearchQuery, 
    updateSearchResults 
  } = useUniversity();
  
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setLocalQuery(query);
    updateSearchQuery(query);

    if (query.trim() && selectedUniversityId) {
      const results = searchUniversityContent(selectedUniversityId, query);
      updateSearchResults(results);
    } else {
      updateSearchResults(null);
    }
  };

  const clearSearch = () => {
    setLocalQuery('');
    updateSearchQuery('');
    updateSearchResults(null);
  };

  const openAdvancedSearch = () => {
    setShowAdvancedSearch(true);
  };

  const closeAdvancedSearch = () => {
    setShowAdvancedSearch(false);
  };

  return (
    <>
      <div className="relative w-full max-w-md">
        <div className="relative flex">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search campus locations, services..."
              value={localQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {localQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <button
            onClick={openAdvancedSearch}
            className="px-3 py-2 bg-primary-600 text-white border border-primary-600 rounded-r-lg hover:bg-primary-700 transition-colors"
            title="Advanced Search"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AdvancedSearch 
        isOpen={showAdvancedSearch} 
        onClose={closeAdvancedSearch} 
      />
    </>
  );
};

export default SearchBar;
