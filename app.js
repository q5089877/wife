// app.js

// 綁定按鈕，呼叫 OneSignal API
document.getElementById('btn-subscribe')
  .addEventListener('click', () => {
    OneSignal.push(async () => {
      // 1. 註冊推播權限
      const granted = await OneSignal.registerForPushNotifications();
      if (!granted) {
        return alert('❌ 您拒絕了通知權限');
      }
      alert('✅ 通知權限取得成功');

      // 2. 取得 OneSignal User ID
      const userId = await OneSignal.getUserId();
      console.log('OneSignal User ID:', userId);
      alert('✅ 訂閱成功！User ID: ' + userId);

      // 3. 發送一則自我測試通知
      OneSignal.sendSelfNotification(
        "測試通知",
        "這是使用 OneSignal 發送的每日語錄",
        "https://你的域名/icon.png",
        "https://你的域名/"
      );
      alert('✅ 測試通知已發送');
    });
  });
