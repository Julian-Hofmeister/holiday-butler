import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../preview/shared/models/item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {House} from "../../preview/shared/models/house.model";
import {AlertController, ToastController} from "@ionic/angular";
import {FirebaseService} from "../../shared/services/firebase.service";
import {AlertService} from "../../shared/services/alert.service";
import {HouseService} from "../../shared/services/house.service";
import {SelectItemService} from "../../tab1/tab1-form/select-item.service";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
    ]),
  ],
})
export class InfoFormComponent  implements OnInit {

//#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////
  @Input() info: Item;
  @Input() house: House;
  @Output() newItemEvent = new EventEmitter<Item | null>();

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  infoPageForm: FormGroup;
  primaryItems: Item[] = [];
  dirtyInfoRows = false;
  cleanInfo: Item = {
    _id: '',
    title: '',
    description: '',
    kind: '',
    page: '',
    infoRows: [{name: '', content: ''}]
  }

  user = JSON.parse(localStorage.getItem('user')!);

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private toastController: ToastController,
    private fsService: FirebaseService,
    private alertController: AlertController,
    private alertService: AlertService,
    private houseService: HouseService,

    private selectItemService: SelectItemService

  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.infoPageForm = new FormGroup({
      title: new FormControl( null, Validators.required ),
      description: new FormControl( null),
      infoRows: new FormControl(null),
      apartments: new FormControl( null),
    });

    this.initializeForm();
    this.listenItemChange();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  submit() {
    let info: Item = {
      ...this.infoPageForm.value,
      infoRows: null,
      kind: 'primary',
      _id: this.info._id,
    }

    for (let infoRow of this.info.infoRows!) {
      if(infoRow.name || infoRow.content) {
        if(info.infoRows){
          info.infoRows.push(infoRow)
        } else {
          info.infoRows = [infoRow];
        }
      }
    }

    if (info._id === '') {
      this.fsService.add('/houses/' + this.user.uid + '/items/' + info._id, info).then(id => {
        this.info._id = id;
      });
    } else {
      this.fsService.update('/houses/' + this.user.uid + '/items/' + info._id, info);
    }

    this.infoPageForm.markAsPristine()
  }

  // ----------------------------------------------------------------------------------------------


  markInfoRowsDirty() {
    this.dirtyInfoRows = true;
  }

  // ----------------------------------------------------------------------------------------------

  back() {
    this.checkFormDirty(null);
    this.houseService.houseChange.next(this.house);
  }

  // ----------------------------------------------------------------------------------------------

  addInfoRow() {
    if(this.info.infoRows) {
      this.info.infoRows.push({name: "", content: ""})
    } else {
      this.info.infoRows = [{name: "", content: ""}]
    }


  }

  // ----------------------------------------------------------------------------------------------

  openInfo(info?: Item) {
    const infoItem: Item = info ? info : {
      _id: '',
      title: '',
      kind: 'primary',
      infoRows: [{ name: '', content: '' }],
      page: 'home'
    }
    this.checkFormDirty(infoItem);
  }

  // ----------------------------------------------------------------------------------------------

  deleteInfo(info: Item) {
    this.alertService.deleteInfoAlert().then((alert) => {
      alert.present().then();

      alert.onDidDismiss().then((data) => {
        if(data.role === 'confirm') {
          this.fsService.delete('/houses/' + this.user.uid + '/items/' + info._id)
          this.emitValue(null);
        }
      })
    })
  }

  // ----------------------------------------------------------------------------------------------

  discardChanges() {
    this.infoPageForm.reset();
    this.info = this.cleanInfo;
    this.infoPageForm.markAsPristine();
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private checkFormDirty(info: Item | null){
    if (this.infoPageForm.dirty || this.dirtyInfoRows) {
      this.alertService.unsavedChangesAlert().then((alert) => {
        alert.present().then();

        alert.onDidDismiss().then((data) => {
            if(data.role === 'confirm') {
              this.submit()
            }
            if(data.role === 'cancel') {
              this.emitValue(info);
            }
        })
      });
    } else {
      this.emitValue(info);
    }
  }

  // ----------------------------------------------------------------------------------------------

  private initializeForm() {
    this.infoPageForm = new FormGroup({
      _id: new FormControl(this.info._id ?? null ),
      title: new FormControl(this.info.title ?? null ),
      description: new FormControl(this.info.description ?? null),
      infoRows: new FormControl(this.info.infoRows ?? null),
      apartments: new FormControl(this.info.apartments ?? null)
    });

    const infoRows = this.info.infoRows;

    if(infoRows) {
      if(infoRows[infoRows.length -1].name || infoRows[infoRows.length -1].content ) {
        this.addInfoRow();
      }
    } else {
      this.addInfoRow();
    }
  }

  // ----------------------------------------------------------------------------------------------

  private emitValue(info: Item | null) {
    this.dirtyInfoRows = false;
    this.newItemEvent.emit(info);
    if(info) {
      this.info = info;
    }
    this.initializeForm();
  }

  // ----------------------------------------------------------------------------------------------

  private listenItemChange() {
    this.selectItemService.selectedItemChange.subscribe((value) => {
      console.log(value);


      this.info = value;

      this.initializeForm();
    })
  }

  //#endregion
}
