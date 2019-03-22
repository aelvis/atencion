import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from './usuario.service';


@Injectable()
export class AdminGuard implements CanActivate{
	constructor(private _usuarioService: UsuarioService, private _router: Router){

	}
	canActivate(){
		let identity = this._usuarioService.getToken();
		if(identity){
			return true;
		}else{
			this._router.navigate(['/login']);
			return false;
		}
	}
}