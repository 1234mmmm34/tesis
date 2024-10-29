import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FraccionamientosComponent } from './fraccionamientos/fraccionamientos.component';
import { PruebaComponent } from './prueba/prueba.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PanelPrincipalAdminComponent } from './panel-principal-admin/panel-principal-admin.component';
//import { AcuerdosComponent } from './acuerdos/acuerdos.component';
//import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
//import { UsuariosComponent } from './usuarios/usuarios.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PanelPrincipalUserComponent } from './panel-principal-user/panel-principal-user.component';
import { PanelPrincipalTesoreroComponent } from './panel-principal-tesorero/panel-principal-tesorero.component';
import { DeudasOrdinariasComponent } from './deudas-ordinarias/deudas-ordinarias.component';
import { DeudoresComponent } from './deudores/deudores.component';
import { EgresosComponent } from './egresos/egresos.component';
//import { IngresosExtraordinariosComponent } from './ingresos-extraordinarios/ingresos-extraordinarios.component';
import { IngresosOrdinariosComponent } from './ingresos-ordinarios/ingresos-ordinarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { DeudasExtraordinariasComponent } from './deudas-extraordinarias/deudas-extraordinarias.component';
import { NotificacionesUsuariosComponent } from './notificaciones-usuarios/notificaciones-usuarios.component';
import { MisDeudasComponent } from './mis-deudas/mis-deudas.component';
import { ProveedoresUsuariosComponent } from './proveedores-usuarios/proveedores-usuarios.component';
import { AccesoPuertaComponent } from './acceso-puerta/acceso-puerta.component';
import { AcuerdosUsuariosComponent } from './acuerdos-usuarios/acuerdos-usuarios.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { FiltroDeudoresPipe } from './pipe/filtro-deudores.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import { FiltroAcuerdosPipe } from './pipe/filtro-acuerdos.pipe';
import { FiltroNotificacionesPipe } from './pipe/filtro-notificaciones.pipe';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { FiltroUsuariosPipe } from './pipe/filtro-usuarios.pipe';
import { RegistrosComponent } from './registros/registros.component';
import { EmailComponent } from './email/email.component';
import { ConsultarPropiedadesComponent } from './consultar-propiedades/consultar-propiedades.component';
import { FiltroFechaPipe } from './pipe/filtro-fecha.pipe';
import { CuentaComponent } from './cuenta/cuenta.component';
import { InvitacionComponent } from './invitacion/invitacion.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperacionContraseniaComponent } from './recuperacion-contrasenia/recuperacion-contrasenia.component';
import { ConsultarNotificacionesComponent } from './consultar-notificaciones/consultar-notificaciones.component';
import { ConsultarAcuerdosComponent } from './consultar-acuerdos/consultar-acuerdos.component';
import { InquilinosComponent } from './inquilinos/inquilinos.component';
import { ConsultarDeudasComponent } from './consultar-deudas/consultar-deudas.component';
import { DeudasComponent } from './deudas/deudas.component';
//import { TesoreroComponent } from './tesorero/tesorero.component';
import { NoEncontradoDirective } from './no-encontrado/no-encontrado.directive';
import { PaypalComponent } from './paypal/paypal.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { IngresosComponent } from './ingresos/ingresos.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import {MatBadgeModule} from '@angular/material/badge';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'; // Asegúrate de importar correctamente
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { GruposComponent } from './grupos/grupos.component';
import { NotificationService } from './notificaciones-service/notificaciones.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Importa MatAutocompleteModule
import { MatInputModule } from '@angular/material/input'; // Importa MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditarCuentaComponent } from './editar-cuenta/editar-cuenta.component';

import { HomeUsuariosComponent } from './home-usuarios/home-usuarios.component';

import { importProvidersFrom } from '@angular/core';
import {provideStorage, getStorage} from '@angular/fire/storage'
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';



@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    FraccionamientosComponent,
    PruebaComponent,
    HomeComponent,
    PanelPrincipalAdminComponent,
    //AcuerdosComponent,
    //NotificacionesComponent,
    PropiedadesComponent,
    //UsuariosComponent,
    NotFoundComponent,
    PanelPrincipalUserComponent,
    PanelPrincipalTesoreroComponent,
    DeudasOrdinariasComponent,
    DeudoresComponent,
    EgresosComponent,
    //IngresosExtraordinariosComponent,
    IngresosOrdinariosComponent,
    ProveedoresComponent,
    DeudasExtraordinariasComponent,
    NotificacionesUsuariosComponent,
    MisDeudasComponent,
    ProveedoresUsuariosComponent,
    AccesoPuertaComponent,
    AcuerdosUsuariosComponent,
    AdministracionComponent,
    FiltroDeudoresPipe,
    FiltroAcuerdosPipe,
    FiltroNotificacionesPipe,
    AgregarUsuarioComponent,
    FiltroUsuariosPipe,
    RegistrosComponent,
    EmailComponent,
    ConsultarPropiedadesComponent,
    FiltroFechaPipe,
    CuentaComponent,
    InvitacionComponent,
    InicioSesionComponent,
    RecuperacionContraseniaComponent,
    ConsultarNotificacionesComponent,
    ConsultarAcuerdosComponent,
    InquilinosComponent,
    ConsultarDeudasComponent,
    DeudasComponent,
    //TesoreroComponent,
    NoEncontradoDirective,
    PaypalComponent,
    IngresosComponent,
    LoadingSpinnerComponent,
    GruposComponent,
    EditarCuentaComponent,
    HomeUsuariosComponent
   

    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
    MatPaginatorModule,
    MatBadgeModule,
    CdkAccordionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule

  ],
  providers: [NotificationService,provideFirebaseApp(() =>
    initializeApp({
      apiKey: "AIzaSyBCmcRcQ5wmzurPq-rmA3vYJAZv2-Q6qbk",
      authDomain: "student-17254.firebaseapp.com",
      projectId: "student-17254",
      storageBucket: "student-17254.appspot.com",
      messagingSenderId: "581858745710",
      appId: "1:581858745710:web:afda81f14ca7861eae757f"
    })
  ),
  provideStorage(() => getStorage())],
  bootstrap: [AppComponent]
})
export class AppModule { }
