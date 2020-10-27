import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router , NavigationStart , Scroll } from '@angular/router';
import {SplashScreenService} from "./core/services/splash-screen-service";

//import {SplashScreenService} from "@services/splash-screen.service";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	title = 'Khalifa University';
	loader: boolean = true;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	constructor(
				private router: Router,
				private splashService : SplashScreenService
				) {

	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// enable/disable loader

		const routerSubscription = this.router.events.subscribe(event => {

			if(event instanceof  NavigationStart){
				this.splashService.splashScreen({
					isLoading : true,
					message : "LOADING"
				})
			}
			if(event instanceof  Scroll){
				this.splashService.splashScreen({
					isLoading : false,
					message : "LOADING"
				})
			}

			if (event instanceof NavigationEnd) {
				// hide splash screen
				//this.splashScreenService.hide();
               //this.loader = false;
				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
