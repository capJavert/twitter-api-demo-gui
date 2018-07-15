import { Component, } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent {

  constructor(private _location: Location) {}

  goBack() {
    this._location.back();
  }
}
