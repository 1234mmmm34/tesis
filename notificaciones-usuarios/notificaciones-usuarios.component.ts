import { Component } from '@angular/core';
import { NotificacionesService } from '../consultar-notificaciones/notificaciones.service';
import { Notificaciones } from '../modelos/notificaciones';
import { DataService } from '../data.service';
import { LoadingService } from '../loading-spinner/loading-spinner.service';

 
@Component({
  selector: 'app-notificaciones-usuarios',
  templateUrl: './notificaciones-usuarios.component.html',
  styleUrls: ['./notificaciones-usuarios.component.css']
})
export class NotificacionesUsuariosComponent {
  notificaciones: Notificaciones[] = []; 
  tipoSeleccionado: string = 'General'; 
  idFraccionamiento: number = this.dataService.obtener_usuario(3);
  idUsuario: number = this.dataService.obtener_usuario(1);
  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1; 
  notificaciones1: Notificaciones[] = [];
  filtroNotificaciones: "" | undefined;
  id_destinatario: number = 0;
  mostrarGrid: boolean = false;

  
  constructor(private notificacionesService: NotificacionesService,private dataService:DataService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.actualizarNotificaciones();
    this.consultarNotificacion(this.idFraccionamiento, this.idUsuario);
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
  }

  paginador_adelante() {
    if (this.notificaciones.length - (this.indice + this.verdaderoRango) > 0) {
      this.indice = this.indice + this.verdaderoRango;
      this.notificaciones1 = this.notificaciones.slice(this.indice, this.indice + this.verdaderoRango);
      this.cont++;
     // this.consultarNotificacion
    } 
    
  }

  onChange(event: any){ 

      const selectedValue = event.target.value;
    
      this.id_destinatario=selectedValue;
     // console.log(this.id_destinatario);

     this.consultarNotificacion(this.dataService.obtener_usuario(1), this.id_destinatario);
  }
  

  consultarNotificacion(idFraccionamiento: any, id_destinatario: number) {

    this.loadingService.show();

    this.notificacionesService.consultarNotificacion(idFraccionamiento, id_destinatario).subscribe((notificaciones: Notificaciones[]) => {
      //  console.log("notificaciones: ", valor);
      this.loadingService.hide();
      this.mostrarGrid = true;

        this.notificaciones = notificaciones;
        this.indice = 0;
        this.verdaderoRango = 6;
        this.notificaciones1 = this.notificaciones.slice(this.indice, this.indice + this.verdaderoRango);

      });
  }




  actualizarNotificaciones(): void {
    this.notificaciones = []; // Vaciar el arreglo antes de cargar nuevas notificaciones
    console.log("id fraccionamientoooooo: " + this.dataService.obtener_usuario(3));
    if (this.tipoSeleccionado === 'General') {
      this.idUsuario = 0;
    } else {
      // Asignar el ID de usuario correspondiente a la sesión (puedes ajustarlo según tu lógica de inicio de sesión)
      // this.idUsuario = ...;
      this.idUsuario = this.dataService.obtener_usuario(1);
    }

    this.notificacionesService.consultarNotificacionesPorId(this.idFraccionamiento, this.idUsuario)
      .subscribe(
        (notificaciones: Notificaciones[]) => {
          console.log(notificaciones);
          this.notificaciones = notificaciones;
        },
        (error) => {
          console.error('Error al obtener las notificaciones:', error);
          // Manejo de errores
        }
      );
  }

  filtrarPorTipo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.tipoSeleccionado = target.value;
    this.actualizarNotificaciones();
  }
}
