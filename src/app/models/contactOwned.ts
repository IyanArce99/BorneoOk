import { LocationInfo } from "../services/geo.service";

export class ContactOwned{
    constructor(public id:number,public nombre:string,public email:string,public telefono:number, public ciudad:string,
        public tarifas:number, public espacios:string, public fecha_enviado:Date, public lat: number, public lng: number){}
}