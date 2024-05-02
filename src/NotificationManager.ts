export type AutoRemoveOptions = {
  delay?: number;
};

interface INotificationManager {
  addNotification(
    notification: Notification,
    autoRemove?: boolean | AutoRemoveOptions
  ): void;
  deleteNotification(notification: Notification): void;
  deleteAllNotifications(): void;
  getNotifications(): Notification[];
  pinNotification(notification: Notification): void;
  unpinNotification(notification: Notification): void;
}

export type Notification = {
  title: string;
  description: string;
  timestamp: Date;
  pinned: boolean;
};

// function x(
//   autoRemove?: boolean,
//   autoRemoveAfter?: number,
//   autoRemoveSuspendable?: boolean
// ): void {}
// x(true, undefined, true);

// function y(
//   autoRemove?:
//     | boolean
//     | { autoRemoveAfter?: number; autoRemoveSuspendable?: boolean }
// ): void {}
// y({ autoRemoveSuspendable: true });
// y();
// y(true);

export class NotificationManager implements INotificationManager {
  private _defaultAutoRemoveDelay: number;
  private _notificationsList: Notification[];
  public constructor(defaultAutoRemoveDelay: number) {
    this._defaultAutoRemoveDelay = defaultAutoRemoveDelay;
    this._notificationsList = [];
  }

  public addNotification(
    notification: Notification,
    autoRemove?: boolean | AutoRemoveOptions
  ): void {
    this._notificationsList.push(notification);
    this._sortNotifications();

    if (autoRemove) {
      const delay =
        (autoRemove as AutoRemoveOptions).delay || this._defaultAutoRemoveDelay;
      setTimeout(() => {
        this.deleteNotification(notification);
      }, delay);
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
    return [...this._notificationsList];
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
  unpinNotification(notification: Notification): void {
    notification.pinned = false;
  }
}
