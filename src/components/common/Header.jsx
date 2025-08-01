import { ArrowLeft, GraduationCap, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUniversity } from '../../context/UniversityContext';

const Header = () => {
  const { selectedUniversity, clearUniversity } = useUniversity();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    clearUniversity();
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-academic border-b border-secondary-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 transition-colors duration-200 group"
            >
              <div className="relative">
                <GraduationCap className="h-9 w-9 transition-transform duration-200 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">Student Guide</span>
                <span className="text-xs text-secondary-500 font-medium">Nigerian Universities</span>
              </div>
            </Link>
          </div>

          {/* University Info and Navigation */}
          <div className="flex items-center space-x-3">
            {selectedUniversity && (
              <>
                <div className="hidden sm:block text-sm">
                  <div className="text-secondary-900 font-semibold">
                    {selectedUniversity.name}
                  </div>
                  <div className="text-secondary-500 text-xs">
                    {selectedUniversity.location}
                  </div>
                </div>
                <button
                  onClick={handleBackToHome}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-academic transition-all duration-200 border border-transparent hover:border-secondary-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                </button>
              </>
            )}

            {!selectedUniversity && (
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-academic transition-all duration-200 border border-transparent hover:border-secondary-200"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            )}


          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
