interface INotificationManager {
  addNotification(notification: Notification): void;
  deleteNotification(notification: Notification): void;
  deleteAllNotifications(): void;

  getNotifications(): Notification[];
  sortNotifications(): void;
}

export type Notification = {
  title: string;
  description: string;
  timestamp: Date;
  Permanent: boolean;
  type: string;
  pinned: boolean;
};
//  export type NotificationPinned = {
//    notification : Notification;
//    pinned: boolean;
//  }

export class NotificationManager implements INotificationManager {
  private _notificationsList: Notification[];
  private _notificationPinned: Notification[];
  public constructor(public timeOut: number) {
    this._notificationsList = [];
    this.timeOut = timeOut;
    this._notificationPinned = [];
  }

  addNotification(notification: Notification): void {
    this._notificationsList.push(notification);
    this.sortNotifications();
    if (!notification.Permanent) {
      setTimeout(() => {
        this.deleteNotification(notification);
      }, this.timeOut);
    }
  }
  pinNotification(notification: Notification): void {
    if (notification) {
      notification.pinned = true;
    }
     this._notificationPinned = this._notificationsList.filter((a)=>a.pinned === true)
  }

  deleteAllNotifications(): void {
    this._notificationsList = this._notificationsList.filter(
      (a) => a.Permanent !== false
    );
  }
  deleteNotification(notification: Notification): void {
    this._notificationsList = this._notificationsList.filter(
      (a) => a !== notification
    );
  }

  getNotifications(): Notification[] {
    return this._notificationsList;
  }

  getNotificationsPinned(): Notification[]{
    return this._notificationPinned;
  }
  sortNotifications(): void {
    this._notificationsList.sort((a, b) => {
      if (a.Permanent && !b.Permanent) {
        return -1;
      } else if (!a.Permanent && b.Permanent) {
        return 1;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }
}
