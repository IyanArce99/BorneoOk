import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { SubmitComponent } from './components/submit/submit.component';
import { ListComponent } from './components/views/list/list.component';
import { SingleComponent } from './components/views/single/single.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdministrarPropiedadesComponent } from './components/admin/dashboard/administrar-propiedades/administrar-propiedades.component';
import { ContactComponent } from './components/admin/dashboard/contact/contact.component';
import { ContactOwnedComponent } from './components/admin/dashboard/contact-owned/contact-owned.component';
import { ListarPropiedadesComponent } from './components/admin/dashboard/listar-propiedades/listar-propiedades.component';
import { EditarPropiedadesComponent } from './components/admin/dashboard/administrar-propiedades/editar-propiedades.component';
import { LoginComponent } from './components/admin/login/login.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'view/office/:id', component: SingleComponent },
  { path: 'view/list', component: ListComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent,
        children: [
          { path: 'adminPropertys', component: AdministrarPropiedadesComponent },
          { path: 'editPropertys/:id', component: EditarPropiedadesComponent },
          { path: 'listPropertys', component: ListarPropiedadesComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'contactOwned', component: ContactOwnedComponent }
        ]
      },
    ]
  },
  { path: 'view/list/:ciudad', component: ListComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
