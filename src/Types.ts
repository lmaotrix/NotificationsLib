//La creazione di questo type rende piu legibile il codice
export type AutoRemoveOptions = {
  delay?: number;
};
export type Notification = {
  title: string;
  description: string;
  timestamp: Date;
  pinned: boolean;
};
