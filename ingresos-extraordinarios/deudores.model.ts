export class Deudores {
    id_deudor: number;
    id_deuda: number;
    id_fraccionamiento: number;
    nombre_persona:string;
    tipo_deuda: string;
    nombre_deuda: string;
    monto: number;
    recargo:number;
    dias_gracia:number;
    proximo_pago:string;
    estado:string;
    periodicidad:number;
    constructor( 
        id_deudor: number,
        id_deuda: number,
        id_fraccionamiento: number,
        nombre_persona:string,
        tipo_deuda: string,
        nombre_deuda: string,
        monto: number,
        recargo:number,
        dias_gracia:number,
        proximo_pago:string,
        estado:string,
        periodicidad:number)
        {
        this.id_deudor=id_deudor,
        this.id_deuda=id_deuda,
        this.id_fraccionamiento=id_fraccionamiento,
        this.nombre_persona=nombre_persona,
        this.tipo_deuda=tipo_deuda,
        this.nombre_deuda=nombre_deuda,
        this.monto=monto,
        this.recargo=recargo,
        this.dias_gracia=dias_gracia,
        this.proximo_pago=proximo_pago,
        this.estado=estado,
        this.periodicidad=periodicidad

        }
}
