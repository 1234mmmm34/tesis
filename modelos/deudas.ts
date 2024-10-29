export interface entradas {
    id_entrada: any,
    fecha: any,
    nombre: any
    };
    
export interface deudas {
    id_deudas: any,
    id_fraccionamiento: any,
    id_tesorero: any,
    monto: any,
    nombre: any,
    descripcion: any,
    dias_gracia: any,
    periodicidad: any,
    recargo: any,
    proximo_pago1: any,
    proximo_pago: any,
    nombre_deudor: any

    };
    
    export class deuda {
        id_deudas: any;
        id_fraccionamiento: any;
        id_tesorero: any;
        monto: any;
        nombre: any;
        descripcion: any;
        dias_gracia: any;
        periodicidad: any;
        recargo: any;
        proximo_pago1: any;
        proximo_pago: any

        };


        
export interface deudores {
    id_deuda: any;
    concepto: any;
    persona: any; 
    monto: any;
    proximo_pago1: any;
    proximo_pago: any,

    };
    
    export class deudor {
        id_deuda: any;
        concepto: any;
        persona: any;
        monto: any;
        proximo_pago1: any;
        proximo_pago: any

        };
        

        export interface graficas {
            cuentas_cobrar: any,
            sum_variables: any,
            sum_novariables: any,
            variables: any,
            novariables: any,
            por_variables: any,
            por_novariables: any,
            proyeccion_ingresos: any;
            mes: any;
            egresos: any;
            };

            export interface historial {
                id_deuda: any,
                nombre_persona: any,
                tipo_deuda: any,
                nombre_deuda: any,
                monto: any,
                recargo: any,
                estado: any,
                comprobante: any
                };