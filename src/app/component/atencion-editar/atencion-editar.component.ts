import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atencion-editar',
  templateUrl: './atencion-editar.component.html',
  styleUrls: ['./atencion-editar.component.css']
})
export class AtencionEditarComponent implements OnInit {
	public inicio:boolean;
	public paciente;
 	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) { 
 		this.inicio = true;
  	}

	ngOnInit(){
		this.obtenerUsuarios();
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
  	obtenerUsuarios(){
		this.inicio = false;
		this._usuarioService.obtenerPacientes().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].paciente){
						this.paciente = res["mensaje"].paciente;
						this.inicio = true;
					}else{
						this.showError("Alerta","No se encuentran Pacientes");
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
  	agregarModalPaciente(){
  		$('#paciente_datos').modal('show');
  	}
	cerrarModalAgregarPaciente(){
		$('#paciente_datos').modal('hide');
	}
	agregarPacienteBd(nombre_text,dni_text,direccion_test,codigo_text){
		this.inicio = false;
		this._usuarioService.agregarPacientes(nombre_text,dni_text,direccion_test,codigo_text).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Agregado Correctamente");
						this.inicio = true;
						$('#nombre_text').val('');
						$('#dni_text').val('');
						$('#direccion_text').val('');
						$('#codigo_text').val('');
						this.obtenerUsuarios();

					}else{
						this.showError("Alerta",res["mensaje"].msg);
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
	editarPacientes(id,actualizar,codigo){
		this.inicio = false;
		this._usuarioService.editarPacientes(id,actualizar,codigo).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se actualizó Correctamente");
						this.inicio = true;
					}else{
						this.showError("Alerta",res["mensaje"].msg);
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
	buscarPorNombre(nombre_buscar){
		this.inicio = false;
		this.paciente = [];
		this._usuarioService.buscarPaciente(nombre_buscar).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].paciente){
						this.paciente = res["mensaje"].paciente;
						this.inicio = true;
					}else{
						this.showError("Alerta","No se encuentran Pacientes");
						this.paciente = [];
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
}
