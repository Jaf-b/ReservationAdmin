import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
const ELEMENT_DATA = [
  {
    nomComplet: 'Jafred Bukulu',
    adresseMail: 'jafredtshikaya@gmail.com',
    DateReservaiton: '13-01-2025',
    duree: '1 jours',
    status: 'En Attente de Confirmation',
    prix: 5000,
  },
];
@Component({
  selector: 'app-waiting-reservation',
  imports: [MatTableModule],
  template: ``,
  styles: ``,
})
export default class WaitingReservationComponent {
  displayColumns: string[] = [
    'Nom complet',
    'Date de reservation',
    'Duréé',
    'Status',
    'Prix',
  ];
  datasource = ELEMENT_DATA;
}
