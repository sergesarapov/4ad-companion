import { Workbox } from 'workbox-window';

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onOffline?: () => void;
  onOnline?: () => void;
};

export function register(config?: Config): void {
  if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
    return;
  }

  const wb = new Workbox('/service-worker.js');

  // Handle the waiting state (new version available)
  wb.addEventListener('waiting', () => {
    if (config?.onUpdate) {
      navigator.serviceWorker.ready.then((registration) => {
        config.onUpdate?.(registration);
      });
    }
  });

  // Handle successful installation
  wb.addEventListener('activated', (event: { isUpdate?: boolean }) => {
    if (!event.isUpdate && config?.onSuccess) {
      navigator.serviceWorker.ready.then((registration) => {
        config.onSuccess?.(registration);
      });
    }
  });

  // Handle controller change (after skipWaiting)
  wb.addEventListener('controlling', () => {
    // Reload the page to use the new service worker
    window.location.reload();
  });

  // Register the service worker
  wb.register();

  // Listen for online/offline events
  window.addEventListener('offline', () => {
    config?.onOffline?.();
  });

  window.addEventListener('online', () => {
    config?.onOnline?.();
  });
}

export function unregister(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error('Service worker unregistration failed:', error);
      });
  }
}
