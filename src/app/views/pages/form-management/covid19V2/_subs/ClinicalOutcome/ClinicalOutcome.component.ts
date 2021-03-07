

import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-covid19V2-ClinicalOutcome',
  templateUrl: './ClinicalOutcome.component.html'
})
export class covid19V2ClinicalOutcomeComponent implements OnInit {
  form:FormGroup;
  title:string = "Clinical Outcome";
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
      private splashService : SplashScreenService,
      private finalFormValues:PrepareFinalForm
  ) {  }

  ngOnInit() {
    this.createForm();
    if (!this.formId)
      this._interactionService._Refid$.subscribe((id)=> {
        if(id) {
          this.form.patchValue({"savedFormID": id})
          this.saveFormId = id;
        }
        })
    else {
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this._service.getQuestionnaire(this.formId,13).subscribe((res:any[])=> {
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
"PersonHospitalized": new FormControl({value: '', disabled: this.disableInput}),
"OxygenTherapyRequired": new FormControl({value: '', disabled: this.disableInput}),
"AdmittedICU": new FormControl({value: '', disabled: this.disableInput}),
"IntubationRequired": new FormControl({value: '', disabled: this.disableInput}),
"MechanicalIncubationRequired": new FormControl({value: '', disabled: this.disableInput}),
"HospitalMedicalRecordChartNumber": new FormControl({value: '', disabled: this.disableInput}),
"MedicationAdministered1": new FormControl({value: '', disabled: this.disableInput}),
"Dose1": new FormControl({value: '', disabled: this.disableInput}),
"Comments1": new FormControl({value: '', disabled: this.disableInput}),
"MedicationAdministered2": new FormControl({value: '', disabled: this.disableInput}),
"Dose2": new FormControl({value: '', disabled: this.disableInput}),
"Comments2": new FormControl({value: '', disabled: this.disableInput}),
"NoRiskMedicalConditions": new FormControl({value: '', disabled: this.disableInput}),
"CardiacDisease": new FormControl({value: '', disabled: this.disableInput}),
"ChronicLungDisease": new FormControl({value: '', disabled: this.disableInput}),
"Haemoglobinopathies": new FormControl({value: '', disabled: this.disableInput}),
"Type2Diabetes": new FormControl({value: '', disabled: this.disableInput}),
"Dialysis": new FormControl({value: '', disabled: this.disableInput}),
"ImmunosuppressiveCondition": new FormControl({value: '', disabled: this.disableInput}),
"ImmunosuppressiveConditionSpecify": new FormControl({value: '', disabled: this.disableInput}),
"LiverDisease": new FormControl({value: '', disabled: this.disableInput}),
"MetabolicDisease": new FormControl({value: '', disabled: this.disableInput}),
"NeurologicalDisorder": new FormControl({value: '', disabled: this.disableInput}),
"Obesity": new FormControl({value: '', disabled: this.disableInput}),
"RenalDisease": new FormControl({value: '', disabled: this.disableInput}),
"RenalDiseaseDialysis": new FormControl({value: '', disabled: this.disableInput}),
"OtherRiskMedicalCondition": new FormControl({value: '', disabled: this.disableInput}),
"OtherRiskMedicalConditionSpecify": new FormControl({value: '', disabled: this.disableInput}),
"ReceivedCOVID19Vaccine": new FormControl({value: '', disabled: this.disableInput}),
"CurrentlyPregnant": new FormControl({value: '', disabled: this.disableInput}),
"CurrentSmoker": new FormControl({value: '', disabled: this.disableInput}),
"ConsumeAlcohol": new FormControl({value: '', disabled: this.disableInput}),








})
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(13,3).subscribe((res)=> {
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
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._service.createSampleId(13,0).subscribe((res)=> {
      this.saveFormId = res;
      this.splashService.splashScreen({isLoading : false, message : "" })
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
        this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
        this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value).subscribe((res:any) => {
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
            this.isFormSubmit = true;
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

}
