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
  description: "Sono una vecchia notifica",
  timestamp: new Date("2023-01-01"),
  pinned: false,
  type: "",
};
const notification2: Notification = {
  title: "sono una notifica pinned",
  description: "Sono una nuova notifica ",
  timestamp: new Date("2023-12-15"),
  pinned: true,
  type: "",
};
const notification3: Notification = {
  title: "notifica3",
  description: "Sono una nuova notifica ",
  timestamp: new Date("2023-08-12"),
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
//test deleteAllNotification
describe("Metodo deleteAllNotification", () => {
  test("il metodo deve eliminare tutte le notifiche senza il pin dalla lista", () => {
    const notificationManager = new NotificationManager();
    notificationManager.addNotification(notification2);
    notificationManager.addNotification(notification1);
    notificationManager.deleteAllNotifications();
    const notifications = notificationManager.getNotifications();
    expect(notifications).toEqual([notification2]);
  });
});
//test le notifiche pinned sono  in alto e sucessivamente in ordine cronologico
describe("Metodo SortNotification", () => {
  test("Il metodo restituisce le notifiche pinned per prima, sucessivamente in ordine cronologica", () => {
    const notificationManager = new NotificationManager();
    notificationManager.addNotification(notification2);
    notificationManager.addNotification(notification1);
    notificationManager.addNotification(notification3);
    notificationManager.sortNotifications();
    const notifications = notificationManager.getNotifications();
    expect(notifications).toEqual([
      notification2,
      notification1,
      notification3,
    ]);
  });
});
