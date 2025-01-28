import { User } from '@angular/fire/auth';

export interface SalleDataForm<T> {
  id: string;
  ownerID: string;
  user: {
    ownerName: string;
    ownerEmail: string;
    ownerPicture: string;
  };
  brandName: string;
  price: string;
  description: string;
  Adresse: string;
  equipement: string[];
  employee: string[];
  image: string;
  createAt: T;
  updateAt: T;
}
export interface waitingTable {
  ownerID: string;
  id: string;
  salleName: string;
  user: {
    ownerName: string;
    ownerEmail: string;
    ownerPicture: string;
    ownerID: string;
  };
  nomComplet: string;
  adresseMail: string;
  DateReservation: string;
  duree: string;
  status: string;
  paiement: string;
  prix: string;
}
