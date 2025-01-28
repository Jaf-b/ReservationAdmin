import { inject, Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class GuardComponent implements CanActivateChild {
  user = localStorage.getItem('UserInfo');
  userData: User = JSON.parse(this.user!);
  fs = inject(FirestoreService);
  router = inject(Router);
  Guard = async () => {
    let retour: boolean = false;
    if (await this.fs.SalleExist(this.userData.uid)) {
      retour = true;
    }
    return retour;
  };
  async canActivateChild() {
    if (await this.Guard()) {
      return true; // L'utilisateur est authentifié, autoriser l'accès aux enfants
    } else {
      this.router.navigate(['/registration']); // Rediriger vers la page de connexion
      return false; // L'utilisateur n'est pas authentifié, bloquer l'accès aux enfants
    }
  }
}
