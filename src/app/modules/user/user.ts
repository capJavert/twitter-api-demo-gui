import {Session} from "./session";
import {Organization} from "./organization";

export class User {
  private _session: Session;

  public username: string;
  public firstname: string;
  public lastname: string;
  public organization: Organization;

  constructor() {

  }

  get session(): Session {
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }

  get isAuth(): boolean {
    return this._session != null;
  }
}
