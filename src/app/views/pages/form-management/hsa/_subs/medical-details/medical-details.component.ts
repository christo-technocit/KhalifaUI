

import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-hsa-medical-details',
  templateUrl: './medical-details.component.html'
})
export class HsaMedicalDetailsComponent implements OnInit {
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
      this._service.getQuestionnaire(this.formId,10).subscribe((res:any[])=> {
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
      "med_hypertension": new FormControl({value: '', disabled: this.disableInput}),
"med_hypertension_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Prediabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_Prediabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_type2diabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_type2diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Gestational_Diabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_Gestational_Diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_type1diabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_type1diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_highcholesterol": new FormControl({value: '', disabled: this.disableInput}),
"med_highcholesterol_year": new FormControl({value: '', disabled: this.disableInput}),
"med_obesity": new FormControl({value: '', disabled: this.disableInput}),
"med_obesity_year": new FormControl({value: '', disabled: this.disableInput}),
"med_heartdis": new FormControl({value: '', disabled: this.disableInput}),
"med_heartdis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_cancer": new FormControl({value: '', disabled: this.disableInput}),

"med_cancer_year": new FormControl({value: '', disabled: this.disableInput}),
"med_osteoporosis": new FormControl({value: '', disabled: this.disableInput}),
"med_osteoporosis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_asthma": new FormControl({value: '', disabled: this.disableInput}),
"med_asthma_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Hypothyroidism": new FormControl({value: '', disabled: this.disableInput}),
"med_Hypothyroidism_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Hyperthyroidism": new FormControl({value: '', disabled: this.disableInput}),
"med_Hyerthyroidism_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Autoimmune": new FormControl({value: '', disabled: this.disableInput}),
"med_Autoimmune_year": new FormControl({value: '', disabled: this.disableInput}),
"med_thyroid_other_text": new FormControl({value: '', disabled: this.disableInput}),
"med_thyroid_year": new FormControl({value: '', disabled: this.disableInput}),
"med_liver": new FormControl({value: '', disabled: this.disableInput}),
"med_liver_year": new FormControl({value: '', disabled: this.disableInput}),
"med_arthritis": new FormControl({value: '', disabled: this.disableInput}),
"med_arthritis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_type": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_type_b": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_b_year": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_type_c": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_c_year": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_type_d": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_d_year": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Anxiety": new FormControl({value: '', disabled: this.disableInput}),
"med_Anxiety_year": new FormControl({value: '', disabled: this.disableInput}),
"med_depression": new FormControl({value: '', disabled: this.disableInput}),
"med_depression_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Bipolar": new FormControl({value: '', disabled: this.disableInput}),
"med_Bipolar_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Schizophrenia": new FormControl({value: '', disabled: this.disableInput}),
"med_Schizophrenia_year": new FormControl({value: '', disabled: this.disableInput}),
"med_PTSD": new FormControl({value: '', disabled: this.disableInput}),
"med_PTSD_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Psychiatric_other": new FormControl({value: '', disabled: this.disableInput}),
"med_Psychiatric_other_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_Psychiatric_other_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Alzheimer": new FormControl({value: '', disabled: this.disableInput}),
"med_Alzheimer_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Parkinson": new FormControl({value: '', disabled: this.disableInput}),
"med_Parkinson_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Epilepsy": new FormControl({value: '', disabled: this.disableInput}),
"med_Epilepsy_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Other_neurological": new FormControl({value: '', disabled: this.disableInput}),
"med_Other_neurological_text": new FormControl({value: '', disabled: this.disableInput}),
"med_Other_neurological_year": new FormControl({value: '', disabled: this.disableInput}),
"med_inheriteddis": new FormControl({value: '', disabled: this.disableInput}),
"med_inheriteddis_text": new FormControl({value: '', disabled: this.disableInput}),
"med_inheriteddis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_inherited_disease": new FormControl({value: '', disabled: this.disableInput}),
"med_inherited_disease_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_inherited_disease_year": new FormControl({value: '', disabled: this.disableInput}),
"med_other": new FormControl({value: '', disabled: this.disableInput}),
"med_other_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_other_year": new FormControl({value: '', disabled: this.disableInput}),
"allergies": new FormControl({value: '', disabled: this.disableInput}),
"allergies_yestxt": new FormControl({value: '', disabled: this.disableInput}),
"intolerance": new FormControl({value: '', disabled: this.disableInput}),
"intolerance_yestxt": new FormControl({value: '', disabled: this.disableInput}),
"med_surgery": new FormControl({value: '', disabled: this.disableInput}),
"med_surgery_yestxt": new FormControl({value: '', disabled: this.disableInput}),
"med_surgery_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_hypertension": new FormControl({value: '', disabled: this.disableInput}),
"medication_hypertension_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_hypertension_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Prediabetes": new FormControl({value: '', disabled: this.disableInput}),
"medication_Prediabetes_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Prediabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_type1": new FormControl({value: '', disabled: this.disableInput}),
"medication_type1_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_type1_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_type2": new FormControl({value: '', disabled: this.disableInput}),
"medication_type2_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_type2_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_choles": new FormControl({value: '', disabled: this.disableInput}),
"medication_choles_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_choles_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_obe": new FormControl({value: '', disabled: this.disableInput}),
"medication_obe_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_obe_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_heart": new FormControl({value: '', disabled: this.disableInput}),
"medication_heart_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_heart_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_cancer": new FormControl({value: '', disabled: this.disableInput}),
"medication_cancer_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_cancer_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Anxiety": new FormControl({value: '', disabled: this.disableInput}),
"medication_Anxiety_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Anxiety_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_dep": new FormControl({value: '', disabled: this.disableInput}),
"medication_dep_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_dep_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Bipolar": new FormControl({value: '', disabled: this.disableInput}),
"medication_Bipolar_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Bipolar_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Schizophrenia": new FormControl({value: '', disabled: this.disableInput}),
"medication_Schizophrenia_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Schizophrenia_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_PTSD": new FormControl({value: '', disabled: this.disableInput}),
"medication_PTSD_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_PTSD_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_Psychiatric_disorder": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_Psychiatric_disorder_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_Psychiatric_disorder_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_osteo": new FormControl({value: '', disabled: this.disableInput}),
"medication_osteo_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_osteo_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_asth": new FormControl({value: '', disabled: this.disableInput}),
"medication_asth_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_asth_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Endocrine_disorders": new FormControl({value: '', disabled: this.disableInput}),
"medication_Endocrine_disorders_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Endocrine_disorders_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_migraine": new FormControl({value: '', disabled: this.disableInput}),
"medication_migraine_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_migraine_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Alzheimer": new FormControl({value: '', disabled: this.disableInput}),
"medication_Alzheimer_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Alzheimer_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Parkinson": new FormControl({value: '', disabled: this.disableInput}),
"medication_Parkinson_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Parkinson_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Epilepsy": new FormControl({value: '', disabled: this.disableInput}),
"medication_Epilepsy_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Epilepsy_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_neurological": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_neurological_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_neurological_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Other_year": new FormControl({value: '', disabled: this.disableInput}),
"medication_none": new FormControl({value: '', disabled: this.disableInput}),
"medication_Supplements": new FormControl({value: '', disabled: this.disableInput}),
"donot_take_medication_specify": new FormControl({value: '', disabled: this.disableInput}),//1
"donot_take_medication_year": new FormControl({value: '', disabled: this.disableInput}),//2
"covid": new FormControl({value: '', disabled: this.disableInput}),//3
"flu": new FormControl({value: '', disabled: this.disableInput}),//4
"medication_Supplements_specify": new FormControl({value: '', disabled: this.disableInput}),
"medication_Supplements_year": new FormControl({value: '', disabled: this.disableInput}),
"med_vaccine": new FormControl({value: '', disabled: this.disableInput}),
"med_flushot": new FormControl({value: '', disabled: this.disableInput}),

//addtional fields - 15/10/2020
"med_diagnosed_type2diabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_diagnosed_type2diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_diagnosed_med_Prediabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_diagnosed_med_Prediabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Onset": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_EndDate": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Headache": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_temperature": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Cough": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_SoreThroat": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Weakness": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Lossofsmell": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Shortnessofbreath": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Runningnose": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Nausea": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Musclepain": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Diarrhea": new FormControl({value: '', disabled: this.disableInput}),
"med_covid19_Lossoftaste": new FormControl({value: '', disabled: this.disableInput}),
"med_hypertension_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_Prediabetes_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_type1diabetes_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_type2diabetes_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_highcholesterol_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_obesity_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_heartdis_specify": new FormControl({value: '', disabled: this.disableInput}),
"med_cancer_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_Anxiety_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_depression_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_Schizophrenia_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_PTSD_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_Bipolar_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_osteoporosis_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_asthma_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_vaccine_Specify": new FormControl({value: '', disabled: this.disableInput}),
"med_vaccine_Year": new FormControl({value: '', disabled: this.disableInput}),

    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(10,4).subscribe((res)=> {
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
    this._service.createSampleId(10, 0).subscribe((res) => {
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
