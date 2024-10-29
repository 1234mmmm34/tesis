import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deudores } from './deudores.model';

@Injectable({
  providedIn: 'root'
})
export class DeudaService {

  constructor(private http:HttpClient) { }


  private apiUrl = 'https://localhost:44397/api/Deudas';

  consultarDeudoresOridinarios(idFraccionamiento: number,idUsuario:number): Observable<Deudores[]> {
    const url = `${this.apiUrl}/Consultar_DeudoresOrdinarios?id_fraccionamiento=${idFraccionamiento}&id_usuario=${idUsuario}`;
    
    return this.http.get<Deudores[]>(url);
  }

  consultarDeudoresExtraoridinarios(idFraccionamiento: number,idUsuario:number): Observable<Deudores[]> {
    const url = `${this.apiUrl}/Consultar_DeudorExtraordinario?id_fraccionamiento=${idFraccionamiento}&id_usuario=${idUsuario}`;
    
    return this.http.get<Deudores[]>(url);
  }


  pagarDeudaOrdinaria(idDeudor: number, idDeuda: number, idFraccionamiento: number, proximoPago: string, file: File): Observable<boolean> {
    const url = `${this.apiUrl}/Pagar_DeudaOrdinaria`;

    // Crear un objeto FormData para enviar datos y el archivo
    const formData = new FormData();
    formData.append('id_deudor', idDeudor.toString());
    formData.append('id_deuda', idDeuda.toString());
    formData.append('id_fraccionamiento', idFraccionamiento.toString());
    formData.append('proximo_pago', proximoPago);
    formData.append('file', file);

    return this.http.post<boolean>(url, formData);
  }

  pagarDeudaExtraordinaria(idDeudor: number, idDeuda: number, idFraccionamiento: number, proximoPago: string, file: string, tipo_pago: string, monto: any): Observable<boolean> {
    const url = `${this.apiUrl}/Pagar_DeudaExtraordinaria`;

    // Crear un objeto FormData para enviar datos y el archivo
    const formData = new FormData();
    formData.append('id_deudor', idDeudor.toString());
    formData.append('id_deuda', idDeuda.toString());
    formData.append('id_fraccionamiento', idFraccionamiento.toString());
    formData.append('proximo_pago', proximoPago);
    formData.append('file', file);
    formData.append('tipo_pago', tipo_pago.toString());
    formData.append('monto', monto);

    return this.http.post<boolean>(url, formData);
  }



}
