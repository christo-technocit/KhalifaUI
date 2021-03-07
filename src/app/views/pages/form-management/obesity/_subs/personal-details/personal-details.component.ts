import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { ComponentInteractionService } from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrepareFinalForm } from "../../../../../../core/_utils/prepareFinalForm";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first, reduce } from 'rxjs/operators';
import { Countries } from '../../../../../../core/_utils/countries';
import { mediaPath } from '../../../../../../core/_utils/api.url';
const AVAILABLE_NATIONALITIES: any[] = Countries;

@Component({
  selector: 'kt-obesity-personal-details',
  templateUrl: './personal-details.component.html'
})
export class ObesityPersonalDetailsComponent implements OnInit {
  form: FormGroup;
  title: string = "Obesity";
  @Input('formData') formId: any;
  formData: any;
  formAttributes: any;
  filteredNationalities: Observable<string[]>;
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
        this._service.getQuestionnaire(this.formId,6).subscribe((res: any[]) => {
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
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "SampleID": new FormControl({value: '', disabled: this.disableInput}),
      "Depository_ID": new FormControl({value : '', disabled : this.disableInput}),
      "CollectionPoint": new FormControl({value: '', disabled: this.disableInput}),
      "CollectedBy": new FormControl({value: '', disabled: this.disableInput}),
      "DateofAssessment": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Firstname": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_MiddleName": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_FamilyName": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_DateofBirth": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_PlaceofBirth": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Nationality": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Ethnicity": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Ethnicity_Mixed_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Ethnicity_Others_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Gender": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_IsParents_Related": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_MaritalStatus": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_marriage_con": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Numberofwives": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_NumberofChildren": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Home_Number": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Work_Number": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Mobile_Number": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Address": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_City": new FormControl({value: '', disabled: this.disableInput}),
      "PERS_Emirates": new FormControl({value: '', disabled: this.disableInput})
    });

  this.filteredNationalities = this.form.controls["PERS_Nationality"].valueChanges
  .pipe(
      startWith(''),
      map(val => { return this.filterNationalities(val != null && val != "" ? val.toString() : '') })
  );
  this.filteredNationalities = this.form.controls["PERS_PlaceofBirth"].valueChanges
  .pipe(
      startWith(''),
      map(val => { return this.filterNationalities(val != null && val != "" ? val.toString() : '') })
  );
this.getFormAttributeValues();
}
getFormAttributeValues() {
this._service.getFormAttribute(6, 1).subscribe((res) => {
this.formAttributes = res;
})

}
prepareForm() {
Object.keys(this.formData[0]).forEach(name => {
if (this.form.controls[name]) {
  this.form.controls[name].patchValue(this.formData[0][name], { onlySelf: true });
}
});

}
// createSampleId() {
//     this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
//     this._service.createSampleId(6, this.form.value["SampleID"], !!this.form.controls["savedFormID"].value, this.form.controls["savedFormID"].value).subscribe((res) => {
//     if (!this.formId) {
//      this.saveFormId = res;
//      this._interactionService.sendRefId(parseInt(this.saveFormId));
//      }
//     this.splashService.splashScreen({isLoading : false, message : "" })
//     this.isSampleSubmit = true;
//     this.onSubmit();
// });
// }
// onSubmit(){

//     if(!this.isSampleSubmit){
//       this.createSampleId();
//     }else {
//         this.form.patchValue({"savedFormID": this.form.value["savedFormID"] || this.saveFormId})
//         this.isSampleSubmit = false;
//         let data = this.finalFormValues.prepareAttibuteForm(this.form.value, this.formAttributes, "savedFormID",this.formId)
//         if (this.formId ||  this.isFormSubmit) {
//             this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
//             this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value ).subscribe((res:any) => {
//                 if(res){
//                     for(var i=0;i<data.length;i++) {
//                         for (var j = 0; j < res.length; j++) {
//                             if(data[i]["formAttributeID"] == res[j]["FormAttributeID"]){
//                                 data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
//                             }
//                         }
//                     }

//                     this._service.createSample(data, true).subscribe((res)=> {
//                         if (res) {
//                             this.splashService.splashScreen({isLoading : false, message : "" })
//                             this._snackBar.open("Data has been updated successfully!", 'Ok', {
//                                 duration: 5000,
//                                 verticalPosition: 'bottom',
//                                 horizontalPosition: 'center'
//                             });
//                         }
//                     })

//                 }
//             })
//         } else {
//             this.splashService.splashScreen({ isLoading : true, message : "INSERTING" })
//             this._service.createSample(data, false).subscribe((res)=> {
//                 if (res) {
//                     this.isFormSubmit = true;
//                     this.splashService.splashScreen({isLoading : false, message : "" })
//                     this._snackBar.open("Data has been inserted successfully!", 'Ok', {
//                         duration: 5000,
//                         verticalPosition: 'bottom',
//                         horizontalPosition: 'center'
//                     });
//                 }
//             })
//         }
//     }
// }

createSampleId(){
  this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
  this._service.createSampleId(6,this.form.value["SampleID"]).subscribe((res)=> {
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
filterNationalities(val: string): string[] {
return AVAILABLE_NATIONALITIES.filter(option =>
  option.toLowerCase().includes(val.toLowerCase()));
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
