import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
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
  selector: 'kt-sb-participant-details',
  templateUrl: './sb-participant-details.component.html',
})
export class SbParticipantDetailsComponent implements OnInit {

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
      this.splashService.splashScreen({
        isLoading : true,
        message : "LOADING"
      })
      this._service.getQuestionnaire(this.formId,2).subscribe((res: any[]) => {
        this.formData = res;
        this.saveFormId = this.formId;
        this.splashService.splashScreen({
          isLoading : false,
          message : ""
        })
        if(res.length)
          this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({ value: 0, disabled: this.disableInput }),
      "profilePicture": new FormControl({ value: '', disabled: this.disableInput }),
      "Sample": new FormControl({value: '', disabled: this.disableInput}),
      "Depository_ID": new FormControl({value : '', disabled : this.disableInput}),
      "Collected_by": new FormControl({value: '', disabled: this.disableInput}),
      "Collected_date": new FormControl({value: '', disabled: this.disableInput}),
      "nrc_id": new FormControl({value: '', disabled: this.disableInput}),
      "dob": new FormControl({value: '', disabled: this.disableInput}),
      "Gender": new FormControl({value: '', disabled: this.disableInput}),
      "country": new FormControl({value: '', disabled: this.disableInput}),
      "MaritalStatus": new FormControl({value: '', disabled: this.disableInput}),
      "PlaceOfBirth": new FormControl({value: '', disabled: this.disableInput}),
      "employment_status": new FormControl({value: '', disabled: this.disableInput}),
      "employment_status_others": new FormControl({value: '', disabled: this.disableInput}),
      "employment_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "eduLevel": new FormControl({value: '', disabled: this.disableInput}),
      "ethnicity_mixed_specify_text": new FormControl({value: '', disabled: this.disableInput}),
      "ethnicity": new FormControl({value: '', disabled: this.disableInput}),
      "ethnicity_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "inpatient_type": new FormControl({value: '', disabled: this.disableInput}),
      "Admission_Status": new FormControl({value: '', disabled: this.disableInput}),
      "method_adm": new FormControl({value: '', disabled: this.disableInput}),
      "method_adm_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "participant_comments": new FormControl({value: '', disabled: this.disableInput}),
    });

    this.filteredNationalities = this.form.controls["country"].valueChanges
        .pipe(
            startWith(''),
            map(val => { return this.filterNationalities(val != null && val != "" ? val.toString() : '') })
        );

    this.filteredPlace = this.form.controls["PlaceOfBirth"].valueChanges
        .pipe(
            startWith(''),
            map(val => { return this.filterPlaceofBirth(val != null && val != "" ? val.toString() : '') })
        );

    this.getFormAttributeValues();
  }
  getFormAttributeValues() {
    this._service.getFormAttribute(2, 1).subscribe((res) => {
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
  //   this._service.createSampleId(2, this.form.value["Sample"], !!this.form.controls["savedFormID"].value, this.form.controls["savedFormID"].value).subscribe((res) => {
  //     if (!this.formId) {
  //       this.saveFormId = res;
  //       this._interactionService.sendRefId(parseInt(this.saveFormId));
  //     }
  //     this.splashService.splashScreen({
  //       isLoading : false,
  //       message : ""
  //     })
  //     this.isSampleSubmit = true;
  //     this.onSubmit();
  //   });
  // }
  updatedSingleAttributes(mode: boolean) {
    let data = {
      "FormAttributeID": 1166,
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

  createSampleId(){
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._service.createSampleId(2,this.form.value["Sample"]).subscribe((res)=> {
        this.saveFormId = res;
        this.splashService.splashScreen({isLoading : false, message : "" })
        this._interactionService.sendRefId( this.saveFormId);
       this.onSubmit();
    });
    }


    onSubmit(){

        if(!this.form.value["savedFormID"] && !this.saveFormId ){
          this.createSampleId();
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
            }
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
  //     if (this.formId || this.isFormSubmit) {

  //       if (this.fileToUpload) {
  //         this.updatedSingleAttributes(true);
  //       }
  //       this.splashService.splashScreen({
  //         isLoading : true,
  //         message : "UPDATING"
  //       })

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
  //               this.splashService.splashScreen({
  //                 isLoading : false,
  //                 message : ""
  //               })
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
  //       if (this.fileToUpload ) {
  //         this.updatedSingleAttributes(false);
  //       }
  //       if(!this.isFormSubmit) {
  //         this.splashService.splashScreen({
  //           isLoading : true,
  //           message : "INSERTING"
  //         })
  //         this._service.createSample1(data, this.formId ? true : false).subscribe((res) => {
  //           if (res) {
  //             this.isFormSubmit = true;
  //             this.splashService.splashScreen({
  //               isLoading : false,
  //               message : ""
  //             })
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
  filterNationalities(val: string): string[] {
    return AVAILABLE_NATIONALITIES.filter(option =>
        option.toLowerCase().includes(val.toLowerCase()));
  }
  filterPlaceofBirth(val: string): string[] {
    return AVAILABLE_PLACE.filter(option =>
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
