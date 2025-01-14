import { Component, OnInit } from '@angular/core';
import { ManageImageComponent } from '../children/manage-image.component';
import { ManageDescriptionComponent } from '../children/manage-description.component';
import { ManageEquipementComponent } from '../children/manage-equipement.component';
import { CommentairesComponent } from '../children/commentaires.component';

@Component({
  selector: 'app-acceuil',
  template: `
    <app-manage-image />
    <app-manage-description />
    <app-manage-equipement />
    <app-commentaires />
  `,
  imports: [
    ManageImageComponent,
    ManageDescriptionComponent,
    ManageEquipementComponent,
    CommentairesComponent,
  ],
  styles: ``,
})
export default class AcceuilComponent {}
