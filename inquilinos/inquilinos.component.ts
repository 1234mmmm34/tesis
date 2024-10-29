import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { inquilinos } from '../modelos/inquilinos';
import { Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { ImagenService } from '../panel-principal-admin/imagen.service';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service'
import { Router } from "@angular/router";


@Component({
  selector: 'app-inquilinos',
  templateUrl: './inquilinos.component.html',
  styleUrls: ['./inquilinos.component.css']
})
export class InquilinosComponent {

  baseUrl = `https://localhost:44397/Fraccionamientos/Consultar_Fraccionamiento?id_administrador=`;
  baseUrl1 = `https://localhost:44397/api/Personas/Consultar_Persona?id_administrador=`;
  baseUrl2 = `https://localhost:44397/Propiedades/Consultar_Propiedades?id_administrador=`;

  constructor(private http: HttpClient) {}

  agregar_inquilino(lote: {

    id_usuario: any;
    id_lote: any;
    id_renta: any;
    id_fraccionamiento: any;
    codigo_acceso: any;
    intercomunicador: any;
  }) {
  
  
      const params = {

        id_usuario: lote.id_usuario,
        id_lote: lote.id_lote,
        id_renta: lote.id_renta,
        id_fraccionamiento: lote.id_fraccionamiento,
        codigo_acceso: "123",
        intercomunicador: "123"
      };
  
      console.log("params: ",params)
  
      let direccion = "https://localhost:44397/api/Usuario_lote/Agregar_inquilino";
  
      const headers = new HttpHeaders({ 'myHeader': 'procademy' });
      this.http.post(
        direccion,
        params, { headers: headers })
        .subscribe((res) => {
          console.log(res);
        //  this.lotes.push(this.UserGroup.value);
        //  this.UserGroup.reset();
        });
  
    }
  


}
