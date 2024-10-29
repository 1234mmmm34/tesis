import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acuerdos } from './acuerdos.model'; // Importa el modelo de Acuerdos

@Injectable({
  providedIn: 'root'
})
export class AcuerdosService {

  private apiUrl = 'https://localhost:44397/Acuerdos'; // URL base de la API

  constructor(private http: HttpClient) { }

  agregarAcuerdo(id_fraccionamiento: number, asunto: string, detalles: string, fecha: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/Agregar_Acuerdo?id_fraccionamiento=${id_fraccionamiento}&asunto=${asunto}&detalles=${detalles}&fecha=${fecha}`,
      {},{ responseType: 'text' }
    );
  }

  eliminarAcuerdo(id_acuerdo: number, id_fraccionamiento: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/Eliminar_Acuerdo?id_acuerdo=${id_acuerdo}&id_fraccionamiento=${id_fraccionamiento}`,{ responseType: 'text' });
  }

  actualizarAcuerdo(id_acuerdo: number, id_fraccionamiento: number, asunto: string, detalles: string, fecha: string): Observable<string> {
    return this.http.patch(`${this.apiUrl}/Actualizar_Acuerdo?id_acuerdo=${id_acuerdo}&id_fraccionamiento=${id_fraccionamiento}&asunto=${asunto}&detalles=${detalles}&fecha=${fecha}`,
      {},{ responseType: 'text' }
    );
  }

  consultarAcuerdos(id_fraccionamiento: number): Observable<Acuerdos[]> {
    return this.http.get<Acuerdos[]>(`${this.apiUrl}/Consultar_Acuerdo?id_fraccionamiento=${id_fraccionamiento}`);
  }

  consultarAcuerdosPaginados(id_fraccionamiento: number, indice: number, rango: number): Observable<Acuerdos[]> {
    
    return this.http.get<Acuerdos[]>(`${this.apiUrl}/Consultar_Acuerdos_Paginados?id_fraccionamiento=${id_fraccionamiento}&indice=${indice}&rango=${rango}`);
  }


  consultarAcuerdosFecha(id_fraccionamiento: number, indice: number, rango: number, fecha: string): Observable<Acuerdos[]> {
    
    return this.http.get<Acuerdos[]>(`${this.apiUrl}/Consultar_Acuerdo?id_fraccionamiento=${id_fraccionamiento}&indice=${indice}&rango=${rango}&fecha=${fecha}`);
  }
}
