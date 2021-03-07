// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';
import { MyPageComponent } from './views/pages/my-page/my-page.component';

const routes: Routes = [
	{ path: '', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule) },
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'form-management',
				loadChildren: () => import('app/views/pages/form-management/eforms.module').then(m => m.EFormsModule)
			},
/* 	{
		path: 'osteoporosis',
				loadChildren: () => import('app/views/pages/form-management/osteoporosis/osteoporosis.module').then(m => m.OsteoporosisModule)
	},
 */
			// {
			// 	path: 'substance-dependence',
			// 	loadChildren: () => import('app/views/pages/substance-dependence/substance-dependence.module').then(m => m.SubstanceDependenceModule)
			// },
			// {
			// 	path: 'vitamin-d',
			// 	loadChildren: () => import('app/views/pages/vitamin-d/vitamin-d.module').then(m => m.VitaminDModule)
			// },
			// {
			// 	path: 'reporting-tool',
			// 	loadChildren: () => import('app/views/pages/reporting-tool/reporting-tool.module').then(m => m.ReportingToolModule)
			// },
			{
				path: 'user-management',
				loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
			},
			{
				path: 'my-page',
				component: MyPageComponent
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			//{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
		]
	},

	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
