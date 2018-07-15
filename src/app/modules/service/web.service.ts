
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {DataResponse} from "./response";
import {Observable} from "rxjs/Observable";
import {Model} from "../models/model";
import {environment} from "../../../environments/environment";

export abstract class WebService<T> {
  private _base = "http://localhost:3000";
  private _path = "";
  protected serviceBase: string;
  protected servicePath: string;

  constructor(protected http: HttpClient) {
    if (environment.name === "test") {
      this.testMode = true;
    } else {
      this.serviceBase = this.base + this.path;
      this.servicePath = this.serviceBase + this.endpoint;
    }
  }

  get base(): string {
    return this._base;
  }

  get path(): string {
    return this._path;
  }

  abstract get endpoint(): string;
  abstract get primaryKey(): string;

  get(id: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<DataResponse<T>> {
    return this.http.get<DataResponse<T>>(this.servicePath + "/" + id);
  }

  list(options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<DataResponse<Array<T>>> {
    return this.http.get<DataResponse<Array<T>>>(this.servicePath, options);
  }

  create(model: Model, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<DataResponse<T>> {
    return this.http.post<DataResponse<T>>(this.servicePath, model);
  }

  update(model: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<DataResponse<T>> {
    return this.http.put<DataResponse<T>>(this.servicePath + "/" + model[this.primaryKey], model, options);
  }

  remove(model: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.http.delete<DataResponse<any>>(this.servicePath + "/" + model[this.primaryKey], options);
  }

  /**
   * Enable only when performing tests
   * Dont forget to run e2e/test-server.js
   *
   * @param {boolean} value
   */
  set testMode(value: boolean) {
    if (value) {
      this._base = "http://localhost:3200";
      this._path = "";
    } else {
      this._base = "http://devsxs3:8081";
      this._path = "/SxSAdminWS/services/api";
    }

    this.serviceBase = this.base + this.path;
    this.servicePath = this.serviceBase + this.endpoint;
  }
}
