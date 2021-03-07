import { Component, OnInit,  OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { ComponentInteractionService } from "@services/component-interaction.service";
import { VitamindService } from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrepareFinalForm } from "../../../../../../core/_utils/prepareFinalForm";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first, reduce } from 'rxjs/operators';
import { Countries } from './../../../../../../core/_utils/countries';
import { mediaPath } from '../../../../../../core/_utils/api.url';
const AVAILABLE_NATIONALITIES: any[] = Countries;
const AVAILABLE_PLACE: any[] = Countries;
@Component({
  selector: 'kt-ag-participant-personal',
  templateUrl: './ag-participant-personal.component.html',
})
export class AgParticipantPersonalComponent implements OnInit {

  form: FormGroup;
  title: string = "Participation Details";
  @Input('formData') formId: any;
  formData: any;
  formAttributes: any;
  filteredNationalities: Observable<string[]>;
  filteredPlace: Observable<string[]>;
  @Input('disableInput') disableInput: boolean;
  saveFormId: any = 0;
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  url: string | ArrayBuffer = '';
  fileToUpload: File = null;
  fileUploadSuccess: boolean = false;
  isSampleSubmit: boolean = false;
  isFormSubmit : boolean = false;
  mediaPath: string = mediaPath;
  constructor(private _service: VitamindService,
              private eformFB: FormBuilder,
              private _interactionService: ComponentInteractionService,
              private _snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private splashService : SplashScreenService,
              private finalFormValues: PrepareFinalForm) { }

  ngOnInit() {
    this.createForm();
    if (!this.formId)
      this._interactionService._Refid$.subscribe((id) => {
        this.form.patchValue({ "savedFormID": id })

      })
    else {
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
       this._service.getQuestionnaire(this.formId,5).subscribe((res: any[]) => {
        this.formData = res;
        this.saveFormId = this.formId;
         this.splashService.splashScreen({isLoading : false, message : "" })
         if(res.length)
          this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({ value: 0, disabled: this.disableInput }),
      "SampleID": new FormControl({value: '', disabled: this.disableInput}),
      "Depository_ID": new FormControl({value : '', disabled : this.disableInput}),
      "CollectionPoint": new FormControl({value: '', disabled: this.disableInput}),
      "CollectedBy": new FormControl({value: '', disabled: this.disableInput}),
      "DateofAssessment": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Firstname": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_MiddleName": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_LastName": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Gender": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_DateofBirth": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_PlaceofBirth": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Nationality": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Ethnicity": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_MaritalStatus": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_marriage_con": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_NumberofChildren": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Boys": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Girls": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Numberofwives": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Address": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_City": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Emirates": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Mobilenumber": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Ethnicity_Mixed_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Ethnicity_Other_Remarks": new FormControl({value: '', disabled: this.disableInput}),
    });

    this.filteredNationalities = this.form.controls["PERS_Nationality"].valueChanges
        .pipe(
            startWith(''),
            map(val => {  return this.filterNationalities(val != null && val != "" ? val.toString() : '') })
        );
    this.filteredPlace = this.form.controls["PERS_PlaceofBirth"].valueChanges
        .pipe(
            startWith(''),
            map(val => {  return this.filterPlaceofBirth(val != null && val != "" ? val.toString() : '') })
        );
    this.getFormAttributeValues();


  }
  getFormAttributeValues() {
    this._service.getFormAttribute(5, 1).subscribe((res) => {
      this.formAttributes = res;
    })

  }
  prepareForm() {
    Object.keys(this.formData[0]).forEach(name => {
      if (this.form.controls[name]) {
        this.form.controls[name].patchValue(this.formData[0][name], { onlySelf: true });
      }
    });
    if (this.url == "" &&  this.form.controls["profilePicture"].value) {
      this.url = this.mediaPath +"/images/"+ this.formId + "_" + this.form.controls["profilePicture"].value;
    }
  }
  // createSampleId() {
  //   this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
  //   console.log("Test",this.form.value["SampleID"])
  //   this._service.createSampleId(5,this.form.value["SampleID"]).subscribe((res)=> {
 
  //   //this._service.createSampleId(5, this.form.value["SampleID"], !!this.form.controls["savedFormID"].value, this.form.controls["savedFormID"].value).subscribe((res) => {
  //     if (!this.formId) {
  //       this.saveFormId = res;
  //       this._interactionService.sendRefId(parseInt(this.saveFormId));
  //     }
  //     this.splashService.splashScreen({isLoading : false, message : "" })
  //     this.isSampleSubmit = true;
  //     this.onSubmit();
  //   });
  // }

  createSampleId(){
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._service.createSampleId(5,this.form.value["SampleID"]).subscribe((res)=> {
        this.saveFormId = res;
        this.splashService.splashScreen({isLoading : false, message : "" })
        this._interactionService.sendRefId( this.saveFormId);
       this.onSubmit();
    });
    }


    onSubmit(){

      var savedFormID=0;
      if (this.formId===undefined)
      {
        savedFormID=0;
       /*  console.log("Saved Form ID"+savedFormID);
        console.log("Form ID"+this.formId); */
      }
     
      else
      savedFormID=this.formId
       /*  if(!this.form.value["savedFormID"] && !this.saveFormId ){  */
          if(!this.saveFormId ){ 
        /*   if(!this.form.value["savedFormID"]  ){ */
          this.createSampleId();
      /*     console.log("Saved Form ID"+savedFormID); */
        }else {
            this.form.patchValue({"savedFormID": this.form.value["savedFormID"] || this.saveFormId})
                if (this.fileToUpload && !this.fileUploadSuccess) {
        this.uploadImage();
        return;
      }
   let data = this.finalFormValues.prepareAttibuteForm(this.form.value, this.formAttributes, "savedFormID",this.formId)
            if (this.formId) {
                this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
                this._service.getFormAttributeValues(this.formId).subscribe((res:any) => {

                    if(res){
                        for(var i=0;i<data.length;i++) {
                            for (var j = 0; j < res.length; j++) {
                                if(data[i]["formAttributeID"] == res[j]["FormAttributeID"]){
                                    data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
                                }
                            }
                        }

                        this._service.createSample3(data, true).subscribe((res)=> {
                            if (res) {
                                this.splashService.splashScreen({isLoading : false, message : "" })
                                this._snackBar.open("Data has been updated successfully!", 'Ok', {
                                    duration: 5000,
                                    verticalPosition: 'bottom',
                                    horizontalPosition: 'center'
                                });
                            }
                        })

                    }
                })
            } else {
                     if (this.fileToUpload ) {
          this.updatedSingleAttributes(false);
        }
                this.splashService.splashScreen({ isLoading : true, message : "INSERTING" })
                this._service.createSample3(data, true).subscribe((res)=> {
                    if (res) {
                        this.splashService.splashScreen({isLoading : false, message : "" })
                        this._snackBar.open("Data has been inserted successfully!", 'Ok', {
                            duration: 5000,
                            verticalPosition: 'bottom',
                            horizontalPosition: 'center'
                        });
                    }
                })
                this.saveFormId=0;
                this.form.value["savedFormID"]=0;
               /*  console.log("after Insert saveformid"+this.saveFormId);
                console.log("after Insert savedFormID"+this.form.value["savedFormID"]); */
            }
        }
    }
  updatedSingleAttributes(mode: boolean) {
    let data = {
      "FormAttributeID": 307,
      "SavedFormID": this.saveFormId,
      "AttributeValue": this.form.value["profilePicture"]
    };
    if(!mode) {
      this._service.postSingleFormAttr(data, mode).subscribe(res => {
        console.log("Done!!")
      })
    }else{
      this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value).subscribe((res: any) => {
        if (res) {

          for (var j = 0; j < res.length; j++) {
            if (data["FormAttributeID"] == res[j]["FormAttributeID"]) {
              data["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
              break;
            }

          }
          this._service.postSingleFormAttr(data, mode).subscribe(res => {
            console.log("Done!!")
          })
        }
      })
    }
  }
  // onSubmit() {
  //   if (!this.isSampleSubmit) {
  //     this.createSampleId();
  //   } else {
  //     this.form.patchValue({ "savedFormID": this.form.value["savedFormID"] || this.saveFormId })
  //     if (this.fileToUpload && !this.fileUploadSuccess) {
  //       this.uploadImage();
  //       return;
  //     }

  //     let data = this.finalFormValues.prepareAttibuteForm(this.form.value, this.formAttributes, "savedFormID", this.formId)

  //     this.isSampleSubmit = false;
  //     if (this.formId) {
  //       this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
  //       if (this.fileToUpload) {
  //         this.updatedSingleAttributes(true);
  //       }

  //       this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value).subscribe((res: any) => {
  //         if (res) {
  //           for (var i = 0; i < data.length; i++) {
  //             for (var j = 0; j < res.length; j++) {
  //               if (data[i]["formAttributeID"] == res[j]["FormAttributeID"]) {
  //                 data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
  //               }
  //             }
  //           }
  //           this._service.createSample1(data, true).subscribe((res) => {
  //             if (res) {
  //               this.splashService.splashScreen({isLoading : false, message : "" })
  //               this._snackBar.open("Data has been updated successfully!", 'Ok', {
  //                 duration: 5000,
  //                 verticalPosition: 'bottom',
  //                 horizontalPosition: 'center'
  //               });
  //             }
  //           })

  //         }
  //       })
  //     } else {
  //       this.splashService.splashScreen({ isLoading : true, message : "INSERTING" })
  //       if (this.fileToUpload ) {
  //         this.updatedSingleAttributes(false);
  //       }
  //       if(!this.isFormSubmit) {
  //         this._service.createSample1(data, this.formId ? true : false).subscribe((res) => {
  //           if (res) {
  //             this.isFormSubmit = true;
  //             this.splashService.splashScreen({isLoading : false, message : "" })
  //             this._snackBar.open("Data has been inserted successfully!", 'Ok', {
  //               duration: 5000,
  //               verticalPosition: 'bottom',
  //               horizontalPosition: 'center'
  //             });
  //           }
  //         })
  //       }
  //     }
  //   }
  // }

  filterPlaceofBirth(val: string): string[] {
    return AVAILABLE_PLACE.filter(option =>
        option.toLowerCase().includes(val.toLowerCase()));
  }

  filterNationalities(val: string): string[] {
    return AVAILABLE_NATIONALITIES.filter(option =>
        option.toLowerCase().includes(val.toLowerCase()));
  }

  uploadImage() {
    this._service.postUploadImages(this.fileToUpload, this.form.value["savedFormID"]).subscribe((res: any) => {
      this.form.patchValue({ "profilePicture": this.fileToUpload.name })
      this.fileUploadSuccess = true;
      this.onSubmit();
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        if (event.target) {
          this.url = reader.result;
          this.cd.detectChanges();
          this.fileUploadSuccess = false;
        }
      }
    }
  }

}
