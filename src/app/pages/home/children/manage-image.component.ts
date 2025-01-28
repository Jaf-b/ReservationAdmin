import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EditsalleComponent } from '../../../shared/editsalle/editsalle.component';
import { SalleDataForm } from '../../../core/models/model.ts/models';
import { FieldValue } from '@angular/fire/firestore';
import { MatChipsModule } from '@angular/material/chips';
import { CommentairesComponent } from './commentaires.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-manage-image',
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule,
    CommentairesComponent,
    MatProgressBarModule,
  ],
  template: `
    @if (data() && data().length !== 0) {
    <div>
      <div
        style="display: flex;justify-content:space-between;align-items:center;padding:1rem"
      >
        <div style="flex:3;display:flex;flex-direction:column">
          <span style="font-size:30px;font-weight:bold">{{
            data()[0].brandName
          }}</span>
          <div class="stars" style="color: yellow;">
            <mat-icon class="mat-18">star</mat-icon>
            <mat-icon class="mat-18">star</mat-icon>
            <mat-icon class="mat-18">star</mat-icon>
            <mat-icon class="mat-18">star</mat-icon>
            <mat-icon class="mat-18">star</mat-icon>
          </div>
          <span
            ><b>{{ data()[0].Adresse }}</b></span
          >
          <span
            ><b>{{ data()[0].NbrePlace }} places</b></span
          >
        </div>
        <div>
          <button mat-icon-button (click)="EditSalle()">
            <mat-icon class="mat-18">edit</mat-icon>
          </button>
        </div>
      </div>
      <div class="equipement">
        <mat-chip-set>
          @for (item of data()[0].equipement; track $index) {
          <mat-chip>
            <mat-icon matChipAvatar>check_circle</mat-icon>
            <b> {{ item }}</b>
          </mat-chip>
          }
        </mat-chip-set>
      </div>
      <div class="img">
        <img [src]="data()[0].image" />
      </div>

      <div class="desc">
        <p>{{ data()[0].description }}</p>
      </div>

      <app-commentaires />
    </div>
    } @else {
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
  `,
  styles: `
    .img{
      width:90%;
      display:flex;
      padding:1rem;
      img{
        width:100%;
        margin-left:1rem;
      }
    }
    .desc{
      width:100%;
      p{
        width:90%;
        margin-left:2rem;
      }
    }
    .equipement{
      width:100%;
      display:flex;
      gap:1rem;
      mat-chip-set{
        width:90%;
        margin-left:2rem;
        mat-chip{
          display:flex;
          justify-content:center;
          align-items:center;
        }
      }


    }
  `,
})
export class ManageImageComponent {
  dialog = inject(MatDialog);
  data = input.required<SalleDataForm<FieldValue>[]>();
  EditSalle = () => {
    this.dialog.open(EditsalleComponent, {
      width: '35rem',
      disableClose: true,
      data: this.data(),
    });
  };
}
