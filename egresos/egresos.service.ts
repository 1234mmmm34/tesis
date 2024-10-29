import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Egresos } from './egresos.model';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:44397/Egresos';

  agregarEgreso(idFraccionamiento: number, concepto: string, descripcion: string, proveedor: string, monto: number, fecha: string): Observable<boolean> {
    const url = `${this.apiUrl}/Agregar_Egreso?id_fraccionamiento=${idFraccionamiento}&concepto=${concepto}&descripcion=${descripcion}&proveedor=${proveedor}&monto=${monto}&fecha=${fecha}`;
    return this.http.post<boolean>(url, {});
  }

  eliminarEgreso(idEgreso: number, idFraccionamiento: number): Observable<boolean> {
    const url = `${this.apiUrl}/Eliminar_Egreso?id_egreso=${idEgreso}&id_fraccionamiento=${idFraccionamiento}`;
    
    return this.http.delete<boolean>(url);
  }

  actualizarEgreso(idEgreso: number, idFraccionamiento: number, concepto: string, descripcion: string, proveedor: string, monto: number, fecha: string): Observable<boolean> {
    const url = `${this.apiUrl}/Actualizar_Egreso?id_egreso=${idEgreso}&id_fraccionamiento=${idFraccionamiento}&concepto=${concepto}&descripcion=${descripcion}&proveedor=${proveedor}&monto=${monto}&fecha=${fecha}`;
    
    return this.http.patch<boolean>(url, {});
  }

  consultarEgresos(idFraccionamiento: number): Observable<Egresos[]> {
    const url = `${this.apiUrl}/Consultar_Egreso?id_fraccionamiento=${idFraccionamiento}`;
    
    return this.http.get<Egresos[]>(url);
  }

}
