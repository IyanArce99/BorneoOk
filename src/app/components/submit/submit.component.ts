import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ContactOwnedService} from '../../services/contactOwned.service';
import {Contact} from '../../models/contact';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

var moment = require('moment');
var current_timestamp = moment().format("YYYY/MM/DD hh:mm:ss");

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
  providers: [ContactOwnedService]
})
export class SubmitComponent {
  public contacto: Contact;

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
    private _contactService: ContactOwnedService, private fb: FormBuilder) { 
  }

  onSubmit(){
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
