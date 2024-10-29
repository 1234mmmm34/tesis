import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { DataService } from '../data.service'
import { ImagenService } from '../panel-principal-admin/imagen.service';
import { Router } from "@angular/router";
import { NotificacionesService } from '../consultar-notificaciones/notificaciones.service';
import { Notificaciones } from '../modelos/notificaciones';

@Component({
  selector: 'app-panel-principal-tesorero',
  templateUrl: './panel-principal-tesorero.component.html',
  styleUrls: ['../panel-principal.css']
})
export class PanelPrincipalTesoreroComponent {
  imagen: any;
  
  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1;
  registrosTotales: number = 0;
  notificaciones1: Notificaciones[] = [];
  notificaciones: Notificaciones[] = [];
  id_destinatario: number = 2;
  mobileQuery: MediaQueryList;


fillerNav=[
  /*
  {name:"Deudas", route:"", icon:"list_alt",children:[
   {name:"Agregar Deudas", route:"Deudas", icon:""},
   {name:'Consultar Deudas', route:'ConsultarDeudas', icon:''},
  ]},*/
  {name:'Deudas', route:'Deudas', icon:'list_alt'},
  {name:"Movimientos", route:"", icon:"border_color",children:[
    {name:"Ingresos", route:"Ingresos", icon:""},
    {name:"Egresos", route:"Egresos", icon:""}
   ]},   
  {name:"Deudores", route:"Deudores", icon:"report_problem"},
 /* {name:"Egresos", route:"Egresos", icon:"call_received"},
  {name:"Ingresoss", route:"Ingresos", icon:"call_made"},
  {name:"Ingresos", route:"Egresos", icon:"call_received",children:[
    {name:"Ingresos Extraordinarios",route:"IngresosExtraordinarios", icon:"call_received"},
    {name:"Ingresos Ordinarios",route:"IngresosOrdinarios", icon:"call_received"},
  ]},
  */
  {name:'Proveedores',route:"Proveedores", icon:"store_mall_directory"},
  {name:'Usuarios',route:"Usuarios", icon:"supervised_user_circle"}
]

fillerNav1 = [
  { name: "Configuracion", route: "Configuracion", icon: "settings" },
  { name: "Salir", route: "../", icon: "exit_to_app" },

]


  exit() {
    //location.reload();
    this.router.navigate(['../']);
  }

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;
Nav: any;
usuario: any;

    

  constructor(private NotificacionesService: NotificacionesService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private data: DataService, private imagenService: ImagenService,private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   
  }

 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.usuario = this.data.obtener_usuario(2);
    this.Cargar_Imagen(this.data.obtener_usuario(1));
  }



  imagenURL: string = '../assets/usuario.png';
  Cargar_Imagen(id_persona: number){
    const id_Pago = 3; //  ID correspondiente
    this.imagenService.obtenerImagenPorId(id_persona).subscribe(
      (imagen: ArrayBuffer) => {
        this.createImageFromBlob(new Blob([imagen]));
      },
      error => {
        console.error('Error al obtener la imagen', error);
      }
    );
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagenURL = reader.result as string;
    }, false);

    if (image) { 
      reader.readAsDataURL(image);
    }
  }

  //Configuracion del submenu para que no se abra dos veces
  submenuAbierto: number = -1;
  abrirSubmenu(index: number): void {
    if (this.submenuAbierto === index) {
      this.submenuAbierto = -1; // Si se hace clic en el mismo, ciérralo
    } else {
      this.submenuAbierto = index; // Abre el nuevo submenu
    }
  }


  
  consultarNotificacion(idFraccionamiento: any, indice: number, verdaderoRango: number, id_destinatario: number) {


    this.NotificacionesService.consultarNotificacion(idFraccionamiento, 0, 100, id_destinatario).subscribe((notificaciones: Notificaciones[]) => {

      
      this.notificaciones = notificaciones;
      this.indice = 0;
      this.verdaderoRango = 6;
      this.notificaciones1 = this.notificaciones.slice(this.indice, this.indice + this.verdaderoRango);
      console.log(this.notificaciones1)

    });
  }



}