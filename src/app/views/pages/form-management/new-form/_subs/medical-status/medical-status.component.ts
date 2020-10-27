import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-new-medical-status',
  templateUrl: './medical-status.component.html'
})
export class NewMedicalStatusComponent implements OnInit {
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
      this._service.getQuestionnaire(this.formId,9).subscribe((res:any[])=> {
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
      "allergies": new FormControl({value: '', disabled: this.disableInput}),
      "allergies_yestxt": new FormControl({value: '', disabled: this.disableInput}),
      "intolerance": new FormControl({value: '', disabled: this.disableInput}),
      "intolerance_yestxt": new FormControl({value: '', disabled: this.disableInput}),
      "med_hypertension": new FormControl({value: '', disabled: this.disableInput}),
      "med_hypertension_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_type2diabetes": new FormControl({value: '', disabled: this.disableInput}),
      "med_type2diabetes_year": new FormControl({value: '', disabled: this.disableInput}),
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
      "med_cancer_type": new FormControl({value: '', disabled: this.disableInput}),
      "med_depression": new FormControl({value: '', disabled: this.disableInput}),
      "med_depression_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_osteoporosis": new FormControl({value: '', disabled: this.disableInput}),
      "med_osteoporosis_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_asthma": new FormControl({value: '', disabled: this.disableInput}),
      "med_asthma_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_inheriteddis": new FormControl({value: '', disabled: this.disableInput}),
      "med_inheriteddis_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_thyroid": new FormControl({value: '', disabled: this.disableInput}),
      "med_thyroid_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_liver": new FormControl({value: '', disabled: this.disableInput}),
      "med_liver_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_arthritis": new FormControl({value: '', disabled: this.disableInput}),
      "med_arthritis_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_hepatitis": new FormControl({value: '', disabled: this.disableInput}),
      "med_hepatitis_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_sickle": new FormControl({value: '', disabled: this.disableInput}),
      "med_sickle_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_neurological": new FormControl({value: '', disabled: this.disableInput}),
      "med_neurological_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_faint": new FormControl({value: '', disabled: this.disableInput}),
      "med_faint_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_migraine": new FormControl({value: '', disabled: this.disableInput}),
      "med_migraine_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_epilepsy": new FormControl({value: '', disabled: this.disableInput}),
      "med_epilepsy_year": new FormControl({value: '', disabled: this.disableInput}),
      "med_other_specify": new FormControl({value: '', disabled: this.disableInput}),
      "med_surgery": new FormControl({value: '', disabled: this.disableInput}),
      "med_surgery_yestxt": new FormControl({value: '', disabled: this.disableInput}),
      "medication_hypertension": new FormControl({value: '', disabled: this.disableInput}),
      "medication_type1": new FormControl({value: '', disabled: this.disableInput}),
      "medication_type2": new FormControl({value: '', disabled: this.disableInput}),
      "medication_choles": new FormControl({value: '', disabled: this.disableInput}),
      "medication_obe": new FormControl({value: '', disabled: this.disableInput}),
      "medication_heart": new FormControl({value: '', disabled: this.disableInput}),
      "medication_cancer": new FormControl({value: '', disabled: this.disableInput}),
      "medication_dep": new FormControl({value: '', disabled: this.disableInput}),
      "medication_osteo": new FormControl({value: '', disabled: this.disableInput}),
      "medication_asth": new FormControl({value: '', disabled: this.disableInput}),
      "medication_inhdis": new FormControl({value: '', disabled: this.disableInput}),
      "medication_vit": new FormControl({value: '', disabled: this.disableInput}),
      "medication_none": new FormControl({value: '', disabled: this.disableInput}),
      "med_vaccine": new FormControl({value: '', disabled: this.disableInput}),
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(9,4).subscribe((res)=> {
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
    this._service.createSampleId(9,0).subscribe((res)=> {
      this.saveFormId = res;
      this.splashService.splashScreen({isLoading : false, message : "" })
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
        this.splashService.splashScreen({ isLoading : true, message : "INSERTING" });
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
