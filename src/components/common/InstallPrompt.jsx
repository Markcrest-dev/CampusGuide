import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { installApp, getInstallationStatus } from '../../utils/pwa';

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [installStatus, setInstallStatus] = useState('not-installable');
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check initial installation status
    setInstallStatus(getInstallationStatus());

    // Listen for app installable event
    const handleAppInstallable = () => {
      setInstallStatus('installable');
      setShowPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setInstallStatus('installed');
      setShowPrompt(false);
    };

    window.addEventListener('appinstallable', handleAppInstallable);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstallable', handleAppInstallable);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    
    try {
      const installed = await installApp();
      if (installed) {
        setShowPrompt(false);
        setInstallStatus('installed');
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (installStatus === 'installed' || 
      installStatus === 'not-installable' || 
      !showPrompt ||
      sessionStorage.getItem('installPromptDismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-primary-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Install Student Guide
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Get quick access to campus information with our mobile app. Works offline too!
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isInstalling ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                ) : (
                  <Download className="h-3 w-3" />
                )}
                <span>{isInstalling ? 'Installing...' : 'Install'}</span>
              </button>
              
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
