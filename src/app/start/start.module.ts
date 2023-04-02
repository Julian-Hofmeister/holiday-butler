import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StartPage } from './start.page';

import { StartPageRoutingModule } from './start-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {ApartmentInfoComponent} from "./apartment-info/apartment-info.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StartPageRoutingModule,
    TranslateModule
  ],
  declarations: [StartPage, ApartmentInfoComponent]
})
export class StartPageModule {}
