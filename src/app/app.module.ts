import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {HeaderComponentModuleModule} from "./shared/header/header.component.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/json/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({mode: 'ios'}),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }), HeaderComponentModuleModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore())

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
