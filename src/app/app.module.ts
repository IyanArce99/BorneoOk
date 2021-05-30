import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { JwPaginationModule } from 'jw-angular-pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxFileDropModule } from 'ngx-file-drop';

// Componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/globales/footer/footer.component';
import { MenuComponent } from './components/globales/menu/menu.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { HowitworksComponent } from './components/globales/howitworks/howitworks.component';
import { SingleComponent } from './components/views/single/single.component';
import { ListComponent } from './components/views/list/list.component';
import { SubmitComponent } from './components/submit/submit.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MenuLateralComponent } from './components/admin/dashboard/menu-lateral/menu-lateral.component';
import { MenuTopComponent } from './components/admin/dashboard/menu-top/menu-top.component';
import { AdministrarPropiedadesComponent } from './components/admin/dashboard/administrar-propiedades/administrar-propiedades.component';
import { ContactComponent } from './components/admin/dashboard/contact/contact.component';
import { ListarPropiedadesComponent } from './components/admin/dashboard/listar-propiedades/listar-propiedades.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarPropiedadesComponent } from './components/admin/dashboard/administrar-propiedades/editar-propiedades.component';
import {AgmCoreModule} from '@agm/core';
import { ContactOwnedComponent } from './components/admin/dashboard/contact-owned/contact-owned.component';
import { LoginComponent } from './components/admin/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    MenuComponent,
    ContactoComponent,
    NosotrosComponent,
    HowitworksComponent,
    SingleComponent,
    ListComponent,
    SubmitComponent,
    AdminComponent,
    DashboardComponent,
    MenuLateralComponent,
    MenuTopComponent,
    AdministrarPropiedadesComponent,
    ContactComponent,
    ListarPropiedadesComponent,
    EditarPropiedadesComponent,
    ContactOwnedComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModalModule,
    JwPaginationModule,
    NgxPaginationModule,
    NgxFileDropModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyANq4N2hzoxI-B3T2LUR9zvCZsqOv8hOqE',
        libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
