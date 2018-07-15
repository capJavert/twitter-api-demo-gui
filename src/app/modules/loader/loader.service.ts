
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoaderService {
  private _isLoading: boolean;
  private loadingSubject: BehaviorSubject<boolean>;
  private _loading$: Observable<boolean>;

  constructor() {
    this._isLoading = false;
    this.loadingSubject = new BehaviorSubject<boolean>(this._isLoading);
    this._loading$ = this.loadingSubject.asObservable();
  }

  start(delay: number = 500) {
    this._isLoading = true;

    new Promise(() => {
      setTimeout(() => {
        this.loadingSubject.next(this._isLoading);
      }, delay);
    }).then();
  }

  stop() {
    this._isLoading = false;

    this.loadingSubject.next(false);
  }

  get loading$(): Observable<boolean> {
    return this._loading$;
  }
}
