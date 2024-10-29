import { Injectable } from '@angular/core';
import  emailjs  from '@emailjs/browser';
import { DataService } from '../data.service';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {
 
  constructor(private dataService:DataService) { }

  Enviar_Correo(correo_destinatario: string, mensaje: string){

    console.log("correoo: ", correo_destinatario)

    emailjs.send("service_kmgxw3p","template_4qnjhc4",{
      administrador: this.dataService.obtener_usuario(2),
      message: mensaje,
      reply_to: "none",
      to_email: "urquidymariana@gmail.com"
      },"el2ueIoClIaD7cY5E");
  }
} 
