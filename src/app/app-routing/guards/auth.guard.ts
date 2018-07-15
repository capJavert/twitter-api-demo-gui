import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserInstance} from "../../modules/user/user.instance";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Auth users");

    if (UserInstance.isAuth) {
      return true;
    } else {
      this.router.navigate([""]).then();
    }

    return false;
  }
}
