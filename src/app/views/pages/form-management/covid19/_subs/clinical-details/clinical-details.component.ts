

import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-covid19-clinical-details',
  templateUrl: './clinical-details.component.html'
})
export class Covid19ClinicalDetailsComponent implements OnInit {
  form:FormGroup;
  title:string = "Biomechanics Details";
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
      this._service.getQuestionnaire(this.formId,11).subscribe((res:any[])=> {
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
     "CP_3A_person_have_symptoms": new FormControl({value: '', disabled: this.disableInput}),
"CP_3A_person_have_symptoms_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3A_duration_symptoms": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_ARDS": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_ARDS_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_ARDS_XRay": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Diarrhea": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Diarrhea_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_loss_of_Taste_Smell": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_loss_of_Taste_Smell_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Fever": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Fever_high_temperature": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_feverish_selfreport": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_feverish_selfreport_where_when": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Pneumonia": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Pneumonia_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Pneumonia_XRay": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Arthralgia": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Arthralgia_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Cough": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Cough_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Conjunctivitis": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Conjunctivitis_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Fatigue": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Fatigue_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Chills_rigors": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Chills_rigors_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Headache": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Headache_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Malaise": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Malaise_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Myalgia": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Myalgia_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Nausea": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Nausea_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Pneumonitis": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Pneumonitis_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Rhinorrhea": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Rhinorrhea_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Shortness_of_breath": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Shortness_of_breath_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Sore_throat": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Sore_throat_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Runny_stuffynose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Runny_stuffynose_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Muscle_bodyaches": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Muscle_bodyaches_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Vomiting": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Vomiting_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Sneezing": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Sneezing_onset_date": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Other_symptoms": new FormControl({value: '', disabled: this.disableInput}),
"CP_3B_Clinical_notes": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_person_hospitalized": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_person_hospitalized_phone_number_hospital": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_Admitted_ICU_HDU": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_Admitted_ICU_HDU_number_of_days": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_Oxygen_Therapy_reqd": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_Intubation_reqd": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_Mechanical_incubation_reqd": new FormControl({value: '', disabled: this.disableInput}),
"CP_3C_Hospital_medical_record_chart_number": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_1_Medication_administered": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_1_Dose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_1_Comments": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_2_Medication_administered": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_2_Dose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_2_Comments": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_3_Medication_administered": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_3_Dose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_3_Comments": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_4_Medication_administered": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_4_Dose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_4_Comments": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_5_Medication_administered": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_5_Dose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_5_Comments": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_6_Medication_administered": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_6_Dose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_6_Comments": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_7_Medication_administered": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_7_Dose": new FormControl({value: '', disabled: this.disableInput}),
"CP_3D_7_Comments": new FormControl({value: '', disabled: this.disableInput}),
"CP_3E_outcome_of_the_case": new FormControl({value: '', disabled: this.disableInput}),
"CP_3E_outcome_of_the_case_date_of_death": new FormControl({value: '', disabled: this.disableInput}),
"CP_3E_death_due_to_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
"CP_3E_death_due_to_other_cause": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_No_risk_medical_conditions": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Cardiac_disease": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Chronic_lung_disease": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Haemoglobinopathies": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Diabetes": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Diabetes_dialysis": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Immunosuppressive_condition": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Immunosuppressive_condition_specify": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Liver_disease": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Metabolic_disease": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Neurological_disorder": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Obesity": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Renal_disease": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Other_risk_medical_condition": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Other_risk_medical_condition_specify": new FormControl({value: '', disabled: this.disableInput}),
"CP_3EE_Notes": new FormControl({value: '', disabled: this.disableInput}),
"CP_3F_currently_pregnant": new FormControl({value: '', disabled: this.disableInput}),
"CP_3F_currently_pregnant_number_of_weeks_gestation": new FormControl({value: '', disabled: this.disableInput}),
"CP_3F_current_smoker": new FormControl({value: '', disabled: this.disableInput}),
"CP_3F_current_smoker_year": new FormControl({value: '', disabled: this.disableInput}),
"CP_3F_current_smoker_pack_per_Week": new FormControl({value: '', disabled: this.disableInput}),
"CP_3F_consume_alcohol": new FormControl({value: '', disabled: this.disableInput}),
"CP_3F_drinks_per_week": new FormControl({value: '', disabled: this.disableInput}),
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(11,3).subscribe((res)=> {
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
    this._service.createSampleId(11,0).subscribe((res)=> {
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
