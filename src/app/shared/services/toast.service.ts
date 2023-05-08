import {Injectable} from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";
import {Item} from "../../preview/shared/models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private toastController: ToastController,

  ) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'dark',
    });

    await toast.present();
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}

