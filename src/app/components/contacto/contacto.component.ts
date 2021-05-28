import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../models/contact';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

var moment = require('moment');
var current_timestamp = moment().format("YYYY/MM/DD hh:mm:ss");

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  providers: [ContactService]
})
export class ContactoComponent{
  public contacto: Contact;

  contactGroup = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}$")]),
    asunto: new FormControl(''),    
    mensaje: new FormControl(''),
    fecha: new FormControl(current_timestamp),
  });

  get emailNoValido() {
    return this.contactGroup.get("email").invalid && this.contactGroup.get("email").touched;
  }

  constructor(private toastr: ToastrService,private _route:ActivatedRoute,private _router:Router, private _contactService: ContactService, 
    private fb: FormBuilder) { 
  }

  onSubmit(){
    this._contactService.addContact(this.contactGroup.value).subscribe(
      result => {
        this.contactGroup.reset();
        this.toastr.success('Mensaje enviado correctamente, Gracias','',{ "positionClass" : "toast-bottom-right"});
      },
      error => {
          console.log(<any>error);
      }
    );
  }
}
