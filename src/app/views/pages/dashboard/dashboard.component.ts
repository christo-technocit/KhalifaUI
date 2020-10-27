import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { SubheaderService } from '../../../core/_base/layout';
import {VitamindService} from "@services/vitamind.form.service";

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

	lastQuery = {
		filter :  '',
		sortOrder : 2,
		sortField : 1,
		pageNumber : 0,
		pageSize : 10,
		templateId : 1,
		totalRecords : 0
	};
   currentIndex = 0;
	 data = [];

     tempName = [
		 {name : "Metabolic Disorder" , tempId : 1, link : 'metabolic-disorder'},
		 {name : "Substance Dependence" , tempId : 2, link : 'substance-dependence'},
		 {name : "Vitamin-D" , tempId : 4, link : 'vitamin-d'},
		 {name : "1000 Arab Genome" , tempId : 5, link : '1000-arab-genome'},
		 {name : "Obesity" , tempId : 6, link : 'obesity'},
		 {name : "Osteoporosis" , tempId : 7, link : 'osteoporosis'},
		 {name : "T1D" , tempId : 8, link : 't1d'},
		 {name : "Emirates Family Registry" , tempId : 9, link : 'new-form'},
		 {name : "Precision Medicine" , tempId : 10, link : 'hsa'},
		 {name : "COVID-19" , tempId : 11, link : 'covid19'}
	 ]
	displayedColumns = [ 'id', '1', '2', 'actions'];
	constructor(private subheaderService: SubheaderService,private _vService : VitamindService,private cdr: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.subheaderService.setTitle('Dashboard');
		this.subheaderService.showPrintButton(false);
		this.triggerList();
	}

	triggerList(){
		if(this.currentIndex < this.tempName.length) {
			this.lastQuery.templateId = this.tempName[this.currentIndex].tempId;
			this.getList();
		}else{
			this.cdr.detectChanges();
		}
	}


	getList(){
		this._vService.getList(this.lastQuery).subscribe((res : any[])=>{
              this.data.push({data : res ,toggle : false ,link : this.tempName[this.currentIndex].link,name : this.tempName[this.currentIndex].name});
          	 this.currentIndex+=1;
              this.triggerList();

		});
	}
}
