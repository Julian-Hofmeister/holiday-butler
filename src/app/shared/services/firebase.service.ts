import {Injectable} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {where} from "@angular/fire/firestore";
import firebase from "firebase/compat/app";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {ToastController} from "@ionic/angular";
// import firebase from "@angular/fire/compat";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private toastController: ToastController
  ) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  fetch(path: string): Observable<any[]>  {
    return this.afs.collection(path).snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {

          const data = item.payload.doc.data() as any;
          data._id = item.payload.doc.id;
          return data;
        })),
      shareReplay(1)
    );
  }

  // ----------------------------------------------------------------------------------------------

  fetchSingle(path: string, id: string): Observable<any> {
    const docPath = this.afs.collection(path, (ref) =>
      ref.where(firebase.firestore.FieldPath.documentId(), '==', id)
    )

    return docPath.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as any;
          data._id = item.payload.doc.id;

          return data;
        })
      )
    );

  }

  // ----------------------------------------------------------------------------------------------

  add(path: string, data: any) {
    return this.afs.collection(path).add({...data}).then((doc) => {
      return doc.id;
    });
  }

  // ----------------------------------------------------------------------------------------------

  update(path: string, data: any) {
    this.afs.doc(path).update({...data});
  }

  // ----------------------------------------------------------------------------------------------

  delete(path: string) {
    return this.afs.doc(path).delete().then();
  }

  // ----------------------------------------------------------------------------------------------

  async uploadImage(file: File, path: string) {
    await this.storage.ref(path).put(file);
  }

  // ----------------------------------------------------------------------------------------------

  async deleteImage(path: string) {
   await this.storage.ref(path).delete();
  }

  // ----------------------------------------------------------------------------------------------

  async fetchImage(path: string) {
    return await this.storage
      .ref(path)
      .getDownloadURL()
      .toPromise();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}

