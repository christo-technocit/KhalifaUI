import { AfterViewInit, AfterViewChecked } from '@angular/core';
// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';


import { SubheaderService } from '../../../../../core/_base/layout';
import {VitamindService} from "../../../../../core/services/vitamind.form.service";
import {SplashScreenService} from "../../../../../core/services/splash-screen-service";


@Component({
	selector: 'kt-types',
	templateUrl: './types.component.html'
})
export class TypesComponent implements OnInit {
	// Table fields
	loading$: boolean = true;

	constructor(
		private activatedRoute: ActivatedRoute,
		private _vService : VitamindService,
		private router: Router,
		private subheaderService: SubheaderService,
		private splashService : SplashScreenService,
		private cdr: ChangeDetectorRef) { }




	ngOnInit() {
		this.subheaderService.setTitle('Precision Medicine in Type 2 Diabetes');

	}




}
