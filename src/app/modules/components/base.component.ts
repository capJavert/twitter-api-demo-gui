
import {NotificationService} from "../notification/notification.service";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {LoaderService} from "../loader/loader.service";
import {MatDialog} from "@angular/material";
import {Router, ActivatedRoute} from "@angular/router";
import {OnDestroy} from "@angular/core";
import {ConditionsUtil} from "../utils/ConditionsUtil";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorResponse} from "../service/error.response";

export abstract class BaseComponent implements OnDestroy {
  routerSubscription;

  constructor(protected notificationService: NotificationService,
              private _hotkeysService: HotkeysService,
              protected loader: LoaderService,
              public dialog: MatDialog,
              protected router: Router,
              protected activatedRoute: ActivatedRoute) {
    this._hotkeysService.add(new Hotkey('ctrl+q', (): boolean => {
      notificationService.dismiss();

      return false;
    }));
  }

  protected static compare(lhs, rhs, isAsc) {
    return (lhs < rhs ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {
    if (ConditionsUtil.isNotNull(this.routerSubscription)) {
      this.routerSubscription.unsubscribe();
    }
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    let errorResponse = Object.assign(new ErrorResponse, httpErrorResponse.error);

    if (!errorResponse.isEmpty) {
      this.notificationService.show(errorResponse.errorMessage + ": " + errorResponse.errorDetails);
    } else {
      this.notificationService.show(httpErrorResponse.message);
    }

    this.loader.stop();
  }

  protected clearParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        page: 1,
      }
    });
  }
}
