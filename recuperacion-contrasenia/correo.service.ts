import { Injectable } from '@angular/core';
import  emailjs  from '@emailjs/browser';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor() { }

  Enviar_Correo(correo_destinatario: string, mensaje: string){
    emailjs.send("service_jw5uhit","template_anvzzmo",{
      from_name: "Arboledas Administración",
      to_name: "A quien corresponda",
      message: mensaje,
      reply_to: "none",
      to_email: correo_destinatario,
      },"oroC5hc9EFcvhGRoh");

  }
}
