// Angular
import { AfterViewInit, Component, Input, OnDestroy, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// RxJS
import { Subscription } from 'rxjs';
// Layout
import { SubheaderService } from '../../../../../core/_base/layout';
import { Breadcrumb } from '../../../../../core/_base/layout/services/subheader.service';

@Component({
	selector: 'kt-subheader1',
	templateUrl: './subheader1.component.html',
	styleUrls: ['./subheader1.component.scss']
})
export class Subheader1Component implements OnInit, OnDestroy, AfterViewInit {
	// Public properties
	@Input() fluid: boolean;
	@Input() clear: boolean;

	today: number = Date.now();
	title: string = '';
	username: string = '';
	desc: string = '';
	showPrint : boolean = false;
	breadcrumbs: Breadcrumb[] = [];

	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
	constructor(public subheaderService: SubheaderService,private router: Router,  public cd: ChangeDetectorRef) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
	}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
			// breadcrumbs title sometimes can be undefined
			if (bt) {
				Promise.resolve(null).then(() => {
					this.title = bt.title;
					this.desc = bt.desc;
					this.username =localStorage.getItem('username');// this.user();
				});
			}
		}));

		this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
			Promise.resolve(null).then(() => {
				this.breadcrumbs = bc;
			});
		}));

		this.subheaderService.print$.subscribe(res => {
			this.showPrint = res;
			// this.cd.detectChanges();
		})


	}


	signOut(){
		localStorage.clear();
		// window.location.reload();
		location.reload(true);
		this.router.navigate(['/login'])

	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {

		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
