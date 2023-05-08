import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../preview/shared/models/item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../shared/services/toast.service";
import {AlertService} from "../../shared/services/alert.service";
import {FirebaseService} from "../../shared/services/firebase.service";
import {SelectItemService} from "./select-item.service";
import {House} from "../../preview/shared/models/house.model";
import {HouseService} from "../../shared/services/house.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-tab1-form',
  templateUrl: './tab1-form.component.html',
  styleUrls: ['./tab1-form.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
    ]),
  ],
})

export class Tab1FormComponent  implements OnInit {

  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() pageTitle: string;

  @Input() tab: string;

  @ViewChild('imageInput') imgInput: ElementRef;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  itemPageForm: FormGroup;
  selectedFile: ImageSnippet;
  imgRefToDelete: string;
  cleanFile: ImageSnippet;
  house: House;
  item: Item = {
    _id: '',
    title: '',
    description: '',
    kind: '',
    page: '',
  }
  cleanItem: Item = {
    _id: '',
    title: '',
    description: '',
    kind: '',
    page: '',
  }
  user = JSON.parse(localStorage.getItem('user')!);


  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private toastService: ToastService,
    private alertService: AlertService,
    private fsService: FirebaseService,
    private selectItemService: SelectItemService,
    private houseService: HouseService,
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

   ngOnInit() {
    this.itemPageForm = new FormGroup({
      _id: new FormControl( null),
      title: new FormControl( null, Validators.required ),
      subtitle: new FormControl( null),
      description: new FormControl( null),
      img: new FormControl( null),
      imgRef: new FormControl( null),
      phoneLink: new  FormControl(null),
      mapsLink: new  FormControl(null),
      websiteLink: new  FormControl(null),
      standOutBtn: new FormControl(null),
      customBtnText: new FormControl(null),
      apartments: new FormControl( null),
      kind: new FormControl( null),
      page: new FormControl( null),
    });

    this.initializeForm();
    this.listenItemChange();
    this.house = this.houseService.getHouse();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  async submit() {

    this.buildItem().then((item) => {
      if (item._id === '' || !item._id) {
        this.fsService.add('/houses/CLQfxrbDnRlUQlZWiRwT/items/', item).then();
      } else {
        this.fsService.update('/houses/CLQfxrbDnRlUQlZWiRwT/items/' + item._id, item);
      }

      this.resetForm();
    });



  }

  // ----------------------------------------------------------------------------------------------

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      if (file.size < 1833906) {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.itemPageForm.controls['img'].setValue(new ImageSnippet(event.target.result, file));
        if(this.itemPageForm.controls['imgRef'].value) {
          this.imgRefToDelete = this.itemPageForm.controls['imgRef'].value;
        }
      } else {
        this.toastService.presentToast('Die Datei ist zu groß. (' +
          file.name +
          'kb)\nDie maximale Dateigröße liegt bei 1,8 MB.').then();
      }
    });
    reader.readAsDataURL(file);
  }

  // ----------------------------------------------------------------------------------------------

  deleteItem() {
    this.alertService.deleteInfoAlert().then((alert) => {
      alert.present().then();

      alert.onDidDismiss().then((data) => {
        if(data.role === 'confirm') {
          if(this.item.imgRef) {
            this.fsService.deleteImage(this.item.imgRef)
          }
          this.fsService.delete('/houses/CLQfxrbDnRlUQlZWiRwT/items/' + this.item._id)

          this.itemPageForm.reset();
        }
      })
    })
  }

  // ----------------------------------------------------------------------------------------------

  discardChanges() {
    this.itemPageForm.reset();
    this.item = this.cleanItem;
    this.itemPageForm.markAsPristine();
    this.selectedFile = this.cleanFile;
  }

  // ----------------------------------------------------------------------------------------------

  clearImg() {
    if(this.itemPageForm.controls['imgRef'].value) {
      this.imgRefToDelete = this.itemPageForm.controls['imgRef'].value;
    }

    this.itemPageForm.patchValue( {img: '', imgRef: ''})
    this.selectedFile = this.cleanFile;
    this.imgInput.nativeElement.value = ""
    this.itemPageForm.markAsDirty();
    this.itemPageForm.markAsTouched();
  }

  // ----------------------------------------------------------------------------------------------

  selectKind(kind: string) {
    this.itemPageForm.patchValue({kind: kind});
    this.itemPageForm.markAsDirty();
    this.itemPageForm.markAsTouched();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private initializeForm() {
      this.itemPageForm = new FormGroup({
        _id: new FormControl(this.item._id ?? null ),
        title: new FormControl(this.item.title ?? null ),
        subtitle: new FormControl(this.item.subtitle ?? null ),
        description: new FormControl(this.item.description ?? null),
        img: new FormControl(this.item.img ?? null),
        imgRef: new FormControl(this.item.imgRef ?? null),
        phoneLink: new  FormControl(this.item.phoneLink ?? null),
        mapsLink: new  FormControl(this.item.mapsLink ?? null),
        websiteLink: new  FormControl(this.item.websiteLink ?? null),
        standOutBtn: new FormControl(this.item.standOutBtn ??null),
        apartments: new FormControl(this.item.apartments ?? null),
        kind: new FormControl( this.item.kind ?? null),
        page: new FormControl(this.tab),
      });
  }

  // ----------------------------------------------------------------------------------------------

  private listenItemChange() {
    this.selectItemService.selectedItemChange.subscribe((value) => {
      this.item = value;
      this.initializeForm();
    })
  }

  // ----------------------------------------------------------------------------------------------

  private async buildItem(): Promise<Item> {
    let item: Item = {
      ...this.itemPageForm.value,
      page: this.tab,
    }

    if(!item.phoneLink && !item.mapsLink && !item.websiteLink) {
      item.standOutBtn = 'undefined';
    }

    if(this.imgRefToDelete) {
      await this.fsService.deleteImage(this.imgRefToDelete);
    }

    if(!item.kind) {
      item.kind = 'bigImg'
    }

    if (this.selectedFile) {
      item.img = '/' + this.user.uid + '/item' + Date.now().toString();
      item.imgRef = '/' + this.user.uid + ' /item' + Date.now().toString();
      await this.fsService.uploadImage(this.selectedFile.file, item.imgRef);
    }

    return item
  }

  // ----------------------------------------------------------------------------------------------

  private resetForm() {
    this.itemPageForm.reset();
    this.item = this.cleanItem;
    this.itemPageForm.markAsPristine();
    this.selectedFile = this.cleanFile;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

}
