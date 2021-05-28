import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders,  HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {GLOBAL} from './global';
import {ContactOwned} from '../models/contactOwned';

@Injectable()
export class ContactOwnedService{
    public url: string;

    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    getContactOwnedNuevo(): Observable<any>{
        return this._http.get(this.url+'/owned/consulta/search');
    }

    getContactOwnedViejo(): Observable<any>{
        return this._http.get(this.url+'/owned/consulta/searchOld');
    }

    deleteContactOwned(id){
        return this._http.get(this.url+'/owned/consulta/delete/'+id);
    }

    addContactOwned(contacto:ContactOwned):Observable<any>{
        return this._http.post(this.url+'/owned/consulta/add', contacto);
    }
}