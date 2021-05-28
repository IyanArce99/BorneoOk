import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public usuarios: Array<Usuario> = [];
  logo = 'assets/logo.png';

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private servicio: LoginService, private router: Router) { }

  login() {
    this.servicio.getUsuarios().subscribe(
      result => {
        this.usuarios = result;

        //recojo el nombre y contraseña que escribo en inicio
        let nombreF = this.loginForm.value.email;
        let passF = this.loginForm.value.password;

        let entrada = false;

        //bucle para recorrer los usuarios de la BD 
        for (let usuario of this.usuarios) {
          //si el usuario y contraseña son iguales a lo que escribo, guarda el token en el localStorage
          if (usuario.user == nombreF && usuario.pass == passF) {
            localStorage.setItem('currentUser', usuario.token);
            entrada = true;
          }
        }


        if (entrada) {
          this.router.navigate(['admin/dashboard/listPropertys']);
        } else {
          alert("Usuario y/o contraseña incorrectos");
          this.router.navigate(['admin/login']);
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onLogin() {
    /*
    const { email, password } = this.loginForm.value;
    this.router.navigate(['./dashboard/listPropertys']);*/
    this.login();
  }

}
