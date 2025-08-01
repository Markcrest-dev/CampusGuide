import { ExternalLink, GraduationCap, Shield, X, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-sm border-t border-secondary-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-secondary-900">Student Guide</span>
            </div>
            <p className="text-secondary-600 leading-relaxed mb-6 max-w-md">
              A comprehensive academic resource for Nigerian higher education institutions. Explore institutional profiles, academic programs, research opportunities, and student support services.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-secondary-500">
                <Shield className="h-4 w-4" />
                <span>Trusted & Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-secondary-500">
                <Zap className="h-4 w-4" />
                <span>Always Updated</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                  Campus Maps
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                  Hostel Information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                  Transport Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                  Student Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="https://twitter.com/studentguide_ng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-secondary-600 hover:text-primary-600 transition-colors duration-200 group"
              >
                <X className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                @studentguide_ng
              </a>
              <a
                href="https://github.com/Markcrest-dev/CampusGuide.git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-secondary-600 hover:text-primary-600 transition-colors duration-200 group"
              >
                <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-secondary-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-secondary-600">
              © 2025 Student Guide. Made for Nigerian students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
