import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import { NotificationManager } from "../src/Models/NotificationManager";
import { Notification } from "../src/Types";

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
//restituisce una istanza del notification manager e fa le add delle notifiche
function getNotificationManager(): NotificationManager {
  const notificationManager = new NotificationManager(2000);
  notificationManager.addNotification(notification1);
  notificationManager.addNotification(notification2);
  notificationManager.addNotification(notification3);
  return notificationManager;
}

describe("Class NotificationManager", () => {
  // test add di una notifica
  describe("Metodo AddNotification", () => {
    test("Aggiunge o più notifiche in ordine cronologico", () => {
      const notificationManager = new NotificationManager(2000);
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([]); //1° asserzione= verifico che non ci siano notifiche nella lista
      notificationManager.addNotification(notification1);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification1]); //2° asserzione= mi aspetto di trovare la notifica1 nella lista
      notificationManager.addNotification(notification2);
      notificationManager.addNotification(notification3);
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        // 3° asserzione = mi aspetto di trovare le tre notifiche in ordine
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
      expect(notifications).toEqual([notification1]); // mi aspetto di trovare la notifica1 nella list
      jest.runAllTimers();
      expect(setTimeout).toBeCalledWith(expect.any(Function), 2000); // verifica se la durata del timeout è pari a 2000 quello di default
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([]); // mi aspetto che dopo il timeout la lista sia volta
      jest.useRealTimers();
    });
    test("La notifica deve essere rimossa dopo un tempo fornito", () => {
      jest.useFakeTimers(); // usa dei timmer finti per non dover aspettare ad eseguire il test
      jest.spyOn(global, "setTimeout");
      const notificationManager = new NotificationManager(2000);
      notificationManager.addNotification(notification1, { delay: 10000 }); // add notifica con un timeout diversa dal default
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification1]); // mi aspetto che la notifica1 sia aggiunta nella lista
      jest.runAllTimers();
      expect(setTimeout).toBeCalledWith(expect.any(Function), 10000); // verifica che la durata del timeout sia pari a 10000 quello di default
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([]); // mi aspetto che dopo il timeout la lista sia vuota
      jest.useRealTimers();
    });
  });
  //test deleteNotification
  describe("Metodo deleteNotification", () => {
    test("deve eliminare una notifica dalla lista", () => {
      const notificationManager = getNotificationManager();
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        // controllo se la lista contiene tutte le notifiche ordinate
        notification1,
        notification3,
        notification2,
      ]);
      notificationManager.deleteNotification(notification1); // elimina la notifica1
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification3, notification2]); //mi aspetto che la notifica1 sia eliminata
    });
  });

  //test deleteAllNotification
  describe("Metodo deleteAllNotification", () => {
    test("il metodo deve eliminare tutte le notifiche, tranne quelle pinnate", () => {
      const notificationManager = getNotificationManager();
      let notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        // prima verifico che ci siano le notifiche nella lista
        notification1,
        notification3,
        notification2,
      ]);
      notificationManager.deleteAllNotifications(); // elimina tutte le notifiche senza pin
      notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([notification1]); // Mi aspetto che la notidfica 1 pin = true sia ancora nella lista
    });
  });

  //test get notification (deve restituire la liata di notifiche)
  describe("Metodo getNotifications", () => {
    test("restituisce la lista delle notifiche ordinata", () => {
      const notificationManager = getNotificationManager();
      const notifications = notificationManager.getNotifications();
      expect(notifications).toEqual([
        // Mi aspetto che la lista delle notifiche sia ordinata
        notification1,
        notification3,
        notification2,
      ]);
    });
  });

  // pinNotification
  describe("Metodo pinNotification", () => {
    test("il metodo deve aggiungere il pin in una notifica", () => {
      const notificationManager = getNotificationManager();
      expect(notification3.pinned).toBe(false); //mi aspetto che la notifica 3 abbia il pin set a false
      notificationManager.pinNotification(notification3); // aggiunge il pin alla notifica3
      expect(notification3.pinned).toBe(true); // verifica se il pin è stato inserito
    });
  });

  //6) unpinNotification
  describe("metodo unpinNotification", () => {
    test("il metodo deve togliere il pin alla notifica", () => {
      const notificationManager = getNotificationManager();
      expect(notification3.pinned).toBe(true); // verifico che la notifica3 abbia il pin = true
      notificationManager.unpinNotification(notification3); // toglie il pin dalla notifica
      expect(notification3.pinned).toBe(false); //mi aspetto che la notifica 3 abbia il pin set to a false
    });
  });
});
