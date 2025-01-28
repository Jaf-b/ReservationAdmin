import { User } from '@angular/fire/auth';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { APP_NAME, COMPANY_NAME, IS_MEDIUM } from '../../constant.app';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../core/services/firebase/login.service';
import { MatStepperModule } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WindowsService } from '../../core/services/utilities/windows.service';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    CommonModule,
    MatStepperModule,
    RouterLink,
  ],
  template: `
    @if(emailSet()){
    <mat-card
      [ngClass]="mediumWidth < currentWidth() ? 'big' : 'small'"
      appearance="outlined"
      style="margin:2rem auto"
    >
      <mat-card-header style="padding: 1rem;">
        <mat-card-title align="center">
          <b>{{ appname }}</b>
        </mat-card-title>
        <mat-card-subtitle style="text-align:center"
          ><span>
            <b> Connecter vous et gerer vos Reservations en un seul clic </b>
          </span></mat-card-subtitle
        >
      </mat-card-header>
      <mat-divider />
      <mat-card-content style="padding: 2rem;">
        <span
          ><b>l'email à été envoyé à l'adresse {{ emailSet() }}</b></span
        ><br />
        <br />
        <button mat-button (click)="resetState()" style="margin-left: 58%;">
          email non reçus
        </button>
      </mat-card-content>
      <mat-divider />
      <mat-card-footer align="center" style="padding:1rem;"
        ><b
          >{{ appname }} {{ date.getFullYear() }}, propulsé par
          <a href="">{{ companyname }}</a></b
        ></mat-card-footer
      >
    </mat-card>
    } @else {
    <mat-card
      [ngClass]="mediumWidth < currentWidth() ? 'big' : 'small'"
      appearance="outlined"
    >
      <mat-card-header style="padding:1rem;">
        <mat-card-title align="center">
          <b>{{ appname }}</b>
        </mat-card-title>
        <mat-card-subtitle style="text-align:center"
          ><span>
            <b>
              Connecter vous et gerer vos Reservations en un seul clic
              <a routerLink="/registration"> Ajouter une Salle ?</a></b
            >
          </span></mat-card-subtitle
        >
      </mat-card-header>
      <mat-divider />
      <mat-card-content style="padding:1.2rem;">
        <main>
          <button
            mat-flat-button
            style="width: 100%;"
            (click)="loginWithGoogle()"
          >
            Connecter vous avec google
          </button>
          <div class="divider">
            <mat-divider />
            <span><b>ou avec</b></span>
            <mat-divider />
          </div>
          <form
            #EmailForm="ngForm"
            align="end"
            (ngSubmit)="emailFormSubmit(EmailForm)"
          >
            <mat-form-field
              appearance="outline"
              style="width:100%;font-weight:600;"
            >
              <mat-label style="font-weight:600;">Email</mat-label>
              <input
                type="email"
                name="email"
                ngModel
                #emails="ngModel"
                required
                email
                matInput
                placeholder="exemple@compy.org"
              />
              @if(!emails.errors?.['required'] && emails.errors?.['email']){
              <mat-error style="font-weight:600;">Email invalid</mat-error>
              }@else if (emails.errors?.['required']) {
              <mat-error style="font-weight:600;">Email obligatoire</mat-error>
              }
            </mat-form-field>
            <button
              type="submit"
              mat-flat-button
              [disabled]="EmailForm.invalid"
            >
              Se connecter
            </button>
          </form>
        </main>
      </mat-card-content>
      <mat-divider />
      <mat-card-footer align="center" style="padding:1rem;"
        ><b
          >{{ appname }} {{ date.getFullYear() }}, propulsé par
          <a href="">{{ companyname }}</a></b
        ></mat-card-footer
      >
    </mat-card>
    }
  `,
  styles: `
    .divider{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin: 1rem 0;
      mat-divider{
        width:35%;
      }
    }
   .big{
    max-width:380px;
    margin:2rem auto
   }.small{
    max-width:350px;
    margin:2rem auto;
   }
  `,
})
export default class LoginComponent implements OnInit, OnDestroy {
  appname = APP_NAME;
  router = inject(Router);
  currentWidth = inject(WindowsService).width;
  mediumWidth = IS_MEDIUM;
  authSub!: Subscription;
  snackBar = inject(MatSnackBar);
  companyname = COMPANY_NAME;
  date = new Date();
  auth = inject(LoginService);
  fs = inject(FirestoreService);
  emailSet = signal('');
  loginWithGoogle = async () => {
    try {
      await this.auth.loginWithgoogle();
    } catch (e) {
      this.snackBar.open("Une erreur s'est produite", 'fermer', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  };
  emailFormSubmit(form: NgForm) {
    const email = form.value.email;
    const ActionCodeSettings = {
      url: `${location.origin}${this.router.url}`,
      handleCodeInApp: true,
    };
    this.auth.sendAuthLink(email, ActionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
    this.emailSet.set(email);
    form.reset();
  }
  resetState = () => this.emailSet.set('');
  ngOnInit(): void {
    this.authSub = this.auth.authsTate.subscribe(async (user: User | null) => {
      if (this.router.url.includes('?apiKey=')) {
        this.auth.LoginWithEmailLink();
      }
      if (user) {
        if (await this.fs.SalleExist(user.uid)) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/registration']);
          this.snackBar.open('Aucune salle detectée', 'ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
