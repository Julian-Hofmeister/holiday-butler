import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent  implements OnInit {

  @Input() tab: string;
  constructor() { }

  ngOnInit() {}

}
