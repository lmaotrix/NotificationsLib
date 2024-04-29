import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import { Notification, NotificationManager } from "../src/NotificationManager";

const notification1: Notification = {
  title: "notifica1",
  description: "Sono una notifica",
  timestamp: new Date(),
  pinned: false,
  type: "",
};
const notification2: Notification = {
  title: "notifica2",
  description: "Sono una notifica",
  timestamp: new Date(),
  pinned: false,
  type: "",
};

//test get notification (deve restituire la liata di notifiche)
describe("Metodo getNotifications", () => {
  test("il metodo restituisce la lista delle notifiche", () => {
    const notificationManager = new NotificationManager();
    notificationManager.addNotification(notification2);
    notificationManager.addNotification(notification1);
    const notifications = notificationManager.getNotifications();
    expect(notifications).toEqual([notification2, notification1]);

    //expect(notifications.includes(notification2)).toBeTruthy();
  });
});

//test deleteNotification
describe("Metodo deleteNotification", () => {
  test("il metodo deve eliminare una notifica dalla lista", () => {
    const notificationManager = new NotificationManager();
    notificationManager.addNotification(notification2);
    notificationManager.addNotification(notification1);
    notificationManager.deleteNotification(notification1);
    const notifications = notificationManager.getNotifications();
    expect(notifications).toEqual([notification2]);
  });
});
