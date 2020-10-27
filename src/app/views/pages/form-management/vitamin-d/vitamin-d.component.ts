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
// Services
import { LayoutUtilsService, MessageType, QueryParamsModel } from './../../../../core/_base/crud';
import { VitamindService } from '@services/vitamind.form.service'
import {SplashScreenService} from "@services/splash-screen-service";
import { SubheaderService } from './../../../../core/_base/layout';

@Component({
  selector: 'kt-vitamin-d',
  templateUrl: './vitamin-d.component.html'
})
export class VitaminDComponent implements OnInit {
  // Table fields
  loading$: boolean = true;
  dataSource: any = [];
  displayedColumns = [ 'id', '1', '2', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  //@ViewChild('MainBody') MainBody: ElementRef<HTMLElement>;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  lastQuery = {
    filter :  '',
  sortOrder : 2,
  sortField : 1,
  pageNumber : 0,
  pageSize : 10,
    templateId : 4,
    totalRecords : 0
  };

  selection;

  private subscriptions: Subscription[] = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private layoutUtilsService: LayoutUtilsService,
      private subheaderService: SubheaderService,
      private cdr: ChangeDetectorRef,
      private splashService : SplashScreenService,
      private _vService : VitamindService
  ) { }


  fetchList(){
    this.dataSource = [];
    this.loading$ =true;
    this.splashService.splashScreen({
      isLoading : true,
      message : "LOADING"
    })
    this._vService.getList(this.lastQuery).subscribe((res : any[])=>{
      this.dataSource = res;
      this.loading$ =false;
      this.splashService.splashScreen({
        isLoading : false,
        message : ""
      })
      this.cdr.detectChanges()
    });
  }
  getTotalCount(){
    this._vService.getTotalRecordsCount(4,this.lastQuery.filter).subscribe((res : any[])=>{
      if(res.length > 0)
      this.lastQuery.totalRecords = res[0]["totalrecords"];
    })
  }
  /**
   * On init
   */
  ngOnInit() {
    this.sort.sortChange.subscribe((data) => {
      this.lastQuery.sortField = data.active;
      this.lastQuery.sortOrder = data.direction == "asc" ? 0 : 1 ;
     this.fetchList();
    })
    const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
        debounceTime(150), // The form can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
        distinctUntilChanged(), // This operator will eliminate duplicate values
        tap(() => {
          //this.lastQuery.filter
          this.lastQuery.filter = this.searchInput.nativeElement.value;
          this.lastQuery.pageNumber = 0;
          this.getTotalCount();
          this.fetchList();
        })
        )
        .subscribe();

    this.getTotalCount();
    this.fetchList();
    this.subheaderService.setTitle('Vitamin-D');
    this.subheaderService.showPrintButton(false);
  }

    getPaginatorData(event)
    {
      this.lastQuery.pageSize = event.pageSize;
      this.lastQuery.pageNumber = event.pageIndex;
      this.fetchList();
    }
    editForm(id) {
    this.router.navigate(['/form-management/vitamin-d-form', id], { relativeTo: this.activatedRoute });
  }


}
