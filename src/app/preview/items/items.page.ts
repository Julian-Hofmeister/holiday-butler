import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FirebaseService} from "../shared/services/firebase.service";
import {Item} from "../shared/models/item.model";
import {Observable} from "rxjs";
import {ItemReorderEventDetail, NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {SelectItemService} from "../../tab1/tab1-form/select-item.service";
import {DisableRightClickService} from "../shared/services/disable-right-click.service";

@Component({
  selector: 'app-items',
  templateUrl: 'items.page.html',
  styleUrls: ['items.page.scss']
})
export class ItemsPage implements OnInit{

  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////
  @Input() tab: string;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  items: Item[] = [];


  searchTerm: string;

  preFilteredItems: Item[] = [];
  filteredTitleItems: Item[];
  filteredDescriptionItems: Item[];
  user = JSON.parse(localStorage.getItem('user')!);

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private fsService: FirebaseService,
    private selectItemService: SelectItemService,
    private rightClickDisable: DisableRightClickService,
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.rightClickDisable.disableRightClick();
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
    this.fsService.fetch('/houses/' + this.user.uid + '/items').subscribe(data => {
      if(!data) {return};

      this.items = [];
      this.preFilteredItems = []

      this.items = data;
      for (const item of data) {
        if(item.kind !== "primary" && item.page === this.tab) {
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

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  /// MASTER CODE ///

  selectItem(item: Item) {

    console.log(item)
    const clonedItem =JSON.parse(JSON.stringify(item))

    this.selectItemService.onSelectItem(clonedItem);
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
