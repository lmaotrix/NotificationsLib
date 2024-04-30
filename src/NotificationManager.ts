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
  timeOut?: ReturnType<typeof setTimeout>;
};
export class NotificationManager implements INotificationManager {
  private _notificationsList: Notification[];
  private _dueTime: number;
  public constructor() {
    this._notificationsList = [];
    this._dueTime = 2000;
  }

  addNotification(notification: Notification): void {
    this._notificationsList.push(notification);
    if (!notification.pinned) {
      notification.timeOut = setTimeout(() => {
        this.deleteNotification(notification);
      }, this._dueTime);
    }
  }
  deleteAllNotifications(): void {
    this._notificationsList = this._notificationsList.filter(
      (a) => a.pinned !== false
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
