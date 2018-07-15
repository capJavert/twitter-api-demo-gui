import { Injectable} from '@angular/core';
import {Router} from "@angular/router";

export class AppError {
  title: string;
  originalError: Error;
  stackTrace: Array<string> = [];
}

@Injectable()
export class ErrorService {
  private errors: Array<AppError>;

  constructor(private router: Router) {
    this.errors = [];
  }

  save(error: Error) {
    let appError = new AppError();

    appError.title = error.name + ": " + error.message;
    appError.originalError = error;
    appError.stackTrace = error.stack.split("\n");

    this.errors.push(appError);
    this.router.navigate(['error']);
  }

  get lastError() {
    if (this.errors.length > 0) {
      return this.errors[this.errors.length - 1];
    } else {
      return null;
    }
  }

}
