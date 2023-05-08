import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsPage } from './items.page';
import {ItemsPageRoutingModule} from "./items-routing.module";
import {InformationDetailCard} from "./item-card/item-card.module";
import {TabBarComponent} from "../../shared/tab-bar/tab-bar.component";


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ItemsPageRoutingModule,
        InformationDetailCard
    ],
  exports: [
    ItemsPage,
    TabBarComponent
  ],
    declarations: [ItemsPage, TabBarComponent]
})
export class ItemsPageModule {}
