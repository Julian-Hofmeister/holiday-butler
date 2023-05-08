import {Injectable} from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";
import {Item} from "../../preview/shared/models/item.model";
import {House} from "../../preview/shared/models/house.model";
import {Subject} from "rxjs";
import {FirebaseService} from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  houseChange: Subject<House> = new Subject<House>();

  private house: House;

  user = JSON.parse(localStorage.getItem('user')!);


  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private fsService: FirebaseService
  ) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  loadHouse() {
    this.fsService.fetchSingle('/houses/', this.user.uid).subscribe(data => {
      this.house = data[0];
      this.houseChange.next(this.house);
    });
  }

  getHouse() {
    return this.house;
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}

