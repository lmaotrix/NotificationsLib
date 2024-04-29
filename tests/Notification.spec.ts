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

describe("NotificationManager Class", () => {
  let notifications: Notification[];
  const notificationManager = new NotificationManager();
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
  beforeAll(() => {
    notificationManager.addNotification(notification2);
    notificationManager.addNotification(notification1);
    notifications = notificationManager.getNotifications();
  });
  //test get notification (deve restituire la liata di notifiche)
  describe("Metodo getNotifications", () => {
    test("il metodo restituisce la lista delle notifiche", () => {
      expect(notifications).toEqual([notification2, notification1]); //si aspetta che la lista delle notifications abbia notification2 e 1
      //expect(notifications.includes(notification2)).toBeTruthy();
    });
  });

  // testare se una notifica è stata eliminata
  describe("Metodo deleteNotification", () => {
    test("il metodo deve eliminare una notifica dalla lista", () => {
      notificationManager.deleteNotification(notification1);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification2]);
    });
  });
  // //testare se tutte le notifiche sono state eliminate
  // describe("Metodo deleteAllNotifications", () => {
  //   test("il metodo deve eliminare tutte le notifiche che non hanno pin", () => {
  //     notificationManager.deleteAllNotifications();
  //     expect(notifications).toHaveLength(0);
  //   });
  // });
});
