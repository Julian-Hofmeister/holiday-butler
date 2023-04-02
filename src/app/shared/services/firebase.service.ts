import {Injectable} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {where} from "@angular/fire/firestore";
import firebase from "firebase/compat/app";
import {AngularFireStorage} from "@angular/fire/compat/storage";
// import firebase from "@angular/fire/compat";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////


  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,

  ) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  fetch(path: string): Observable<any[]>  {
    return this.afs.collection(path).snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {

          const data = item.payload.doc.data() as any;
          data.id = item.payload.doc.id;
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
          data.id = item.payload.doc.id;

          return data;
        })
      )
    );

  }

  // ----------------------------------------------------------------------------------------------

  add(path: string, data: any) {
    return this.afs.collection(path).add({...data}).then();
  }

  // ----------------------------------------------------------------------------------------------

  async fetchImage(path: string) {
    return await this.storage
      .ref(path)
      .getDownloadURL()
      .toPromise();
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}

