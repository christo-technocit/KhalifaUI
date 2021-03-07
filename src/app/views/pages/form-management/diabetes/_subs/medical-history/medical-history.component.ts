

import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-diabetes-medical-history',
  templateUrl: './medical-history.component.html'
})
export class DiabetesMedicalHistoryComponent implements OnInit {
  Mform:FormGroup;
  title:string = "Medical History";
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
      "med_hypertension": new FormControl({value: '', disabled: this.disableInput}),
"med_hypertension_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Prediabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_Prediabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Gestational_Diabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_Gestational_Diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_type1diabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_type1diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_type2diabetes": new FormControl({value: '', disabled: this.disableInput}),
"med_type2diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
"med_highcholesterol": new FormControl({value: '', disabled: this.disableInput}),
"med_highcholesterol_year": new FormControl({value: '', disabled: this.disableInput}),
"med_obesity": new FormControl({value: '', disabled: this.disableInput}),
"med_obesity_year": new FormControl({value: '', disabled: this.disableInput}),
"med_heartdis": new FormControl({value: '', disabled: this.disableInput}),
"med_heartdis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_cancer": new FormControl({value: '', disabled: this.disableInput}),
"med_cancer_year": new FormControl({value: '', disabled: this.disableInput}),
"med_osteoporosis": new FormControl({value: '', disabled: this.disableInput}),
"med_osteoporosis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_asthma": new FormControl({value: '', disabled: this.disableInput}),
"med_asthma_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Hypothyroidism1": new FormControl({value: '', disabled: this.disableInput}),
"med_Hypothyroidism1_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Hypothyroidism2": new FormControl({value: '', disabled: this.disableInput}),
"med_Hypothyroidism2_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Autoimmune": new FormControl({value: '', disabled: this.disableInput}),
"med_Autoimmune_year": new FormControl({value: '', disabled: this.disableInput}),
"med_other": new FormControl({value: '', disabled: this.disableInput}),
"med_other_year": new FormControl({value: '', disabled: this.disableInput}),
"med_liver_disease": new FormControl({value: '', disabled: this.disableInput}),
"med_liver_disease_year": new FormControl({value: '', disabled: this.disableInput}),
"med_arthritis": new FormControl({value: '', disabled: this.disableInput}),
"med_arthritis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_year": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_type_b": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_year_b": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_type_c": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_year_c": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_type_d": new FormControl({value: '', disabled: this.disableInput}),
"med_hepatitis_year_d": new FormControl({value: '', disabled: this.disableInput}),
"med_Anxiety": new FormControl({value: '', disabled: this.disableInput}),
"med_Anxiety_year": new FormControl({value: '', disabled: this.disableInput}),
"med_depression": new FormControl({value: '', disabled: this.disableInput}),
"med_depression_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Bipolar": new FormControl({value: '', disabled: this.disableInput}),
"med_Bipolar_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Schizophrenia": new FormControl({value: '', disabled: this.disableInput}),
"med_Schizophrenia_year": new FormControl({value: '', disabled: this.disableInput}),
"med_PTSD": new FormControl({value: '', disabled: this.disableInput}),
"med_PTSD_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Psychiatric_other": new FormControl({value: '', disabled: this.disableInput}),
"med_Psychiatric_other_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Alzheimer": new FormControl({value: '', disabled: this.disableInput}),
"med_Alzheimer_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Parkinson": new FormControl({value: '', disabled: this.disableInput}),
"med_Parkinson_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Epilepsy": new FormControl({value: '', disabled: this.disableInput}),
"med_Epilepsy_year": new FormControl({value: '', disabled: this.disableInput}),
"med_Other_neurological": new FormControl({value: '', disabled: this.disableInput}),
"med_Other_neurological_year": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Chronic_gastrointestinal": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Inflammatory_bowel": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Gastrointestinal_ulcer": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Chronic_liver": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Chronic_pancreatitis": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Chronic_kidney": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Cholelithiasis": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Endocrine_disorders": new FormControl({value: '', disabled: this.disableInput}),
"PMD_inflammation": new FormControl({value: '', disabled: this.disableInput}),
"complications_retinopathy": new FormControl({value: '', disabled: this.disableInput}),
"complications_neuropathy": new FormControl({value: '', disabled: this.disableInput}),
"complications_cva": new FormControl({value: '', disabled: this.disableInput}),
"complications_No_proliferative": new FormControl({value: '', disabled: this.disableInput}),
"complications_foot": new FormControl({value: '', disabled: this.disableInput}),
"complications_tia": new FormControl({value: '', disabled: this.disableInput}),
"complications_proliferative": new FormControl({value: '', disabled: this.disableInput}),
"complications_Gangrene": new FormControl({value: '', disabled: this.disableInput}),
"complications_Stroke": new FormControl({value: '', disabled: this.disableInput}),
"complications_Laser": new FormControl({value: '', disabled: this.disableInput}),
"complications_numbness": new FormControl({value: '', disabled: this.disableInput}),
"complications_onesidebody": new FormControl({value: '', disabled: this.disableInput}),
"complications_Amputation": new FormControl({value: '', disabled: this.disableInput}),
"complications_Bleeding": new FormControl({value: '', disabled: this.disableInput}),
"complications_Loss_of_toe": new FormControl({value: '', disabled: this.disableInput}),
"complications_Diff_speaking": new FormControl({value: '', disabled: this.disableInput}),
"complications_Pain_in_calfmuscles": new FormControl({value: '', disabled: this.disableInput}),
"complications_Operation_on_artery": new FormControl({value: '', disabled: this.disableInput}),
"complications_Circulation_peripheral_vascular": new FormControl({value: '', disabled: this.disableInput}),
"complications_Facial_drop": new FormControl({value: '', disabled: this.disableInput}),
"complications_Retinopathy_other": new FormControl({value: '', disabled: this.disableInput}),
"complications_Neuropathy_other": new FormControl({value: '', disabled: this.disableInput}),
"complications_CVA_other": new FormControl({value: '', disabled: this.disableInput}),
"complications_Paralyzedarm": new FormControl({value: '', disabled: this.disableInput}),//
"complications_nephropathy": new FormControl({value: '', disabled: this.disableInput}),
"complications_Laser_other": new FormControl({value: '', disabled: this.disableInput}),
"complications_cad": new FormControl({value: '', disabled: this.disableInput}),
"complications_other": new FormControl({value: '', disabled: this.disableInput}),
"complications_albumin": new FormControl({value: '', disabled: this.disableInput}),
"complications_CABG": new FormControl({value: '', disabled: this.disableInput}),
"complications_Albuminuria": new FormControl({value: '', disabled: this.disableInput}),
"complications_PCI": new FormControl({value: '', disabled: this.disableInput}),
"complications_30_29mg_24h": new FormControl({value: '', disabled: this.disableInput}),
"complications_Arrhythmias": new FormControl({value: '', disabled: this.disableInput}),
"complications_300_mg_24h": new FormControl({value: '', disabled: this.disableInput}),
"complications_egfr": new FormControl({value: '', disabled: this.disableInput}),
"PMD_diagnosed_with_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_PCR_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Hospital_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Admission_COVID_19_date": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Discharge_COVID_19_date": new FormControl({value: '', disabled: this.disableInput}),
"PMD_ICU_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Pneumonia_Covid_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_ARDS_Covid_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_ChestXray_Covid_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_ECG_Covid_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_Ventilation_Covid_19": new FormControl({value: '', disabled: this.disableInput}),
"PMD_ECMO_Covid_19": new FormControl({value: '', disabled: this.disableInput}),
"complications_Retinopathy_other_other": new FormControl({value: '', disabled: this.disableInput}),
"complications_Neuropathy_other_specify": new FormControl({value: '', disabled: this.disableInput}),
"complications_Laser_other_other": new FormControl({value: '', disabled: this.disableInput}),
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(12,6).subscribe((res)=> {
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
