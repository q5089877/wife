self.addEventListener('push', event => {
  // 真實推播到達時，會觸發這裡
  const data = event.data?.json() || {};
  const title = data.title || '每日語錄來了！';
  const opts = {
    body: data.body || '準備好今天的句子了嗎？',
    icon: 'icon.png',
    tag: data.tag || 'daily-quote'
  };
  event.waitUntil(self.registration.showNotification(title, opts));
});

// （選用）點擊通知後自動打開或聚焦頁面
self.addEventListener('notificationclick', evt => {
  evt.notification.close();
  evt.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const client of list) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
