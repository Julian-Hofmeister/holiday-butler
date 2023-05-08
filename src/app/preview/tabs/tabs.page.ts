import {Component, OnInit} from '@angular/core';
import {House} from "../shared/models/house.model";
import {Item} from "../shared/models/item.model";
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {FirebaseService} from "../shared/services/firebase.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  house: House;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  // private houseSub: Subscription;
  //#endregion
  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private fsService: FirebaseService,
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadHouse();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private loadHouse() {
    this.fsService.fetchSingle('/houses/', 'CLQfxrbDnRlUQlZWiRwT').subscribe(data => {
      this.house = data[0];

      this.house.tab1 = this.house.tab1 ?? 'Wohnung';
      this.house.tab2 = this.house.tab2 ?? 'Infos';
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

}
