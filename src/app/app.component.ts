import {Component, OnDestroy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageEnum} from "./modules/models/language.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  defaultLanguage: LanguageEnum = LanguageEnum.English;
  translateSubscription;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang(LanguageEnum.English);

    if (typeof(Storage) !== "undefined") {
      translate.use(
        localStorage.getItem("sxs-app-language") !== null ?
          localStorage.getItem("sxs-app-language") : this.defaultLanguage);

      localStorage.setItem("sxs-app-language", this.translate.currentLang);
    } else {
      translate.use(this.defaultLanguage);
    }

    this.translateSubscription = translate.onLangChange.subscribe(() => {
      localStorage.setItem("sxs-app-language", this.translate.currentLang);
    });
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }
}
