import { Component, OnInit, ViewChild,  TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {PropiedadService} from '../../services/propiedad.service';
import {Owned} from '../../models/owned';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl } from "@angular/forms";
import { Imagenes } from 'src/app/models/images';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [PropiedadService]
})
export class InicioComponent implements OnInit {
  public propiedades:Array<Owned>;
  public propiedadesFiltradas:Array<Owned>=[];
  public selected: FormControl = new FormControl(null);
  public opc: any;
  public ciudad;
  public page:number=1;
  public contador;
  public contadorOviedo=0;
  public contadorSevilla=0;
  public contadorValencia=0;
  public contadorMalaga=0;
  public contadorBilbao=0;
  public contadorMadrid=0;
  public images:Array<Imagenes>;
  public imagenesFiltradas:Array<Imagenes>=[];
  public id;
  public contadorImagenes=0;
  public urlImage;

  constructor(private toastr: ToastrService, private _route:ActivatedRoute,private _router:Router, 
    private _propiedadService: PropiedadService, private modal: NgbModal, config: NgbCarouselConfig) {
    config.interval = 4000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  search() {
    this._router.navigate(['/view/list',this.opc]);
  }

  buscar(){
    this._router.navigate(['/view/list',"Madrid"]);
  }

  buscarBilbao(){
    this._router.navigate(['/view/list',"Bilbao"]);
  }

  buscarOviedo(){
    this._router.navigate(['/view/list',"Oviedo"]);
  }

  buscarMalaga(){
    this._router.navigate(['/view/list',"Malaga"]);
  }

  buscarValencia(){
    this._router.navigate(['/view/list',"Valencia"]);
  }

  buscarSevilla(){
    this._router.navigate(['/view/list',"Sevilla"]);
  }

  Opciones(opc1) {
    this.opc=opc1;
  }

  getOwned(){
    this.contador=0;
    this._propiedadService.getOwned().subscribe(
        result => {
          this.propiedades=result;
          this.propiedades.forEach(element =>{
            if(element.ciudad=="Oviedo"){
              this.contadorOviedo++;
            }else if(element.ciudad=="Sevilla"){
              this.contadorSevilla++;
            }else if(element.ciudad=="Valencia"){
              this.contadorValencia++;
            }else if(element.ciudad=="Malaga"){
              this.contadorMalaga++;
            }else if(element.ciudad=="Bilbao"){
              this.contadorBilbao++;
            }else if(element.ciudad=="Madrid"){
              this.contadorMadrid++;
            }

            if(this.contador<3){
              this.id=element.id;
              this.propiedadesFiltradas[this.contador]=element;
              this.listarImagenes(this.id);
            }
            this.contador++;
          });
        },
        error => {
            console.log(<any>error);
        }
    );
  }

  listarImagenes(id){
    var imgurl;
    this.contadorImagenes=0;
    this._propiedadService.listarimagenes(id).subscribe(
      response => {
        this.images = response;
        if(this.images.length==0){
          imgurl="";
          console.log("contadorFuera: ",this.contadorImagenes);
        }else{
          this.images.forEach(element => {
            element.imagen=element.imagen.slice(2,-2);
            if(this.contadorImagenes==0){
              imgurl=element.imagen;
              this.imgSelected(imgurl);
            }
            console.log("contadorDentro: ",this.contadorImagenes);
            this.contadorImagenes++;
          });
        }
      }, error => {
        console.log(<any>error);
      }
    ); 
  }

  imgSelected(imgurl){
    this.urlImage=imgurl;
    console.log(this.urlImage);
    return this.urlImage;
  }

  ngOnInit(): void {
    this.selected.valueChanges.subscribe(changes => {
      this.Opciones(changes);
    });
    this.getOwned();
  }


}
