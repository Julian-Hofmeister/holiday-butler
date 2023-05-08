import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ItemCardComponent } from './item-card.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ItemCardComponent],
  exports: [ItemCardComponent],
})
export class InformationDetailCard {}
