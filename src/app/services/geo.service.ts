import {Injectable} from '@angular/core';
export interface LocationInfo {
    pais: string;
    provincia: string;
    lat?: number;
    lng?: number;
}
@Injectable()
export class GeoService{
    private static urlLocalidad: string = ''
    constructor(){
    }

    static getProvince(addres: string): LocationInfo {
        let arrayAddres: string[] = addres.split(',');
        let lastElement: number = arrayAddres.length - 1;
        let provincia: string = arrayAddres[lastElement - 1];
        let pais: string = arrayAddres[lastElement];

        if (provincia){
            provincia = provincia.replace(/[\d.-]/g, '').trim();
        }

        if (pais){
            pais = pais.replace(/[\d.-]/g, '').trim();
        }
        
        return {
            pais, provincia
        };
    }

    

}