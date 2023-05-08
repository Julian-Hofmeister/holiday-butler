import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { Tab1Page } from './tab1.page';
import {HeaderComponentModuleModule} from "../shared/header/header.component.module";
import {Tab1DevicePreviewComponent} from "./tab1-device-preview/tab1-device-preview.component";
import {Tab1FormComponent} from "./tab1-form/tab1-form.component";
import {ItemsPageModule} from "../preview/items/items.module";
import {FooterComponent} from "../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1PageRoutingModule,
    HeaderComponentModuleModule,
    ItemsPageModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    Tab1FormComponent,
    Tab1DevicePreviewComponent
  ],
  declarations: [Tab1Page, Tab1DevicePreviewComponent, Tab1FormComponent, FooterComponent]
})
export class Tab1PageModule {}
