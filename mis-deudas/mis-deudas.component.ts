import { Component } from '@angular/core';
import { Deudores } from '../ingresos-extraordinarios/deudores.model';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';
import { PersonasService } from '../ingresos-extraordinarios/personas.service';
import {  deudores, deudor } from "../modelos/deudas"
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { LoadingService } from '../loading-spinner/loading-spinner.service';
@Component({
  selector: 'app-mis-deudas',
  templateUrl: './mis-deudas.component.html',
  styleUrls: ['../consulta.css']
})
export class MisDeudasComponent {

  httpclient: any;
  deudores: deudores[] = [];
  deudor =new deudor();
  filtroDeudores:'' | undefined;
  filtroFecha:'' | undefined;
  indice: number = 0;
  cont: number = 1;
  verdaderoRango: number = 6;

  Deudores_totales:Deudores[]=[];
  Deudores_totales2:Deudores[]=[];
  mostrarGrid: boolean = false;

  ngOnInit(){
    //this.fetchDataDeudores();
    this.ConsultarDeudores(0);
  }

  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder,private personasService:PersonasService, private loadingService: LoadingService){}

  // fetchDataDeudores() {
  //   this.dataService.fetchDataDeudores(this.dataService.obtener_usuario(3)).subscribe((deudores: deudores[]) => {
  //     console.log(deudores);
  //     this.deudores = deudores;
  //   });
  // }


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
      this.Deudores_totales2 = this.Deudores_totales.slice(this.indice - this.verdaderoRango, this.indice);
      this.indice = this.indice - this.verdaderoRango;
      this.cont--;
    }

  }

  paginador_adelante() {
    if (this.Deudores_totales.length - (this.indice + this.verdaderoRango) > 0) {
      this.indice = this.indice + this.verdaderoRango;
      this.Deudores_totales2 = this.Deudores_totales.slice(this.indice, this.indice + this.verdaderoRango);
      this.cont++;

    }
  }

  onChange(event: any) {

    const selectedValue = event.target.value;

    console.log(selectedValue )
    //this.id_destinatario = selectedValue;
    // console.log(this.id_destinatario);

    this.ConsultarDeudores(selectedValue);
  }


  ConsultarDeudores(tipo_deuda: number){
    this.loadingService.show();
    console.log("aaaaaaaa: " + this.dataService.obtener_usuario(4))
    this.personasService.consultarDeudoresUsuarios(this.dataService.obtener_usuario(1), tipo_deuda).subscribe(
      (deudasUsuario: Deudores[]) => {
        this.loadingService.hide();
        this.mostrarGrid = true;

       this.Deudores_totales = deudasUsuario
        console.log('deudas', this.Deudores_totales);
        if(this.Deudores_totales.length==0){
          Swal.fire({
            title: 'El usuario seleccionado no tiene deudas  vencidas',
            text: '',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
      }
    );
  }

  calcularDiasRetraso(proximoPago: string,periodicidad:number): number {

    const fechaProximoPago = new Date(proximoPago);
    const hoy = new Date();
    const diferenciaTiempo = hoy.getTime() - fechaProximoPago.getTime();
    const diasRetraso = Math.floor(diferenciaTiempo / (1000 * 3600 * 24)); // Calcula los días de diferencia

     // Sumar la periodicidad en días


    return Math.max(0, diasRetraso); // Devuelve al menos cero si la fecha ya ha pasado
  }

  calcularTotal(retraso: number, periodicidad: number, monto: number, recargo: number): number {
    let total = 0;
    if(periodicidad!=0){
      total = ((retraso / periodicidad) * monto) + ((retraso / periodicidad) * recargo);
    }
    else{
      total = monto;

    }
    return isNaN(total) ? 0 : parseFloat(total.toFixed(2));
  }

  calcularProximoPago(proximoPago: string,periodicidad:number)
  {
    const proximoPago_ = new Date(proximoPago); // Convertir a objeto Date
    proximoPago_.setDate(proximoPago_.getDate() + periodicidad);
    proximoPago = formatDate(proximoPago_, 'yyyy-MM-dd', 'en-US');
    return proximoPago;
  }

  formatearFecha(fechaPago:string){
    return fechaPago=formatDate(fechaPago, 'yyyy-MM-dd', 'en-US');
  }
}
