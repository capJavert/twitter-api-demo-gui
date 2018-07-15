import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MatSidenav} from "@angular/material";
import {ConfigService} from "../../modules/config/config.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: TemplateRef<MatSidenav>;

  constructor(private translate: TranslateService,
              private configService: ConfigService) { }

  ngOnInit() {
  }

  get language() {
    return this.translate.currentLang;
  }

  set language(value) {
    this.translate.use(value);
  }

  get appVersion(): Observable<any> {
    return this.configService.appVersion;
  }

}
