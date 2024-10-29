export class Grupos {

    id_fraccionamiento: number;
    id_grupo: number;
    nombre: string;
    descripcion: string;
    usuarios: number;


    constructor(
        id_fraccionamiento: number,
        id_grupo: number,
        id_persona: number,
        nombre: string,
        descripcion: string,
        usuarios: number
    
    ) {

        this.id_fraccionamiento = id_fraccionamiento;
        this.id_grupo = id_grupo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.usuarios = usuarios;

    }
}



export class usuarios {

    id: any;
    id_persona: any;
    nombre: any;
    apellido_pat: any;
    apellido_mat: any;


    constructor(
        id: any,
        id_persona: any,
        nombre: any,
        apellido_pat: any,
        apellido_mat: any
    
    ) {
        this.id = id;
        this.id_persona = id_persona;
        this.nombre = nombre;
        this.apellido_pat = apellido_pat;
        this.apellido_mat = apellido_mat;

    }
}
