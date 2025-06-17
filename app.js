// app.js

// 等 DOM 解析完畢再執行
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-subscribe');
  if (!btn) {
    console.error('找不到 #btn-subscribe 按鈕');
    return;
  }

  btn.addEventListener('click', async () => {
    try {
      console.log('▶️ 開始 OneSignal 推播流程');

      // 1. 檢查是否已經啟用推播通知
      const isEnabled = await OneSignal.isPushNotificationsEnabled();
      console.log('推播已啟用？', isEnabled);

      // 2. 若尚未啟用，呼叫原生授權提示
      if (!isEnabled) {
        console.log('呼叫 showNativePrompt() 請求權限');
        await OneSignal.showNativePrompt();
      }

      // 3. 再次檢查授權結果
      const isEnabledAfter = await OneSignal.isPushNotificationsEnabled();
      console.log('授權後推播已啟用？', isEnabledAfter);
      if (!isEnabledAfter) {
        alert('❌ 您拒絕了通知權限');
        return;
      }
      alert('✅ 通知權限取得成功');

      // 4. 取得 OneSignal User ID（訂閱識別）
      const userId = await OneSignal.getUserId();
      console.log('OneSignal User ID:', userId);
      alert('✅ Push 訂閱成功\nUser ID: ' + userId);

      // 5. 在前端發送一則自測通知
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
