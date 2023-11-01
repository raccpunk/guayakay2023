import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { AlmacenamientoService } from '../almacenamiento/almacenamiento.service'

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private apiUrl: string = environment.apiURL;
  private headers = { 'Content-Type': 'application/json' }

  private endPoints: any = {

    AUTH: {
      login: '/api/auth/login'
    },

    ENTRADAS: {
      lista: '/api/entradas/lista',
      listaAll: '/api/entradas/lista/all',
      registrar: '/api/entradas/registra',
      actualizar: '/api/entradas/actualiza',
      detalle: '/api/entradas/detalle',
      status: '/api/entradas/estatus',
      asigna_maquina: '/api/entradas/asigna_maquina',
      estados: '/api/entradas/produccion/estados',
      terminada: '/api/entradas/lista/terminadas',
      Entrada_Usuario: '/api/entradas/lista/maquina'
  
    },

    MAQUINA: {
      lista: '/api/maquinas/lista',
      listaAll: '/api/maquinas/lista/all',
      registrar: '/api/maquinas/registra',
      actualizar: '/api/maquinas/actualiza',
      status: '/api/maquinas/estatus',
      Maquina_usuario: '/api/maquinas/lista/usuario'
    },

    CLIENTE: {
      lista: '/api/clientes/lista',
      listaAll: '/api/clientes/lista/all',
      registrar: '/api/clientes/registra',
      actualizar: '/api/clientes/actualiza',
      status: '/api/clientes/estatus'
    },

    USUARIO: {
      lista: '/api/usuarios/lista',
      listaAll: '/api/usuarios/lista/all',
      registrar: '/api/usuarios/registra',
      actualizar: '/api/usuarios/actualiza',
      status: '/api/usuarios/estatus',
      asigna_maquina: '/api/usuarios/asigna_maquina'
    },

    BORDADO: {
      lista: '/api/bordados/lista',
      listaAll: '/api/bordados/lista/all',
      registrar: '/api/bordados/registra',
      actualizar: '/api/bordados/actualiza',
      status: '/api/bordados/estatus',
      detalle: '/api/bordados/detalle',
      lista_cliente: '/api/bordados/lista/cliente'

    },
    CABEZAL: {
      lista: '/api/cabezales/lista',
      listaAll: '/api/cabezales/lista/all',

    },
    TECNICA: {
      lista: '/api/tecnicas/lista',
      listaAll: '/api/tecnicas/lista/all',

    },
    COBRO: {
      // lista: '/api/bordados/lista',
      listaAll: '/api/cobros/lista/all',
      registrar: '/api/cobros/registra',
      actualizar: '/api/cobros/actualiza',
      status: '/api/cobros/estatus',
      detalle: '/api/cobros/detalle',
      lista_cliente: '/api/cobros/lista/pagar/cliente'

    },
    PAGO: {
      registrar: '/api/pagos/registra',
      lista: '/api/pagos/lista',
    }

  };

  constructor(
    private http: HttpClient,
    public serAlmacen: AlmacenamientoService
  ) { }

  //auth
  public login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + this.endPoints.AUTH.login, data, { headers: this.headers });
  }
  //pagos
  public PagosRegistrar(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.PAGO.registrar, data, { headers: secure_headers });
  }
  public pagosLista(id: any,): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.PAGO.lista}/${id}`, { headers: secure_headers });
  }
  //cobros
  public CobrosListaClientes(id: any,): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.COBRO.lista_cliente}/${id}`, { headers: secure_headers });
  }
  public CobrosRegistrar(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.COBRO.registrar, data, { headers: secure_headers });
  }
  public CobrosDetalle(id: any,): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.COBRO.detalle}/${id}`, { headers: secure_headers });
  }
  //Entradas
  public EntradasLista(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.ENTRADAS.lista, { headers: secure_headers });
  }
  public EntradasListaAll(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.ENTRADAS.listaAll, { headers: secure_headers });
  }
  public EntradaRegistrar(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.ENTRADAS.registrar, data, { headers: secure_headers });
  }
  public EntradaActualiza(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.put<any>(`${this.apiUrl}${this.endPoints.ENTRADAS.actualizar}/${id}`, data, { headers: secure_headers });
  }
  public EntradaDetalle(id: any,): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.ENTRADAS.detalle}/${id}`, { headers: secure_headers });
  }
  public EntradaMaquina(id: any,): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.ENTRADAS.Entrada_Usuario}/${id}`, { headers: secure_headers });
  }
  public EntradaStatus(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.patch<any>(`${this.apiUrl}${this.endPoints.ENTRADAS.status}/${id}`, data, { headers: secure_headers });
  }
  public Entradaasigna_maquina(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.ENTRADAS.asigna_maquina, data, { headers: secure_headers });
  }
  public EntradaEstados(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.ENTRADAS.estados, data, { headers: secure_headers });
  }
  public EntradaTerminada(id: any,): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.ENTRADAS.terminada}/${id}`, { headers: secure_headers });
  }


  //maquinas
  public maquinaLista(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.MAQUINA.lista, { headers: secure_headers });
  }
  public maquinaListaAll(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.MAQUINA.listaAll, { headers: secure_headers });
  }
  public maquinaRegistrar(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.MAQUINA.registrar, data, { headers: secure_headers });
  }
  public maquinaActualiza(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.put<any>(`${this.apiUrl}${this.endPoints.MAQUINA.actualizar}/${id}`, data, { headers: secure_headers });
  }
  public maquinaUsuario(id: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.MAQUINA.Maquina_usuario}/${id}`, { headers: secure_headers });
  }
  public maquinaStatus(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.patch<any>(`${this.apiUrl}${this.endPoints.MAQUINA.status}/${id}`, data, { headers: secure_headers });
  }

  //Clientes
  public ClienteLista(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.CLIENTE.listaAll, { headers: secure_headers });
  }
  public ClienteListaR(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.CLIENTE.lista, { headers: secure_headers });
  }
  public ClienteRegistrar(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.CLIENTE.registrar, data, { headers: secure_headers });
  }
  public ClienteActualiza(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.put<any>(`${this.apiUrl}${this.endPoints.CLIENTE.actualizar}/${id}`, data, { headers: secure_headers });
  }
  public ClienteStatus(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.patch<any>(`${this.apiUrl}${this.endPoints.CLIENTE.status}/${id}`, data, { headers: secure_headers });
  }

  //usuario
  public usuarioLista(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.USUARIO.listaAll, { headers: secure_headers });
  }
  public UsuarioRegistrar(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.USUARIO.registrar, data, { headers: secure_headers });
  }
  public UsuarioMaquina(data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.post<any>(this.apiUrl + this.endPoints.USUARIO.asigna_maquina, data, { headers: secure_headers });
  }
  public UsuarioActualiza(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.put<any>(`${this.apiUrl}${this.endPoints.USUARIO.actualizar}/${id}`, data, { headers: secure_headers });
  }
  public UsuarioStatus(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.patch<any>(`${this.apiUrl}${this.endPoints.USUARIO.status}/${id}`, data, { headers: secure_headers });
  }

  //Bordado
  public BordadoLista(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.BORDADO.listaAll, { headers: secure_headers });
  }
  public BordadoListap(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.BORDADO.lista, { headers: secure_headers });
  }
  public BordadoRegistrar(data: any): Observable<any> {
    let secure_headers = this.secureHeaderfile();
    return this.http.post<any>(this.apiUrl + this.endPoints.BORDADO.registrar, data, { headers: secure_headers });
  }
  public BordadoActualiza(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeaderfile();
    return this.http.put<any>(`${this.apiUrl}${this.endPoints.BORDADO.actualizar}/${id}`, data, { headers: secure_headers });
  }
  public BordadoStatus(id: any, data: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.patch<any>(`${this.apiUrl}${this.endPoints.BORDADO.status}/${id}`, data, { headers: secure_headers });
  }

  public BordadoCliente(id: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.BORDADO.lista_cliente}/${id}`, { headers: secure_headers });
  }
  public BordadoDetalle(id: any): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(`${this.apiUrl}${this.endPoints.BORDADO.detalle}/${id}`, { headers: secure_headers });
  }

  //Cabezal
  public CabezalLista(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.CABEZAL.lista, { headers: secure_headers });
  }
  //Tecnica
  public TecnicaLista(): Observable<any> {
    let secure_headers = this.secureHeader();
    return this.http.get<any>(this.apiUrl + this.endPoints.TECNICA.lista, { headers: secure_headers });
  }
  //metodo para mandar token
  private secureHeader() {
    let seguridad: any = this.serAlmacen.obtenDatos(this.serAlmacen.cookies.seguridad);
    let secure_headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + seguridad.token }

    return secure_headers;
  }
  private secureHeaderfile() {
    let seguridad: any = this.serAlmacen.obtenDatos(this.serAlmacen.cookies.seguridad);
    let secure_headers = { 'Authorization': 'Bearer ' + seguridad.token }

    return secure_headers;
  }
}
