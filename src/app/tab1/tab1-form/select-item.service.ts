import {Injectable} from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";
import {Item} from "../../preview/shared/models/item.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectItemService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  selectedItem: Item;

  selectedItemChange: Subject<Item> = new Subject<Item>();

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
  ) {


  }

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onSelectItem(item: Item) {
    this.selectedItemChange.next(item);
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}

