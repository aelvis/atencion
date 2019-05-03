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
	obtenerPacientes(){
		let params = new HttpParams();
		params = params.append('nuevo', 'nuevo');
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/obtenerPacientes', params, {headers: headers});
	}
	agregarPacientes(nombre_text,dni_text,direccion_test,codigo_text){
		let params = new HttpParams();
		params = params.append('nombre_text', nombre_text);
		params = params.append('dni_text', dni_text);
		params = params.append('direccion_test', direccion_test);
		params = params.append('codigo_text', codigo_text);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/agregarPacientes', params, {headers: headers});
	}
	editarPacientes(id,actualizar,codigo){
		let params = new HttpParams();
		if(codigo == '1'){
			params = params.append('actualizar', actualizar);
			params = params.append('columna', 'nombre');
			params = params.append('cdox', id);
		}
		if(codigo == '2'){
			params = params.append('actualizar', actualizar);
			params = params.append('columna', 'dni');
			params = params.append('cdox', id);
		}
		if(codigo == '3'){
			params = params.append('actualizar', actualizar);
			params = params.append('columna', 'direccion');
			params = params.append('cdox', id);
		}if(codigo == '4'){
			params = params.append('actualizar', actualizar);
			params = params.append('columna', 'codigo');
			params = params.append('cdox', id);
		}
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/actualizarPaciente', params, {headers: headers});
	}
	buscarDni(dni){
		let params = new HttpParams();
		params = params.append('dni_ruc', dni);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/buscarDni', params, {headers: headers});
	}
	buscarPaciente(nombre){
		let params = new HttpParams();
		params = params.append('nombre', nombre);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/buscarPacienteNombre', params, {headers: headers});
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
	actualizarUsuarioAtendido(cdox,peso,talla,temperatura,fr,fc,porque_cita){
		let params = new HttpParams();
		params = params.append('cdox', cdox);
		params = params.append('peso', peso);
		params = params.append('talla', talla);
		params = params.append('temperatura', temperatura);
		params = params.append('fr', fr);
		params = params.append('fc', fc);
		params = params.append('porque_cita', porque_cita);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/actualizarUsuarioAtencion', params, {headers: headers});
	}
	actualizarUsuarioAtendidoGeneral(cdox,id_paciente){
		let params = new HttpParams();
		params = params.append('cdox', cdox);
		params = params.append('paciente', id_paciente);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/actualizarUsuarioAtencionGeneral', params, {headers: headers});
	}
	mandarCajaActualizarUsuarioAtendido(cdox){
		let params = new HttpParams();
		params = params.append('cdox', cdox);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/atencion/mandarCajaUsuarioAtencion', params, {headers: headers});
	}
}