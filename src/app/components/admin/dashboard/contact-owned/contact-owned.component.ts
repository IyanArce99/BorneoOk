import { Component, OnInit, ViewChild,  TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ContactOwnedService } from '../../../../services/contactOwned.service';
import { ContactOwned } from '../../../../models/contactOwned';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-owned',
  templateUrl: './contact-owned.component.html',
  styleUrls: ['./contact-owned.component.scss'],
  providers: [ContactOwnedService]
})
export class ContactOwnedComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>
  public contactos: Array<ContactOwned>;
  public idModal;
  public contador;

  constructor(private toastr: ToastrService, private _route: ActivatedRoute, private _router: Router,
    private _contactoService: ContactOwnedService, private modal: NgbModal) { }

  abrirModal(id) {
    this.modal.open(this.modalContent, { size: 'lg' });
    this.idModal = id;
  }

  acceptDelete(id) {
    this._contactoService.deleteContactOwned(id).subscribe(
      response => {
        if(this.contador==1 || this.contador==null){
          this.getContactNuevo();
        }else{
          this.getContactViejo();
        }
      },
      error => {
        console.log(<any>error);
      }
    )
    this.toastr.success('Mensaje eliminado', '', { "positionClass": "toast-bottom-right" });
    this.modal.dismissAll();
  }

  getContactNuevo() {
    this._contactoService.getContactOwnedNuevo().subscribe(
      result => {
        this.contactos = result;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getContactViejo() {
    this._contactoService.getContactOwnedViejo().subscribe(
      result => {
        this.contactos = result;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  cambiar(options:string){
    this.contador=options;
    if(this.contador==1 || this.contador==null){
      this.getContactNuevo();
    }else{
      this.getContactViejo();
    }
  }

  ngOnInit() {
    this.getContactNuevo();
  }
}
