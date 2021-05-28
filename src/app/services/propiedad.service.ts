import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders,  HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {GLOBAL} from './global';
import {Owned} from '../models/owned';
import {Imagenes} from '../models/images';
import { identifierModuleUrl } from '@angular/compiler';
import { ContactOwnedComponent } from '../components/admin/dashboard/contact-owned/contact-owned.component';

@Injectable()
export class PropiedadService{
    public url: string;


    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    getOwned(): Observable<any>{
        return this._http.get(this.url+'/owned/search');
    }

    deleteOwned(id): Observable<any>{
        return this._http.get(this.url+'/owned/delete/'+id);
    }

    addPropiedad(propiedad:Owned):Observable<any> {
        return this._http.post(this.url+'/owned/add', propiedad);
    }

    editPropiedad(id, propiedad: Owned):Observable<any> {
        return this._http.post(this.url+'/owned/update/'+id, propiedad);
    }

    getPropiedad(id): Observable<any>{
        return this._http.get(this.url+'/owned/search/'+id);
    }

    makeFileRequest(File): Observable<any>{
        const fd= new FormData();
        for(let i=0; i<File.length; i++){
            fd.append('uploads1[]',File[i], File[i].name);
        }
        
        return this._http.post(this.url+'/owned/images',fd);
    }

    addimagenes(imagen:Imagenes):Observable<any> {
        return this._http.post(this.url+'/images/add', imagen);
    }

    deleteImagenes(id): Observable<any>{
        return this._http.get(this.url+'/images/delete/'+id);
    }

    listarimagenes(id):Observable<any> {
        return this._http.get(this.url+'/images/owned/search/'+id);
    }
}
