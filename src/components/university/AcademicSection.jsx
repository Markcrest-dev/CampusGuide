import { BookOpen, Building, ExternalLink, Mail, Phone } from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

const AcademicSection = () => {
  const { selectedUniversity } = useUniversity();

  if (!selectedUniversity) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="h-8 w-8 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Academic Resources</h2>
        </div>
        <p className="text-gray-600">
          Access important academic information and contacts for {selectedUniversity.name}.
        </p>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={selectedUniversity.academics.registration_portal}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-5 w-5 text-primary-600" />
            <span className="font-medium">Student Portal</span>
          </a>
          <a
            href={selectedUniversity.academics.academic_calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-primary-600" />
            <span className="font-medium">Academic Calendar</span>
          </a>
        </div>
      </div>

      {/* Faculty Contacts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedUniversity.academics.faculty_contacts.map((faculty, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Faculty of {faculty.faculty}</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${faculty.email}`} className="hover:text-primary-600">
                    {faculty.email}
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {faculty.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Offices */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Offices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedUniversity.academics.important_offices.map((office, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{office.office}</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  {office.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {office.hours}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicSection;
