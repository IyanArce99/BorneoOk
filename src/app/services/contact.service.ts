import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders,  HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {GLOBAL} from './global';
import {Contact} from '../models/contact';

@Injectable()
export class ContactService{
    public url: string;

    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    getContact(): Observable<any>{
        return this._http.get(this.url+'/contact/search');
    }

    getContactOld(): Observable<any>{
        return this._http.get(this.url+'/contact/searchOld');
    }

    deleteContact(id){
        return this._http.get(this.url+'/contact/delete/'+id);
    }

    addContact(contacto:Contact):Observable<any>{
        return this._http.post(this.url+'/contact/add', contacto);
    }
}