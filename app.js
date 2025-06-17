// app.js

// 等 DOM 完全解析完畢再執行
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-subscribe');
  if (!btn) {
    console.error('找不到 #btn-subscribe 按鈕');
    return;
  }

  btn.addEventListener('click', async () => {
    try {
      console.log('▶️ 開始 OneSignal 推播流程');

      // 1. 原生檢查通知權限
      let permission = Notification.permission;
      console.log('原生 Notification.permission:', permission);

      // 2. 如果還沒請求過或被拒絕，就呼叫 OneSignal.requestPermission()
      if (permission !== 'granted') {
        console.log('呼叫 OneSignal.Notifications.requestPermission()');
        await OneSignal.Notifications.requestPermission();
        // 更新 permission 值
        permission = Notification.permission;
        console.log('授權後 Notification.permission:', permission);
      }

      // 3. 最終確認權限
      if (permission !== 'granted') {
        alert('❌ 您拒絕了通知權限');
        return;
      }
      alert('✅ 通知權限取得成功');

      // 4. 取得訂閱狀態，包括 userId
      const deviceState = await OneSignal.getDeviceState();
      const userId = deviceState.userId;
      console.log('OneSignal Device State:', deviceState);
      if (!userId) {
        alert('❌ 無法取得 OneSignal User ID');
        return;
      }
      alert('✅ Push 訂閱成功\nUser ID: ' + userId);

      // 5. 自發一則本地測試通知
      OneSignal.sendSelfNotification(
        '測試通知',
        '這是使用 OneSignal SDK 推送的每日語錄',
        window.location.href,
        'icon.png'
      );
      alert('✅ 測試通知已發送');

      console.log('▶️ 推播流程結束');
    } catch (err) {
      console.error('OneSignal 操作失敗：', err);
      alert('❌ 發生錯誤：' + (err.message || err));
    }
  });
});
