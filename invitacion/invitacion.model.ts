export class Invitacion {
  token: string;
  correo_electronico: string;
  id_fraccionamiento: number;
  lote:number;
  nombre_fraccionamiento:string;
  nombre_admin:string;
  tipo_usuario:string;
  constructor(
      token: string, 
      correo_electronico: string, 
      id_fraccionamiento: number,
      lote:number,
      nombre_fraccionamiento:string,
      nombre_admin:string,
      tipo_usuario:string) {
    this.token = token;
    this.correo_electronico = correo_electronico;
    this.id_fraccionamiento = id_fraccionamiento;
    this.lote=lote;
    this.nombre_fraccionamiento=nombre_fraccionamiento;
    this.nombre_admin=nombre_admin;
    this.tipo_usuario=tipo_usuario;
  }
}