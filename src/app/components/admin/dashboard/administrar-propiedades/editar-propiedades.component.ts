import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PropiedadService } from '../../../../services/propiedad.service';
import { Owned } from '../../../../models/owned';
import { Imagenes } from 'src/app/models/images';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GeoService, LocationInfo } from 'src/app/services/geo.service';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'app-editar-propiedades',
    templateUrl: './administrar-propiedades.component.html',
    styleUrls: ['./administrar-propiedades.component.scss'],
    providers: [PropiedadService]
})

export class EditarPropiedadesComponent implements OnInit {
    public propiedad: Owned;
    public propiedades: Array<Owned>;
    public filesToUpload: any = [];
    public img: Imagenes;
    public imagenesComprobar: Array<Imagenes>;
    private geoCoder;
    @ViewChild("search") public searchElementRef: ElementRef;
    locationInfo: LocationInfo;

    get nombreNoValido() {
        return this.propertyForm.get("nombre").invalid && this.propertyForm.get("nombre").touched;
    }
    get personasNoValido() {
        return this.propertyForm.get("personas").invalid && this.propertyForm.get("personas").touched;
    }
    get tarifaNoValido() {
        return this.propertyForm.get("tarifa").invalid && this.propertyForm.get("tarifa").touched;
    }
    get barrioNoValido() {
        return this.propertyForm.get("barrio").invalid && this.propertyForm.get("barrio").touched;
    }
    get ciudadNoValido() {
        return this.propertyForm.get("ciudad").invalid && this.propertyForm.get("ciudad").touched;
    }
    get telefonoNoValido() {
        return this.propertyForm.get("telefono").invalid && this.propertyForm.get("telefono").touched;
    }

    ngOnInit(): void {
        this.recogerDato();

        this.mapsApi.load().then(() => {
          this.geoCoder = new google.maps.Geocoder;
          
          const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              const place: google.maps.places.PlaceResult = autocomplete.getPlace();
               //verify result
               if (place.geometry === undefined || place.geometry === null) {
                return;
              }
              let locationInfo: LocationInfo = GeoService.getProvince(place.formatted_address);
              locationInfo.lat = place.geometry.location.lat();
              locationInfo.lng = place.geometry.location.lng();
              this.locationInfo = locationInfo;
            });
          });
        });
      }

    propertyForm = new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñÑ]{3,50}$")]),
        descripcion: new FormControl(''),
        personas: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,50}$")]),
        access: new FormControl(false),
        salas_reuniones: new FormControl(false),
        reception: new FormControl(false),
        eventos_network: new FormControl(false),
        terraza: new FormControl(false),
        cafe_relax: new FormControl(false),
        seguridad: new FormControl(false),
        limpieza: new FormControl(false),
        cer_energetica: new FormControl(false),
        paqueteria: new FormControl(false),
        parking: new FormControl(false),
        wifi: new FormControl(false),
        coworking: new FormControl(false),
        oficina_privada: new FormControl(false),
        puesto_fijo: new FormControl(false),
        puesto_flexible: new FormControl(false),
        tarifa: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,50}$")]),
        tipo_propiedad: new FormControl(''),
        direccion: new FormControl(''),
        barrio: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z0-9\\s]{1,70}$")]),
        ciudad: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{1,50}$")]),
        comunidad_autonoma: new FormControl(''),
        telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9}$")]),
    });

    constructor(private _route: ActivatedRoute, private _router: Router, private _propiedadService: PropiedadService,
        private fb: FormBuilder, private mapsApi: MapsAPILoader, private ngZone: NgZone) {
    }

    recogerDato() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._propiedadService.getPropiedad(id).subscribe(
                response => {
                    this.propiedad = response;

                    for (let i in this.propiedad) {
                        this.propertyForm.get('nombre').setValue(this.propiedad[i].nombre);
                        this.propertyForm.get('descripcion').setValue(this.propiedad[i].descripcion);
                        this.propertyForm.get('personas').setValue(this.propiedad[i].personas);

                        if (this.propiedad[i].access == "true") {
                            this.propertyForm.get('access').setValue(true);
                        } else {
                            this.propertyForm.get('access').setValue(false);
                        }
                        if (this.propiedad[i].salas_reuniones == "true") {
                            this.propertyForm.get('salas_reuniones').setValue(true);
                        } else {
                            this.propertyForm.get('salas_reuniones').setValue(false);
                        }
                        if (this.propiedad[i].reception == "true") {
                            this.propertyForm.get('reception').setValue(true);
                        } else {
                            this.propertyForm.get('reception').setValue(false);
                        }
                        if (this.propiedad[i].eventos_network == "true") {
                            this.propertyForm.get('eventos_network').setValue(true);
                        } else {
                            this.propertyForm.get('eventos_network').setValue(false);
                        }
                        if (this.propiedad[i].terraza == "true") {
                            this.propertyForm.get('terraza').setValue(true);
                        } else {
                            this.propertyForm.get('terraza').setValue(false);
                        }
                        if (this.propiedad[i].cafe_relax == "true") {
                            this.propertyForm.get('cafe_relax').setValue(true);
                        } else {
                            this.propertyForm.get('cafe_relax').setValue(false);
                        }
                        if (this.propiedad[i].seguridad == "true") {
                            this.propertyForm.get('seguridad').setValue(true);
                        } else {
                            this.propertyForm.get('seguridad').setValue(false);
                        }
                        if (this.propiedad[i].limpieza == "true") {
                            this.propertyForm.get('limpieza').setValue(true);
                        } else {
                            this.propertyForm.get('limpieza').setValue(false);
                        }
                        if (this.propiedad[i].cer_energetica == "true") {
                            this.propertyForm.get('cer_energetica').setValue(true);
                        } else {
                            this.propertyForm.get('cer_energetica').setValue(false);
                        }
                        if (this.propiedad[i].paqueteria == "true") {
                            this.propertyForm.get('paqueteria').setValue(true);
                        } else {
                            this.propertyForm.get('paqueteria').setValue(false);
                        }
                        if (this.propiedad[i].parking == "true") {
                            this.propertyForm.get('parking').setValue(true);
                        } else {
                            this.propertyForm.get('parking').setValue(false);
                        }
                        if (this.propiedad[i].wifi == "true") {
                            this.propertyForm.get('wifi').setValue(true);
                        } else {
                            this.propertyForm.get('wifi').setValue(false);
                        }
                        if (this.propiedad[i].coworking == "true") {
                            this.propertyForm.get('coworking').setValue(true);
                        } else {
                            this.propertyForm.get('coworking').setValue(false);
                        }
                        if (this.propiedad[i].oficina_privada == "true") {
                            this.propertyForm.get('oficina_privada').setValue(true);
                        } else {
                            this.propertyForm.get('oficina_privada').setValue(false);
                        }
                        if (this.propiedad[i].puesto_fijo == "true") {
                            this.propertyForm.get('puesto_fijo').setValue(true);
                        } else {
                            this.propertyForm.get('puesto_fijo').setValue(false);
                        }
                        if (this.propiedad[i].puesto_flexible == "true") {
                            this.propertyForm.get('puesto_flexible').setValue(true);
                        } else {
                            this.propertyForm.get('puesto_flexible').setValue(false);
                        }

                        this.propertyForm.get('tarifa').setValue(this.propiedad[i].tarifa);
                        this.propertyForm.get('tipo_propiedad').setValue(this.propiedad[i].tipo_propiedad);
                        this.propertyForm.get('direccion').setValue(this.propiedad[i].direccion);
                        this.propertyForm.get('barrio').setValue(this.propiedad[i].barrio);
                        this.propertyForm.get('ciudad').setValue(this.propiedad[i].ciudad);
                        this.propertyForm.get('comunidad_autonoma').setValue(this.propiedad[i].comunidad_autonoma);
                        this.propertyForm.get('telefono').setValue(this.propiedad[i].telefono);
                        if (this.propiedad[i].lat){
                           this.propertyForm.value.lat = this.propiedad[i].lat; 
                        }
                        if (this.propiedad[i].lng){
                            this.propertyForm.value.lng = this.propiedad[i].lng; 
                         }                        
                    }
                }, error => {
                    console.log(<any>error);
                }
            );
        });
    }

    onSubmit() {
        if (this.filesToUpload.length > 0) {
            this._propiedadService.makeFileRequest(this.filesToUpload).subscribe(
                result => {
                    this.filesToUpload = result;
                    this.modificarDato();

                }, error => {
                    console.log(error);
                }
            )
        } else {
            this.modificarDato();
        }
    }

    modificarDato() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            if (this.propertyForm.get('access').value == true) {
                this.propertyForm.get('access').setValue("true");
            } else {
                this.propertyForm.get('access').setValue("false");
            }

            if (this.propertyForm.get('salas_reuniones').value == true) {
                this.propertyForm.get('salas_reuniones').setValue("true");
            } else {
                this.propertyForm.get('salas_reuniones').setValue("false");
            }

            if (this.propertyForm.get('reception').value == true) {
                this.propertyForm.get('reception').setValue("true");
            } else {
                this.propertyForm.get('reception').setValue("false");
            }

            if (this.propertyForm.get('eventos_network').value == true) {
                this.propertyForm.get('eventos_network').setValue("true");
            } else {
                this.propertyForm.get('eventos_network').setValue("false");
            }

            if (this.propertyForm.get('terraza').value == true) {
                this.propertyForm.get('terraza').setValue("true");
            } else {
                this.propertyForm.get('terraza').setValue("false");
            }

            if (this.propertyForm.get('cafe_relax').value == true) {
                this.propertyForm.get('cafe_relax').setValue("true");
            } else {
                this.propertyForm.get('cafe_relax').setValue("false");
            }

            if (this.propertyForm.get('seguridad').value == true) {
                this.propertyForm.get('seguridad').setValue("true");
            } else {
                this.propertyForm.get('seguridad').setValue("false");
            }

            if (this.propertyForm.get('limpieza').value == true) {
                this.propertyForm.get('limpieza').setValue("true");
            } else {
                this.propertyForm.get('limpieza').setValue("false");
            }
            if (this.propertyForm.get('cer_energetica').value == true) {
                this.propertyForm.get('cer_energetica').setValue("true");
            } else {
                this.propertyForm.get('cer_energetica').setValue("false");
            }
            if (this.propertyForm.get('paqueteria').value == true) {
                this.propertyForm.get('paqueteria').setValue("true");
            } else {
                this.propertyForm.get('paqueteria').setValue("false");
            }
            if (this.propertyForm.get('parking').value == true) {
                this.propertyForm.get('parking').setValue("true");
            } else {
                this.propertyForm.get('parking').setValue("false");
            }
            if (this.propertyForm.get('wifi').value == true) {
                this.propertyForm.get('wifi').setValue("true");
            } else {
                this.propertyForm.get('wifi').setValue("false");
            }
            if (this.propertyForm.get('coworking').value == true) {
                this.propertyForm.get('coworking').setValue("true");
            } else {
                this.propertyForm.get('coworking').setValue("false");
            }
            if (this.propertyForm.get('oficina_privada').value == true) {
                this.propertyForm.get('oficina_privada').setValue("true");
            } else {
                this.propertyForm.get('oficina_privada').setValue("false");
            }
            if (this.propertyForm.get('puesto_fijo').value == true) {
                this.propertyForm.get('puesto_fijo').setValue("true");
            } else {
                this.propertyForm.get('puesto_fijo').setValue("false");
            }
            if (this.propertyForm.get('puesto_flexible').value == true) {
                this.propertyForm.get('puesto_flexible').setValue("true");
            } else {
                this.propertyForm.get('puesto_flexible').setValue("false");
            }

            if (this.locationInfo && this.locationInfo.lat) {
                this.propertyForm.value.lat = this.locationInfo.lat;
            }
            if (this.locationInfo && this.locationInfo.lng) {
                this.propertyForm.value.lng = this.locationInfo.lng;
            }

            this._propiedadService.editPropiedad(id, this.propertyForm.value).subscribe(
                result => {
                    if (this.filesToUpload.length == 0) {
                        this._router.navigate(['admin/dashboard/listPropertys']);
                    } else {
                        this.listarImagenes();
                    }
                },

                error => {
                    console.log(<any>error);
                }
            );
        });
    }

    listarImagenes() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._propiedadService.listarimagenes(id).subscribe(
                response => {
                    this.imagenesComprobar = response;

                    if (this.imagenesComprobar.length==0) {
                        for (let i = 0; i < this.filesToUpload.length; i++) {
                            var json = JSON.stringify(this.filesToUpload[i]);
                            this.img = new Imagenes(null, json, id);
                            this.guardarImagen();
                        }
                    } else {
                        this.borrarImagen();
                    }
                }, error => {
                    console.log(<any>error);
                }
            );
        });
    }

    guardarImagen() {
        this._propiedadService.addimagenes(this.img).subscribe(
            result => {
                this._router.navigate(['admin/dashboard/listPropertys']);
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    borrarImagen() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._propiedadService.deleteImagenes(id).subscribe(
                result => {
                    for (let i = 0; i < this.filesToUpload.length; i++) {
                        var json = JSON.stringify(this.filesToUpload[i]);
                        this.img = new Imagenes(null, json, id);
                        this.guardarImagen();
                    }
                    this._router.navigate(['admin/dashboard/listPropertys']);
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }

    fileChangeEvent(fileInput: any) {
        for (let i = 0; i < fileInput.target.files.length; i++) {
            this.filesToUpload.push(fileInput.target.files[i]);
        }
    }

}
