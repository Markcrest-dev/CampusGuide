import {
    BookOpen,
    Building,
    MapPin,
    Menu,
    Navigation as NavigationIcon,
    Users,
    Utensils,
    X
} from 'lucide-react';
import { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';

const MobileNavigation = () => {
  const { activeSection, updateActiveSection, selectedUniversity } = useUniversity();
  const [isOpen, setIsOpen] = useState(false);

  if (!selectedUniversity) return null;

  const navigationItems = [
    {
      id: 'campus_map',
      label: 'Map',
      icon: MapPin,
      color: 'blue'
    },
    {
      id: 'hostels',
      label: 'Hostels',
      icon: Building,
      color: 'green'
    },
    {
      id: 'transport',
      label: 'Transport',
      icon: NavigationIcon,
      color: 'purple'
    },
    {
      id: 'food',
      label: 'Food',
      icon: Utensils,
      color: 'orange'
    },
    {
      id: 'academics',
      label: 'Academic',
      icon: BookOpen,
      color: 'indigo'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Users,
      color: 'red'
    }
  ];

  const handleSectionChange = (sectionId) => {
    updateActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation - Visible on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm border-t border-secondary-200 dark:border-secondary-800 z-40">
        <div className="grid grid-cols-6 h-18">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 relative ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                    : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-50 dark:hover:bg-secondary-800/50'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-600 dark:bg-primary-400 rounded-b-full"></div>
                )}
                <Icon className={`h-5 w-5 transition-all duration-200 ${isActive ? 'text-primary-600 dark:text-primary-400 scale-110' : 'text-secondary-400 dark:text-secondary-500'}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-500 dark:text-secondary-400'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Hamburger Menu - Alternative navigation */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-20 right-4 z-50 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm rounded-2xl p-3 shadow-academic border border-secondary-200 dark:border-secondary-800 hover:shadow-academic-lg transition-all duration-300"
        >
          {isOpen ?
            <X className="h-6 w-6 text-secondary-700 dark:text-secondary-300" /> :
            <Menu className="h-6 w-6 text-secondary-700 dark:text-secondary-300" />
          }
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Slide-out Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm shadow-academic-xl z-50 transform transition-transform duration-300 border-l border-secondary-200 dark:border-secondary-800 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-20">
            <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
              Navigate Campus
            </h2>
            
            <div className="space-y-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 shadow-academic'
                        : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 hover:text-secondary-900 dark:hover:text-secondary-100 border border-transparent hover:border-secondary-200 dark:hover:border-secondary-700'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-200 dark:bg-primary-800/50'
                        : 'bg-secondary-100 dark:bg-secondary-800 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-700'
                    }`}>
                      <Icon className={`h-5 w-5 transition-all duration-200 ${
                        isActive
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-secondary-500 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-200'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold transition-colors duration-200 ${
                        isActive
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-secondary-900 dark:text-secondary-100'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`text-xs transition-colors duration-200 ${
                        isActive
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-secondary-500 dark:text-secondary-400'
                      }`}>
                        {item.id === 'campus_map' && 'Interactive maps'}
                        {item.id === 'hostels' && 'Accommodation'}
                        {item.id === 'transport' && 'Getting around'}
                        {item.id === 'food' && 'Dining options'}
                        {item.id === 'academics' && 'Academic info'}
                        {item.id === 'services' && 'Student services'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add bottom padding to main content to account for bottom navigation */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          main {
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </>
  );
};

export default MobileNavigation;
