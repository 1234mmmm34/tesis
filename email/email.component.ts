import { Component } from '@angular/core';
import  emailjs  from '@emailjs/browser';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  correoDestinatario: any;
  mensaje: any;
  
  Enviar_Correo(){
  
  this.correoDestinatario= "urquidymariana@gmail.com";
  this.mensaje="sí se mandó we";
  
    this.mensaje
    emailjs.send('service_odaejg9','template_4pcm6ue',{
      from_name: "Arboledas Administración",
      to_name: "A quien corresponda",
      message: this.mensaje,
      fraccionamiento: "villa de cortez",
      reply_to: "none",
      to_email: this.correoDestinatario,
      },"MvB2uZfDsQunC7w_b");
  
  }
  
}
