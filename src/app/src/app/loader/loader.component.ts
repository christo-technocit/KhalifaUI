import { Component, OnInit ,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
import {SplashScreenService} from "../../../core/services/splash-screen-service";
//import {SplashScreenService} from "@services/splash-screen.service";



@Component({
  selector: 'kt-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading : boolean;
  message : string;
  constructor(private splashService : SplashScreenService,private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.splashService._isLoading$.subscribe((data) => {
      this.isLoading = data.isLoading;
      this.message = data.message;
      this.cdr.detectChanges();
    })
  }

}
