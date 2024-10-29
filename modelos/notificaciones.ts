export class Notificaciones {
  id_notificacion: number;
id_fraccionamiento: number;
tipo: string;
id_destinatario: number;
asunto: string;
mensaje: string;
visualizacion: number;

constructor(
  id_notificacion: number,
  id_fraccionamiento: number,
  tipo: string,
  id_destinatario: number,
  asunto: string,
  mensaje: string,
  visualizacion: number
) {
  this.id_notificacion = id_notificacion;
  this.id_fraccionamiento = id_fraccionamiento;
  this.tipo = tipo;
  this.id_destinatario = id_destinatario;
  this.asunto = asunto;
  this.mensaje = mensaje;
  this.visualizacion = visualizacion
}
}
