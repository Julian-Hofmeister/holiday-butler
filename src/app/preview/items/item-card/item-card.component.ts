import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../shared/models/item.model";
import {FirebaseService} from "../../../shared/services/firebase.service";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////
  @ViewChild('popover') popover: any;

  @Input() item: Item;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  infoRows = [{name: '', content: ''}]
  links = 0;
  isOpen = false;
  user = JSON.parse(localStorage.getItem('user')!);

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private fsService: FirebaseService,
    private alertService: AlertService
  ) {
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    // console.log(this.item.customBtnText)
    if (this.item.description) {
      this.item.description = this.item.description.replace(
        '\\n',
        '\n'
      );
    }

    if(this.item.imgRef) {
      this.fsService.fetchImage(this.item.imgRef).then(img => {
        this.item.img = img;
      })
    }

    if(this.item.infoRows) {
       this.infoRows = this.item.infoRows;
    }

    this.countLinks();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onDeleteItem() {
    this.alertService.deleteInfoAlert().then((alert) => {
      alert.present().then();

      alert.onDidDismiss().then((data) => {
        if(data.role === 'confirm') {
          if(this.item.imgRef) {
            this.fsService.deleteImage(this.item.imgRef)
          }
          this.fsService.delete('/houses/' + this.user.uid + '/items/' + this.item._id)
        }
      })
    })
    this.isOpen = false;
  }

  // ----------------------------------------------------------------------------------------------

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  // ----------------------------------------------------------------------------------------------

  clickBtn()  {
    if(this.item.standOutBtn === 'phone') {
      window.open('tel:'+this.item.phoneLink, '_self')
    } else  if(this.item.standOutBtn === 'maps') {
      window.open(this.item.mapsLink,"_blank")
    } else  if(this.item.standOutBtn === 'website') {
      window.open(this.item.websiteLink,"_blank")
    }
  }

  // ----------------------------------------------------------------------------------------------

  countLinks() {
    if(this.item.phoneLink) {
      this.links = this.links + 1;
    }
    if(this.item.mapsLink) {
      this.links = this.links + 1;

    }
    if(this.item.websiteLink) {
      this.links = this.links + 1;

    }
  }
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
