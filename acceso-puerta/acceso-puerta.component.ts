import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { AccesoPuertaService } from './acceso-puerta.service';

@Component({
  selector: 'app-acceso-puerta',
  templateUrl: './acceso-puerta.component.html',
  styleUrls: ['./acceso-puerta.component.css']
})
export class AccesoPuertaComponent  {
  //'https://api.qrserver.com/v1/create-qr-code/?data=fierro_ross@live.com.mx&size=150x150'

  constructor(public userService:AccesoPuertaService){}
  
  @ViewChild('codigoQR') codigoQR!: ElementRef<HTMLImageElement>;

  urlCodigoQR: string = '';
  userId: string ='';


  async generarCodigoQR() {
    this.ObtenerToken();
    const response = await fetch(this.urlCodigoQR);
    const blob = await response.blob();
    this.urlCodigoQR = URL.createObjectURL(blob);
    // Mostrar la imagen después de generar el código QR
    const imgElement = this.codigoQR.nativeElement;
    imgElement.style.display = 'block';
  }

  descargarCodigoQR() {
    fetch(this.urlCodigoQR)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'codigoQR.png';
      link.click();

      // Liberar la URL del objeto creado para evitar pérdida de memoria
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error al descargar el código QR:', error);
    });
  }

  ngOnInit(): void {
    
  }

  ObtenerToken(){
    this.userId = '1'; // Reemplaza con el ID del usuario
    this.userService.getToken().subscribe(
      (token: string) => {
        // Una vez obtenido el correo electrónico, generamos el código QR
        const url = `https://api.qrserver.com/v1/create-qr-code/?data=${token}&size=150x150`;
        this.urlCodigoQR = url;
      },
      (error) => {
        
        console.error('Error al obtener el correo electrónico:', error);
      }
    );
  }
  
}
