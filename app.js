// 1. 註冊 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      console.log('SW 註冊成功:', reg);

      // 綁定按鈕：請求通知權限 + 取得訂閱 + 測試通知
      document.getElementById('btn-subscribe').addEventListener('click', async () => {
        // 2. 請求通知權限
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') {
          return alert('已取消通知授權');
        }

        // 3. 取得 PushSubscription（這裡使用空 options）
        const swReg = await navigator.serviceWorker.ready;
        const sub = await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          // 將來此處要填入你的 VAPID public key
          applicationServerKey: null
        });
        console.log('Push 訂閱物件：', sub);

        // 4. 手動觸發一條通知（測試用）
        swReg.showNotification('測試通知', {
          body: '這是本機模擬的每日語錄提醒！',
          icon: 'icon.png',      // 可換成你的 App icon
          tag: 'daily-quote-demo'
        });
      });
    })
    .catch(err => console.error('SW 註冊失敗：', err));
} else {
  alert('此瀏覽器不支援 Service Worker');
}
