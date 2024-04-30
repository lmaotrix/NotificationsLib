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
  // timeOut?: ReturnType<typeof setTimeout>;
};
export class NotificationManager implements INotificationManager {
  private _notificationsList: Notification[];

  public constructor(public timeOut: number) {
    this._notificationsList = [];
    this.timeOut = timeOut;
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
