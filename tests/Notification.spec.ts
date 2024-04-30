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

describe("Class NotificationManager", () => {
  const notification1: Notification = {
    title: "notifica1",
    description: "Sono una vecchia notifica",
    timestamp: new Date("2023-05-01"),
    Permanent: false,
    type: "",
  };
  const notification2: Notification = {
    title: "sono una notifica pinned",
    description: "Sono una nuova notifica ",
    timestamp: new Date("2023-04-15"),
    Permanent: true,
    type: "",
  };
  const notification3: Notification = {
    title: "sono una nuova notifica",
    description: "Sono una nuova notifica ",
    timestamp: new Date("2023-08-12"),
    Permanent: false,
    type: "",
  };
  let notificationManager: NotificationManager;
  // beforeAll(() => {});
  beforeEach(() => {
    notificationManager = new NotificationManager(2000);
    notificationManager.addNotification(notification1);
    notificationManager.addNotification(notification2);
    notificationManager.addNotification(notification3);
  });
  //test get notification (deve restituire la liata di notifiche)
  describe("Metodo getNotifications", () => {
    test("il metodo restituisce la lista delle notifiche", () => {
      const notifications = notificationManager.getNotifications();
      expect(notifications.includes(notification2)).toBeTruthy();
      expect(notifications.includes(notification1)).toBeTruthy();
      expect(notifications.includes(notification3)).toBeTruthy();
    });
  });
  //test deleteNotification
  describe("Metodo deleteNotification", () => {
    test("il metodo deve eliminare una notifica dalla lista", () => {
      notificationManager.deleteNotification(notification1);
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification2, notification3]);
    });
  });

  //test deleteAllNotification
  describe("Metodo deleteAllNotification", () => {
    test("il metodo deve eliminare tutte le notifiche senza il pin dalla lista", () => {
      notificationManager.deleteAllNotifications();
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification2]);
    });
  });
  jest.useFakeTimers(); // usa dei timmer finti per non dover aspettare ad eseguire il test
  // test deleteNotificationOntimeout
  describe("Notifica rimossa dopo il dalay", () => {
    test("Mi aspetto che l'array abbia solo le notifiche pinned dopo il timeout", () => {
      jest.runAllTimers();
      const notifications = notificationManager.getNotifications();
      expect(notifications).toHaveLength(1);
    });
  });
  //test le notifiche pinned sono  in alto e sucessivamente in ordine cronologico
  describe("Metodo AddNotification", () => {
    test("Il metodo add aggiunge le notifiche nella lista in ordine cronologico dalla più recente alla più vecchia", () => {
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        notification2,
        notification3,
        notification1,
      ]);
    });
  });
});
