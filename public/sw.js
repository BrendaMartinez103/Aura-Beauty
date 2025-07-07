self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  self.registration.showNotification(data.title || "Aura Beauty", {
    body: data.body || "¡Tenemos una nueva oferta para vos!",
    icon: "/icon.png",
  });
});
