
import { Component, OnInit,Input , ChangeDetectorRef } from '@angular/core';

//Needed for triggering events
import {Subject}    from 'rxjs';
import {Observable}     from 'rxjs';
import {VitamindService} from "../../../../core/services/vitamind.form.service";
import { ReportModel, ReportsColumns } from '../../../../core/e-commerce/_models/report.model';
import {ExcelService} from '../../../../views/pages/form-management/excel.service';
import * as XLSX from 'xlsx';
import {SplashScreenService} from "@services/splash-screen-service";
@Component({
    selector: 'kt-reporting-tool-child',
    templateUrl: './reporting-tool-child.component.html'
})
// @Component({
//   selector : 'AutoGrid',//tag name in when calling the component
//   templateUrl : './../Html/AutoGrid.html',//path of the HTML
//   //pipes : [AutoGridPipe]//link the Pipe
// })


export class ReportingToolChildComponent  {

    formAttributes : any=[];
    pagedListItems :any = [];
//{

    constructor(private _vService : VitamindService,
		private splashService : SplashScreenService,
                private cdr: ChangeDetectorRef,private excelService:ExcelService)
    // private _common: Common)
    { };
    fileName= 'ExcelSheet.xlsx';
    prefix = name || "ExportResult";
    tempID: number = 0;
    tempTemplateID: number = 0;
    tempColletedby: string ="";
    tempCollectedpoint: string="";
    tempNationality: string="";
    tempPageTemplateID: number = 0;
    SortBy : string = "";//This param is used to determine which column to use for sorting
    Direction: number = 1;//1 is ascending -1 is descending
    public listitems = [];
    Pages : any = [];//Dummy array to load the pagination
    Data : any = [];//Main data container
    ExcelData : any = [];
    Width: string;
    pageboxLeft = 2;
    pageboxRight = 2;
    MyData: any = [];
	loading$: boolean = true;
    @Input() AllowDelete : boolean= true;//Can a row be deleted
    //@Input() Columns : any = [];
    @Input() Columns : any = ["SavedFormID"
        ,"Sample"
        ,"Date Assesed"
        ,"Collected By"
        ,"Collected Point"
        ,"First Name"];
    // @Input() Columns : any = ["FormAttributeID","TemplateID","SectionID",
    //   "AttributeName",
    //   "AttributeDisplayName",
    //   "selected"];//Name of the coulmns to display / order
    // @Input() AllowSorting : boolean= true;//Allow client side sorting
    @Input() TotalRows : number = 0;//Total number of rows for paging
    @Input() PageSize : number = 0;
    @Input() PageIndex : number = 0;//To control the start page index

    public RowDeleted$ = new Subject<any>();//Subscribe to this to handle delete event
    public PageIndexChanged$ = new Subject<any>();//Subscribe to this to handle "page index change" event
    private parameters: any;
    private URL: string;

    //});
 

    FillGrid( _parameters: any,  _displayName: any)
    {
        console.log('tempid',this.tempID);
        this.tempPageTemplateID = 1;
        this.PageSize = _parameters.PageSize;
        this.Pages = _parameters.PageNo;
        this.SortBy = _parameters.SortColumn;
        this.Direction = _parameters.SortOrder == "ASC" ? 1 : -1;
        this.parameters = _parameters;
       // this.TotalRows =500;
        this._vService.getReportsTotalRecords(1,0,this.Pages,this.PageSize).subscribe(
            results => {
                console.log('total',results[0].totalrecords);
                this.TotalRows = results[0]["totalrecords"];
                this.cdr.detectChanges();
            });
        this._vService.getReports(1,0,this.Pages,this.PageSize).subscribe(
            res => {
                //  this.Data = res.result;
                this.pagedListItems = res.result;
                console.log('result',this.pagedListItems);
                //   this.Columns = _displayName;
                if (this.pagedListItems != undefined) {
                    this.Data = res.result;
                    console.log('result',this.Data);
                    this.MyData = this.Data.SavedFormID;
                    //this.TotalRows = 300;
                    this.SetTotalPages();
                    this.SetPagination();
                    this.cdr.detectChanges();
                }
            });//}
    }
    FillExcel( _parameters: any,_templateID: number, _displayName: any, sectionId : number,collectedBy: string,collectedPoint:string,BeginPeriod : string,EndPeriod : string,nationality: string,diabetes:string,gender:string,sampleId: string,filter:string,excelReportName:string)
    {
        //Check if no pagination required, then display full records
        //if (!_loadPagination) {
        //   _parameters.PageSize = 10;
        //}

		this.splashService.splashScreen({
			isLoading : true,
			message : "LOADING"
		})
		this.loading$ =true;
        //this.TotalRows = 0;
        this.PageSize = _parameters.PageSize;
        this.Pages = _parameters.PageNo;
        this.SortBy = _parameters.SortColumn;
        this.Direction = _parameters.SortOrder == "ASC" ? 1 : -1;
        this.parameters = _parameters;
        console.log('displaynae',_displayName,this.Pages);
          if(_displayName.length == 0)
            {
                this._vService.getReportsTotalRecords(1,0,this.Pages,this.PageSize).subscribe(
                    results => {
                        console.log('total',results[0].totalrecords);
                        this.TotalRows = results[0]["totalrecords"];
                    });

        }
        else
        {
            this._vService.getReportsTotalRecordsByParms(_templateID,sectionId,collectedBy,collectedPoint,BeginPeriod,EndPeriod,nationality,diabetes,gender,sampleId,this.Pages,this.PageSize,filter).subscribe(
                results => {
                   this.TotalRows = results[0]["totalrecords"];
                   console.log('total2',results[0].totalrecords);

                });
        }

        // if(this.TotalRows > 500)
        //     this.TotalRows=500; 
        console.log('total',this.TotalRows);
            this._vService.getReportsByParms(_templateID,sectionId,collectedBy,collectedPoint,BeginPeriod,EndPeriod,nationality,diabetes,gender,sampleId,this.Pages,this.TotalRows,filter).subscribe(
                res => {
                    console.log('finalcall',res.result);
                    this.formAttributes = res.result;
                    this.pagedListItems = res.result;
                    //this.TotalRows=500;
                    if(_displayName.length > 0){

                        this.Columns =_displayName;
                        console.log('displayname',_displayName);

                    }
                    else
                        console.log('displayname',_displayName);

                    if (this.pagedListItems != undefined) {
                        this.ExcelData = res.result;
                        console.log('ExcelData',this.ExcelData);
                        this.SetTotalPages();
                        this.SetPagination();
                        this.cdr.detectChanges();
                        if(this.ExcelData.length)
                        {       /* table id is passed over here */
                            this.loading$ =false;
                            this.splashService.splashScreen({isLoading : false, message : "" })
                            let element = document.getElementById('excel-table2');
                            const wb=  XLSX.utils.table_to_book(element, <XLSX.Table2SheetOpts>{ sheet: this.prefix });

                            /* generate workbook and add the worksheet */
                            // const wb: XLSX.WorkBook = XLSX.utils.book_new();
                            // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                            this.fileName = "Reports_"+excelReportName+".xlsx";
                            /* save to file */
                            XLSX.writeFile(wb, this.fileName);

                            // this.excelService.exportAsExcelFile(this.ExcelData, 'sample');
                        }

                    }
                });
        
    }
    FillGridByParms( _parameters: any,_templateID:number, _displayName: any, sectionId : number,collectedBy: string,collectedPoint:string,BeginPeriod : string,EndPeriod : string,nationality: string,diabetes:string,gender:string,sampleId: string,filter: string)
    {
        //Check if no pagination required, then display full records
        //if (!_loadPagination) {
        //   _parameters.PageSize = 10;
        //}
        // this.TotalRows = 0;
console.log('sectionid',sectionId);
        this.Data = [];
        this.tempPageTemplateID = 2;
        this.PageSize = _parameters.PageSize;
        if(this.PageIndex == 0)
        this.Pages = 1;
        else
        this.Pages = _parameters.PageNo;
        console.log('pageno',this.Pages,this.PageSize);
        this.SortBy = _parameters.SortColumn;
        this.Direction = _parameters.SortOrder == "ASC" ? 1 : -1;
        this.parameters = _parameters;

        this._vService.getReportsTotalRecordsByParms(_templateID,sectionId,collectedBy,collectedPoint,BeginPeriod,EndPeriod,nationality,diabetes,gender,sampleId,this.Pages,this.PageSize,filter).subscribe(
            results => {
                this.TotalRows = results[0]["totalrecords"];
                console.log('tempTemplateID',this.TotalRows);
                this.cdr.detectChanges();
            });
        console.log('parms',_templateID,sampleId,this.TotalRows);

            console.log('totalrows',this.TotalRows);
console.log('sectionid',sectionId);

            this._vService.getReportsByParms(_templateID,sectionId,collectedBy,collectedPoint,BeginPeriod,EndPeriod,nationality,diabetes,gender,sampleId,this.Pages,this.PageSize,filter).subscribe(
                res => {
                    console.log('tempTemplateID',_displayName,res.result);
                    //  console.log('finalcall',res.result);
                    this.formAttributes = res.result;
                    this.pagedListItems = res.result;
                    this.Columns =_displayName;
                    //this.TotalRows = 2941;
                    if (this.pagedListItems != undefined) {

                        console.log('totalrows',this.TotalRows);
                        this.Data = res.result;
                        this.SetTotalPages();
                        this.SetPagination();
                        this.cdr.detectChanges();
                    }
                });

    }
    OnDeleteRow(Row2Delete:any)
    {//private method to raise RowDeleted
        this.RowDeleted$.next(Row2Delete);
        //client side delete for data can be done here
    }
    OnPageIndexChange(index: number)
    {//private method to raise RowDeleted
        console.log('pageindexbefore',this.PageIndex);
        this.PageIndex = index-1;
        console.log('pageindex',this.PageIndex,index);
        this.Data = [];
      //  this.TotalRows =0;
        this.PageIndexChanged$.next(index - 1);
        let x;
        console.log('storage',localStorage.getItem('ReportColumns'));
         if(localStorage.getItem('ReportColumns') != null)
        x = JSON.parse(localStorage.getItem('ReportColumns'));
        this.parameters.PageNo = index;
        if(this.tempPageTemplateID == 1){
            console.log('PageNo',this.parameters.PageNo);

            this.FillGrid(this.parameters,this.Columns);

        }
        else{
            if(x.Reports == 100)
            this.FillGridByParms(this.parameters,x.Reports,this.Columns,9,x.Collected_by,x.Collected_point,x.BeginPeriod,x.EndPeriod,x.Nationality,x.Diabetes,x.Gender,x.Sample_id,x.filter);
            else
            this.FillGridByParms(this.parameters,x.Reports,this.Columns,0,x.Collected_by,x.Collected_point,x.BeginPeriod,x.EndPeriod,x.Nationality,x.Diabetes,x.Gender,x.Sample_id,x.filter);

        }
    }
    SetTotalPages(){
        //used for pagination style
        let totalPages: any = Math.ceil((this.TotalRows / this.PageSize) + 4);
        console.log('pages',totalPages);
        this.Width = ((totalPages * 38) + totalPages * 2) + "px";
    }
    SetPagination() {
        this.Pages = [];
        let totalPages: any = Math.ceil(this.TotalRows / this.PageSize);

        var boxRight = this.pageboxRight, boxLeft = this.pageboxLeft;
        for (let m = this.PageIndex; m >= (this.PageIndex - this.pageboxLeft); m--) {
            if (m < 0) {
                boxRight = boxRight + 1;
                boxLeft = boxLeft - 1;
            }
        }
        for (let m = this.PageIndex; m <= (this.PageIndex + this.pageboxRight); m++) {
            if (m >= totalPages) {
                boxLeft = boxLeft + 1;
                boxRight = boxRight - 1;
            }
        }

        if (totalPages >= (boxLeft + boxRight + 1)) {
            let j = 0;
            while ((this.Pages.length < (boxLeft + boxRight + 1)) && j < totalPages) {
                if ((this.PageIndex - boxLeft) >= 0 && j >= (this.PageIndex - boxLeft) && j <= this.PageIndex) {
                    this.Pages.push(j + 1);
                }
                else if ((this.PageIndex + boxRight) <= totalPages && j <= (this.PageIndex + boxRight) && j >= this.PageIndex) {
                    this.Pages.push(j + 1);
                }
                j++;
            }
        }
        else
        {
            for (let i = 0; i < totalPages; i++)
                this.Pages.push(i + 1);
        }
    }
    OnNextPage() {
        let totalPages: any = Math.ceil(this.TotalRows / this.PageSize);
        if ((this.PageIndex + 1) == totalPages)
            return
        else {
            this.PageIndex = (this.PageIndex + 1);
            this.OnPageIndexChange(this.PageIndex+1);
        }
    }
    OnPreviousPage() {
        if ((this.PageIndex - 1) < 0)
            return;
        else {
            this.PageIndex = (this.PageIndex - 1);
            this.OnPageIndexChange(this.PageIndex + 1);
        }
    }
    OnLastPage()
    {
        let totalPages: any = Math.ceil(this.TotalRows / this.PageSize);
        
        if ((this.PageIndex) == (totalPages) - 1)
        {
        console.log('lastpage1',this.TotalRows,this.PageSize,totalPages,this.PageIndex);
            return;
        }
        else {
            this.PageIndex = (totalPages) - 1;
            this.OnPageIndexChange(this.PageIndex+1);
        console.log('lastpage',this.TotalRows,this.PageSize,totalPages,this.PageIndex);

        }

    }
    OnFirstPage() {
        if (this.PageIndex == 0)
            return;
        else {
            this.PageIndex = 0;
            this.OnPageIndexChange(this.PageIndex + 1);
        }
    }

    Sort(key:string,dir:number){
        //Change the sorting criteria
        this.SortBy = key;
        this.Direction = dir;
        this.parameters.SortColumn = this.SortBy;
        this.parameters.SortOrder = this.Direction==1?"ASC":"DESC";
        this.FillGrid(this.parameters,this.Columns);
    }

    logger(data){
        console.log(data);
    }
}