import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, NavController} from "@ionic/angular";
import {House} from "../shared/models/house.model";
import {Router} from "@angular/router";
import {FirebaseService} from "../shared/services/firebase.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {TranslateService} from "@ngx-translate/core";
import {Item} from "../shared/models/item.model";

@Component({
  selector: 'app-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss']
})
export class StartPage implements OnInit {

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isLoading = true;
  house: House;
  backgroundImage: string;

  items: Item[] = [];
  primaryItems: Item[] = [];

  language: string = this.translateService.currentLang;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  // private houseSub: Subscription;
  //#endregion
  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private fsService: FirebaseService,
    private translateService: TranslateService,
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadHouse();
    this.loadItems();
  }

  ionViewWillEnter() {
    this.language = this.translateService.currentLang;
  }
  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////


  switchLanguage() {
    const lang = this.translateService.currentLang === "en" ? "de" : "en";
    this.translateService.use(lang);
    this.language = this.translateService.currentLang;
  }

  // ----------------------------------------------------------------------------------------------

  // onOpenMaster() {
  //   this.router.navigate(['master']);
  // }

  // ----------------------------------------------------------------------------------------------

  // onOpenBeforeArrivalPage() {
  //   this.router.navigate(['before-arrival']);
  // }

  // ----------------------------------------------------------------------------------------------

  // onOpenBreadOrderPage() {
  //   this.router.navigate(['bread-order']);
  // }

  // ----------------------------------------------------------------------------------------------

  // onOpenReservationPage() {
  //   this.router.navigate(['sauna-reservation']);
  // }

  // ----------------------------------------------------------------------------------------------

  // onOpenFeedbackLink() {
  //   window.location.href = 'https://g.page/r/CcgiqX68TxgkEAg/review';
  // }

  // ----------------------------------------------------------------------------------------------

  // onLogout() {
  //   this.authService.logout();
  //
  //   this.onDismissLogoutModal();
  // }

  // ----------------------------------------------------------------------------------------------

  // onDismissLogoutModal() {
  //   this.logoutModal.dismiss();
  // }

  // ----------------------------------------------------------------------------------------------

  // onOpenAdminPage(userToEdit?: User) {
  //   if (userToEdit) {
  //     this.navCtrl.navigateForward('admin', { state: userToEdit });
  //   } else {
  //     this.router.navigate(['admin']);
  //   }
  // }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private loadHouse() {
    this.fsService.fetchSingle('/houses/', 'CLQfxrbDnRlUQlZWiRwT').subscribe(data => {
      this.house = data[0];
      console.log(this.house);
      this.fsService.fetchImage(this.house.backgroundImage!).then(img => {
        this.backgroundImage = img;
        this.isLoading = false;
      })
    });
  }

  private loadItems() {
    this.fsService.fetch('/houses/CLQfxrbDnRlUQlZWiRwT/items').subscribe(data => {
      if(!data) {return};

      this.items = data;

      for (const item of data) {
        if(item.kind === 'primary') {
          this.primaryItems.push(item)
        }
      }
    })
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

}
