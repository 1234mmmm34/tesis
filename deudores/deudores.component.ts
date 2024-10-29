import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  deudores, deudor } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { PersonasService } from '../ingresos-extraordinarios/personas.service';
import { Deudores } from '../ingresos-extraordinarios/deudores.model';
import Swal from 'sweetalert2';
import { LoadingService } from '../loading-spinner/loading-spinner.service';
//import {MatPaginatorModule} from '@angular/material/paginator';
 

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent {
  httpclient: any;
  deudores: deudores[] = [];
 
  deudor =new deudor();
  filtroDeudores:'' | undefined;

  Deudores_totales:Deudores[]=[];
  Deudores1: Deudores[] = [];

  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1;

  MostrarPanel: boolean = false;

  itemsPerPageLabel = 'Elementos por página'; 

 

  ngOnInit(){
    //this.fetchDataDeudores();
    this.ConsultarDeudores();
  }


  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder,private personasService:PersonasService, private loadingService: LoadingService){}


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


  // fetchDataDeudores() {
  //   this.dataService.fetchDataDeudores(this.dataService.obtener_usuario(3)).subscribe((deudores: deudores[]) => {
  //     console.log(deudores);
  //     this.deudores = deudores;
  //   });
  // } 

  
  paginador_atras() {

    if (this.indice - this.verdaderoRango >= 0) {
      
      this.Deudores1 = this.Deudores_totales.slice(this.indice - this.verdaderoRango, this.indice);
      this.indice = this.indice - this.verdaderoRango;
      this.cont--;
    }
  }

  paginador_adelante() {
    if (this.Deudores_totales.length - (this.indice + this.verdaderoRango) > 0) {
      this.indice = this.indice + this.verdaderoRango;
      this.Deudores1 = this.Deudores_totales.slice(this.indice, this.indice + this.verdaderoRango);
      this.cont++;
     // this.consultarNotificacion
    } 
    
  }

  ConsultarDeudores(){

    this.loadingService.show();

    this.personasService.consultarDeudoresOrdinarios(this.dataService.obtener_usuario(3)).subscribe(
      (deudasUsuario: Deudores[]) => {


       this.Deudores_totales = deudasUsuario
       this.indice=0;
       this.verdaderoRango=6;
       this.Deudores1 = this.Deudores_totales.slice(this.indice, this.indice + this.verdaderoRango);
        console.log('deudas de todos los  usuarios', this.Deudores_totales);

        this.loadingService.hide();
        this.MostrarPanel = true;
        /*
        if(this.Deudores_totales.length!=0){

        }else{
          Swal.fire({
            title: 'El usuario seleccionado no tiene deudas extraordinarias vencidas',
            text: '',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          }); 
        } 
       */
      },
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
      }
    );
  }

  restringir_acceso(id_deuda: any) {
    this.dataService.restringir_acceso(id_deuda).subscribe((deudores: deudores[]) => {
      console.log(deudores);
      this.deudores = deudores;
    }); 
  }

  calcularDiasRetraso(proximoPago: string): number {
    const fechaProximoPago = new Date(proximoPago);
    const hoy = new Date();
    const diferenciaTiempo = hoy.getTime() - fechaProximoPago.getTime();
    const diasRetraso = Math.floor(diferenciaTiempo / (1000 * 3600 * 24)); // Calcula los días de diferencia

    return Math.max(0, diasRetraso); // Devuelve al menos cero si la fecha ya ha pasado
  }

  delete(id_deuda:any){
    
  }

  
}