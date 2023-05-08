import {Injectable} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Item} from "../../preview/shared/models/item.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private alertController: AlertController
  ) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////
  unsavedChangesAlert() {
    return this.alertController.create({
      header: 'Ungespeicherte Änderungen',
      message: "Du hast noch nicht alle Änderungen gespeichert. Beim Fortfahren können nicht gespeicherte Änderungen verloren gehen.",
      buttons: [{
        text: 'Verwerfen',
        role: 'cancel',
        handler: () => {
          return false;

        }
      },
        {
          text: 'Speichern',
          role: 'confirm',
          handler: () => {
            return true;
          }
        },
      ],
    });
  }

  // ----------------------------------------------------------------------------------------------

  deleteInfoAlert() {
    return this.alertController.create({
      header: 'Info Löschen',
      message: "Bist du sicher, dass du die Info löschen möchtest?",
      buttons: [{
        text: 'Abbrechen',
        role: 'cancel',
        handler: () => {
          return false
        }
      },
        {
          text: 'Löschen',
          role: 'confirm',
          handler: () => {
            return true;
          }
        },
      ],
    });

  }

  // ----------------------------------------------------------------------------------------------

  logoutAlert() {
    return this.alertController.create({
      header: 'Abmelden',
      message: "Bist du sicher, dass du dich abmelden möchtest?",
      buttons: [{
        text: 'Abbrechen',
        role: 'cancel',
        handler: () => {
          return false
        }
      },
        {
          text: 'Abmelden',
          role: 'confirm',
          handler: () => {
            return true;
          }
        },
      ],
    });

  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}

