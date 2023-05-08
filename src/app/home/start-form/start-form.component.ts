import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, ToastController} from "@ionic/angular";
import {FirebaseService} from "../../shared/services/firebase.service";
import {House} from "../../preview/shared/models/house.model";
import {Item} from "../../preview/shared/models/item.model";
import {combineLatest, debounceTime, Observable, startWith, Subscription} from 'rxjs';
import {map} from "rxjs/operators";
import {AlertService} from "../../shared/services/alert.service";
import {ToastService} from "../../shared/services/toast.service";
import {HouseService} from "../../shared/services/house.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-start-form',
  templateUrl: './start-form.component.html',
  styleUrls: ['./start-form.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
    ]),
  ],
})
export class StartFormComponent  implements OnInit {

  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Output() newItemEvent = new EventEmitter<Item>();

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  homePageForm: FormGroup;
  selectedFile: ImageSnippet;
  cleanFile: ImageSnippet;
  house: House;
  items: Item[] = [];
  primaryItems: Item[] = [];
  backgroundImageRefCopy: string;
  user = JSON.parse(localStorage.getItem('user')!);

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private houseSubscription: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private toastController: ToastController,
    private fsService: FirebaseService,
    private alertController: AlertController,
    private alertService: AlertService,
    private toastService: ToastService,
    private houseService: HouseService,

  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.homePageForm = new FormGroup({
      pageTitle: new FormControl( null ),
      pageSubtitle: new FormControl( null),
      backgroundImage: new FormControl(null),
      welcomeMessage: new FormControl( null),
    });

    this.loadHouse();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  async submit() {
    let house: House = this.homePageForm.value;
    console.log(house)

    if (this.backgroundImageRefCopy) {
      this.fsService.deleteImage(this.backgroundImageRefCopy);
    }

    if (this.selectedFile) {
      house.backgroundImage = '/' + this.user.uid + '/backgroundImage' + Date.now().toString();
      house.backgroundImageRef = '/' + this.user.uid + '/backgroundImage' + Date.now().toString();
      await this.fsService.uploadImage(this.selectedFile.file, house.backgroundImage);
    }

    if(!this.house._id) {
      await this.fsService.add('/houses/' + this.user.uid, house);
    } else {
      this.fsService.update('/houses/' + this.user.uid, house);
    }

    this.selectedFile = this.cleanFile
    this.homePageForm.reset();
    this.homePageForm.markAsPristine();
  }

  // ----------------------------------------------------------------------------------------------

  openInfoForm(info?: Item) {
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    if(this.house.backgroundImageRef) {
     this.backgroundImageRefCopy = this.house.backgroundImageRef
    }

    reader.addEventListener('load', (event: any) => {
      if (file.size < 1833906) {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.homePageForm.value.backgroundImage = new ImageSnippet(event.target.result, file);
      } else {
        this.toastService.presentToast('Die Datei ist zu groß. (' +
          file.name +
          'kb)\nDie maximale Dateigröße liegt bei 1,8 MB.').then();
      }
    });
    reader.readAsDataURL(file);
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private initializeForm() {
    if(!this.house) {return}
    this.homePageForm = new FormGroup({
      pageTitle: new FormControl(this.house.pageTitle ?? null ),
      pageSubtitle: new FormControl(this.house.pageSubtitle ?? null),
      backgroundImage: new FormControl(this.house.backgroundImage ?? null),
      welcomeMessage: new FormControl(this.house.welcomeMessage ?? null),
    });
  }

  // ----------------------------------------------------------------------------------------------

  private checkFormDirty(info: Item){
    if (this.homePageForm.dirty) {
      this.alertService.unsavedChangesAlert().then((alert) => {
        alert.present().then();

        alert.onDidDismiss().then((data) => {
          if(data.role === 'confirm') {
            this.submit();
          }
          this.newItemEvent.emit(info);
        })
      })
    } else {
      this.newItemEvent.emit(info);
    }
  }

  // ----------------------------------------------------------------------------------------------

   loadHouse() {
      this.houseService.loadHouse();

      this.houseSubscription = this.houseService.houseChange.subscribe(data => {
        this.house = data;
         console.log(this.house)

        this.initializeForm();
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
