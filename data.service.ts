import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { fraccionamientos, controladores } from '../app/modelos/fraccionamientos';
import { sesion, sesions, usuarios } from '../app/modelos/usuarios'
import { deudas, deuda, deudores, graficas, entradas, historial } from "../app/modelos/deudas"
import { lotes } from '../app/modelos/propiedades';
import { inquilinos } from '../app/modelos/inquilinos';
import { formatDate } from '@angular/common';
import { Personas } from './modelos/personas';
//import { PersonasService } from './consultar-notificaciones/notificaciones.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  sesion = new sesion();
  baseUrl = `https://evaluacionesuas-001-site1.gtempurl.com/Fraccionamientos/Consultar_Fraccionamiento?id_administrador=`;
  baseUrl1 = `https://localhost:44397/api/Personas/Consultar_Persona?id_administrador=`;
  baseUrl2 = `https://localhost:44397/Propiedades/Consultar_Propiedades?id_administrador=`;
  date1: any;
  mes: any;

  constructor(private http: HttpClient) { }

  obtenerPrimerDiaDelMesActual(mes1: any): string {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Establecer la fecha al primer día del mes actual
    fechaActual.setDate(1);

    // Obtener el año, el mes y el día
    const año = fechaActual.getFullYear();

    // mes1;

    if (mes1 == 0) {
      // this.mes = fechaActual.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
      mes1 = fechaActual.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!

    }

    const dia = 1;

    // Formatear la fecha como 'YYYY-MM-DD'
    // const fechaFormateada = `${año}-${this.dosDigitos(mes1)}-${this.dosDigitos(dia)}`;

    const fechaFormateada = `${año}-${this.dosDigitos(mes1)}-01`;

    return fechaFormateada;
  }

  ultimoDiaDelMesActual(mes: any): string {
    // Obtener la fecha actual
    const fecha = new Date();
    // Obtener el último día del mes actual
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    //this.mes = mes;

    if (mes == 0) {
      //  this.mes = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
      mes = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!

    }

    var day = 0;

    if (mes <= 7) {
      day = 31;
      if (mes % 2 == 0) {
        day = 30;
      }
    }
    else {
      day = 30;
      if (mes % 2 == 0) {
        day = 31;
      }
    }

    // Obtener los componentes de la fecha
    const year = ultimoDia.getFullYear();

    const month = (mes).toString().padStart(2, '0'); // Agregar cero inicial si es necesario

    return `${year}-${month}-${day}`;
  }


  mesActual(): string {
    const mes = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const today = new Date();
    return mes[today.getMonth()];
  
  }


  // Función para asegurar que los números de mes y día tengan dos dígitos
  dosDigitos(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  fetchData(id_administrador: any): Observable<fraccionamientos[]> {
    return this.http.get<fraccionamientos[]>(this.baseUrl + id_administrador);
  }

  fetchDataHikvision(id_administrador: any): Observable<controladores[]> {
    return this.http.get<controladores[]>("https://localhost:44397/Hikvision/Consultar_Hikvision?id_fraccionamiento=" + id_administrador);
  }

  //consultar todas las personas que pertenecen a un fraccionamiento
  fetchDataUsers(id_administrador: any): Observable<usuarios[]> {
    return this.http.get<usuarios[]>(this.baseUrl1 + id_administrador);
  }

  fetchDataLastUser(id_administrador: any): Observable<usuarios[]> {
    return this.http.get<usuarios[]>("https://localhost:44397/api/Personas/Consultar_Ultima_Persona?id_fraccionamiento=" + id_administrador);

  }

  fetchDataUserPropierty(id_propietario: any): Observable<usuarios[]> {
    return this.http.get<usuarios[]>("https://localhost:44397/api/Personas/Consultar_Personas_Por_Lote?id_persona=" + id_propietario);

  }

  fetchDataPropiedades(id_administrador: any): Observable<lotes[]> {
    return this.http.get<lotes[]>(this.baseUrl2 + id_administrador);
  }


  fetchDataPersonasLote(id_lote: any): Observable<inquilinos[]> {
    return this.http.get<inquilinos[]>('https://localhost:44397/api/Usuario_lote/Consultar_inquilino?id_lote=' + id_lote);
  }
/*
  fetchDataDeudas(id_tesorero: any): Observable<deudas[]> {
    return this.http.get<deudas[]>('https://localhost:44397/api/Deudas/Consultar_Deuda?id_tesorero=' + id_tesorero);
  }
*/
  fetchDataDeudasExtra(id_tesorero: any, tipo_deuda: any): Observable<deudas[]> {
    return this.http.get<deudas[]>('https://localhost:44397/api/Deudas/Consultar_Deuda?id_tesorero=' + id_tesorero + "&tipo_deuda=" + tipo_deuda);
  }

  fetchDataHistorialDeudas(id_fraccionamiento: any): Observable<historial[]> {
    return this.http.get<historial[]>('https://localhost:44397/api/Deudas/Consultar_HistorialDeudas?id_fraccionamiento=' + id_fraccionamiento);
  }


  fetchDataDeudores(): Observable<deudores[]> {
    return this.http.get<deudores[]>('https://localhost:44397/api/Deudas_Usuario/Consultar_Deudores');
  }

  restringir_acceso(id_deuda: any): Observable<deudores[]> {
    return this.http.get<deudores[]>('https://localhost:44397/api/Deudas_Usuario/Restringir_acceso?id_deuda=' + id_deuda);
  }

  consultarPersonaIndividual(id_usuario: number): Observable<Personas[]> {
    return this.http.get<Personas[]>(`https://localhost:44397/api/Personas/Consultar_PersonaIndividual?id_persona=${id_usuario}`);
  }

  consultarCorreo(id_persona: number): Observable<Personas[]> {
    return this.http.get<Personas[]>(`https://localhost:44397/api/Personas/Obtener_Correo_Persona?id_persona=${id_persona}`);
  }

  iniciar_sesion1(sesion: { username: string, password: string }): Observable<sesions[]> {
    let direccion = "https://localhost:44397/Sesion/Iniciar_Sesion?correo=" + sesion.username + "&contrasenia=" + sesion.password;
    return this.http.get<sesions[]>(direccion);
  }

  async numeroRegistrosTabla(id_fraccionamiento: number, tabla: string) {
    let direccion = "https://localhost:44397/api/ControllerGlobal/Calcular_Registros?id_fraccionamiento=" + id_fraccionamiento + "&tabla=" + tabla;

    const response = await this.http.get(direccion).toPromise();
    return response as any; // Assuming the response is an object

  }

  actualizarHikvision( f: any): Observable<fraccionamientos[]> {


    const url = "https://localhost:44397/Hikvision/Actualizar_Hikvision?id_controlador="+f.id_controlador+"&nombre="+f.nombre+"&user="+f.user+"&password="+f.password+"&port="+f.port+"&ip="+f.oct1+"."+f.oct2+"."+f.oct3+"."+f.oct4;
    return this.http.put<fraccionamientos[]>(url,{});

  }

  consultarDeudasPorCobrar(mes: any): Observable<graficas[]> {
    let direccion = `https://localhost:44397/api/Graficos/Consultar_DeudasPorCobrar?id_fraccionamiento=${this.obtener_usuario(1)}&fecha_inicio=${this.obtenerPrimerDiaDelMesActual(mes)}&fecha_final=${this.ultimoDiaDelMesActual(mes)}`;
    console.log(direccion)
    return this.http.get<graficas[]>(direccion);
  }

  consultarEntradas(mes: any): Observable<entradas[]> {
    let direccion = `https://localhost:44397/api/Graficos/Consultar_Entradas?fecha_inicio=${this.obtenerPrimerDiaDelMesActual(mes)}&fecha_final=${this.ultimoDiaDelMesActual(mes)}`;
    console.log("verr: ", `https://localhost:44397/api/Graficos/Consultar_Entradas?fecha_inicio=${this.obtenerPrimerDiaDelMesActual(mes)}&fecha_final=${this.ultimoDiaDelMesActual(mes)}`)
    return this.http.get<entradas[]>(direccion);
  }

  actualizar_apariencia(dark_mode: number) {
    return this.http.get(`https://localhost:44397/Sesion/Actualizar_apariencia?id_persona=${this.obtener_usuario(1)}&dark_mode=${dark_mode}`);
  }

  eliminarControlador(id_controlador: number): Observable<any> {
    const url = `https://localhost:44397/Hikvision/Eliminar_Hikvision?id_controlador=` + id_controlador;
    return this.http.delete(url);
  }



  /*
    conexion_hikvision(user: string, password: string, port: string, ip: string){
    let direccion = "https://localhost:44397/Sesion/Conexion_Hikvision?ip="+this.obtener_usuario(9)+"&password="+this.obtener_usuario(11)+"&port="+this.obtener_usuario(10)+"&user="+this.obtener_usuario(12);
    return this.http.get<boolean>(direccion);
    }
  
  */
  fecha(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  obtener_usuario(op: number) {
    var data = (JSON.parse(localStorage.getItem("data") || '{}'));
    if (op == 1) {
      return data.id_usuario;
    }
    else if (op == 2) {
      return data.correo;
    } else if (op == 3) {
      return data.id_fraccionamiento;
    } else if (op == 4) {
      return data.id_lote;
    } else if (op == 5) {
      return data.fraccionamiento;
    }
    else if (op == 6) {
      return data.id_tesorero;
    }
    else if (op == 7) {
      return data.tipo_usuario;
    }
    else if (op == 8) {
      return data.nombre;
    }
    else if (op == 9) {
      return data.conexion;
    }
    else if (op == 10) {
      return data.con_nombre;
    }
    else if (op == 11) {
      return data.dark_mode
    }
    else if (op == 12) {
      return data.ip;
    }
    else if (op == 13) {
      return data.client_key;
    }
    else if (op == 14) {
      return data.secret_key;
    }
    /*
  else if(op==8){
    return data.nombre;
  }else if(op==9){
    return data.ip;
  }
  else if(op==10){
    return data.port;
  }
  else if(op==11){
    return data.password;
  }
  else if(op==12){
    return data.user;
  }
   */

  }




  obtener_graficas(op: number) {
    var graficas = (JSON.parse(localStorage.getItem("graficas") || '{}'));
    if (op == 1) {
      return graficas.cuentas_cobrar;
    }
    else if (op == 2) {
      return graficas.sum_variables;
    } else if (op == 3) {
      return graficas.sum_novariables;
    } else if (op == 4) {
      return graficas.variables;
    } else if (op == 5) {
      return graficas.novariables;
    }
    else if (op == 6) {
      return graficas.por_variables;
    }
    else if (op == 7) {
      return graficas.por_novariables;
    }
    else if (op == 8) {
      return graficas.proyeccion_ingresos;
    }
    else if (op == 9) {
      return graficas.mes - 1;
    }
    else if (op == 10) {
      return graficas.egresos;
    }



  }



}

