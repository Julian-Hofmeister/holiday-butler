import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "./authentication/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService, private authService: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.autoSignIn();

    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
}
