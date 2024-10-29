export class Usuario {
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    telefono: string;
    fecha_nacimiento: string;
    id_fraccionamiento:string;
    correo:string;
    contrasenia: string;
    confirmarContrasena: string;
    
    
    constructor(
        nombre: string,
        apellido_pat: string,
        apellido_mat: string,
        telefono: string,
        fecha_nacimiento: string,
        contrasenia: string,
        confirmarContrasena: string,
        correo:string,
        id_fraccionamiento:string
    ){
        this.nombre=nombre;
        this.apellido_pat=apellido_pat;
        this.apellido_mat=apellido_mat;
        this.telefono=telefono;
        this.fecha_nacimiento=fecha_nacimiento;
        this.contrasenia=contrasenia;
        this.confirmarContrasena=confirmarContrasena;
        this.correo=correo;
        this.id_fraccionamiento=id_fraccionamiento;
    }
}
