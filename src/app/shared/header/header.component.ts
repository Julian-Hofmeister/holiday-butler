import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../preview/shared/models/item.model";
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from "../../preview/shared/services/firebase.service";
import {AlertService} from "../services/alert.service";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() route: string;

  // @Output() click: EventEmitter<string> = new EventEmitter();

  isOpen = false;
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

  onOpenAccountModal() {

  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
