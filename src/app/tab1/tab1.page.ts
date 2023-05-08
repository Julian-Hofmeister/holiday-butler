import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../preview/shared/models/item.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../shared/services/toast.service";
import {AlertService} from "../shared/services/alert.service";
import {FirebaseService} from "../shared/services/firebase.service";
import {SelectItemService} from "./tab1-form/select-item.service";
import {House} from "../preview/shared/models/house.model";
import {HouseService} from "../shared/services/house.service";

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {


  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  house: House;
  isOpen = false;

  dismissibleText = localStorage.getItem('dismissibleText');
  notShowAgain = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(

  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    if(this.dismissibleText) {
      if(Number(this.dismissibleText) > Date.now() - 3600000) {
        this.notShowAgain = true
      }
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  setTimetamp()  {
    localStorage.setItem('dismissibleText', Date.now().toString())
    this.notShowAgain = true;
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------


  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion

}
