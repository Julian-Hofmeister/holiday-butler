import { Component, OnInit } from '@angular/core';
import {House} from "../preview/shared/models/house.model";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {


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
