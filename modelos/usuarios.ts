export class sesion {
    username: any;
    password: any;
    correo: any;
    ppassword: any;
    mensaje: any;
    town: any;


};

    export interface sesions {
    //    username: any;
    //    password: any;
    correo: string;
    id_usuario: number;
    tipo_usuario: string;
    username: string;
    password: string;
    ppassword: string;
    mensaje: any;
    town: any;

        };
    

        export class usuario {
            id_persona: number | undefined;
            nombre: string | undefined;
            apellido_pat: string | undefined;
            apellido_mat: string | undefined;
            id_fraccionamiento: number | undefined;
            tipo_usuario: string | undefined;
            telefono: string | undefined;
            fecha_nacimiento: Date | undefined;
            correo: string | undefined;
            contrasenia: string | undefined;
            confirmarContrasena: string | undefined;
            Intercomunicador: string | undefined;
            Codigo_Acceso: string | undefined;
            id_lote: number | undefined;
            acceso: string | undefined;

    
        };

        export interface usuarios {
            id_persona: number;
            nombre: string;
            apellido_pat: string;
            apellido_mat: string;
            id_fraccionamiento: number;
            tipo_usuario: string;
            telefono: string;
            fecha_nacimiento: Date;
            Intercomunicador: string;
            Codigo_Acceso: string;
            correo: string;
            contrasenia: string;
            id_lote: number;
            acceso: string;
    
        };