
import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SplashScreenService} from "@services/splash-screen-service";
import {VitamindService} from "@services/vitamind.form.service";
@Component({
  selector: 'kt-hsa-medication',
  templateUrl: './medication.component.html'
})
export class HsaMedicationComponent implements OnInit {
  Mform:FormGroup;
  title:string = "Medication";
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
      this._service.getQuestionnaire(this.formId,10).subscribe((res:any[])=> {
        this.formData = res;
        this.saveFormId = this.formId;
        this.splashService.splashScreen({isLoading : false, message : "" })
        if(res.length)
        this.prepareForm();
      })
    }
  }

  createForm() {
    this.Mform = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "Anti_Hypertensive_ACE_inhibitors": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ACE_inhibitors_Perindopril": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ACE_inhibitors_Captopril": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ACE_inhibitors_Enalapril": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ACE_inhibitors_Lisinopril": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ACE_inhibitors_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ARBs": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ARBs_Losartan": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ARBs_Valsartan": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_ARBs_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Beta_blockers": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Beta_blockers_Atenolol": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Beta_blockers_Bisoprolol": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Beta_blockers_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Diuretics": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Diuretics_Indapamide": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Diuretics_Hydrochlorothiazide": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Diuretics_Frusemide": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_Diuretics_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_CaChannel_Blockers": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_CaChannel_Blockers_Amlodipine": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_CaChannel_Blockers_Nifedipine": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_CaChannel_Blockers_Verapamil": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_CaChannel_Blockers_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Hypertensive_other_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Statins": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Statins_Simvastatin": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Statins_Atorvastatin": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Statins_Rosuvastatin": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Statins_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Fibrates": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Fibrates_Gemfibrozil": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Fibrates_Fenofibrate": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Fibrates_yes1": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_Fibrates_yes2": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_other": new FormControl({value: '', disabled: this.disableInput}),
"Anti_Dyslipidemia_other_other": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Biguanides": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Biguanides_Metformin": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas_Glibenclamide": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas_Glimepiride": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas_Glipizide": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas_GliclazideMR": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas_Glipizide1": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas_Glimepride": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyureas_other": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Thiazolidinediones": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Thiazolidinediones_Pioglitazone": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Thiazolidinediones_other": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Meglitinides": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Meglitinides_Nateglinide": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Meglitinides_Repaglinide": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Alpha_glucosidase_inhibitors": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Alpha_glucosidase_inhibitors_Acarbose": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Dipeptidyl": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Dipeptidyl_Sitagliptin": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Dipeptidyl_Vildagliptin": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Dipeptidyl_Saxagliptin": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Dipeptidyl_Linagliptin": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_other": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_other_Pramlintide": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_other_other": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Incretin": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Incretin_Exenatide": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Incretin_Liraglutide": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Incretin_Exenatide_weekly": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_Lispro": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_Aspart": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_Glulisine": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_Regular": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_NPH": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_Detemir": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_Glargine": new FormControl({value: '', disabled: this.disableInput}),
"Injections_Insulin_Combination": new FormControl({value: '', disabled: this.disableInput}),
"Supplements_VitaminD3": new FormControl({value: '', disabled: this.disableInput}),
"Supplements_others": new FormControl({value: '', disabled: this.disableInput}),
"Antidepressants_Prozac": new FormControl({value: '', disabled: this.disableInput}),
"Antidepressants_other": new FormControl({value: '', disabled: this.disableInput}),
"Antianxiety_Diazepam": new FormControl({value: '', disabled: this.disableInput}),
"Antianxiety_other": new FormControl({value: '', disabled: this.disableInput}),
"othermedication_other": new FormControl({value: '', disabled: this.disableInput}),
"traditional_chinese": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Sulphonyuras_other": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_Alpha_glucosidase_inhibitors_other": new FormControl({value: '', disabled: this.disableInput}),
"Oral_agents_SGLT2": new FormControl({value: '', disabled: this.disableInput}),
 "Oral_agents_Amylin": new FormControl({value: '', disabled: this.disableInput}),
"Supplements_Erythropoietin": new FormControl({value: '', disabled: this.disableInput}),
 "Antianxiety_Alprazolam": new FormControl({value: '', disabled: this.disableInput}),
"othermedication_other_specify": new FormControl({value: '', disabled: this.disableInput}),
 "traditional_chinese_specify": new FormControl({value: '', disabled: this.disableInput}),
"following_medications_other": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_1": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_1_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_1_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_1_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_1_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_1_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_2": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_2_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_2_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_2_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_2_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_2_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_3": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_3_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_3_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_3_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_3_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_3_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_4": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_4_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_4_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_4_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_4_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_4_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_1": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_1_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_1_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_1_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_1_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_1_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_2": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_2_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_2_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_2_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_2_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_2_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_3": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_3_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_3_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_3_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_3_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_3_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_4": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_4_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_4_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_4_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_4_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_OAD_side_4_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Bloating": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Bloating_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Bloating_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Bloating_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Bloating_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Bloating_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Abdominal_pain": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Abdominal_pain_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Abdominal_pain_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Abdominal_pain_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Abdominal_pain_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Abdominal_pain_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Nausea_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Nausea_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Nausea_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Nausea_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Nausea_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Diarrhea": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Diarrhea_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Diarrhea_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Diarrhea_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Diarrhea_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Diarrhea_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Vomiting": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Vomiting_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Vomiting_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Vomiting_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Vomiting_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Vomiting_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Anorexia": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Anorexia_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Anorexia_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Anorexia_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Anorexia_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Anorexia_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Other": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Other_start": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Other_3month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Other_6month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Other_9month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Other_12month": new FormControl({value: '', disabled: this.disableInput}),
"DT_Comments": new FormControl({value: '', disabled: this.disableInput}),
"DT_Metformin_Nausea": new FormControl({value: '', disabled: this.disableInput}),

    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(10,7).subscribe((res)=> {
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
    this._service.createSampleId(10,0).subscribe((res)=> {
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
