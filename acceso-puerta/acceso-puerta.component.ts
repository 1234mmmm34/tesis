import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { AccesoPuertaService } from './acceso-puerta.service';
import { DataService } from '../data.service';
import * as QRCode from 'qrcode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acceso-puerta',
  templateUrl: './acceso-puerta.component.html',
  styleUrls: ['./acceso-puerta.component.css']
})
export class AccesoPuertaComponent  {

  constructor(public accesoPuerta:AccesoPuertaService, private dataService:DataService){

  }

  token:string='';
  enlaceConstruido:string ='';
  qrCodeDataUrl: string = '';
  isBlocked: boolean = false;


  ngOnInit():void{
    console.log('Quiero ver que es estoooooooooooooooooooooooooooooo',this.dataService.obtener_usuario(13))

    if(this.dataService.obtener_usuario(13) == 'permitido'){
      this.isBlocked=false;
      this.ObtenerToken();
    }else{
      this.isBlocked=true;
      //this.mostrarMensajeBloqueo();
    }


  }

  ObtenerToken():boolean{
    this.accesoPuerta.consultarToken(this.dataService.obtener_usuario(1)).subscribe(
      (token: string) => {
        this.token=token;
        console.log("El token obtenido essssssssssssssss:", this.token);
        this.construirQr();
        return true;
      },
      (error) => {

        console.error('Error al obtener o no tenia ningun token generado', error);
        return false;
      }
    );
    return false;
  }

  generarToken() {
    if(this.dataService.obtener_usuario(13) == 'permitido'){
      this.isBlocked=false;
    }else{
      this.isBlocked=true;
      //this.mostrarMensajeBloqueo();
      return;
    }

      this.accesoPuerta.generarToken(this.dataService.obtener_usuario(1)).subscribe(
        (token: string) => {
          this.token=token;
          this.construirQr();
        },
        (error) => {

          console.error('Error al generar token', error);
        }
      );


  }

  construirQr(){
    this.enlaceConstruido=`http://159.54.141.160/Student/PaseTemporal?token=${this.token}`;
    QRCode.toDataURL(this.enlaceConstruido, (err: any, url: string) => {
      if (err) {
        console.error('Error generando el QR:', err);
        return;
      }
      this.qrCodeDataUrl = url;
    });
  }

  descargarCodigoQR() {
    if(this.dataService.obtener_usuario(13) == 'permitido'){
      this.isBlocked=false;
    }else{
      this.isBlocked=true;
      //this.mostrarMensajeBloqueo();
      return;
    }
    fetch(this.qrCodeDataUrl)
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



  mostrarMensajeBloqueo() {
    if (this.isBlocked) {
        Swal.fire({
            icon: 'info',
            title: 'Sección bloqueada',
            text: 'Esta sección está temporalmente inhabilitada. Por favor, intenta más tarde.',
            showConfirmButton: true, // Mostrar botón de aceptar
            confirmButtonText: 'Aceptar', // Texto del botón
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        });
    }
}

}