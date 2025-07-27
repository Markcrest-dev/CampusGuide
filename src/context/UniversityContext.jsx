import { createContext, useContext, useEffect, useState } from 'react';
import { getUniversityById } from '../utils/universityData';

const UniversityContext = createContext();

export const useUniversity = () => {
  const context = useContext(UniversityContext);
  if (!context) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
};

export const UniversityProvider = ({ children }) => {
  const [selectedUniversityId, setSelectedUniversityId] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [activeSection, setActiveSection] = useState('campus_map');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Load university from localStorage on mount
  useEffect(() => {
    const savedUniversityId = localStorage.getItem('selectedUniversityId');
    if (savedUniversityId) {
      selectUniversity(savedUniversityId);
    }
  }, []);

  // Update selected university when ID changes
  useEffect(() => {
    if (selectedUniversityId) {
      const university = getUniversityById(selectedUniversityId);
      setSelectedUniversity(university);
      localStorage.setItem('selectedUniversityId', selectedUniversityId);
    } else {
      setSelectedUniversity(null);
      localStorage.removeItem('selectedUniversityId');
    }
  }, [selectedUniversityId]);

  const selectUniversity = (universityId) => {
    setSelectedUniversityId(universityId);
    setActiveSection('campus_map'); // Reset to default section
    setSearchQuery(''); // Clear search
    setSearchResults(null);
  };

  const clearUniversity = () => {
    setSelectedUniversityId(null);
    setSelectedUniversity(null);
    setActiveSection('campus_map');
    setSearchQuery('');
    setSearchResults(null);
  };

  const updateActiveSection = (section) => {
    setActiveSection(section);
  };

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  const value = {
    selectedUniversityId,
    selectedUniversity,
    activeSection,
    searchQuery,
    searchResults,
    selectUniversity,
    clearUniversity,
    updateActiveSection,
    updateSearchQuery,
    updateSearchResults,
  };

  return (
    <UniversityContext.Provider value={value}>
      {children}
    </UniversityContext.Provider>
  );
};
