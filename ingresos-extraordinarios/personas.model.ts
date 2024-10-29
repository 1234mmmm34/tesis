export class Personas {
    id_persona: number;
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    telefono: string;
    tipo_usuario: string;
    id_fraccionamiento: number;
    lote: number;
    intercomunicador: string;
    codigo_acceso: string;
    correo: string;
  
    constructor(
      id_persona: number,
      nombre: string,
      apellido_pat: string,
      apellido_mat: string,
      telefono: string,
      tipo_usuario: string,
      id_fraccionamiento: number,
      lote: number,
      intercomunicador: string,
      codigo_acceso: string,
      correo: string
    ) {
      this.id_persona = id_persona;
      this.nombre = nombre;
      this.apellido_pat = apellido_pat;
      this.apellido_mat = apellido_mat;
      this.telefono = telefono;
      this.tipo_usuario = tipo_usuario;
      this.id_fraccionamiento = id_fraccionamiento;
      this.lote = lote;
      this.intercomunicador = intercomunicador;
      this.codigo_acceso = codigo_acceso;
      this.correo = correo;
    }
}
