interface INotificationManager {
  addNotification(notification: Notification): void;
  deleteNotification(notification: Notification): void;
  deleteAllNotifications(): void;
  getNotifications(): Notification[];
  pinNotification(notification: Notification): void;
  unPinNotification(notification: Notification): void;
}

export type Notification = {
  title: string;
  description: string;
  timestamp: Date;
  pinned: boolean;
};

export class NotificationManager implements INotificationManager {
  private _defaultNotificationDuration: number;
  private _notificationsList: Notification[];
  public constructor(defaulNotificationDuration: number) {
    this._defaultNotificationDuration = defaulNotificationDuration;
    this._notificationsList = [];
  }

  public addNotification(notification: Notification): void {
    this._notificationsList.push(notification);
    this._sortNotifications();
    if (!notification.pinned) {
      setTimeout(() => {
        this.deleteNotification(notification);
      }, this._defaultNotificationDuration);
    }
  }

  public deleteAllNotifications(): void {
    this._notificationsList = this._notificationsList.filter((a) => a.pinned);
  }
  public deleteNotification(notification: Notification): void {
    this._notificationsList = this._notificationsList.filter(
      (a) => a !== notification
    );
  }

  public getNotifications(): Notification[] {
    return this._notificationsList;
  }

  private _sortNotifications(): void {
    this._notificationsList.sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return -1;
      } else if (!a.pinned && b.pinned) {
        return 1;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }
  //Pin alla notifica
  public pinNotification(notification: Notification): void {
    notification.pinned = true;
  }
  unPinNotification(notification: Notification): void {
    notification.pinned = false;
  }
}
