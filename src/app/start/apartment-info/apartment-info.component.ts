import {Component, Input, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {Item} from "../../shared/models/item.model";

@Component({
  selector: 'app-apartment-info',
  templateUrl: './apartment-info.component.html',
  styleUrls: ['./apartment-info.component.scss'],
})
export class ApartmentInfoComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() items: Item[];

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  // houseId = localStorage.getItem('house-id');
  //
  // apartmentId = localStorage.getItem('user-apartment');
  //
  // apartment: Apartment;
  //
  // isLoading = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  // private apartmentSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor() {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    // this.fetchApartment();
  }

  // ----------------------------------------------------------------------------------------------

  // ngOnDestroy() {
  //   if (this.apartmentSub) {
  //     this.apartmentSub.unsubscribe();
  //   }
  // }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // private async fetchApartment() {
  //   this.isLoading = true;
  //
  //   this.apartmentSub = this.apartmentService
  //     .loadApartment(this.houseId, this.apartmentId)
  //     .subscribe(async (apartments) => {
  //       for (const currentApartment of apartments) {
  //         this.apartment = {
  //           ...currentApartment,
  //         };
  //       }
  //
  //       console.log(this.apartment);
  //
  //       this.isLoading = false;
  //     });
  // }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
