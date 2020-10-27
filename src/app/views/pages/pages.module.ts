// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { UserManagementModule } from './user-management/user-management.module';
import { MyPageComponent } from './my-page/my-page.component';
import { EFormsModule } from './form-management/eforms.module';
import { NumberOnlyDirective } from './directives/number-only.directive';

@NgModule({
	declarations: [MyPageComponent, NumberOnlyDirective],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		UserManagementModule,
		EFormsModule
	],
	providers: []
})
export class PagesModule {
}
