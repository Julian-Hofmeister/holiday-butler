import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Tab2Page } from './tab2.page';
import {HeaderComponentModuleModule} from "../shared/header/header.component.module";
import {Tab2FormComponent} from "./tab2-form/tab2-form.component";
import {Tab2DevicePreviewComponent} from "./tab2-device-preview/tab2-device-preview.component";
import {ItemsPageModule} from "../preview/items/items.module";
import {Tab1PageModule} from "../tab1/tab1.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Tab2PageRoutingModule,
        HeaderComponentModuleModule,
        ItemsPageModule,
        Tab1PageModule
    ],
  declarations: [Tab2Page, Tab2FormComponent, Tab2DevicePreviewComponent]
})
export class Tab2PageModule {}
