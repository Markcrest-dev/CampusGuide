import Footer from './Footer';
import Header from './Header';
import InstallPrompt from './InstallPrompt';
import MobileNavigation from './MobileNavigation';
import NetworkStatus from './NetworkStatus';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex flex-col transition-colors duration-300">
      <Header />
      <NetworkStatus />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <InstallPrompt />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
