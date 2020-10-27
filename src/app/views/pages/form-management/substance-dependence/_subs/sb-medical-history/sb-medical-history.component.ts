import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "../../../../../../core/services/component-interaction.service";
import {VitamindService} from "../../../../../../core/services/vitamind.form.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'kt-sb-medical-history',
  templateUrl: './sb-medical-history.component.html',
})
export class SbMedicalHistoryComponent implements OnInit {

  form:FormGroup;
  title:string = "Medical History Details";
  @Input('formData') formId:any;
  formData:any;
  formAttributes:any;
  @Input('disableInput') disableInput:boolean;
  saveFormId : any = 0;
  isFormSubmit : boolean = false;
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  constructor(
      private _service:VitamindService,
      private eformFB:FormBuilder,
      private _interactionService:ComponentInteractionService,
      private _snackBar: MatSnackBar,
      private finalFormValues:PrepareFinalForm
  ) { }

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
      this._service.getQuestionnaire(this.formId,2).subscribe((res:any[])=> {
        this.formData = res;
        this.saveFormId = this.formId;
        if(res.length)
          this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "smoking_status": new FormControl({value: '', disabled: this.disableInput}), // It should be in 2,3
      "medical_condition": new FormControl({value: '', disabled: this.disableInput}),
      "medical_con": new FormControl({value: '', disabled: this.disableInput}), // It is Extra
      "asthma_pre": new FormControl({value: '', disabled: this.disableInput}),
      "asthma_post": new FormControl({value: '', disabled: this.disableInput}),
      "diabetes_circle": new FormControl({value: '', disabled: this.disableInput}),
      "diabetes_circle_type": new FormControl({value: '', disabled: this.disableInput}),
      "diabetes_pre": new FormControl({value: '', disabled: this.disableInput}),
      "diabetes_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_heart": new FormControl({value: '', disabled: this.disableInput}),
      "medical_heart_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_heart_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_high_pressure": new FormControl({value: '', disabled: this.disableInput}),
      "medical_high_pressure_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_high_pressure_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_anemia": new FormControl({value: '', disabled: this.disableInput}),
      "medical_anemia_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_anemia_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_ulcer": new FormControl({value: '', disabled: this.disableInput}),
      "medical_ulcer_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_ulcer_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_cancer": new FormControl({value: '', disabled: this.disableInput}),
      "medical_cancer_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_cancer_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_kidney": new FormControl({value: '', disabled: this.disableInput}),
      "medical_kidney_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_kidney_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_HepatitisCircle": new FormControl({value: '', disabled: this.disableInput}),
      "medical_HepatitisCircleType": new FormControl({value: '', disabled: this.disableInput}),
      "medical_HepatitisCircle_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_HepatitisCircle_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_liver": new FormControl({value: '', disabled: this.disableInput}),
      "medical_liver_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_liver_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Seizures": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Seizures_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Seizures_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_gastro": new FormControl({value: '', disabled: this.disableInput}),
      "medical_gastro_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_gastro_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Sinusitis": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Sinusitis_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Sinusitis_pre_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_cough": new FormControl({value: '', disabled: this.disableInput}),
      "medical_cough_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_cough_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_skin": new FormControl({value: '', disabled: this.disableInput}),
      "medical_skin_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_skin_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Arthritis": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Arthritis_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Arthritis_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_hallucination": new FormControl({value: '', disabled: this.disableInput}),
      "medical_hallucination_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_hallucination_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Depression": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Depression_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_Depression_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_hiv": new FormControl({value: '', disabled: this.disableInput}),
      "medical_hiv_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_hiv_post": new FormControl({value: '', disabled: this.disableInput}),
      "medical_others": new FormControl({value: '', disabled: this.disableInput}),
      "medical_others_specify": new FormControl({value: '', disabled: this.disableInput}),
      "medical_others_pre": new FormControl({value: '', disabled: this.disableInput}),
      "medical_others_post": new FormControl({value: '', disabled: this.disableInput}),
      "allergies": new FormControl({value: '', disabled: this.disableInput}),
      "all_specify": new FormControl({value: '', disabled: this.disableInput}),
      "intolerance": new FormControl({value: '', disabled: this.disableInput}),
      "intolerance_specify": new FormControl({value: '', disabled: this.disableInput}),
      "dependence_weight": new FormControl({value: '', disabled: this.disableInput}),
      "reason_weight": new FormControl({value: '', disabled: this.disableInput}),
      "surgery": new FormControl({value: '', disabled: this.disableInput}),
      "ind_specify": new FormControl({value: '', disabled: this.disableInput}),
      "where_specify": new FormControl({value: '', disabled: this.disableInput}),
      "Reasaon_specify": new FormControl({value: '', disabled: this.disableInput}),
      "medical_pain": new FormControl({value: '', disabled: this.disableInput}),
      "when_specify": new FormControl({value: '', disabled: this.disableInput}),
      "source_specify": new FormControl({value: '', disabled: this.disableInput}),
      "medic_specify": new FormControl({value: '', disabled: this.disableInput}),
      "dur_specify": new FormControl({value: '', disabled: this.disableInput}),
      "medic_treatment": new FormControl({value: '', disabled: this.disableInput}),
      "medic_treat_specify": new FormControl({value: '', disabled: this.disableInput})
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(2,4).subscribe((res)=> {
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
    this._service.createSampleId(2,0).subscribe((res)=> {
      this.saveFormId = res;
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
        this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value).subscribe((res:any) => {
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
        this._service.createSample1 (data, this.formId ? true : false).subscribe((res)=> {
          if (res) {
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
