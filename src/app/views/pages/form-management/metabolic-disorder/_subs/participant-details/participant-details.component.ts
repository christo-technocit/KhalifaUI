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
@Component({
  selector: 'kt-participant-details',
  templateUrl: './participant-details.component.html'
})
export class ParticipantDetailsComponent implements OnInit {
  form: FormGroup;
  title: string = "Participation Details";
  @Input('formData') formId: any;
  formData: any;
  formAttributes: any;
  filteredNationalities: Observable<string[]>;
  filteredPlaces: Observable<string[]>;
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

      this._service.getQuestionnaire1(this.formId).subscribe((res: any[]) => {
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
      "Sample": new FormControl({ value: '', disabled: this.disableInput }),
      "Depository_ID": new FormControl({ value: '', disabled: this.disableInput }),
      "DateAsses": new FormControl({ value: '', disabled: this.disableInput }),
      "collected_by": new FormControl({ value: '', disabled: this.disableInput }),
      "Collected_point": new FormControl({ value: '', disabled: this.disableInput }),
      "Firstname": new FormControl({ value: '', disabled: this.disableInput }),
      "Middlename": new FormControl({ value: '', disabled: this.disableInput }),
      "Familyname": new FormControl({ value: '', disabled: this.disableInput }),
      "dob": new FormControl({ value: '', disabled: this.disableInput }),
      "country": new FormControl({ value: '', disabled: this.disableInput }),
      "Ethnicity": new FormControl({ value: '', disabled: this.disableInput }),
      "sex_mat": new FormControl({ value: '', disabled: this.disableInput }),
      "MaritalStatus": new FormControl({ value: '', disabled: this.disableInput }),
      "marriage_con": new FormControl({ value: '', disabled: this.disableInput }),
      "Numberofwives": new FormControl({ value: '', disabled: this.disableInput }),
      "Numberofchildren": new FormControl({ value: '', disabled: this.disableInput }),
      "Healthcardnumber": new FormControl({ value: '', disabled: this.disableInput }),
      "healthcentre": new FormControl({ value: '', disabled: this.disableInput }),
      "Placeofbirth": new FormControl({ value: '', disabled: this.disableInput }),
      "Address": new FormControl({ value: '', disabled: this.disableInput }),
      "Suburb": new FormControl({ value: '', disabled: this.disableInput }),
      "home": new FormControl({ value: '', disabled: this.disableInput }),
      "work": new FormControl({ value: '', disabled: this.disableInput }),
      "mobile": new FormControl({ value: '', disabled: this.disableInput }),
      "comments": new FormControl({ value: '', disabled: this.disableInput })
    });

    this.filteredNationalities = this.form.controls["country"].valueChanges
        .pipe(
            startWith(''),
            map(val => { return this.filterNationalities(val != null && val != "" ? val.toString() : '') })
        );
    this.filteredPlaces = this.form.controls["Placeofbirth"].valueChanges
        .pipe(
            startWith(''),
            map(val => { return this.filterNationalities(val != null && val != "" ? val.toString() : '') })
        );

    this.getFormAttributeValues();
  }
  getFormAttributeValues() {
    this._service.getFormAttribute(1, 1).subscribe((res) => {
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

  //   this.splashService.splashScreen({
  //     isLoading : true,
  //     message : "SAVING"
  //   })
  //   this._service.createSampleId(1,this.form.value["Sample"]).subscribe((res)=> {
 
  //   // this._service.createSampleId(1, this.form.value["Sample"], !!this.form.controls["savedFormID"].value, this.form.controls["savedFormID"].value).subscribe((res) => {
  //     if (!this.formId) {
  //       this.saveFormId = res;
  //       this._interactionService.sendRefId(parseInt(this.saveFormId));
  //     }
  //     this.isSampleSubmit = true;
  //     this.splashService.splashScreen({
  //       isLoading : false,
  //       message : ""
  //     })
  //     this.onSubmit();
  //   });
  // }
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
  //           message : "CREATING"
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

  createSampleId(){
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._service.createSampleId(1,this.form.value["Sample"]).subscribe((res)=> {
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
