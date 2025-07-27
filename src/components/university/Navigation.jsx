import {
    BookOpen,
    Building,
    MapPin,
    Navigation as NavigationIcon,
    Users,
    Utensils
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

const Navigation = () => {
  const { activeSection, updateActiveSection } = useUniversity();

  const navigationItems = [
    {
      id: 'campus_map',
      label: 'Campus Map',
      icon: MapPin,
      description: 'Interactive campus map'
    },
    {
      id: 'hostels',
      label: 'Hostels',
      icon: Building,
      description: 'Accommodation guide'
    },
    {
      id: 'transport',
      label: 'Transport',
      icon: NavigationIcon,
      description: 'Getting around'
    },
    {
      id: 'food',
      label: 'Food & Dining',
      icon: Utensils,
      description: 'Where to eat'
    },
    {
      id: 'academics',
      label: 'Academics',
      icon: BookOpen,
      description: 'Academic resources'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Users,
      description: 'Student services'
    }
  ];

  const handleSectionClick = (sectionId) => {
    updateActiveSection(sectionId);
  };

  return (
    <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Explore Campus
      </h2>
      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <li key={item.id}>
              <button
                onClick={() => handleSectionClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
