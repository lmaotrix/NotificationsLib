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
  description: "sono una notifica del 01/05/2023",
  timestamp: new Date("2023-05-01"),
  pinned: true,
};
const notification2: Notification = {
  title: "notifica2 permanente",
  description: "Sono una notifica del 15/04/2023 ",
  timestamp: new Date("2023-04-15"),
  pinned: false,
};
const notification3: Notification = {
  title: "notifica3",
  description: "Sono una notifica del 12/08/2023",
  timestamp: new Date("2023-08-12"),
  pinned: false,
};
function getNotificationManager(): NotificationManager {
  const notificationManager = new NotificationManager(2000);
  notificationManager.addNotification(notification1);
  notificationManager.addNotification(notification2);
  notificationManager.addNotification(notification3);
  return notificationManager;
}

describe("Class NotificationManager", () => {
  // 1) test add di una notifica
  describe("Metodo AddNotification", () => {
    test("Aggiunge o più notifiche in ordine cronologico", () => {
      const notificationManager = new NotificationManager(2000);
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([]);
      notificationManager.addNotification(notification1);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification1]);
      notificationManager.addNotification(notification2);
      notificationManager.addNotification(notification3);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        notification1,
        notification3,
        notification2,
      ]);
    });
    test("La notifica deve essere rimossa dopo un tempo prestabilito, poiche' non fornito", () => {
      jest.useFakeTimers(); // usa dei timmer finti per non dover aspettare ad eseguire il test
      jest.spyOn(global, "setTimeout");
      const notificationManager = new NotificationManager(2000);
      notificationManager.addNotification(notification1, true);
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification1]);
      jest.runAllTimers();
      expect(setTimeout).toBeCalledWith(expect.any(Function), 2000);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([]);
      jest.useRealTimers();
    });
    test("La notifica deve essere rimossa dopo un tempo fornito", () => {
      jest.useFakeTimers(); // usa dei timmer finti per non dover aspettare ad eseguire il test
      jest.spyOn(global, "setTimeout");
      const notificationManager = new NotificationManager(2000);
      notificationManager.addNotification(notification1, { delay: 10000 });
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification1]);
      jest.runAllTimers();
      expect(setTimeout).toBeCalledWith(expect.any(Function), 10000);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([]);
      jest.useRealTimers();
    });
  });

  //2)test get notification (deve restituire la liata di notifiche)
  describe("Metodo getNotifications", () => {
    test("restituisce la lista delle notifiche ordinata", () => {
      const notificationManager = getNotificationManager();
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        notification1,
        notification3,
        notification2,
      ]);
    });
  });

  //3)test deleteNotification
  describe("Metodo deleteNotification", () => {
    test("deve eliminare una notifica dalla lista", () => {
      const notificationManager = getNotificationManager();
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        notification1,
        notification3,
        notification2,
      ]);
      notificationManager.deleteNotification(notification1);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification3, notification2]);
    });
  });

  //4)test deleteAllNotification
  describe("Metodo deleteAllNotification", () => {
    test("il metodo deve eliminare tutte le notifiche, tranne quelle pinnate", () => {
      const notificationManager = getNotificationManager();
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        notification1,
        notification3,
        notification2,
      ]);
      notificationManager.deleteAllNotifications();
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification1]);
    });
  });

  //5) pinNotification
  describe("Metodo pinNotification", () => {
    test("il metodo deve aggiungere il pin in una notifica", () => {
      const notificationManager = getNotificationManager();
      expect(notification3.pinned).toBe(false);
      notificationManager.pinNotification(notification3);
      expect(notification3.pinned).toBe(true);
    });
  });

  //6) unpinNotification
  describe("metodo unpinNotification", () => {
    test("il metodo deve togliere il pin alla notifica", () => {
      const notificationManager = getNotificationManager();
      expect(notification3.pinned).toBe(true);
      notificationManager.unpinNotification(notification3);
      expect(notification3.pinned).toBe(false);
    });
  });
});
