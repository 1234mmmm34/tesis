import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from '../data.service'
import { AccesoPuertaService } from '../acceso-puerta/acceso-puerta.service';
import * as moment from 'moment';
import { LoadingService } from '../loading-spinner/loading-spinner.service';
import { PasarelaService } from '../paypal/paypal.service';
import { paypal } from '../modelos/paypal';




@Component({
  selector: 'app-home-usuarios',
  templateUrl: './home-usuarios.component.html',
  styleUrls: ['./home-usuarios.component.css']
})
export class HomeUsuariosComponent {
  
  
  @ViewChild('codigoQR') codigoQR!: ElementRef<HTMLImageElement>;

  paypal: paypal[] = [];
  total_deuda: number = 0;


  constructor(private http: HttpClient, private dataservice: DataService, public userService:AccesoPuertaService, private loadingService: LoadingService, private pasarelaService: PasarelaService) { }
  visible: boolean = false;
  nombre: any = this.dataservice.obtener_usuario(8);
  mes: any = "";


  ngOnInit(): void {
    this.generarCodigoQR();
    this.mes = this.dataservice.mesActual();
    this.consultarTotalDeuda(this.dataservice.obtener_usuario(1)); // Reemplaza 1 con el id_persona que necesites


  }

  consultarTotalDeuda(id_persona: number): void {
    const apiUrl = `https://localhost:44397/api/Deudas/Consultar_TotalDeuda?id_persona=${id_persona}`;
    
    this.http.get<number>(apiUrl).subscribe(
      (resultado) => {
        this.total_deuda = Math.round(resultado * 100) / 100;
    //  this.total_deuda = this.decimalPipe.transform(resultado, '1.2-2');


      },
      (error) => {
        console.error('Error al consultar la deuda:', error);
      }
    );
  }


  copyLabelContent() {
    const label = document.getElementById('labelToCopy');
    if (label) {
      // Usa el contenido del label (esto incluye texto y cualquier otro contenido HTML)
      const textToCopy = label.innerText || ''; // Cambia a `innerHTML` si necesitas el HTML completo
      navigator.clipboard.writeText(textToCopy).then(() => {

        this.visible = true;
        console.log(this.visible)
        setTimeout(() => {
          this.visible = false;
        }, 3000); 
        
      }).catch(err => {
        console.error('Error al copiar el texto: ', err);
      });
    } else {
      console.error('Elemento <label> no encontrado.');
    }
  }




  createPayment(price: number) {
    // URL base del servidor Node.js
    const baseUrl = 'http://localhost:3000';

    // Configuración de parámetros
    let params = new HttpParams().set('price', price.toString()).set('client_key', this.dataservice.obtener_usuario(13))
    .set('secret_key', this.dataservice.obtener_usuario(14));

    // Realizar la solicitud GET
    this.http.get<string>(`${baseUrl}/pay`, { params }).subscribe(
      (approvalUrl: string) => {
        console.log('Approval URL:', approvalUrl);
        // Redirige al usuario a la URL de aprobación de PayPal
        window.location.href = approvalUrl;
      },
      (error) => {
        console.error('Error creating PayPal payment:', error);
      }
    ); 
  }




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
