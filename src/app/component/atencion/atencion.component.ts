import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {
  public atencion;
  public comprobar:boolean;
  public usuario;
  public usuario_editar;
  public normal;
  public normal_public;
  public comprobar_nuevo:boolean;
  public comprobar_atendido:boolean;
  public id_cita;
  public usuario_atendido;
  public inicio:boolean;
  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) { 
  	this.comprobar = false;
  	this.comprobar_nuevo = false;
  	this.comprobar_atendido = false;
  	this.inicio = true;
  }

	ngOnInit(){
		this.obtenerProducto();
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
	obtenerProducto(){
		this.inicio = false;
		this._usuarioService.obtenerAtencion().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].atencion){
						this.atencion = res["mensaje"].atencion;
						this.inicio = true;
					}else{
						this.showError("Alerta","No se encuentran Atenciones");
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
	abrirModal(){
		$('#abrirmodal').modal('show');
	}
	buscarPorDni(dni){
		this._usuarioService.buscarDni(dni).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].dni){
						this.comprobar = true;
						this.usuario = res["mensaje"].dni;
					}else{
						this.showError("Alerta","Ingresar un DNI existente");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	crearCita(dni_ruc,nombre,direccion,monto,descripcion,pago_tipo){
		this._usuarioService.crearCitaService(dni_ruc,nombre,direccion,monto,descripcion,pago_tipo).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.cerrarModal();
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Internet Lento, volver a Intentarlo");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	cerrarModal(){
		this.usuario = [];
		this.comprobar = false;
		$('#abrirmodal').modal('hide');
	}
	eliminarCitaUsuario(codigo_aleatorio){
		this._usuarioService.eliminarCitaService(codigo_aleatorio).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Eliminado");
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Internet Lento, volver a Intentarlo");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	editarUsuario(id){
		this._usuarioService.editarUsuarioCita(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].usuario){
						this.comprobar_nuevo = false;
						$('#abrirmodalEditarUsuario').modal('show');
						this.usuario_editar = res["mensaje"].usuario;
					}else{
						this.showError("Alerta","Internet Lento, volver a Intentarlo");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);	
	}
	actualizarUsuarioEstadoEditar(id,dni_ruc,nombre,direccion,monto,descripcion,pago_tipo){
		this._usuarioService.mandarDatosCitaEditar(id,dni_ruc,nombre,direccion,monto,descripcion,pago_tipo).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.normal_public = "";
						this.normal = "";
						this.usuario_editar = "";
						this.cerrarModalEditarUsuario();
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Internet Lento, volver a Intentarlo");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	cerrarModalEditarUsuario(){
		this.comprobar_nuevo = true;
		$('#abrirmodalEditarUsuario').modal('hide');
	}
	abrirModalAgregarAtendido(id_cita){
		this.id_cita = id_cita;
		$('#atendido').modal('show');
	}
	buscarPorDniAtendido(dni){
		this._usuarioService.buscarDni(dni).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].dni){
						this.comprobar_atendido = true;
						this.usuario_atendido = res["mensaje"].dni;
					}else{
						this.showError("Alerta","Ingresar un DNI existente");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	agregarActualizarUsuarioAtendido(dni,nombre){
		this._usuarioService.actualizarUsuarioAtendido(this.id_cita,dni,nombre).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo = 'success'){
						this.cerrarModalAgregarAtendido();
						this.showSuccess("Alerta","Actualizado");
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Internet Lento, volver a Intentarlo");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);	
	}
	cerrarModalAgregarAtendido(){
		this.id_cita = "";
		this.comprobar_atendido = false;
		$('#atendido').modal('hide');
	}
	mandarCaja(id){
		this._usuarioService.mandarCajaActualizarUsuarioAtendido(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Internet Lento, volver a Intentarlo");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);	
	}
}
