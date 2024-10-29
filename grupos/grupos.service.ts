import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Grupos } from '../modelos/grupos'
import {map, skipWhile, tap} from 'rxjs/operators'
import { usuarios } from '../modelos/grupos';

@Injectable({
  providedIn: 'root'
})
export class GruposService {


  constructor(private http: HttpClient) { } 

  
  consultarGrupos(id_fraccionamiento: any): Observable<Grupos[]> {
    return this.http.get<Grupos[]>("https://localhost:44397/api/Grupos/Consultar_Grupos?id_fraccionamiento="+id_fraccionamiento);
  }

    

  
  consultarUsuarios(id_fraccionamiento : any): Observable<usuarios[]>{
    return this.http.get<usuarios[]>("https://localhost:44397/api/Grupos/Consultar_Persona?id_administrador="+id_fraccionamiento)
  }

  consultarMiembros(id_grupo: any): Observable<usuarios[]>{
    return this.http.get<usuarios[]>("https://localhost:44397/api/Grupos/Consultar_Miembros?id_grupo="+id_grupo)
  }
      
  eliminarGrupo(id_grupo: number): Observable<any> {
    const url = `https://localhost:44397/api/Grupos/Eliminar_Grupo?id_grupo=`+id_grupo;
    return this.http.delete(url);
  }

  eliminarMiembro(id_miembro: number): Observable<any> {
    const url = `https://localhost:44397/api/Grupos/Eliminar_Miembro?id_persona=`+id_miembro;
    return this.http.delete(url);
  }

}
 