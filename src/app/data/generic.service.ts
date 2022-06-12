import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Configuration } from 'src/config/mega.config';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private url: string;

  //http://localhost:9091/api/representantes/list-representante

  constructor(
    private _http: HttpClient,
    private configuration: Configuration
    //@Inject("url") protected url:string
  ) {
    //http://localhost:9091/api
    this.url = this.configuration.api;
  }

  get path() {
    return this.url;
  }

  get http() {
    return this._http;
  }

  one(path: string, id: number): GenericService {
    const restangular = this.clone();
    restangular.url += (path ? '/' + path : '') + '/' + id;
    return restangular;
  }

  //http://localhost:9091/api
  all(path: string): GenericService {
    //representantes
    //list-representante
    const restangular = this.clone();
    restangular.url = restangular.url + '/' + path;
    //http://localhost:9091/api/representantes/list-representante
    return restangular;
  }

  get(): Observable<Response> {
    return this._http.get(this.url).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  post(obj?: any): Observable<Response> {
    return this._http.post(this.url, obj).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  put(obj: any): Observable<Response> {
    const clone = Object.assign({}, obj);
    delete clone['_restangular'];
    return this._http.put(this.url, clone).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  delete(): Observable<Response> {
    return this._http.delete(this.url).pipe(
      map((response) => {
        return response as any;
      }),
      catchError((res) => { return this.onError(res); }));
  }

  clone(): GenericService {
    return new GenericService(this._http, { api: this.url });
  }

  onError(error: any) {
    return throwError(error.message || error);
  }

}
