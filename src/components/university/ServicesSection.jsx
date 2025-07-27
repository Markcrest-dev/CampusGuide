import {
    BookOpen,
    Clock,
    CreditCard,
    Heart,
    MapPin,
    Printer,
    Wifi
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

const ServicesSection = () => {
  const { selectedUniversity } = useUniversity();

  if (!selectedUniversity) return null;

  const getServiceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'bank':
        return <CreditCard className="h-6 w-6" />;
      case 'printing':
        return <Printer className="h-6 w-6" />;
      case 'internet':
        return <Wifi className="h-6 w-6" />;
      case 'healthcare':
        return <Heart className="h-6 w-6" />;
      case 'bookstore':
        return <BookOpen className="h-6 w-6" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };

  const getServiceColor = (type) => {
    switch (type.toLowerCase()) {
      case 'bank':
        return 'bg-green-100 text-green-600';
      case 'printing':
        return 'bg-blue-100 text-blue-600';
      case 'internet':
        return 'bg-purple-100 text-purple-600';
      case 'healthcare':
        return 'bg-red-100 text-red-600';
      case 'bookstore':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Heart className="h-8 w-8 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Student Services</h2>
        </div>
        <p className="text-gray-600">
          Essential services and amenities available at {selectedUniversity.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedUniversity.services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getServiceColor(service.type)}`}>
                {getServiceIcon(service.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize mt-1">
                  {service.type}
                </span>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {service.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {service.hours}
                  </div>
                </div>
                <button className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'bank', label: 'Banking', count: selectedUniversity.services.filter(s => s.type === 'bank').length },
            { type: 'printing', label: 'Printing', count: selectedUniversity.services.filter(s => s.type === 'printing').length },
            { type: 'healthcare', label: 'Healthcare', count: selectedUniversity.services.filter(s => s.type === 'healthcare').length },
            { type: 'bookstore', label: 'Bookstore', count: selectedUniversity.services.filter(s => s.type === 'bookstore').length }
          ].map((category) => (
            <div key={category.type} className="text-center p-4 border border-gray-200 rounded-lg">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 ${getServiceColor(category.type)}`}>
                {getServiceIcon(category.type)}
              </div>
              <div className="text-sm font-medium text-gray-900">{category.label}</div>
              <div className="text-xs text-gray-500">{category.count} available</div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Services */}
      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Services</h3>
        <p className="text-red-700 mb-4">
          Important emergency contacts and services on campus.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h4 className="font-medium text-red-900">Campus Security</h4>
            <p className="text-sm text-red-700">24/7 Emergency Line</p>
            <p className="text-sm font-mono text-red-800">+234-XXX-XXX-XXXX</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h4 className="font-medium text-red-900">Medical Emergency</h4>
            <p className="text-sm text-red-700">Campus Health Center</p>
            <p className="text-sm font-mono text-red-800">+234-XXX-XXX-XXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
