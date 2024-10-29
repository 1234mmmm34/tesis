import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  deudas, deuda } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
 

@Component({
  selector: 'app-deudas-extraordinarias',
  templateUrl: './deudas-extraordinarias.component.html',
  styleUrls: ['./deudas-extraordinarias.component.css']
})
export class DeudasExtraordinariasComponent {
  httpclient: any;
  UserGroup: FormGroup;
  deudas: deudas[] = [];
  deuda =new deuda();
  id_deudas: any;



  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder){


    this.UserGroup = this.fb.group({
         fraccionamiento: ['', Validators.required],
         monto: ['', Validators.required],
         nombre: ['', Validators.required],
         descripcion: ['', Validators.required],
         proximo_pago: ['', Validators.required],
    
       })

    }

    ngOnInit(): void {
  
      this.fetchDataDeudasExtra(this.dataService.obtener_usuario(1));
    
    }

    onRowClicked(lote: any) {
      this.id_deudas= lote['id_deudas']
  
    }

    fetchDataDeudasExtra(id_tesorero: any) {
      this.dataService.fetchDataDeudasExtra(id_tesorero,1).subscribe((deudas: deudas[]) => {
        console.log(deudas);
        this.deudas = deudas;
      });
    } 

    edit(deudas: {
      id_deudas: any;
      monto: any;
      nombre: any;
      descripcion: any;
      proximo_pago: any;
    }){
      this.deuda.id_deudas = deudas.id_deudas;
      this.deuda.monto= deudas.monto;
      this.deuda.nombre= deudas.nombre;
      this.deuda.descripcion= deudas.descripcion;
      this.deuda.proximo_pago= deudas.proximo_pago;
    }
    
agregar_deuda(deudas: {monto: number, nombre: string, descripcion: string, id_tesorero: number, proximo_pago: Date}){
  console.log(deudas);
  deudas.id_tesorero = this.dataService.obtener_usuario(1)
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



  
actualizar_deuda(
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


delete(id_deudas: any){
  return this.http.delete("https://localhost:44397/api/Deudas/Eliminar_Deuda?id_deudas="+id_deudas).subscribe(
    () => {
      this.fetchDataDeudasExtra(this.dataService.obtener_usuario(1));
 
    })

}
}


