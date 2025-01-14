import { User } from '@angular/fire/auth';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { APP_NAME, COMPANY_NAME } from '../../constant.app';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../core/services/firebase/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
  ],
  template: `
    @if(emailSet()){
    <mat-card appearance="outlined" style="max-width:380px;margin:2rem auto">
      <mat-card-header style="padding: 1rem;">
        <mat-card-title align="center">
          <b>{{ appname }}</b>
        </mat-card-title>
        <mat-card-subtitle
          ><span style="text-align: center">
            <b> Connecter vous et gerer vos Reservations</b>
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
    <mat-card appearance="outlined" style="max-width:380px;margin:2rem auto">
      <mat-card-header style="padding:1rem;">
        <mat-card-title align="center">
          <b>{{ appname }}</b>
        </mat-card-title>
        <mat-card-subtitle
          ><span style="text-align: center">
            <b> Connecter vous et gerer vos Reservations</b>
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

  `,
})
export default class LoginComponent implements OnInit, OnDestroy {
  appname = APP_NAME;
  router = inject(Router);
  authSub!: Subscription;
  snackBar = inject(MatSnackBar);
  companyname = COMPANY_NAME;
  date = new Date();
  auth = inject(LoginService);
  emailSet = signal('');
  loginWithGoogle = async () => {
    try {
      await this.auth.loginWithgoogle();
    } catch (e) {
      this.snackBar.open("Une erreur s'est produite", 'fermer');
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
    this.authSub = this.auth.authsTate.subscribe((user: User | null) => {
      if (this.router.url.includes('?apiKey=')) {
        this.auth.LoginWithEmailLink();
      }
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
