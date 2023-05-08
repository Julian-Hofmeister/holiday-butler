import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastController} from "@ionic/angular";
import {FirebaseService} from "../preview/shared/services/firebase.service";
import {House} from "../preview/shared/models/house.model";
import firebase from "firebase/compat";
import {Item} from "../preview/shared/models/item.model";
import {HouseService} from "../shared/services/house.service";
import {SelectItemService} from "../tab1/tab1-form/select-item.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

//#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  house: House;
  editInfo: Item | null;
  clearInfo: Item = {
    _id: '',
    title: '',
    description: '',
    kind: '',
    page: '',
    infoRows: [{name: '', content: ''}]
  }

  dismissibleText = localStorage.getItem('dismissibleText');
  notShowAgain = false;


  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private houseService: HouseService,
    private fsService: FirebaseService,
    private selectItemService: SelectItemService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.houseService.loadHouse();

    this.loadHouse();
    this.listenItemChange();

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

  onOpenInfo($event: any) {
    this.editInfo = $event;

    console.log($event)
  }

  // ----------------------------------------------------------------------------------------------

  setTimetamp()  {
    localStorage.setItem('dismissibleText', Date.now().toString())
    this.notShowAgain = true;
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private loadHouse() {
    this.houseService.houseChange.subscribe(data => {
      this.house = data;
    });
  }

  // ----------------------------------------------------------------------------------------------

  private listenItemChange() {
    this.selectItemService.selectedItemChange.subscribe((value) => {
      console.log(value);
      if(value.kind === "primary") {
        this.editInfo = null;
        this.editInfo = value;
      }
    })
  }
  //#endregion
}
