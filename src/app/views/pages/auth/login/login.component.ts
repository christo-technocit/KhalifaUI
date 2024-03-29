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
	selector: 'kt-login',
	templateUrl: './login.component.html',
	//encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
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
			this.router.navigate(['/dashboard']);
		}

		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params['returnUrl'] || '/';
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
			email: ["", Validators.compose([
				Validators.required,
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			] ,
			password: ["", Validators.compose([
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

		this.loading = true;

		if (data["username"] =='' && data["password"]==''){
			this._snackBar.open("Please enter User Name & Password", 'Ok', {
				duration: 5000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center'
			});
			this.loading= false;
			this.userName.nativeElement.click();

		}
		
		this.subscriptions.push(this.auth.loginToApp(data).subscribe((res)=>{
			Promise.resolve(null).then(() => {

			if(res[0].UserId != -1){
				this.subscriptions.push(this.auth.getMenus(data).subscribe((res2) => {
					Promise.resolve(null).then(() => {
					
					if (res2) {
						const propertyValues = Object.values(res2);
						var menus = JSON.stringify(propertyValues);
						
				localStorage.setItem("Token",res[0].UserId);
						localStorage.setItem("menus",menus);
						localStorage.setItem("username",data["username"])
						this.cdr.detectChanges();

		this.router.navigate(['/dashboard']);

					}
					else{
						 this.cdr.detectChanges();
					}
				})}))
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



	mailsubmit() {

		let data = [];
		data["username"] = this.loginForm.controls['email'].value;
		data["email"] = this.loginForm.controls['email'].value;
		//data["subject"] = 'Reset Password';
		//data["message"] = '\change-password';
		//return this.httpClient.get(this.baseUrl+`Mail?Name=${data.username}&Email=${data.email}&Subject=${data.subject}&Message=${data.message}`);

		this.loading = true;


		this.loading = true;
		if (data["username"] == ''){
			this._snackBar.open("Please Enter the User Name", 'Ok', {
				duration: 5000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center'
			});
			this.loading= false;
			this.userName.nativeElement.click();

		}
		
		this.subscriptions.push(this.auth.resetPassword(data["username"]).subscribe((res)=>{
			console.log(res);
			Promise.resolve(null).then(() => {


this._snackBar.open("Password Sent to your Mail ID!", 'Ok', {
	duration: 5000,
	verticalPosition: 'bottom',
	horizontalPosition: 'center'
});
this.loading= false;
this.userName.nativeElement.click();

	

		})}))

	}

	
}
