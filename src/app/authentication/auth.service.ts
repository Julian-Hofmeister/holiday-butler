import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat";
import User from './user.model';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  user = new BehaviorSubject<User>(undefined);

  isLoggedIn = false;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  async signInUser(user: User) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(user.email, user.password!)
      .then((res) => {
        this.isLoggedIn = true;

        localStorage.setItem('user', JSON.stringify(res.user));

        const user: User = {
          email: res.user?.email!,
        };

        this.user.next(user);

        this.router.navigate(['/home']);

        return res.user!.email;
      });
  }

  // ----------------------------------------------------------------------------------------------

  autoSignIn() {
    const user = JSON.parse(localStorage.getItem('user')! );

    if (!user) {
      this.router.navigate(['/authentication']).then( );

      console.log('NO USER FOUND');
      return;
    } else {
      // this.router.navigate(['/home']).then();
      // this.signInUser(user).then();

      this.router.navigateByUrl('/home').then();
    }

    const loadedUser: User = {email: user.email};

    this.user.next(loadedUser);
  }

  // ----------------------------------------------------------------------------------------------

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/authentication']);
  }

  // ----------------------------------------------------------------------------------------------

  handleError(errorRes: string) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes) {
      return errorMessage;
    }
    switch (errorRes) {
      case 'auth/user-not-found':
        errorMessage = 'Dieses Konto wurde nicht gefunden.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Das eingegebene Passwort ist falsch.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'Diese E-mail Adresse existiert bereits.';
        break;
    }

    return errorMessage;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
