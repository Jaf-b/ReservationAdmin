import { inject, Injectable } from '@angular/core';
import {
  ActionCodeSettings,
  Auth,
  authState,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth = inject(Auth);
  authsTate = authState(this.auth);
  user = user(this.auth);

  loginWithgoogle = () => signInWithPopup(this.auth, new GoogleAuthProvider());
  sendAuthLink(email: string, acs: ActionCodeSettings) {
    return sendSignInLinkToEmail(this.auth, email, acs);
  }
  LoginWithEmailLink() {
    if (isSignInWithEmailLink(this.auth, location.href)) {
      let email = localStorage.getItem('emailForSignIn');
      if (!email) {
        email = prompt('veuillez fournir votre e-mail pour la confirmation');
      }
      signInWithEmailLink(this.auth, email!, location.href);
    }
  }

  logout = () => signOut(this.auth);
}
