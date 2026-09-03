// ============================================
// BROWSER NOTIFICATIONS UTILITY
// ============================================

// Request permission for notifications
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    console.log('✅ Notification permission already granted');
    return true;
  }

  if (Notification.permission === 'denied') {
    console.log('❌ Notification permission denied');
    return false;
  }

  const permission = await Notification.requestPermission();
  console.log('📝 Permission result:', permission);
  return permission === 'granted';
}

// Send a notification
export function sendNotification(title, options = {}) {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }

  try {
    const notification = new Notification(title, {
      icon: '🚚',
      badge: '📦',
      ...options
    });

    setTimeout(() => notification.close(), 5000);

    notification.onclick = function() {
      window.focus();
      this.close();
    };

    return notification;
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Get status-specific notification
export function getStatusNotification(shipment) {
  const status = shipment.status;
  const id = shipment.id;
  
  let title = '📦 Shipment Update';
  let body = `${id}: ${status}`;

  if (status.includes('Delivered')) {
    title = '✅ Shipment Delivered!';
    body = `${id} has been delivered successfully!`;
  } else if (status.includes('Delayed')) {
    title = '⚠️ Shipment Delayed';
    body = `${id} is delayed: ${status}`;
  } else if (status.includes('Border')) {
    title = '🛂 Shipment at Border';
    body = `${id} is at border crossing: ${status}`;
  } else if (status.includes('In Transit')) {
    title = '🚚 Shipment In Transit';
    body = `${id} is on its way: ${shipment.route}`;
  } else if (status.includes('Pending')) {
    title = '⏳ Shipment Pending';
    body = `${id} is pending processing`;
  }

  return {
    title,
    body,
    options: {
      body: body,
      icon: '🚚',
      tag: `shipment-${id}`,
      requireInteraction: true
    }
  };
}

// Send shipment status notification
export function sendShipmentNotification(shipment) {
  const notification = getStatusNotification(shipment);
  sendNotification(notification.title, notification.options);
}

// Test notification
export function testNotification() {
  console.log('🔔 Testing notification...');
  requestNotificationPermission().then((granted) => {
    if (granted) {
      sendNotification('🔔 Test Notification', {
        body: 'Notifications are working!',
        icon: '✅'
      });
    } else {
      alert('Please allow notifications in your browser');
    }
  });
}