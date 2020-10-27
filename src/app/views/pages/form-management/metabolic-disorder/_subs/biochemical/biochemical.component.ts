import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'kt-biochemical',
  templateUrl: './biochemical.component.html'
})
export class BiochemicalComponent implements OnInit {
  Mform:FormGroup;
  title:string = "Biochemical Details";
  @Input('formData') formId:any;
  formData:any;
  formAttributes:any;
  @Input('disableInput') disableInput:boolean;
  saveFormId : any = 0;
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  isFormSubmit : boolean = false;
  constructor(
      private _service:VitamindService,
      private eformFB:FormBuilder,
      private _interactionService:ComponentInteractionService,
      private _snackBar: MatSnackBar,
      private finalFormValues:PrepareFinalForm,
      private splashService : SplashScreenService
  ) {}

  ngOnInit() {
    this.createForm();
    if (!this.formId)
      this._interactionService._Refid$.subscribe((id)=> {
        this.Mform.patchValue({"savedFormID": id})
        this.saveFormId = id;
      })
    else {
      this.splashService.splashScreen({
        isLoading : true,
        message : "LOADING"
      })

      this._service.getQuestionnaire1(this.formId).subscribe((res:any[])=> {
        this.formData = res;
        this.saveFormId = this.formId;
        if(res.length)
        this.prepareForm();

        this.splashService.splashScreen({
          isLoading : false,
          message : ""
        })

      })
    }
  }

  createForm() {
    this.Mform = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "bloodCollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "recentresult": new FormControl({value: '', disabled: this.disableInput}),
      "glucose_collected_date": new FormControl({value: '', disabled: this.disableInput}),
      "glucose_recentresult": new FormControl({value: '', disabled: this.disableInput}),
      "glucose_tolerance_collected_date": new FormControl({value: '', disabled: this.disableInput}),
      "glucose_tolerance_recent_result": new FormControl({value: '', disabled: this.disableInput}),
      "hba1c": new FormControl({value: '', disabled: this.disableInput}),
      "hba1c_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "cholesterol_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "cholesterol_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "Triglyceride_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "Triglyceride_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "HDL_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "HDL_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "LDL_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "LDL_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "Microalbumin_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "Microalbumin_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "Creatinine_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "Creatinine_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "Urea_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "Urea_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "VitaminD_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "VitaminD_RecentResult": new FormControl({value: '', disabled: this.disableInput}),
      "eGFR_CollectedDate": new FormControl({value: '', disabled: this.disableInput}),
      "eGFR_RecentResult": new FormControl({value: '', disabled: this.disableInput}),

    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(1,3).subscribe((res)=> {
      this.formAttributes = res;
    })
  }

  prepareForm() {
    Object.keys(this.formData[0]).forEach(name => {
      if (this.Mform.controls[name]) {
        this.Mform.controls[name].patchValue(this.formData[0][name], {onlySelf: true});
      }
    });
  }

  createSampleId() {
    this.splashService.splashScreen({
      isLoading : true,
      message : "SAVING"
    })
    this._service.createSampleId(1,0).subscribe((res)=> {
      this.splashService.splashScreen({
        isLoading : false,
        message : ""
      })
      this.saveFormId = res;
      this._interactionService.sendRefId(parseInt(this.saveFormId));
      this.onSubmit();
    });
  }

  onSubmit() {
    if (!this.Mform.value["savedFormID"] && !this.saveFormId) {
      this.createSampleId();
    } else {
      this.Mform.patchValue({"savedFormID" : this.Mform.value["savedFormID"] || this.saveFormId })
      let data = this.finalFormValues.prepareAttibuteForm(this.Mform.value, this.formAttributes, "savedFormID",this.formId)
      if (this.formId || this.isFormSubmit) {
        this.splashService.splashScreen({
          isLoading : true,
          message : "UPDATING"
        })

        this._service.getFormAttributeValues(this.formId || this.Mform.controls["savedFormID"].value).subscribe((res:any) => {
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
        this._service.createSample3(data, this.formId ? true : false).subscribe((res)=> {
          if (res) {
            this.isFormSubmit = true;
            this.splashService.splashScreen({
              isLoading : false,
              message : ""
            })
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

}
