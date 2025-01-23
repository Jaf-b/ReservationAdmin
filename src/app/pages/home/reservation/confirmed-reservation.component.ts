import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WindowsService } from '../../../core/services/utilities/windows.service';
import { IS_MEDIUM } from '../../../constant.app';
interface waitingTable {
  no: number;
  nomComplet: string;
  adresseMail: string;
  DateReservaiton: string;
  duree: string;
  status: string;
  paiement: string;
  prix: number;
}

const ELEMENT_DATA: waitingTable[] = [
  {
    no: 1,
    nomComplet: 'Jafred Bukulu',
    adresseMail: 'jafredtshikaya@gmail.com',
    DateReservaiton: '13-01-2025',
    duree: '1 jours',
    status: 'confirmed',
    paiement: 'en Présenciel',
    prix: 5000,
  },
  {
    no: 2,
    nomComplet: 'Jafred Bukulu',
    adresseMail: 'jafredtshikaya@gmail.com',
    DateReservaiton: '13-01-2025',
    duree: '1 jours',
    status: 'waiting',
    paiement: 'en Présenciel',
    prix: 5000,
  },
  {
    no: 3,
    nomComplet: 'Jafred Bukulu',
    adresseMail: 'jafredtshikaya@gmail.com',
    DateReservaiton: '13-01-2025',
    duree: '1 jours',
    status: 'waiting',
    paiement: 'en Présenciel',
    prix: 5000,
  },
];
@Component({
  selector: 'app-confirmed-reservation',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="filtrers">
      <mat-form-field appearance="outline" style="flex:6;font-weight:600;">
        <mat-label style="font-weight:600;">Recherche</mat-label>
        <input type="text" matInput />
      </mat-form-field>
    </div>
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="datasource">
        <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

        <!-- Position Column -->
        <ng-container matColumnDef="No">
          <th mat-header-cell *matHeaderCellDef>No.</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.no }}</b>
          </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="Nom complet">
          <th mat-header-cell *matHeaderCellDef>Nom complet</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.nomComplet }}</b>
          </td>
        </ng-container>
        <!-- Weight Column -->

        <ng-container matColumnDef="Adresse mail">
          <th mat-header-cell *matHeaderCellDef>Adresse mail</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.adresseMail }}</b>
          </td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="Date de reservation">
          <th mat-header-cell *matHeaderCellDef>Date de reservation</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.DateReservaiton }}</b>
          </td>
        </ng-container>
        <ng-container matColumnDef="Duréé">
          <th mat-header-cell *matHeaderCellDef>Duréé</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.duree }}</b>
          </td>
        </ng-container>

        <ng-container matColumnDef="Status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.status }}</b>
          </td>
        </ng-container>

        <ng-container matColumnDef="Mode de Paiement">
          <th mat-header-cell *matHeaderCellDef>Mode de Paiement</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.paiement }}</b>
          </td>
        </ng-container>

        <ng-container matColumnDef="Prix">
          <th mat-header-cell *matHeaderCellDef>Prix</th>
          <td mat-cell *matCellDef="let element">
            <b>{{ element.prix }}$</b>
          </td>
        </ng-container>
        <ng-container matColumnDef="Action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button>
              <mat-icon>delete</mat-icon>
            </button>
            <button mat-icon-button>
              <mat-icon>check_circle</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr
          mat-header-row
          *matHeaderRowDef="
            mediumWidth > width() ? displayedColumsWidth : displayedColumns
          "
        ></tr>
        <tr
          mat-row
          *matRowDef="
            let row;
            columns: mediumWidth > width()
              ? displayedColumsWidth
              : displayedColumns
          "
        ></tr>
      </table>
      <mat-paginator
        [pageSizeOptions]="[4, 10, 20]"
        showFirstLastButtons
      ></mat-paginator>
    </div>
  `,
  styles: `
  mat-paginator,
th{
  font-weight:600;
}
.filtrers{
  margin-top:1rem;
  display:flex;
  gap:1rem;
  padding:0.5rem;
}`,
})
export default class ConfirmedReservationComponent {
  width = inject(WindowsService).width;
  mediumWidth = IS_MEDIUM;
  datasource = new MatTableDataSource(ELEMENT_DATA);
  ngOnInit(): void {
    this.datasource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'No',
    'Nom complet',
    'Adresse mail',
    'Date de reservation',
    'Duréé',
    'Mode de Paiement',
    'Prix',
    'Action',
  ];
  displayedColumsWidth: string[] = [
    'No',
    'Nom complet',
    'Date de reservation',
    'Prix',
    'Action',
  ];
}
