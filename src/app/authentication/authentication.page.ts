import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../preview/shared/models/item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import User from "./user.model";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  email: string = '';
  password: string = '';

  isVisible: boolean = false;

  loginForm: FormGroup;

  error: string;


  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private authService: AuthService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),

      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  flipVisibility() {
    this.isVisible = !this.isVisible;
  }

  // ----------------------------------------------------------------------------------------------

  submit() {
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.signInUser(user).catch((e) => {
      this.error = this.authService.handleError(e.code);
    });
  }
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
