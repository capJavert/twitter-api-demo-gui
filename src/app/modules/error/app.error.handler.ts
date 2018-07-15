import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {ErrorService} from "./error.service";


@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private errorService: ErrorService;

  constructor(private injector: Injector) {}

  handleError(error) {
    if (this.errorService == null) {
      this.errorService = this.injector.get(ErrorService);
    }

    console.error(error);
    this.errorService.save(error);
  }

}
