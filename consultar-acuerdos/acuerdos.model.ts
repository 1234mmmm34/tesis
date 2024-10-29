export class Acuerdos {
    id_acuerdo: number;
    id_fraccionamiento: number;
    asunto: string;
    detalles: string;
    fecha: string;
  
    constructor(
      id_acuerdo: number,
      id_fraccionamiento: number,
      asunto: string,
      detalles: string,
      fecha: string
    ) {
      this.id_acuerdo = id_acuerdo;
      this.id_fraccionamiento = id_fraccionamiento;
      this.asunto = asunto;
      this.detalles = detalles;
      this.fecha = fecha;
    }

}
