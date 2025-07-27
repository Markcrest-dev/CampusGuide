import { Building, Check, ChevronDown, GraduationCap, MapPin, Navigation, Search, Users, Utensils } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversity } from '../../context/UniversityContext';
import { getAllUniversities, searchUniversities } from '../../utils/universityData';

const UniversitySelector = ({
  placeholder = "Search and select a university...",
  showStats = true,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(getAllUniversities());
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  
  const { selectUniversity, selectedUniversity } = useUniversity();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = searchUniversities(searchQuery);
      setFilteredUniversities(results);
      setHighlightedIndex(-1);
      setIsSearching(false);
    }, searchQuery ? 150 : 0); // Small delay for search, immediate for empty query

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUniversitySelect = (university) => {
    selectUniversity(university.id);
    navigate(`/university/${university.id}`);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredUniversities.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredUniversities.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredUniversities[highlightedIndex]) {
          handleUniversitySelect(filteredUniversities[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const getUniversityStats = (university) => {
    if (!showStats) return null;
    
    const stats = {
      hostels: university.hostels?.length || 0,
      transport: university.transport?.length || 0,
      food: university.food?.length || 0,
      services: university.services?.length || 0
    };
    
    return stats;
  };

  return (
    <div className={`relative w-full max-w-2xl ${className}`} ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Search className="h-5 w-5 text-secondary-400 dark:text-secondary-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors duration-200" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white/90 dark:bg-secondary-900/90 backdrop-blur-sm border border-secondary-200 dark:border-secondary-700 rounded-2xl shadow-academic hover:shadow-academic-lg focus:shadow-academic-xl focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 focus:border-primary-400 dark:focus:border-primary-500 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 transition-all duration-300 text-lg font-medium"
          aria-label="Search universities"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown
            className={`h-5 w-5 text-secondary-400 dark:text-secondary-500 transition-all duration-300 ${
              isOpen ? 'transform rotate-180 text-primary-500 dark:text-primary-400' : ''
            }`}
          />
        </div>

        {/* Academic accent border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 via-accent-500/5 to-primary-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-3 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm border border-secondary-200 dark:border-secondary-700 rounded-2xl shadow-academic-xl max-h-96 overflow-hidden animate-slide-up">
          {/* Dropdown Header */}
          <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700 bg-secondary-50/50 dark:bg-secondary-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 flex items-center space-x-2">
                <span>
                  {searchQuery ? `Search Results (${filteredUniversities.length})` : `Nigerian Universities (${filteredUniversities.length})`}
                </span>
                {isSearching && (
                  <div className="w-3 h-3 border border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </h3>
              <div className="text-xs text-secondary-500 dark:text-secondary-400">
                Use ↑↓ to navigate, Enter to select
              </div>
            </div>
          </div>

          {filteredUniversities.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <div className="bg-secondary-100 dark:bg-secondary-800 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-secondary-400 dark:text-secondary-500" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                No universities found
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-1">
                No universities found matching "{searchQuery}"
              </p>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                Try adjusting your search terms or browse all universities
              </p>
            </div>
          ) : (
            <div className="py-2 max-h-80 overflow-y-auto" role="listbox" aria-label="University options">
              {filteredUniversities.map((university, index) => {
                const stats = getUniversityStats(university);
                const isHighlighted = index === highlightedIndex;
                const isSelected = selectedUniversity?.id === university.id;

                return (
                  <div
                    key={university.id}
                    onClick={() => handleUniversitySelect(university)}
                    className={`mx-2 mb-2 px-4 py-4 cursor-pointer rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                      isHighlighted
                        ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 shadow-academic'
                        : 'hover:bg-secondary-50 dark:hover:bg-secondary-800/50 border border-transparent hover:border-secondary-200 dark:hover:border-secondary-700'
                    } ${isSelected ? 'bg-primary-100 dark:bg-primary-900/40 border-primary-300 dark:border-primary-700 shadow-academic' : ''}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {/* Academic accent line for selected/highlighted */}
                    {(isSelected || isHighlighted) && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-r-full"></div>
                    )}

                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pl-2">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="bg-primary-100 dark:bg-primary-900/30 rounded-xl p-2 flex-shrink-0">
                            <GraduationCap className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-lg truncate transition-colors duration-200 ${
                              isSelected || isHighlighted
                                ? 'text-primary-900 dark:text-primary-100'
                                : 'text-secondary-900 dark:text-secondary-100 group-hover:text-primary-700 dark:group-hover:text-primary-300'
                            }`}>
                              {university.name}
                            </h3>
                            <div className={`flex items-center mt-1 text-sm transition-colors duration-200 ${
                              isSelected || isHighlighted
                                ? 'text-primary-700 dark:text-primary-300'
                                : 'text-secondary-500 dark:text-secondary-400'
                            }`}>
                              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{university.location}</span>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="bg-primary-600 dark:bg-primary-500 rounded-full p-1 flex-shrink-0">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className={`text-sm leading-relaxed line-clamp-2 transition-colors duration-200 ${
                          isSelected || isHighlighted
                            ? 'text-primary-800 dark:text-primary-200'
                            : 'text-secondary-600 dark:text-secondary-300'
                        }`}>
                          {university.description}
                        </p>

                        {showStats && stats && (
                          <div className="flex items-center flex-wrap gap-3 mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-700">
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                              isSelected || isHighlighted
                                ? 'bg-primary-200 dark:bg-primary-800/50 text-primary-800 dark:text-primary-200'
                                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300'
                            }`}>
                              <Building className="h-3 w-3" />
                              <span>{stats.hostels} hostels</span>
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                              isSelected || isHighlighted
                                ? 'bg-success-200 dark:bg-success-800/50 text-success-800 dark:text-success-200'
                                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300'
                            }`}>
                              <Navigation className="h-3 w-3" />
                              <span>{stats.transport} transport</span>
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                              isSelected || isHighlighted
                                ? 'bg-warning-200 dark:bg-warning-800/50 text-warning-800 dark:text-warning-200'
                                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300'
                            }`}>
                              <Utensils className="h-3 w-3" />
                              <span>{stats.food} dining</span>
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                              isSelected || isHighlighted
                                ? 'bg-accent-200 dark:bg-accent-800/50 text-accent-800 dark:text-accent-200'
                                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300'
                            }`}>
                              <Users className="h-3 w-3" />
                              <span>{stats.services} services</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversitySelector;
