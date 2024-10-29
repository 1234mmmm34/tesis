import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { paypal } from '../modelos/paypal'
import {map, skipWhile, tap} from 'rxjs/operators'
import { usuarios } from '../modelos/grupos';

@Injectable({
  providedIn: 'root'
})
export class PasarelaService {


  constructor(private http: HttpClient) { } 

  
  consultarPasarela(id_fraccionamiento: any): Observable<paypal[]> {
    return this.http.get<paypal[]>("https://localhost:44397/api/Pasarela/Consultar_Pasarela?id_fraccionamiento="+id_fraccionamiento);
  }



/*
  actualizarPasarela(id_fraccionamiento: any, formValues: any): Observable<usuarios[]>{
    return this.http.get<usuarios[]>("https://localhost:44397/api/Pasarela/Actualizar_Pasarela")
  }
      */
  actualizarPasarela(id_fraccionamiento: any, formValues: any): Observable<paypal[]> {

    const forms = {
        id_fraccionamiento: id_fraccionamiento,
        modo: "sandbox", 
        url: formValues.url,
        client_key: formValues.client_key,    
        secret_key: formValues.secret_key     
      };

      console.log(forms)

    const url = `https://localhost:44397/api/Pasarela/Actualizar_Pasarela`;
    return this.http.put<paypal[]>(url, forms);

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
 