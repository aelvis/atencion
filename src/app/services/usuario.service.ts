import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GLOBAL } from './global';	

@Injectable()
export class UsuarioService{

	public url: string;
	public token;
	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}
	login(user_to_login, gettoken = null){
		if(gettoken != null){
			user_to_login.gettoken = gettoken;
		}
		let params = JSON.stringify(user_to_login);
		let headers = new HttpHeaders({'Content-Type':'application/json'});
		return this._http.post(this.url+'/login/auth/login', params, {headers: headers});
	}
	getToken(){
		let token = localStorage.getItem('token');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}
	obtenerAtencion(){
		let params = new HttpParams();
		params = params.append('nuevo', 'nuevo');
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/obtenerAtencionDiaria', params, {headers: headers});
	}
	buscarDni(dni){
		let params = new HttpParams();
		params = params.append('dni_ruc', dni);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/buscarDni', params, {headers: headers});
	}
	crearCitaService(dni_ruc,nombre,direccion,monto,descripcion,pago_tipo){
		let params = new HttpParams();
		params = params.append('dni_ruc', dni_ruc);
		params = params.append('nombre', nombre);
		params = params.append('direccion', direccion);
		params = params.append('monto', monto);
		params = params.append('descripcion', descripcion);
		params = params.append('tipo_pago', pago_tipo);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/crearCita', params, {headers: headers});
	}
	eliminarCitaService(codigo_aleatorio){
		let params = new HttpParams();
		params = params.append('codigo_aleatorio', codigo_aleatorio);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/eliminarCita', params, {headers: headers});
	}
	editarUsuarioCita(codigo_aleatorio){
		let params = new HttpParams();
		params = params.append('codigo_aleatorio', codigo_aleatorio);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/obtenerEditarCita', params, {headers: headers});
	}
	mandarDatosCitaEditar(cdox,dni_ruc,nombre,direccion,monto,descripcion,pago_tipo){
		let params = new HttpParams();
		params = params.append('cdox', cdox);
		params = params.append('dni_ruc', dni_ruc);
		params = params.append('nombre', nombre);
		params = params.append('direccion', direccion);
		params = params.append('monto', monto);
		params = params.append('descripcion', descripcion);
		params = params.append('pago_tipo', pago_tipo);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/editarUsuarioCita', params, {headers: headers});
	}
	actualizarUsuarioAtendido(cdox,dni,nombre){
		let params = new HttpParams();
		params = params.append('cdox', cdox);
		params = params.append('dni', dni);
		params = params.append('nombre', nombre);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/actualizarUsuarioAtencion', params, {headers: headers});
	}
	mandarCajaActualizarUsuarioAtendido(cdox){
		let params = new HttpParams();
		params = params.append('cdox', cdox);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/mandarCajaUsuarioAtencion', params, {headers: headers});
	}
}