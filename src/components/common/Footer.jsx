import { ExternalLink, GraduationCap, Heart, Mail, Shield, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm border-t border-secondary-200 dark:border-secondary-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-bold text-secondary-900 dark:text-secondary-100">Student Guide</span>
            </div>
            <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6 max-w-md">
              Your comprehensive guide to Nigerian universities. Find everything you need to know about campus life, academics, and student services.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-secondary-500 dark:text-secondary-400">
                <Shield className="h-4 w-4" />
                <span>Trusted & Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-secondary-500 dark:text-secondary-400">
                <Zap className="h-4 w-4" />
                <span>Always Updated</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Campus Maps
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Hostel Information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Transport Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Student Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:info@studentguide.ng"
                className="flex items-center text-sm text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group"
              >
                <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                info@studentguide.ng
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group"
              >
                <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-300">
              © 2024 Student Guide. Made with{' '}
              <Heart className="h-4 w-4 inline text-error-500 animate-pulse" />{' '}
              for Nigerian students.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                Version 1.0.0 - MVP
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
