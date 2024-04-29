interface INotificationManager {
  addNotification(notification: Notification): void;
  getNotifications(): Notification[];
  deleteNotification(notification: Notification): void;
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
  getNotifications(): Notification[] {
    return this._notificationsList;
  }
  deleteNotification(notification: Notification): void {
    this._notificationsList.filter((a) => a !== notification);
  }
  
}
