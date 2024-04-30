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
  pinned: boolean;
  type: string;
};
export class NotificationManager implements INotificationManager {
  private _notificationsList: Notification[];
  public constructor() {
    this._notificationsList = [];
  }

  addNotification(notification: Notification): void {
    this._notificationsList.push(notification);
  }
  deleteNotification(notification: Notification): void {
    this._notificationsList = this._notificationsList.filter(
      (a) => a !== notification
    );
  }
  deleteAllNotifications(): void {
    this._notificationsList = this._notificationsList.filter(
      (a) => a.pinned !== false
    );
  }
  getNotifications(): Notification[] {
    return this._notificationsList;
  }

  sortNotifications(): void {
    this._notificationsList.sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return -1;
      } else if (!a.pinned && b.pinned) {
        return 1;
      }
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
  }
}
