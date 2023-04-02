import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsPage } from './items.page';
import {ItemsPageRoutingModule} from "./items-routing.module";
import {InformationDetailCard} from "./item-card/item-card.module";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ItemsPageRoutingModule,
    InformationDetailCard
  ],
  declarations: [ItemsPage]
})
export class ItemsPageModule {}
