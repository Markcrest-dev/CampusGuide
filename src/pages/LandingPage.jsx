import { Award, BookOpen, Building, Globe, MapPin, Navigation, Sparkles, Users, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUniversity } from '../context/UniversityContext';
import { getAllUniversities } from '../utils/universityData';

import UniversitySelector from '../components/common/UniversitySelector';

const LandingPage = () => {
  const { selectUniversity } = useUniversity();
  const navigate = useNavigate();

  const handleUniversitySelect = (universityId) => {
    selectUniversity(universityId);
    navigate(`/university/${universityId}`);
  };

  const features = [
    {
      icon: MapPin,
      title: 'Campus Maps',
      description: 'Interactive maps to help you navigate your campus with ease',
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: Building,
      title: 'Hostel Guide',
      description: 'Find the best accommodation options with pricing and facilities',
      color: 'success',
      gradient: 'from-success-500 to-success-600'
    },
    {
      icon: Navigation,
      title: 'Transport Info',
      description: 'Get around campus and the city with transport guides',
      color: 'accent',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      icon: Utensils,
      title: 'Food & Dining',
      description: 'Discover the best places to eat on and around campus',
      color: 'warning',
      gradient: 'from-warning-500 to-warning-600'
    },
    {
      icon: BookOpen,
      title: 'Academic Resources',
      description: 'Access important academic information and contacts',
      color: 'primary',
      gradient: 'from-primary-600 to-primary-700'
    },
    {
      icon: Users,
      title: 'Student Services',
      description: 'Find essential services like banks, printing, and healthcare',
      color: 'error',
      gradient: 'from-error-500 to-error-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            {/* Academic Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8 border border-primary-200">
              <Award className="w-4 h-4 mr-2" />
              Trusted by Nigerian Students
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-secondary-900 mb-8 leading-tight">
              Your Complete
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Student Guide
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-secondary-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Navigate university life with confidence. Discover everything you need to know about
              <span className="text-primary-600 font-semibold"> campus maps</span>,
              <span className="text-success-600 font-semibold"> hostels</span>,
              <span className="text-accent-600 font-semibold"> transport</span>, and
              <span className="text-warning-600 font-semibold"> student services</span>.
            </p>

            {/* University Selector */}
            <div className="max-w-4xl mx-auto mb-16">
              <UniversitySelector
                placeholder="Search and select your university..."
                showStats={true}
                className="mx-auto"
              />
            </div>

            {/* Statistics Section */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-academic-xl p-8 sm:p-12 border border-secondary-200">
                <div className="text-center mb-12">
                  <h3 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
                    Explore <span className="text-primary-600">{getAllUniversities().length}</span> Nigerian Universities
                  </h3>
                  <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                    Comprehensive campus information at your fingertips, trusted by thousands of students
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-primary-200 group-hover:scale-110 transition-transform duration-300">
                      <Building className="h-10 w-10 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-secondary-900 mb-1">
                      {getAllUniversities().reduce((total, uni) => total + (uni.hostels?.length || 0), 0)}
                    </div>
                    <div className="text-sm font-medium text-secondary-600">Hostels</div>
                  </div>

                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-success-100 to-success-200 rounded-2xl p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-success-200 group-hover:scale-110 transition-transform duration-300">
                      <Navigation className="h-10 w-10 text-success-600" />
                    </div>
                    <div className="text-3xl font-bold text-secondary-900 mb-1">
                      {getAllUniversities().reduce((total, uni) => total + (uni.transport?.length || 0), 0)}
                    </div>
                    <div className="text-sm font-medium text-secondary-600">Transport Options</div>
                  </div>

                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-warning-100 to-warning-200 rounded-2xl p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-warning-200 group-hover:scale-110 transition-transform duration-300">
                      <Utensils className="h-10 w-10 text-warning-600" />
                    </div>
                    <div className="text-3xl font-bold text-secondary-900 mb-1">
                      {getAllUniversities().reduce((total, uni) => total + (uni.food?.length || 0), 0)}
                    </div>
                    <div className="text-sm font-medium text-secondary-600">Dining Options</div>
                  </div>

                  <div className="text-center group">
                    <div className="bg-gradient-to-br from-error-100 to-error-200 rounded-2xl p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-error-200 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-10 w-10 text-error-600" />
                    </div>
                    <div className="text-3xl font-bold text-secondary-900 mb-1">
                      {getAllUniversities().reduce((total, uni) => total + (uni.services?.length || 0), 0)}
                    </div>
                    <div className="text-sm font-medium text-secondary-600">Services</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 backdrop-blur-sm py-20 border-t border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mb-6 border border-accent-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Comprehensive Features
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              From finding your way around campus to discovering the best food spots, we've got you covered with comprehensive information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-academic hover:shadow-academic-lg transition-all duration-300 border border-secondary-200 hover:border-primary-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8 border border-white/30">
            <Globe className="w-4 h-4 mr-2" />
            Join Thousands of Students
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Explore Your University?
          </h2>
          <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Select your university above and start discovering everything your campus has to offer. Join thousands of students who trust our comprehensive guide.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {getAllUniversities().slice(0, 3).map((university) => (
              <button
                key={university.id}
                onClick={() => handleUniversitySelect(university.id)}
                className="bg-white/90 hover:bg-white text-primary-700 px-8 py-4 rounded-2xl font-semibold hover:shadow-academic-lg transition-all duration-300 border border-white/20 hover:scale-105"
              >
                Explore {university.name.split('(')[1]?.replace(')', '') || university.name}
              </button>
            ))}
          </div>

          <p className="text-primary-200 text-sm">
            Trusted by students across Nigeria • Updated regularly • Free to use
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
