import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router: Router) { }

  comprobarLogin() {
    let currentUser = localStorage.getItem("currentUser");
    let url;

    //si currentUser existe y no esta vacio puede navegar, sino no pasara de inicio
    if (currentUser != null && currentUser != "") {

    } else {
      this.router.navigate(["admin/login"]);
    }
  }

  ngOnInit() {
    this.comprobarLogin();
  }
}
