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
    description: "sono una notifica del 01/05/2023",
    timestamp: new Date("2023-05-01"),
    Permanent: false,
    type: "",
    pinned: false,
  };
  const notification2: Notification = {
    title: "notifica2 permanente",
    description: "Sono una notifica del 15/04/2023 ",
    timestamp: new Date("2023-04-15"),
    Permanent: true,
    type: "",
    pinned: false,
  };
  const notification3: Notification = {
    title: "notifica3",
    description: "Sono una notifica del 12/08/2023",
    timestamp: new Date("2023-08-12"),
    Permanent: false,
    type: "",
    pinned: false,
  };
  let notificationManager: NotificationManager;

  beforeEach(() => {
    notificationManager = new NotificationManager(2000);
    notificationManager.addNotification(notification1);
    notificationManager.addNotification(notification2);
    notificationManager.addNotification(notification3);
  });
  //1)test get notification (deve restituire la liata di notifiche)
  describe("Metodo getNotifications", () => {
    test("restituisce la lista delle notifiche, senza distinzione di ordinamento", () => {
      const notifications = notificationManager.getNotifications();
      expect(notifications.includes(notification2)).toBeTruthy();
      expect(notifications.includes(notification1)).toBeTruthy();
      expect(notifications.includes(notification3)).toBeTruthy();
    });
  });
  //2)test deleteNotification
  describe("Metodo deleteNotification", () => {
    test("deve eliminare una notifica dalla lista", () => {
      notificationManager.deleteNotification(notification1);
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification2, notification3]);
    });
  });

  //3)test deleteAllNotification
  describe("Metodo deleteAllNotification", () => {
    test("il metodo deve eliminare tutte le notifiche tranne quelle permanenti e pinned", () => {
      notificationManager.deleteAllNotifications();
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification2]);
      const notitificationsPinned =
        notificationManager.getNotificationsPinned();
      expect(notitificationsPinned).toEqual([]);
    });
  });
  jest.useFakeTimers(); // usa dei timmer finti per non dover aspettare ad eseguire il test
  // 4)test deleteNotificationOntimeout
  describe("Notifica rimossa dopo il timeOut", () => {
    test("Mi aspetto che l'array abbia solo le notifiche permanent dopo il timeout", () => {
      jest.runAllTimers();
      const notifications = notificationManager.getNotifications();
      expect(notifications).toHaveLength(1);
    });
  });
  //5)test le notifiche pinned sono  in alto e sucessivamente in ordine cronologico
  describe("Metodo AddNotification", () => {
    test("Aggiunge le notifiche nella lista in ordine cronologico dalla più recente alla più vecchia", () => {
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        notification2,
        notification3,
        notification1,
      ]);
    });
  });

  //6)Test addPin
  describe("Metodo addPin", () => {
    test("Se gli oggetti pinned sono stati aggiunti correttamente nella lista", () => {
      notificationManager.pinNotification(notification1);
      expect(notification1.pinned).toEqual(true);
      const notificationsPinned = notificationManager.getNotificationsPinned();
      expect(notificationsPinned).toHaveLength(1);
    });
  });
});
