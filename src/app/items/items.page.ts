import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from "../shared/services/firebase.service";
import {Item} from "../shared/models/item.model";
import {Observable} from "rxjs";
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: 'items.page.html',
  styleUrls: ['items.page.scss']
})
export class ItemsPage implements OnInit{

  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  items: Item[] = [];

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  searchTerm: string;

  preFilteredItems: Item[] = [];
  filteredTitleItems: Item[];
  filteredDescriptionItems: Item[];

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private fsService: FirebaseService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadItems();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  private loadItems() {
    this.fsService.fetch('/houses/CLQfxrbDnRlUQlZWiRwT/items').subscribe(data => {
      if(!data) {return};

      this.items = data;
      for (const item of data) {
        if(item.kind !== "primary") {
          this.preFilteredItems.push(item)
        }
      }
    })
  }

  // ----------------------------------------------------------------------------------------------

  async filterList(evt: any) {
    this.searchTerm = evt.srcElement.value;

    if (!this.searchTerm) {return;}

    this.filteredTitleItems = this.items.filter((currentItem) => {
      if (currentItem.title && this.searchTerm) {
        return (
          currentItem.title.toLowerCase()
            .indexOf(this.searchTerm.toLowerCase()) > -1
        );
      }
    });

    this.filteredDescriptionItems = this.items.filter((currentItem) => {
      if (!this.filteredTitleItems.includes(currentItem)) {
        if (currentItem.description && this.searchTerm) {
          return (
            currentItem.description.toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1
          );
        }
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
