import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first , reduce } from 'rxjs/operators';
@Component({
  selector: 'kt-clinical-details',
  templateUrl: './clinical-details.component.html'
})
export class ClinicalDetailsComponent implements OnInit {
  form:FormGroup;
  title:string = "Clinical Details";
  @Input('formData') formId:any;
  formData:any;
  formAttributes:any;
  filteredNationalities: Observable<string[]>;
  @Input('disableInput') disableInput:boolean;
  saveFormId : any = 0;
  isFormSubmit : boolean = false;
  constructor(
      private _service:VitamindService,
      private eformFB:FormBuilder,
      private _interactionService:ComponentInteractionService,
      private _snackBar: MatSnackBar,
      private splashService : SplashScreenService,
      private finalFormValues:PrepareFinalForm
  ) { }

  ngOnInit() {
    if(!this.formId)
      this._interactionService._Refid$.subscribe((id)=>{
        if(id) {
          this.form.patchValue({"savedFormID": id})
          this.saveFormId = id;
       }
        })

    else{
      this.splashService.splashScreen({
        isLoading : true,
        message : "LOADING"
      })
      this._service.getQuestionnaire1(this.formId).subscribe((res:any[])=> {
        this.formData  = res;
        this.splashService.splashScreen({
          isLoading : false,
          message : ""
        })
        if(res.length)
        this.prepareForm();
        this.saveFormId = this.formId;
      })
    }
    this.createForm();
  }
  createForm(){
   this.form = this.eformFB.group({
     "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
     "BodyWeight": new FormControl({value: '', disabled: this.disableInput}),
     "Height": new FormControl({value: '', disabled: this.disableInput}),
     "BodyMass": new FormControl({value: '', disabled: this.disableInput}),
     "Waist": new FormControl({value: '', disabled: this.disableInput}),
     "BloodPressureSystolic": new FormControl({value: '', disabled: this.disableInput}),
     "BloodPressureDiastolic": new FormControl({value: '', disabled: this.disableInput}),
     "clinical_hypertension": new FormControl({value: '', disabled: this.disableInput}),
     "diabetesMellitus": new FormControl({value: '', disabled: this.disableInput}),
     "diabetic": new FormControl({value: '', disabled: this.disableInput}),
     "age": new FormControl({value: '', disabled: this.disableInput}),
     "dyslipidemia": new FormControl({value: '', disabled: this.disableInput}),
     "diabetic_other": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_com": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_com_specify": new FormControl({value: '', disabled: this.disableInput}),
     "spec_app_retinopathy": new FormControl({value: '', disabled: this.disableInput}),
     "spec_app_neuropathy": new FormControl({value: '', disabled: this.disableInput}),
     "neuropathy_other": new FormControl({value: '', disabled: this.disableInput}),
     "spec_app_cva": new FormControl({value: '', disabled: this.disableInput}),
     "spec_app_nephropathy": new FormControl({value: '', disabled: this.disableInput}),
     "nephropathy_albuminuria_others": new FormControl({value: '', disabled: this.disableInput}),
     "nephropathy_eGFR_others": new FormControl({value: '', disabled: this.disableInput}),
     "spec_app_cad": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_comp_other_check": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_comp_others_text": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_none": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_tabletsonly": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_diettablets": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_diettabletsinsulin": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_dietonly": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_insulinonly": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_dietinsulin": new FormControl({value: '', disabled: this.disableInput}),
     "diabetes_man_unknown": new FormControl({value: '', disabled: this.disableInput}),
     "current_diabetes_man_other": new FormControl({value: '', disabled: this.disableInput}),
     "current_diabetes_man_other_text": new FormControl({value: '', disabled: this.disableInput}),


   });
    this.getFormAttributeValues();
  }
  getFormAttributeValues() {
    this._service.getFormAttribute(1,2).subscribe((res)=> {
      this.formAttributes = res;
    })
  }

  prepareForm() {
    Object.keys(this.formData[0]).forEach(name => {
      if (this.form.controls[name]) {
        this.form.controls[name].patchValue(this.formData[0][name], {onlySelf: true});
      }
    });
  }

  createSampleId() {
    this.splashService.splashScreen({
    isLoading : true,
    message : "SAVING"
  })
    this._service.createSampleId(1,0).subscribe((res)=> {
      this.saveFormId = res;
      this.splashService.splashScreen({
        isLoading : false,
        message : ""
      })
      this._interactionService.sendRefId(parseInt(this.saveFormId));
      this.onSubmit();
    });
  }

  onSubmit() {
    if (!this.form.value["savedFormID"] && !this.saveFormId) {
      this.createSampleId();
    } else {
      this.form.patchValue({"savedFormID" : this.form.value["savedFormID"] || this.saveFormId })
      let data = this.finalFormValues.prepareAttibuteForm(this.form.value, this.formAttributes, "savedFormID",this.formId)
      if (this.formId || this.isFormSubmit) {
        this.splashService.splashScreen({
          isLoading : true,
          message : "UPDATING"
        })
        this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value).subscribe((res:any) => {
          if(res){
            for(var i=0;i<data.length;i++) {
              for (var j = 0; j < res.length; j++) {
                if(data[i]["formAttributeID"] == res[j]["FormAttributeID"]){
                  data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
                }
              }
            }
            this._service.createSample1(data, true).subscribe((res)=> {
              if (res) {

                this.splashService.splashScreen({
                  isLoading : false,
                  message : ""
                })

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
        this.splashService.splashScreen({
          isLoading : true,
          message : "INSERTING"
        })
        this._service.createSample1(data, this.formId ? true : false).subscribe((res)=> {
          if (res) {
            this.splashService.splashScreen({
              isLoading : false,
              message : ""
            })

            this.isFormSubmit = true;
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


  calculateBodyMass(){
    if(this.form.controls["BodyWeight"].value && this.form.controls["Height"].value){
      this.form.patchValue({"BodyMass" : (this.form.controls["BodyWeight"].value/(this.form.controls["Height"].value*this.form.controls["Height"].value)).toFixed(2) })
    }
  }

}
