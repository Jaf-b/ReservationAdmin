import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WindowsService } from '../../../core/services/utilities/windows.service';
import { IS_MEDIUM } from '../../../constant.app';
import { waitingTable } from '../../../core/models/model.ts/models';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../../../core/services/firebase/firestore.service';
import { LoginService } from '../../../core/services/firebase/login.service';
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
    <div class="container">
      <div class="filtrers">
        <mat-form-field appearance="outline" style="flex:6;font-weight:600;">
          <mat-label style="font-weight:600;">Recherche</mat-label>
          <input (keyup)="ApplyFilter($event)" type="text" matInput />
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
          <tr class="mat-row" *matNoDataRow>
            <td colspan="8" align="center"><b>Aucune donnée trouvée</b></td>
          </tr>
        </table>
        <mat-divider></mat-divider>
        <mat-paginator
          [pageSizeOptions]="[4, 10, 20]"
          showFirstLastButtons
        ></mat-paginator>
      </div>
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

}
.mat-elevation-z8{
  border:1px solid var(--mat-sys-outline);
  margin:0.75rem;
}
mat-divider{
  border-top-color:var(--mat-sys-outline) !important;
}
`,
})
export default class ConfirmedReservationComponent
  implements AfterViewInit, OnInit
{
  ngOnInit(): void {
    this.Auth = this.user.subscribe(async (user) => {
      if (user) {
        this.fs.getReservation(this.salleName).subscribe((reservation: any) => {
          this.datasource.data = reservation;
        });
      }
    });
  }
  salleName: any = localStorage.getItem('salleName');
  fs = inject(FirestoreService);
  Auth!: Subscription;
  user = inject(LoginService).user;
  width = inject(WindowsService).width;
  mediumWidth = IS_MEDIUM;
  datasource = new MatTableDataSource<waitingTable>();
  ngAfterViewInit(): void {
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
  ApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}
