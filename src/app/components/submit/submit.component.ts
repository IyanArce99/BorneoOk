import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ContactOwnedService} from '../../services/contactOwned.service';
import {Contact} from '../../models/contact';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { GeoService, LocationInfo } from 'src/app/services/geo.service';

var moment = require('moment');
var current_timestamp = moment().format("YYYY/MM/DD hh:mm:ss");

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
  providers: [ContactOwnedService]
})
export class SubmitComponent implements OnInit {
  public contacto: Contact;

  private geoCoder;
  @ViewChild("search") public searchElementRef: ElementRef;
  locationInfo: LocationInfo;
  propertyForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}$")]),
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9}$")]),
    ciudad: new FormControl(''),
    tarifas: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,50}$")]),
    espacios: new FormControl(''),
    fecha_enviado: new FormControl(current_timestamp),
  });

  get emailNoValido() {
    return this.propertyForm.get("email").invalid && this.propertyForm.get("email").touched;
  }
  get telefonoNoValido() {
    return this.propertyForm.get("telefono").invalid && this.propertyForm.get("telefono").touched;
  }
  get tarifasNoValido() {
    return this.propertyForm.get("tarifas").invalid && this.propertyForm.get("tarifas").touched;
  }

  constructor(private toastr: ToastrService,private _route:ActivatedRoute,private _router:Router, 
    private _contactService: ContactOwnedService, private fb: FormBuilder, private mapsApi: MapsAPILoader, private ngZone: NgZone) { 
  }

  ngOnInit(): void {
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
  
  onSubmit(){
    if(this.locationInfo && this.locationInfo.lng && this.locationInfo.lat && this.locationInfo.provincia){
      this.propertyForm.value.lat = this.locationInfo.lat;
      this.propertyForm.value.lng = this.locationInfo.lng;
      this.propertyForm.value.ciudad = this.locationInfo.provincia;
    }
    
    this._contactService.addContactOwned(this.propertyForm.value).subscribe(
      result => {
        this.propertyForm.reset();
        this.toastr.success('Mensaje enviado correctamente, Gracias','',{ "positionClass" : "toast-bottom-right"});
      },
      error => {
          console.log(<any>error);
      }
    );
    
  }

}
