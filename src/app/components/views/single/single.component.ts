import { Component, OnInit } from '@angular/core';
import { Owned } from '../../../models/owned';
import { PropiedadService } from '../../../services/propiedad.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Imagenes } from '../../../models/images';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  providers: [PropiedadService]
})


export class SingleComponent implements OnInit {
  public propiedad: Owned;
  public propiedades: Array<Owned>;
  public propiedadesFiltradas: Array<Owned> = [];
  public id;
  public images: Array<Imagenes>;
  public contador=0;

  constructor(private _route: ActivatedRoute, private _router: Router, private _propiedadService: PropiedadService) {
  }

  recogerDato() {
    this._propiedadService.getPropiedad(this.id).subscribe(
      response => {
        this.propiedad = response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  listarImagenes(){
    this._propiedadService.listarimagenes(this.id).subscribe(
      response => {
        this.images = response;
        this.images.forEach(element => {
          element.imagen=element.imagen.slice(2,-2);
        });
      }, error => {
        console.log(<any>error);
      }
    );
  }

  getOwned(){
    this.contador=0;
    this._propiedadService.getOwned().subscribe(
        result => {
          this.propiedades=result;
          this.propiedades.forEach(element =>{

            if(this.contador<3){
              this.propiedadesFiltradas[this.contador]=element;
            }
            this.contador++;
          });
        },
        error => {
            console.log(<any>error);
        }
    );
  }

  ngOnInit() {
    this.id=this._route.snapshot.params['id'];
    this.recogerDato();
    this.listarImagenes();
    this.getOwned();
  }



}
