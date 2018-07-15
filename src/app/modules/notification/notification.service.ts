
import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
import {ConditionsUtil} from "../utils/ConditionsUtil";
import {AppNotification} from "./app.notification";

@Injectable()
export class NotificationService {
  private _notificationRef = null;
  private notificationStack: Array<AppNotification> = [];

  constructor(private _snackBar: MatSnackBar, private _translate: TranslateService) {}

  show(message: string, params?, action: string = "MAIN.CLOSE", duration: number = 3000) {
    if (this._notificationRef == null) {
      this._translate.get([action, message], params).subscribe((translations: any) => {
        this._notificationRef = this._snackBar.open(translations[message], translations[action], {
          duration: duration,
        });

        this._notificationRef.afterDismissed().subscribe(() => {
          this.dismiss();

          if (this.notificationStack.length > 0) {
            let notification = this.notificationStack.pop();

            this.show(notification.message, notification.params, notification.action, notification.duration);
          }
        });
      });
    } else {
      let notification = new AppNotification(
        message,
        params,
        action,
        duration
      );

      if (!this.notificationExists(notification)) {
        this.notificationStack.unshift(notification);
      }
    }
  }

  dismiss() {
    if (ConditionsUtil.isNotNullNorEmpty(this._notificationRef)) {
      this._notificationRef.dismiss();
      this._notificationRef = null;
    }
  }

  private notificationExists(lhs: AppNotification): boolean {
    for (let rhs of this.notificationStack) {
      if (lhs.message === rhs.message && lhs.action === rhs.action) {
        return true;
      }
    }

    return false;
  }
}
