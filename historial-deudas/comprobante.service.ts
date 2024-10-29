import { Injectable } from '@angular/core';
import { HDeuda } from './h-deuda.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  private apiUrl = 'https://localhost:44397/api/Deudas';
  
  constructor(private http: HttpClient) {}

  consultarHistorialDeudasUsuario(idDeudor: number, idFraccionamiento: number): Observable<HDeuda[]> {
    const url = `${this.apiUrl}/Consultar_HistorialDeudasUsuario?id_deudor=${idDeudor}&id_fraccionamiento=${idFraccionamiento}`;
    return this.http.get<HDeuda[]>(url);
  }

  obtenerComprobantePorId(id_historial: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Consultar_Comprobante?id_historial=${id_historial}`, { responseType: 'arraybuffer' });
  }

}
