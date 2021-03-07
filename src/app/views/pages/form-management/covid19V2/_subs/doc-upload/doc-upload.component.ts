
import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {VitamindService} from "@services/vitamind.form.service";
import { ComponentInteractionService } from "@services/component-interaction.service";
import {SplashScreenService} from "@services/splash-screen-service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mediaPath } from '../../../../../../core/_utils/api.url';
@Component({
  selector: 'kt-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {
  myFiles:any=[];
  sMsg:string = '';
  saveFormId:any =0;
  error : boolean = false;
  mediaPath: string = mediaPath;

  constructor(
      private service : VitamindService,
      public cdr: ChangeDetectorRef,
      private interactionService: ComponentInteractionService,
      private splashService : SplashScreenService,
      private _snackBar: MatSnackBar,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {


    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.saveFormId = id;
      }
    });
    if(! this.saveFormId) {
      this.interactionService._Refid$.subscribe((id) => {
        this.saveFormId = id;
      })
    }else{
      this.service.GetDocuments(this.saveFormId).subscribe((res:any) => {
        if(res){
          for (var i = 0; i < res.length; i++) {
            res[i].isUpload= true;
            res[i].name= res[i].AttributeValue;
            this.myFiles.push(res[i]);
          }
        }
      })
    }


  }



//this.cd.detectChanges();

  onSelectFile(e) {
    //if (event.target.files && event.target.files[0]) {
    //  var filesAmount = event.target.files.length;
    //  for (let i = 0; i < filesAmount; i++) {
    //    var reader = new FileReader();
    //    reader.readAsDataURL(event.target.files[i]);
    //    reader.onload = (event) => {
    //
    //      let obj={obj:
    //          reader['result']
    //      }
    //      console.log(typeof obj);
    //      console.log(event.target);
    //      //this.urls.push(event.target.result);
    //
    //      //this.form.patchValue({
    //      //  document:event.target.result
    //      //})
    //      //
    //
    //    }
    //
    //  }
    //}


    for (var i = 0; i < e.target.files.length; i++) {
      e.target.files[i].isUpload = false;
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadDocuments(){
    const frmData = new FormData();
    let data = [];
    for (var i = 0; i < this.myFiles.length; i++) {
      if(this.myFiles[i].isUpload  == false) {
        frmData.append("file", this.myFiles[i]);
        data.push(
            {
              "FormAttributeValueID": 0,
              "SavedFormID": this.saveFormId,
              "AttributeValue": this.myFiles[i].name
            })
      }
    }
    this.splashService.splashScreen({ isLoading : true, message : "UPLOADING" })
    this.service.postDocumentUpload(frmData,this.saveFormId).subscribe((res) => {

      this.service.AddDocuments(data).subscribe((res) => {

        this._snackBar.open("Data has been added successfully!", 'Ok', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });

        this.splashService.splashScreen({ isLoading : false, message : "" })
        this.markUsUploaded();
      })
    })
  }

  markUsUploaded(){
    for (var i = 0; i < this.myFiles.length; i++) {
      this.myFiles[i].isUpload = true;
    }
    this.cdr.detectChanges();
  }

  onSubmit () {
    if(this.saveFormId  == 0){
      this.sMsg = "First Create Sample ID, then upload the documents";
      this.error = true;
    }else{
      this.uploadDocuments();
    }
  }

  deleteDocument(file, index){
    this.myFiles.splice(index,1);
    let data = [];
    if(file.isUpload){
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this.service.GetDocuments(this.saveFormId).subscribe((res:any) => {
        if(res){
          this.splashService.splashScreen({ isLoading : true, message : "DELETING" })
          for (var i = 0; i < res.length; i++) {
            if(res[i].AttributeValue == file.name){
              data.push(res[i]);
              this.service.DeleteDocuments(data).subscribe((res) => {

                this._snackBar.open("Data has been deleted successfully!", 'Ok', {
                  duration: 5000,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'center'
                });

                this.splashService.splashScreen({ isLoading : false, message : "" })
              })
            }
          }

        }
      })
    }
  }
}
