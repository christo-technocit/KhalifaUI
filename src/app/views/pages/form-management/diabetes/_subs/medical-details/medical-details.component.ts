

import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-diabetes-medical-details',
  templateUrl: './medical-details.component.html'
})
export class DiabetesMedicalDetailsComponent implements OnInit {
  Mform:FormGroup;
  title:string = "Medical Status";
  @Input('formData') formId:any;
  formData:any;
  formAttributes:any;
  @Input('disableInput') disableInput:boolean;
  saveFormId : any = 0;
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  isFormSubmit : boolean = false;

  isSampleSubmit: boolean = false;
  constructor(
      private _service:VitamindService,
      private eformFB:FormBuilder,
      private _interactionService:ComponentInteractionService,
      private _snackBar: MatSnackBar,
      private splashService : SplashScreenService,
      private finalFormValues:PrepareFinalForm
  ) { }

  ngOnInit() {
    this.createForm();
    if (!this.formId)
      this._interactionService._Refid$.subscribe((id)=> {
        if(id) {
          this.Mform.patchValue({"savedFormID": id})
        }
      })
    else {
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this._service.getQuestionnaire(this.formId,12).subscribe((res:any[])=> {
        this.formData = res;
        this.splashService.splashScreen({isLoading : false, message : "" })
        this.saveFormId = this.formId;
        if(res.length)
        this.prepareForm();
      })
    }
  }

  createForm() {
    this.Mform = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
	  "PMD_Type_2_diabetes_date": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_Type_2_diabetes_status": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_Type_2_prediabetes_date": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_Type_2_prediabetes_status": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_lastmonths_flu": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_diagnosed_with_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_symptoms_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_symptoms_COVID_19_date": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_symptoms_COVID_19_enddate": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_headache": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_bodytemperatur": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_cough": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_sore_throat": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_weakness": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_lossof_smell": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_shortness_breath": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_nausea_vomiting": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_muscle_pain": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_diarrhea": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_loss_taste": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_vaccination": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_vaccination_details": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_vaccination_Year": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_allergies": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_allergies_details": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_surgery": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_surgery_details": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_surgery_year": new FormControl({value: '', disabled: this.disableInput}),
	  "health_advice_noone": new FormControl({value: '', disabled: this.disableInput}),
	  "health_advice_Dietitian": new FormControl({value: '', disabled: this.disableInput}),
	  "health_advice_Nurse": new FormControl({value: '', disabled: this.disableInput}),
	  "health_advice_GP": new FormControl({value: '', disabled: this.disableInput}),
	  "health_advice_Pharmacist": new FormControl({value: '', disabled: this.disableInput}),
	  "health_advice_Diabetes_specialist": new FormControl({value: '', disabled: this.disableInput}),
	  "health_advice_others": new FormControl({value: '', disabled: this.disableInput}),
	  "health_annual_medical_checkup": new FormControl({value: '', disabled: this.disableInput}),
	  "health_annual_medical_checkup_year": new FormControl({value: '', disabled: this.disableInput}),
	  "PSS_current_smoker": new FormControl({value: '', disabled: this.disableInput}),
	  "PSS_avg_cigarettes_perday": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_running_nose": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_intolerance": new FormControl({value: '', disabled: this.disableInput}),
	  "PMD_intolerance_details": new FormControl({value: '', disabled: this.disableInput}),


    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(12,4).subscribe((res)=> {
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
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._service.createSampleId(12, 0).subscribe((res) => {
  if (!this.formId) {
  this.saveFormId = res;
  this._interactionService.sendRefId(parseInt(this.saveFormId));
  }
    this.splashService.splashScreen({isLoading : false, message : "" })
    this.isSampleSubmit = true;
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
        this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
        this._service.getFormAttributeValues(this.formId || this.Mform.controls["savedFormID"].value).subscribe((res:any) => {
          if(res){
            for(var i=0;i<data.length;i++) {
              for (var j = 0; j < res.length; j++) {
                if(data[i]["formAttributeID"] == res[j]["FormAttributeID"]){
                  data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
                }
              }
            }
            this._service.createSample8(data, true).subscribe((res)=> {
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
        this._service.createSample8(data, this.formId ? true : false).subscribe((res)=> {
          if (res) {
            this.splashService.splashScreen({isLoading : false, message : "" })
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

}
