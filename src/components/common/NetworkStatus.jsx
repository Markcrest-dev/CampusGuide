import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { getNetworkStatus, setupNetworkListeners } from '../../utils/pwa';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [justCameOnline, setJustCameOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
      setJustCameOnline(true);
      
      // Hide the "back online" message after 3 seconds
      setTimeout(() => {
        setJustCameOnline(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
      setJustCameOnline(false);
    };

    // Setup network listeners
    const cleanup = setupNetworkListeners(handleOnline, handleOffline);

    // Initial check
    const networkStatus = getNetworkStatus();
    setIsOnline(networkStatus.online);

    return cleanup;
  }, []);

  // Don't show anything if online and not just came back online
  if (isOnline && !justCameOnline) {
    return null;
  }

  return (
    <>
      {/* Offline Banner */}
      {showOfflineMessage && (
        <div className="fixed top-16 left-0 right-0 bg-red-600 text-white px-4 py-2 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">
              You're offline. Some features may not be available.
            </span>
          </div>
        </div>
      )}

      {/* Back Online Banner */}
      {justCameOnline && (
        <div className="fixed top-16 left-0 right-0 bg-green-600 text-white px-4 py-2 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">
              You're back online!
            </span>
          </div>
        </div>
      )}

      {/* Offline Indicator in Corner */}
      {!isOnline && (
        <div className="fixed bottom-20 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg z-50">
          <WifiOff className="h-4 w-4" />
        </div>
      )}
    </>
  );
};

export default NetworkStatus;
