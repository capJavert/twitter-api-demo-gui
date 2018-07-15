
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
declare const require: any; // quick and dirty just the way i like it

@Injectable()
export class ConfigService {

  constructor() {}

  get appVersion(): Observable<any> {
    try {
      const { version: appVersion } = require("../../../../package.json");

      return new Observable(
        observer => {
          observer.next(appVersion);
        }
      );
    } catch (e) {
      return new Observable(
        observer => {
          observer.next("UNKNOWN");
        }
      );
    }
  }
}
