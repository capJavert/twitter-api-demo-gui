import {Component, OnInit} from '@angular/core';
import {AppError, ErrorService} from "../modules/error/error.service";
import {Router} from "@angular/router";
import {LoaderService} from "../modules/loader/loader.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {
  public appError: AppError;

  constructor(private router: Router,
              private errorService: ErrorService,
              private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.stop();

    this.appError = this.errorService.lastError;

    if (this.appError == null) {
      this.router.navigate(['']);
    }
  }
}
