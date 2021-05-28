import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { GLOBAL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url:string;

  constructor(public _http:HttpClient) {
    this.url=GLOBAL.url;
  }

  getUsuarios(): Observable<any>{
    return this._http.get(this.url+'/login/search');    
  }
}