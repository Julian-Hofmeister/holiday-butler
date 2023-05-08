import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {HeaderComponentModuleModule} from "../shared/header/header.component.module";
import {StartFormComponent} from "./start-form/start-form.component";
import {DevicePreviewComponent} from "./device-preview/device-preview.component";
import {StartPageModule} from "../preview/start/start.module";
import {InfoFormComponent} from "./info-form/info-form.component";
import {Tab1PageModule} from "../tab1/tab1.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        HeaderComponentModuleModule,
        ReactiveFormsModule,
        StartPageModule,
        Tab1PageModule
    ],
  declarations: [HomePage, StartFormComponent, DevicePreviewComponent, InfoFormComponent]
})
export class HomePageModule {}
