import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../../authentication/auth.service";

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent  implements OnInit {

//#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    console.log("OPENING")
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onLogout() {
   this.alertService.logoutAlert().then((alert) => {
     alert.present().then();

     alert.onDidDismiss().then((data) => {
       if(data.role === 'confirm') {
         this.authService.logout();
       }
     })

    });

  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////




  // ----------------------------------------------------------------------------------------------

  //#endregion
}
