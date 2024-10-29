import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

   //private apiUrl = 'https://evaluacionesuas-001-site1.gtempurl.com/Acuerdos';
   private apiUrl = 'https://localhost:44397/api/Usuarios'; 

   constructor(private http: HttpClient) { }

   PostFile(id_persona: number,FileToUpload: File): Observable<object>{
    const formData = new FormData();
    //formData.append('name', nombre);
    console.log(id_persona);
    formData.append('file', FileToUpload);
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    headers.set('Access-Control-Allow-Origin','*');
    //return this.httpClient.get(this.baseUrl);
    return this.http.post(`${this.apiUrl}/Actualizar_Imagen?id_persona=${id_persona}`, formData);
   // return this.httpClient.get(this.base);
  }


  obtenerImagenPorId(id_Persona: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Consultar_Imagen?id_Persona=${id_Persona}`, { responseType: 'arraybuffer' });
  }
}
