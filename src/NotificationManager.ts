//La creazione di questo type rende piu legibile il codice
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
// x(true, undefined, true); // evitare questo tipo di assegnazione, rende il codice meno chiaro e legibile

// function y(
//   autoRemove?:
//     | boolean
//     | { autoRemoveAfter?: number; autoRemoveSuspendable?: boolean }
// ): void {}
// y({ autoRemoveSuspendable: true }); // vogliamo usare questo tipo di assegnazione perchè è più fruibile
// y();
// y(true);

export class NotificationManager implements INotificationManager {
  private _defaultAutoRemoveDelay: number;  //Durata del autoRemove di defout
  private _notificationsList: Notification[];
  public constructor(defaultAutoRemoveDelay: number) {
    this._defaultAutoRemoveDelay = defaultAutoRemoveDelay;
    this._notificationsList = [];
  }
// passo come parametro della funzione l'autoremove, poichè è un dato che non serve persistere, non è proprieta della notifica ma è proprietà della add
  public addNotification(
    notification: Notification,
    autoRemove?: boolean | AutoRemoveOptions
  ): void {
    this._notificationsList.push(notification);
    this._sortNotifications();
    // se autoremove è true assegno a delay il valore di autoremove passato come paramentro oppure il valore di default
    if (autoRemove) {
      const delay =
        (autoRemove as AutoRemoveOptions).delay || this._defaultAutoRemoveDelay;
      setTimeout(() => {
        this.deleteNotification(notification);
      }, delay);
    }
  }
// il metodo elimina tutte le notifiche tranne quelle pinned
  public deleteAllNotifications(): void {
    this._notificationsList = this._notificationsList.filter((a) => a.pinned);
  }
  // il metodo serve a eliminare una notifica passata come parametro
  public deleteNotification(notification: Notification): void {
    this._notificationsList = this._notificationsList.filter(
      (a) => a !== notification
    );
  }
//restituisce il clone della lista di notifiche
  public getNotifications(): Notification[] {
    return [...this._notificationsList];
  }
// fa l'ordinamento in ordine cronologico dal piu recente al più vecchio
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
  //Pone il pin alla notifica
  public pinNotification(notification: Notification): void {
    notification.pinned = true;
  }
  //toglie il pin alla notifica
  unpinNotification(notification: Notification): void {
    notification.pinned = false;
  }
}
