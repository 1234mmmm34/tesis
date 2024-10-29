import { Component } from '@angular/core';
import { HDeuda } from './h-deuda.model';
import { ComprobanteService } from './comprobante.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-historial-deudas',
  templateUrl: './historial-deudas.component.html',
  styleUrls: ['./historial-deudas.component.css']
})
export class HistorialDeudasComponent {

  constructor(private comprobanteService:ComprobanteService, private dataService:DataService){}

  HistorialUsuario:HDeuda[]=[];

  ngOnInit():void{
    this.consultarHistorialDeudas();
  }

  consultarHistorialDeudas(): void {
    // Reemplaza estos valores con los adecuados según tu aplicación
    const idDeudor = this.dataService.obtener_usuario(1);
    const idFraccionamiento = this.dataService.obtener_usuario(3);

    // Llamada al servicio
    this.comprobanteService.consultarHistorialDeudasUsuario(idDeudor, idFraccionamiento).subscribe(
      (historial: HDeuda[]) => {
        this.HistorialUsuario = historial;
        console.log('Historial de deudas:', historial);
      },
      (error) => {
        console.error('Error al consultar el historial de deudas:', error);
        // Manejo de errores
      }
    );
  }

  verComprobante(idDeuda: number): void {
    this.comprobanteService.obtenerComprobantePorId(idDeuda).subscribe(
      (comprobante: ArrayBuffer) => {
        const blob = new Blob([comprobante]);
        const imageUrl = URL.createObjectURL(blob);
  
        // Abrir una nueva ventana con la imagen
        const nuevaVentana = window.open('', '_blank');
  
        // Verificar si la nueva ventana se abrió correctamente
        if (nuevaVentana) {
          // Escribir contenido en la nueva ventana
          nuevaVentana.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Comprobante de pago</title>
            </head>
            <body style="margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
              <img src="${imageUrl}" alt="Comprobante de pago" style="max-width: 100%; max-height: 100%;">
            </body>
            </html>
          `);
        } else {
          console.error('No se pudo abrir la nueva ventana');
        }
      },
      error => {
        console.error('Error al obtener el comprobante', error);
      }
    );
  }
 

 


}
