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
  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) { 
  	this.comprobar = false;
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
		this._usuarioService.obtenerAtencion().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].atencion){
						this.atencion = res["mensaje"].atencion;
					}else{
						this.atencion = "No hay productos...";
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
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

	cerrarModal(){
		this.usuario = [];
		this.comprobar = false;
		$('#abrirmodal').modal('hide');
	}
}
