// Workbox types
declare module 'workbox-window';

// Extend Window interface for custom events
interface WindowEventMap {
  swUpdate: CustomEvent<ServiceWorkerRegistration>;
}
