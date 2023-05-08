import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HeaderComponent} from "./header.component";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {AccountModalComponent} from "./account-modal/account-modal.component";

@NgModule({
    declarations: [HeaderComponent, AccountModalComponent],
  imports: [CommonModule, IonicModule, RouterLink],
    exports: [HeaderComponent, AccountModalComponent],
})
export class HeaderComponentModuleModule {}
