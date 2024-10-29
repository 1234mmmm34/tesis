import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personas } from './personas.model';
import { Deudores } from './deudores.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private apiUrl = 'https://localhost:44397/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  consultarPersonasPorFraccionamiento(idFraccionamiento: number): Observable<Personas[]> {
    const url = `${this.apiUrl}/Usuarios/Consultar_Personas_Por_Fraccionamientos?id_fraccionamiento=${idFraccionamiento}`;
    return this.http.get<Personas[]>(url);
  }

  consultarDeudoresExtraoridinarios(idFraccionamiento: number,idUsuario:number): Observable<Deudores[]> {
    const url = `${this.apiUrl}/Deudas/Consultar_DeudorExtraordinario?id_fraccionamiento=${idFraccionamiento}&id_usuario=${idUsuario}`;
    
    return this.http.get<Deudores[]>(url); 
  }

  consultarDeudorOrdinario(idFraccionamiento: number,idUsuario:number): Observable<Deudores[]> {
    const url = `${this.apiUrl}/Deudas/Consultar_DeudorOrdinario?id_fraccionamiento=${idFraccionamiento}&id_usuario=${idUsuario}`;
    return this.http.get<Deudores[]>(url);
  }

  consultarDeudoresOrdinarios(idFraccionamiento: number): Observable<Deudores[]> {
    const url = `${this.apiUrl}/Deudas/Consultar_DeudoresOrdinarios?id_fraccionamiento=${idFraccionamiento}`;
    return this.http.get<Deudores[]>(url);
  }

  consultarDeudoresUsuarios(idLote: number, estado: number): Observable<Deudores[]> {
    
    const url = `${this.apiUrl}/Deudas/Consultar_DeudoresUsuario?id_deudor=${idLote}&estado=${estado}`;
    return this.http.get<Deudores[]>(url);
  }

  
  
}
