import { Component, OnInit, ViewChild,  TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {PropiedadService} from '../../../../services/propiedad.service';
import {Owned} from '../../../../models/owned';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-listar-propiedades',
  templateUrl: './listar-propiedades.component.html',
  styleUrls: ['./listar-propiedades.component.scss'],
  providers: [PropiedadService]
})
export class ListarPropiedadesComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public propiedades:Array<Owned>;
  public idModal;

  constructor(private toastr: ToastrService, private _route:ActivatedRoute,private _router:Router, 
    private _propiedadService: PropiedadService, private modal: NgbModal) {}

  abrirModal(id) {
    this.modal.open(this.modalContent, { size: 'lg' });
    this.idModal=id;
  }

  acceptDelete(id){
    this._propiedadService.deleteOwned(id).subscribe(
      response => {
        this.getOwned();
      },
      error =>{
          console.log(<any> error);
      }
    )
    this.toastr.success('La propiedad ha sido eliminada','',{ "positionClass" : "toast-bottom-right"});
    this.modal.dismissAll();
  }

  getOwned(){
    this._propiedadService.getOwned().subscribe(
        result => {
          console.log(result)
            this.propiedades = result;
        },
        error => {
            console.log(<any>error);
        }
    );
  }

  ngOnInit(){
    this.getOwned();
  }

}
