export const getServiceWorker = (): ServiceWorker | undefined => {
  return self.registration?.active ?? undefined;
};