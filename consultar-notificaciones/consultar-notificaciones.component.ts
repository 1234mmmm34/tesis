import { Component } from '@angular/core';
import { Personas } from '../modelos/personas';
//import { PersonasService } from './personas.service';
import { NotificacionesService } from './notificaciones.service';
import { Notificaciones } from '../modelos/notificaciones';
import { usuario, usuarios } from "../modelos/usuarios";
import { NumberFormatStyle } from '@angular/common';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';
import { async } from 'rxjs';
import { LoadingService } from '../loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-consultar-notificaciones',
  templateUrl: './consultar-notificaciones.component.html',
  styleUrls: ['./consultar-notificaciones.component.css']
})
export class ConsultarNotificacionesComponent {
  constructor(private NotificacionesService: NotificacionesService, private dataService: DataService, private loadingService: LoadingService) { }
  personas: Personas[] = [];
 
  id_fraccionamineto: number = this.dataService.obtener_usuario(1);
  respuestaNotificacion: string | null = null;
  idNotificacion: number | undefined;
  notificaciones: Notificaciones[] = [];
  tipoSeleccionado: string = 'General';
  tipo: string = '';
  idFraccionamiento: number = this.dataService.obtener_usuario(1);
  idUsuario: number = 0;
  filtroNotificaciones: "" | undefined;
  usuarios: usuarios[] = [];
  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1;
  registrosTotales: number = 0;
  notificaciones1: Notificaciones[] = [];
  id_destinatario: number = 2;
  mostrarGrid: boolean = false;
  mostrarDestinatario: boolean = false; 




  ngOnInit(): void {

    this.consultarNotificacion(this.dataService.obtener_usuario(1), this.id_destinatario);
  }

  pageChanged(event: any) {
    // Determinar la acción del paginator
    if (event.previousPageIndex < event.pageIndex) {
      // Se avanzó a la siguiente página
      this.paginador_adelante();
    } else if (event.previousPageIndex > event.pageIndex) {
      // Se retrocedió a la página anterior
      this.paginador_atras();
    }
  }


  paginador_atras() {

    if (this.indice - this.verdaderoRango >= 0) {
      this.notificaciones1 = this.notificaciones.slice(this.indice - this.verdaderoRango, this.indice);
      this.indice = this.indice - this.verdaderoRango;
      this.cont--;
    }

    this.notificaciones1.forEach(notif => {
      notif.visualizacion = 0; // Cambiar la propiedad "estado" a 0 para cada objeto
    })
  }

  paginador_adelante() {
    if (this.notificaciones.length - (this.indice + this.verdaderoRango) > 0) {
      this.indice = this.indice + this.verdaderoRango;
      this.notificaciones1 = this.notificaciones.slice(this.indice, this.indice + this.verdaderoRango);
      this.cont++;

    }
  }




  onChange(event: any) {

    const selectedValue = event.target.value;

    
    this.id_destinatario = selectedValue;
    // console.log(this.id_destinatario);

    this.consultarNotificacion(this.dataService.obtener_usuario(1), this.id_destinatario);
  }


  consultarNotificacion(idFraccionamiento: any, id_destinatario: number) {

    this.loadingService.show()

    this.NotificacionesService.consultarNotificacion(idFraccionamiento, id_destinatario).subscribe((notificaciones: Notificaciones[]) => {

     
      
      this.mostrarGrid = true;
      this.loadingService.hide()

      this.notificaciones = notificaciones;
      this.indice = 0;
      this.verdaderoRango = 6;
      this.notificaciones1 = this.notificaciones.slice(this.indice, this.indice + this.verdaderoRango);

    });
  }




  agregarNotificacion(formulario: any): void {


    if (formulario.tipo == 'general') { 
      formulario.destinatario = 0;
    }

    this.NotificacionesService.agregarNotificacion(this.dataService.obtener_usuario(1), formulario.tipo, formulario.destinatario, formulario.asunto, formulario.mensaje)
      .subscribe(
        (respuesta: string) => {
          this.respuestaNotificacion = respuesta;
          console.log('Respuesta:', respuesta);
          Swal.fire({
            title: 'Notificacion agregada correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ngOnInit();
        },
        (error) => {
          console.error('Error al agregar notificación Angular:', error);
          Swal.fire({
            title: 'Error al agregar notificación',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });

        }
      );
  }





  consultarUsuarios(){

    

    Swal.fire({

      title: 'Cargando datos',
      html: 'por favor espere',
      didOpen: () => {

        Swal.showLoading();

      }
    });


    this.dataService.fetchDataUsers(this.dataService.obtener_usuario(1)).subscribe((usuarios: usuarios[]) => {
      Swal.close();
      clearInterval(10);
      
      this.mostrarDestinatario = true;
      this.usuarios = usuarios;

      console.log(this.usuarios)

    });

  }




  /*
  
    actualizarNotificaciones(): void {
      this.notificaciones = []; // Vaciar el arreglo antes de cargar nuevas notificaciones
  
      if (this.tipoSeleccionado === 'General') {
        this.idUsuario = 0;
      } else {
        // Asignar el ID de usuario correspondiente a la sesión (puedes ajustarlo según tu lógica de inicio de sesión)
        // this.idUsuario = ...;
        this.idUsuario = 1;
      }
    }
  
    filtrarPorTipo(event: Event): void {
      const target = event.target as HTMLSelectElement;
      this.tipoSeleccionado = target.value;
      this.actualizarNotificaciones();
    }
    */

}