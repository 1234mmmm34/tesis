import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  deudas, deuda } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { Personas } from '../ingresos-extraordinarios/personas.model';
import { PersonasService } from '../ingresos-extraordinarios/personas.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-deudas-ordinarias',
  templateUrl: './deudas-ordinarias.component.html',
  styleUrls: ['./deudas-ordinarias.component.css']
})
export class DeudasOrdinariasComponent {
  tipo_formulario: string='';
  httpclient: any;
  UserGroup: FormGroup;
  UserGroup2: FormGroup;
  deudas: deudas[] = [];
  deuda =new deuda();
  id_deudas: any;
  destinatario:string='';
  destinatario2:string='';
  especifico:boolean=false;

  personas : Personas[]=[];

  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder,private personaService:PersonasService){


    this.UserGroup = this.fb.group({
         fraccionamiento: ['', Validators.required],
         monto: ['', Validators.required],
         nombre: ['', Validators.required],
         descripcion: ['', Validators.required],
         dias_gracia: ['', Validators.required],
         periodicidad: ['', Validators.required],
         recargo: ['', Validators.required],
         proximo_pagoOrdinario: ['', Validators.required],
         destinatario: ['', Validators.required],
         
    
       })

       this.UserGroup2 = this.fb.group({
        fraccionamiento: ['', Validators.required],
        monto: ['', Validators.required],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        dias_gracia: ['', Validators.required],
        periodicidad: ['', Validators.required],
        recargo: ['', Validators.required],
        proximo_pago: ['', Validators.required],
        destinatario2: ['', Validators.required],
        cboxpersonas: ['', Validators.required],
        
        
      })

    }

    ngOnInit(): void {
  
      this.fetchDataDeudas(this.dataService.obtener_usuario(1));
      this.consultarPersonas(this.dataService.obtener_usuario(3));
    
    }

    consultarPersonas(idFraccionamiento: number): void {
      this.personaService.consultarPersonasPorFraccionamiento(idFraccionamiento).subscribe(
        (personas: Personas[]) => {
         this.personas = personas;
          console.log('Personas:', personas);
        },
        (error) => {
          // Manejo de errores
          console.error('Error:', error);
          Swal.fire({
            title: 'Error al consultar a las personas',
            text: 'Contacte con el administrador de la pagina',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }

    onRowClicked(lote: any) {
      this.id_deudas= lote['id_deudas']
  
    }

    fetchDataDeudas(id_tesorero: any) {
      this.dataService.fetchDataDeudasExtra(id_tesorero,1).subscribe((deudas: deudas[]) => {
        //console.log(deudas);
        this.deudas = deudas;
      });
    } 

    edit(deudas: {
      id_deudas: any;
      monto: any;
      nombre: any;
      descripcion: any;
      dias_gracia: any; 
      periodicidad: any;
      recargo: any;
      proximo_pago: any;
    }){
      this.deuda.id_deudas = deudas.id_deudas;
      this.deuda.monto= deudas.monto;
      this.deuda.nombre= deudas.nombre;
      this.deuda.descripcion= deudas.descripcion;
      this.deuda.dias_gracia= deudas.dias_gracia;
      this.deuda.periodicidad= deudas.periodicidad;
      this.deuda.recargo= deudas.recargo;
      this.deuda.proximo_pago= deudas.proximo_pago;
    }
    
    fechaProximoPago:string='';
agregar_deuda(deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_tesorero: number, id_fraccionamiento:number,proximo_pago:string,destinatario:string}){
  deudas.id_fraccionamiento= this.dataService.obtener_usuario(3);
  deudas.id_tesorero = this.dataService.obtener_usuario(1);
  deudas.proximo_pago=this.fechaProximoPago;
  deudas.destinatario=this.destinatario;
  console.log(deudas);
 
  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
   "https://localhost:44397/api/Deudas/Agregar_Deuda",
    deudas, {headers: headers})
    .subscribe((res) => { 
      console.log(res);
    //  this.ngOnInit(); 
    this.fetchDataDeudas(this.dataService.obtener_usuario(1));
    this.UserGroup.reset();
    });
 
}

onChangeOption(event:any){
  const selectedValue = event.target.value;

  this.destinatario=selectedValue;
}

onChangeOption2(event:any){
  const selectedValue = event.target.value;

  if(selectedValue=='personalizado'){
    this.especifico=true;
  }else{
    this.especifico=false;
    this.destinatario=selectedValue;
  }
 
  
}

onChangeUsuario(event: any) {
  const valorSeleccionado = event.target.value;
  const destinatarioId = parseInt(valorSeleccionado.split(' - ')[0]);
  this.destinatario2=destinatarioId.toString();
}


  
actualizar_deuda(
  deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_deudas: number}
){
 
  const params = {
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    dias_gracia: deudas.dias_gracia,
    periodicidad: deudas.periodicidad,
    recargo: deudas.recargo,
    id_deudas:  this.id_deudas
    };

    console.log("deudas: ",deudas)

  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
  }; 

  console.log("actualizar: ",params)

  return this.http.put("https://localhost:44397/api/Deudas/Actualizar_Deuda", params).subscribe(
    (_response) => {
      console.log("actualiza",params)
      this.ngOnInit();
      this.UserGroup.reset();

    }
  )

}


delete(id_deudas: any){
  return this.http.delete("https://localhost:44397/api/Deudas/Eliminar_Deuda?id_deudas="+id_deudas).subscribe(
    () => {
      this.fetchDataDeudas(this.dataService.obtener_usuario(1));
 
    })

}

/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/


  fechaCorte_extra:string='';
  agregar_deudaExtra(deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_tesorero: number, id_fraccionamiento:number,proximo_pago:string,destinatario:string}){
  console.log(this.fechaCorte_extra);
  console.log(deudas);
  deudas.dias_gracia=0;
  deudas.periodicidad=0;
  deudas.destinatario=this.destinatario2;
  deudas.recargo=0;
  deudas.proximo_pago=this.fechaCorte_extra;
  deudas.id_fraccionamiento= this.dataService.obtener_usuario(3);
  deudas.id_tesorero = this.dataService.obtener_usuario(1);
  console.log(deudas.id_tesorero);
  console.log(this.fechaCorte_extra);
  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
   "https://localhost:44397/api/Deudas/Agregar_DeudaExtra",
    deudas, {headers: headers})
    .subscribe((res) => { 
      console.log(res);
    //  this.ngOnInit(); 
    this.fetchDataDeudasExtra(this.dataService.obtener_usuario(1));
    this.UserGroup.reset();
    });
 
}



fetchDataDeudasExtra(id_tesorero: any) {
  this.dataService.fetchDataDeudasExtra(id_tesorero,0).subscribe((deudas: deudas[]) => {
    console.log(deudas);
    this.deudas = deudas;
  });
} 

actualizar_deudaExtra(
  deudas: {monto: number, nombre: string, descripcion: string, proximo_pago: Date, id_deudas: number}
){
 
  const params = {
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    id_deudas:  this.id_deudas,
    proximo_pago: deudas.proximo_pago
    };

    console.log("deudas: ",deudas)

  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
  }; 

  console.log("actualizar: ",params)

  return this.http.put("https://localhost:44397/api/Deudas/Actualizar_Deuda", params).subscribe(
    (_response) => {
      console.log("actualiza",params)
      this.ngOnInit();
      this.UserGroup.reset();

    }
  )

}

}


