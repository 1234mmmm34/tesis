export class Proveedor {
    id_proveedor: number;
    id_fraccionamiento: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    tipo: string;
    direccion: string;
    funcion: string;
  
    constructor(
      id_proveedor: number,
      id_fraccionamiento: number,
      nombre: string,
      apellido_paterno: string,
      apellido_materno: string,
      telefono: string,
      tipo: string,
      direccion: string,
      funcion: string
    ) {
      this.id_proveedor = id_proveedor;
      this.id_fraccionamiento = id_fraccionamiento;
      this.nombre = nombre;
      this.apellido_paterno = apellido_paterno;
      this.apellido_materno = apellido_materno;
      this.telefono = telefono;
      this.tipo = tipo;
      this.direccion = direccion;
      this.funcion = funcion;
    }
}
