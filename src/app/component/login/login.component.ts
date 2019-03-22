import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { GLOBAL } from '../../services/global';
import { UsuarioService } from '../../services/usuario.service';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit{
	public usuario: Usuario;
	public identity;
	public token;
	public verify;
	public codigo: string;
	public mensaje: string;
	public alerta: boolean;
	constructor(private _route: ActivatedRoute, private _router: Router, private _usuarioService: UsuarioService){
		this.usuario = new Usuario('','','','');
		this.alerta = false;	
	}
	ngOnInit(){
	if(this._usuarioService.getToken()){
	    this._router.navigate(['/inicio']);
	}
	}
	onSubmit(){
		this._usuarioService.login(this.usuario).subscribe( 
			response => {
				this.identity = response["respuesta"];
				if(!this.identity || !response["respuesta"].datos){
					this.codigo = 'danger';
					this.mensaje = 'Datos ingresados Incorrectos';
					this.alerta = true;
				}else{
					localStorage.setItem('identity', JSON.stringify(this.identity.datos));
					this._usuarioService.login(this.usuario, 'true').subscribe(
						response => {
							if(response["respuesta"].activado){
								this.token = response["respuesta"].token;
								if(this.token.length <= 0){
									this.codigo = response["respuesta"].codigo;
						            this.mensaje = response["respuesta"].msg;
						            this.alerta = true;
								}else{
									localStorage.setItem('token',this.token);
									this.codigo = response["respuesta"].codigo;
						            this.mensaje = response["respuesta"].msg;
						            this._router.navigate(['/inicio']);
								}
							}else{
								this.token = response["respuesta"].token;
								if(this.token.length <= 0){
									this.codigo = 'danger';
						            this.mensaje = 'Volver a Intentarlo';
						            this.alerta = true;
								}else{
									localStorage.setItem('token',this.token);
									this.codigo = response["respuesta"].codigo;
						            this.mensaje = response["respuesta"].msg;
						            this._router.navigate(['/inicio']);
								}
							}
						},
						error => {
							var errorMensaje = <any>error;
							if(errorMensaje != null){
								var body = JSON.parse(error._body);
								this.codigo = body.respuesta.codigo;
								this.mensaje = body.respuesta.msg;
								this.alerta = true;
							}
						}
					);
				}
			},
			error => {
				var errorMensaje = <any>error;
				if(errorMensaje != null){
					var body = JSON.parse(error._body);
					this.codigo = body.respuesta.codigo;
					this.mensaje = body.respuesta.msg;
					this.alerta = true;
				}
			}
		);
	}
}