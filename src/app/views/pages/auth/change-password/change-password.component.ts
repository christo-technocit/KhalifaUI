// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation,ElementRef,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service'
import {MatSnackBar} from "@angular/material/snack-bar";
/**
 * ! Just example => Should be removed in development
 */

@Component({
	selector: 'kt-change-password',
	templateUrl: './change-password.component.html',
	//encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	login:any = [];
	data : any = [];
	isLoggedIn$: Observable<boolean>;
	loading : boolean = false;
	private subscriptions: Subscription[] = [];
	private unsubscribe: Subject<any>;
	@ViewChild('userName', { static: true }) userName: ElementRef;
	private returnUrl: any;

	constructor(
			private router: Router,
			private translate: TranslateService,
			private fb: FormBuilder,
			private route: ActivatedRoute,
			private _snackBar: MatSnackBar,private cdr: ChangeDetectorRef,
			private auth : AuthService
	) {
		// this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {

	

		if(localStorage.getItem("Token") != null){
		//	this.router.navigate(['/dashboard']);
	
			this.router.navigate(['/change-password']);
		}

		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params['returnUrl'] || '/';
		//	this.userName = params['email'] || '';
			localStorage.setItem("username",params['UserName'])
			localStorage.setItem("Token",params['Token'])
			//console.log('User Name :'+this.userName);
			//console.log('Local Storage :'+localStorage.getItem("username"));
		
		});

	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// this.unsubscribe.next();
		// this.unsubscribe.complete();
		this.loading = false;
		this.subscriptions.forEach(sb => sb.unsubscribe());

	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		this.loginForm = this.fb.group({
			/* email: ["", Validators.compose([ */
			email: [localStorage.getItem("username"), Validators.compose([
				Validators.required,
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: ["", Validators.compose([
				Validators.required,
			])
			],
			repassword: ["", Validators.compose([
				Validators.required,
			])
			]
		});
	}
setLoadingOff(){
	this.loading = false;
}
	/**
	 * Form Submit
	 */
	submit() {

		let data = [];
		data["username"] = this.loginForm.controls['email'].value;
		data["password"] = this.loginForm.controls['password'].value;
		data["repassword"] = this.loginForm.controls['repassword'].value;

		this.loading = true;
		if (data["password"] != data["repassword"]){
			this._snackBar.open("Password & Re Enter Password Not matching !!!", 'Ok', {
				duration: 5000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center'
			});
			this.loading= false;
			this.userName.nativeElement.click();

		}

		this.subscriptions.push(this.auth.changePassword(data).subscribe((res)=>{
			Promise.resolve(null).then(() => {

			/* if(res[0].UserId != -1){ */
				if(res[0].Result != ''){

					this._snackBar.open("Password Updated Successfully !", 'Ok', {
						duration: 5000,
						verticalPosition: 'bottom',
						horizontalPosition: 'center'



					});
					this.loading= false;

		 	this.subscriptions.push(this.auth.getMenus(data).subscribe((res2) => 
			{
					Promise.resolve(null).then(() => 
					{
					
						if (res2) 
						{
						const propertyValues = Object.values(res2);
						var menus = JSON.stringify(propertyValues);
						
						localStorage.setItem("Token",res[0].UserId);
						localStorage.setItem("menus",menus);
						localStorage.setItem("username",data["username"])
						this.cdr.detectChanges();

						this.router.navigate(['/dashboard']); 

						}
						else
						{
						 this.cdr.detectChanges();
						}
					}
				)
			} 
				)
				)
			}else{

				this._snackBar.open("Invalid username and password!", 'Ok', {
					duration: 5000,
					verticalPosition: 'bottom',
					horizontalPosition: 'center'
				});
				this.loading= false;
				this.userName.nativeElement.click();

			}
		})}))

	}
	
}
