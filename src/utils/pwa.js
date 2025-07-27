// PWA utilities for service worker registration and app installation

/**
 * Register service worker
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                showUpdateNotification();
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

/**
 * Show update notification
 */
const showUpdateNotification = () => {
  if (window.confirm('A new version is available. Would you like to update?')) {
    window.location.reload();
  }
};

/**
 * Check if app can be installed
 */
export const canInstallApp = () => {
  return window.deferredPrompt !== null;
};

/**
 * Install app prompt
 */
export const installApp = async () => {
  if (!window.deferredPrompt) {
    return false;
  }

  try {
    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      window.deferredPrompt = null;
      return true;
    } else {
      console.log('User dismissed the install prompt');
      return false;
    }
  } catch (error) {
    console.error('Error during app installation:', error);
    return false;
  }
};

/**
 * Setup install prompt listener
 */
export const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    window.deferredPrompt = e;
    
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('appinstallable'));
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    window.deferredPrompt = null;
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('appinstalled'));
  });
};

/**
 * Check if app is running in standalone mode
 */
export const isStandalone = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
};

/**
 * Get app installation status
 */
export const getInstallationStatus = () => {
  if (isStandalone()) {
    return 'installed';
  } else if (canInstallApp()) {
    return 'installable';
  } else {
    return 'not-installable';
  }
};

/**
 * Share content using Web Share API
 */
export const shareContent = async (shareData) => {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  } else {
    // Fallback to clipboard
    if (navigator.clipboard && shareData.url) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        return true;
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false;
      }
    }
    return false;
  }
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

/**
 * Show local notification
 */
export const showNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      ...options
    });
    
    return notification;
  }
  return null;
};

/**
 * Check network status
 */
export const getNetworkStatus = () => {
  return {
    online: navigator.onLine,
    connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection
  };
};

/**
 * Setup network status listeners
 */
export const setupNetworkListeners = (onOnline, onOffline) => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};
