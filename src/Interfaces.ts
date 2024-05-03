import { AutoRemoveOptions, Notification } from "./Types";

export interface INotificationManager {
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
