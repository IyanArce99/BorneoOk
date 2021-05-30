import { Component, OnInit, ViewChild, TemplateRef, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PropiedadService } from '../../../services/propiedad.service';
import { Owned } from '../../../models/owned';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from "@angular/forms";
import { Imagenes } from '../../../models/images';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [PropiedadService]
})
export class ListComponent implements OnInit {

  public propiedades: Array<Owned>;
  public propiedadesFiltradas: Array<Owned> = [];
  public selected: FormControl = new FormControl(null);
  public opc: any;
  public comunidad;
  public page: number = 1;
  public mostrarTextoEntero = false;
  public arrayBooleanos: Array<Boolean> = [];
  public arrayComprobador: Array<number> = [];
  public contador: number = 0;
  public contadorComprobador = 0;
  public ciudad: string;
  public id;
  
  public lat: number;
  public lng: number;
  public zoom: number;
  public mapTypeId: string;
  public markers: any[];
  public images: Array<Imagenes>;
  map: google.maps.Map;
  mapClickListener: google.maps.MapsEventListener;
  styles = [
    {
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
            { visibility: "off" }
      ]
    },
    {
      "featureType": "landscape",
      "stylers": [
        { "visibility": "off" }
      ]
    }
  ];
  constructor(private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router,
    private _propiedadService: PropiedadService, private modal: NgbModal, private zone: NgZone) {
    this.lat = 40.4167;
    this.lng = -3.70325;
    this.zoom = 15;
    this.markers;
    this.mapTypeId = 'roadmap';
  }

  //en este metodo la variable opc cambia con lo seleccionado en el select
  Opciones(opc1) {
    this.opc = opc1;
  }

  
  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
        // this.markers.push(marker)
        //console.log(e.latLng.lat(), e.latLng.lng());
      });
    });
  }
  public ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }
  search() {
    //METODO PARA BUSCAR
    this.ciudad = this._route.snapshot.params['ciudad'];
    this.contador = 0;
    this.contadorComprobador = 0;
    this.propiedadesFiltradas = [];
    this.arrayComprobador = [];

    //recogemos los check para guardarlos en un array
    var oficinas = <HTMLInputElement>document.getElementById("check-a");
    var fijos = <HTMLInputElement>document.getElementById("check-b");
    var flexibles = <HTMLInputElement>document.getElementById("check-c");
    var reuniones = <HTMLInputElement>document.getElementById("check-d");

    this.arrayBooleanos[0] = oficinas.checked;
    this.arrayBooleanos[1] = fijos.checked;
    this.arrayBooleanos[2] = flexibles.checked;
    this.arrayBooleanos[3] = reuniones.checked;

    //recorremos el array y le pasamos la posicion del check a otro array
    for (var i = 0; i < 4; i++) {
      if (this.arrayBooleanos[i] == true) {
        this.arrayComprobador[this.contadorComprobador] = i;
        this.contadorComprobador++;
      }
    }
    this.contadorComprobador = 0;

    //recorremos todas las propiedades en un forEach para filtrar las que queremos
    this.propiedades.forEach(element => {
      //si el array anterior está vacío quiere decir que no hay ningún check por lo que solo mostramos el filtrado por ciudad y barrio
      if (this.arrayComprobador.length == 0) {
        //si la opcion es distinta de null (elegido para el select TODOS) entonces filtramos por barrio en caso de ser null solo por ciudad
        if (this.opc != "null") {
          if (element.barrio == this.opc && element.ciudad == this.ciudad) {
            this.propiedadesFiltradas[this.contador] = element;
            this.contador++;
          }
        } else {
          if (element.ciudad == this.ciudad) {
            this.propiedadesFiltradas[this.contador] = element;
            this.contador++;
          }
        }
      }
      //en caso de estar el array con algun dato quiere decir que se marco algun check
      //comprobamos los checks marcados y los comparamos con los campos de esa propiedad en concreto
      else {
        for (var j = 0; j < this.arrayComprobador.length; j++) {
          if (this.arrayComprobador[j] == 0) {
            if (this.arrayBooleanos[this.arrayComprobador[j]].toString() == element.oficina_privada) {
              this.contadorComprobador++;
            }
          } if (this.arrayComprobador[j] == 1) {
            if (this.arrayBooleanos[this.arrayComprobador[j]].toString() == element.puesto_fijo) {
              this.contadorComprobador++;
            }
          } if (this.arrayComprobador[j] == 2) {
            if (this.arrayBooleanos[this.arrayComprobador[j]].toString() == element.puesto_flexible) {
              this.contadorComprobador++;
            }
          } if (this.arrayComprobador[j] == 3) {
            if (this.arrayBooleanos[this.arrayComprobador[j]].toString() == element.salas_reuniones) {
              this.contadorComprobador++;
            }
          }
        }

        //por cada check que fuera a su vez un true en la bd se creo un contador que fue sumando
        //ahora comprobamos que ese contador y el array del principio son el mismo numero
        if (this.contadorComprobador == (this.arrayComprobador.length)) {
          //a su vez volvemos a filtrar tanto por ciudad como por barrio en caso de que fuera elegido en el select un barrio
          if (this.opc != "null") {
            if (element.barrio == this.opc && element.ciudad == this.ciudad) {
              this.propiedadesFiltradas[this.contador] = element;
              this.contador++;
            }
          } else {
            if (element.ciudad == this.ciudad) {
              this.propiedadesFiltradas[this.contador] = element;
              this.contador++;
            }
          }
        }
        //reiniciamos el contador para usarlo en la siguiente propiedad
        this.contadorComprobador = 0;
      }
    });
    //fin del bucle forEach
  }

  getOwned() {
    //metodo para sacar todas las propiedades las cuales filtramos por ciudad
    //es necesario porque lo llamamos al ngoninit asi cuando se entra a esta pagina por primera vez ya esta imprimiendo las propiedades que queremos
    this._propiedadService.getOwned().subscribe(
      result => {
        this.propiedades = result;
        this.ciudad = this._route.snapshot.params['ciudad'];
        this.propiedades.forEach(element => {
          if (element.ciudad == this.ciudad) {
            this.propiedadesFiltradas = this.propiedades.filter(x => x.ciudad == element.ciudad);
            this.contador++;
          }
        });
        this.setMarkers();
        // Nos posicionamos en el primer marker      
        this.lat = Number(this.markers[0].position.lat);
        this.lng = Number(this.markers[0].position.lng);
        this.listarImagenes();
      },
      error => {
        console.log(<any>error);
      }
    );


  }

  setMarkers(): void {
    this.markers = this.propiedadesFiltradas.map(prop => {
      if (prop.lat && prop.lng) {
        return {
          position: {
            lat: prop.lat,
            lng: prop.lng
          }
          ,label: ''
        };
      
      }
      return;
    })
  }

  listarImagenes(){
    this.propiedadesFiltradas.forEach(prop => {
      this._propiedadService.listarimagenes(prop.id).subscribe(
        response => {
          let images = response;
          images.forEach(element => {
            element.imagen=element.imagen.slice(2,-2);
          });
          
          prop.imgUrl = images[0] && images[0].imagen ? 'http://borneoflex.es/borneo/uploads/' + images[0].imagen : 'assets/images/view/office3.png';
          
        }, error => {
          console.log(<any>error);
        }
      );
    });

  }

  ngOnInit(): void {
    this.selected.valueChanges.subscribe(changes => {
      this.Opciones(changes);
    });
    this.getOwned();
    //obligamos a que al entrar por primera vez en la pagina el select que se vea por primera vez sea el de todos
    this.opc = "null";
  }
}