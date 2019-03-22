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
	obtenerProducto(){
		let params = new HttpParams();
		params = params.append('nuevo', 'nuevo');
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/obtenerProductos', params, {headers: headers});
	}
	registrarProducto(nombre,descripcion){
		let params = new HttpParams();
		params = params.append('producto', nombre);
		params = params.append('incluir', descripcion);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/registrarProducto', params, {headers: headers});	
	}
	activarProducto(id){
		let params = new HttpParams();
		params = params.append('producto', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/activarProducto', params, {headers: headers});	
	}
	desactivarProducto(id){
		let params = new HttpParams();
		params = params.append('producto', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/desactivarProducto', params, {headers: headers});	
	}
	buscarProductoNombre(nombre){
		let params = new HttpParams();
		params = params.append('nombre', nombre);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/buscarProductoNombre', params, {headers: headers});	
	}
	buscarProductoCodigo(codigo){
		let params = new HttpParams();
		params = params.append('codigo', codigo);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/buscarProductoCodigo', params, {headers: headers});	
	}
	obtenerProductosEditar(id){
		let params = new HttpParams();
		params = params.append('id_nuevo', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/obtenerProductosEditar', params, {headers: headers});	
	}
	actualizarProductosEditar(id,nombre,barras,descripcion){
		let params = new HttpParams();
		params = params.append('id', id);
		params = params.append('nombre', nombre);
		params = params.append('barras', barras);
		params = params.append('descripcion', descripcion);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/actualizarProducto', params, {headers: headers});	
	}
	agregarSucursalesProductosEditar(stock,sucursal,id){
		let params = new HttpParams();
		params = params.append('id', id);
		params = params.append('stock', stock);
		params = params.append('sucursal', sucursal);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/agregarSucursalesProductosEditar', params, {headers: headers});	
	}
	actualizarSucursalesProductosEditar(stock,id){
		let params = new HttpParams();
		params = params.append('id', id);
		params = params.append('stock', stock);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/actualizarSucursalesProductosEditar', params, {headers: headers});	
	}
	activarProductoSucursalEditar(id){
		let params = new HttpParams();
		params = params.append('producto', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/activarProductoSucursalEditar', params, {headers: headers});	
	}
	desactivarProductoSucursalEditar(id){
		let params = new HttpParams();
		params = params.append('producto', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/desactivarProductoSucursalEditar', params, {headers: headers});	
	}
	obtenerPreciosProductoSucursales(id){
		let params = new HttpParams();
		params = params.append('psi', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/obtenerPreciosProductoSucursales', params, {headers: headers});	
	}
	activarProductoSucursalEditarPrecio(id){
		let params = new HttpParams();
		params = params.append('producto_unidad', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/activarProductoUnidad', params, {headers: headers});	
	}
	desactivarProductoSucursalEditarPrecio(id){
		let params = new HttpParams();
		params = params.append('producto_unidad', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/desactivarProductoUnidad', params, {headers: headers});	
	}
	actualizarProductoSucursalEditarPrecio(precio,id){
		let params = new HttpParams();
		params = params.append('id', id);
		params = params.append('precio', precio);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/actualizarProductoUnidad', params, {headers: headers});	
	}
	agregarSucursalesPrecioProductosEditar(producto_sucursal_id,unidad_agregar,precio,id_producto,sucursal_id){
		let params = new HttpParams();
		params = params.append('producto', id_producto);
		params = params.append('precio', precio);
		params = params.append('unidad', unidad_agregar);
		params = params.append('sucursal', sucursal_id);
		params = params.append('producto_sucursal', producto_sucursal_id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/productos/producto/agregarProductoUnidad', params, {headers: headers});	
	}
}