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


import { SubheaderService } from '../../../../core/_base/layout';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-osteoporosis',
  templateUrl: './osteoporosis.component.html',
  styleUrls: ['./osteoporosis.component.scss']
})
export class OsteoporosisComponent implements OnInit {

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
    templateId : 7, // 4,
    totalRecords : 0
  };

  selection;

  private subscriptions: Subscription[] = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private subheaderService: SubheaderService,
      private cdr: ChangeDetectorRef,
      private splashService : SplashScreenService,
      private _vService : VitamindService
  ) { }


  fetchList(){
    this.dataSource = [];
    this.loading$ =true;
    this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
    this._vService.getList(this.lastQuery).subscribe((res : any[])=>{
      this.dataSource = res;
      this.loading$ =false;
      this.cdr.detectChanges();
      this.splashService.splashScreen({isLoading : false, message : "" })
    });
  }
  getTotalCount(){
    this._vService.getTotalRecordsCount(this.lastQuery.templateId,this.lastQuery.filter).subscribe((res : any[])=>{
      if(res)
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
    this.subheaderService.setTitle('Osteoporosis');
    this.subheaderService.showPrintButton(false);
  }

  getPaginatorData(event)
  {
    this.lastQuery.pageSize = event.pageSize;
    this.lastQuery.pageNumber = event.pageIndex;
    this.fetchList();
  }
  editForm(id) {
    this.router.navigate(['/form-management/1000-arab-genome/edit', id], { relativeTo: this.activatedRoute });
  }



}
