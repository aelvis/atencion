import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'nav-component',
	templateUrl: 'partial.component.html',
	styleUrls: ['partial.component.css']
})

export class NavAdminComponent implements OnInit{
	constructor(private _router:Router){

	}
	ngOnInit(){
	}
	finalizar(){
		localStorage.clear();
		this._router.navigate(['/login']);
	}
}