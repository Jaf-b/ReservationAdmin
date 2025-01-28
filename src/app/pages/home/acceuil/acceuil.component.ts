import { Component, inject, OnInit } from '@angular/core';
import { ManageImageComponent } from '../children/manage-image.component';
import { ManageDescriptionComponent } from '../children/manage-description.component';
import { ManageEquipementComponent } from '../children/manage-equipement.component';
import { CommentairesComponent } from '../children/commentaires.component';
import { FirestoreService } from '../../../core/services/firebase/firestore.service';
import { User } from '@angular/fire/auth';
import { SalleDataForm } from '../../../core/models/model.ts/models';
import { Timestamp } from '@angular/fire/firestore';
import { LoginService } from '../../../core/services/firebase/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  template: ` <app-manage-image [data]="data" /> `,
  imports: [ManageImageComponent],
  styles: ``,
})
export default class AcceuilComponent implements OnInit {
  ngOnInit(): void {
    this.auth = this.user.subscribe(async (user) => {
      if (user) {
        if (await this.fs.SalleExist(user.uid)) {
          this.fs.getSalle(user).subscribe((salle: any) => {
            this.data = salle;
            window.localStorage.setItem('salleName', this.data[0].brandName);
          });
        } else {
          this.router.navigate(['/registration']);
        }
      }
    });
  }
  fs = inject(FirestoreService);
  auth!: Subscription;
  router = inject(Router);
  login = inject(LoginService);
  user = this.login.user;
  data!: SalleDataForm<Timestamp>[];
}
