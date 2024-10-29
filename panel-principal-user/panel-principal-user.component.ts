import { Component, HostBinding } from '@angular/core';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout'
import { DataService } from '../data.service'
import { ImagenService } from '../panel-principal-admin/imagen.service';
import { Router } from "@angular/router";
import {MatBadgeModule} from '@angular/material/badge';
import { NotificacionesService } from '../consultar-notificaciones/notificaciones.service';
import { Notificaciones } from '../modelos/notificaciones';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-panel-principal-user',
  templateUrl: './panel-principal-user.component.html',
  styleUrls: ['../panel-principal.css']
})
export class PanelPrincipalUserComponent {
  imagen: any;
  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1;
  registrosTotales: number = 0;
  notificaciones1: Notificaciones[] = [];
  notificaciones: Notificaciones[] = [];
  id_destinatario: number = 2;


  mobileQuery: MediaQueryList;


  esPanelAdmin(): boolean {
    return this.router.url === 'Home';
  }




  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  fillerNav = [
    {name:"Home", route:"HomeUsuarios", icon:"home"},
    {name:"Notificaciones", route:"Notificaciones_usuarios", icon:"assignment"},
    {name:"Mis Deudas", route:"MisDeudas", icon:"priority_high"},
    {name:"Proveedores", route:"Proveedores_usuarios", icon:"explore", children: [
      {name:'',route:"", icon:""}]},
    /*,
    {name:'Acuerdos',route:"Acuerdos_usuarios", icon:"supervised_user_circle", children: [
      {name:'',route:"", icon:""}
    ]},*/
  ]
 

  fillerNav1 = [
    
    { name: "Configuracion", route: "Configuracion", icon: "settings" },
    { name: "Salir", route: "../", icon: "exit_to_app" },

  ]


  private _mobileQueryListener: () => void;
  Nav: any;
  usuario: any;



  constructor(private NotificacionesService: NotificacionesService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private data: DataService, private imagenService: ImagenService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {

    this.usuario = this.data.obtener_usuario(8);
    this.Cargar_Imagen(this.data.obtener_usuario(1));
    this.esPanelAdmin();
    this.consultarNotificacion(this.data.obtener_usuario(1), this.indice, this.verdaderoRango, this.id_destinatario);

    $(document).ready(function() {
      $(".notification-drop .item").on('click',function() {
        $(this).find('ul').toggle();
      });
    });
    

  }


  imagenURL: string = '../assets/usuario.png';
  Cargar_Imagen(id_persona: number) {
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