export class HDeuda {

    id: number;
    id_deudor: number;
    id_deuda: number;
    id_fraccionamiento: number;
    nombre_persona: string;
    lote: number;
    tipo_deuda: string;
    nombre_deuda: string;
    monto: number;
    recargo: number;
    dias_gracia: number;
    estado: string;
    periodicidad: number;
    periodo: string;
  
    constructor(id: number,
        id_deudor: number,
        id_deuda: number,
        id_fraccionamiento: number,
        nombre_persona: string,
        lote: number,
        tipo_deuda: string,
        nombre_deuda: string,
        monto: number,
        recargo: number,
        dias_gracia: number,
        estado: string,
        periodicidad: number,
        periodo: string) {
      this.id = id;
      this.id_deudor = id_deudor;
      this.id_deuda = id_deuda;
      this.id_fraccionamiento = id_fraccionamiento;
      this.nombre_persona = nombre_persona;
      this.lote = lote;
      this.tipo_deuda = tipo_deuda;
      this.nombre_deuda = nombre_deuda;
      this.monto = monto;
      this.recargo = recargo;
      this.dias_gracia = dias_gracia;
      this.estado = estado;
      this.periodicidad = periodicidad;
      this.periodo = periodo;
    }
}
