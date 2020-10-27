
import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-hsa-biochemical',
  templateUrl: './biochemical.component.html'
})
export class HsaBiochemicalComponent implements OnInit {
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
      // this._service.getQuestionnaire(this.formId,10).subscribe((res:any[])=> {
      //   this.formData = res;
      //   this.saveFormId = this.formId;
      //   this.splashService.splashScreen({isLoading : false, message : "" })
      //   if(res.length)
      //   this.prepareForm();
      // })

      this._service.getQuestionnaire9(this.formId).subscribe((res: any[]) => {
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
      "savedFormID": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_FastingGlucose_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FastingGlucose_Result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FastingGlucose_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FastingGlucose_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FastingGlucose_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RandomGlucose_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RandomGlucose_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RandomGlucose_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RandomGlucose_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RandomGlucose_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_OGTT_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_OGTT_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_OGTT_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_OGTT_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_OGTT_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FG2_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FG2_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FG2_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FG2_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FG2_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HbA1c_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HbA1c_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HbA1c_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HbA1c_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HbA1c_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fasting_insulin_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fasting_insulin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fasting_insulin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fasting_insulin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fasting_insulin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TotalCholesterol_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TotalCholesterol_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TotalCholesterol_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TotalCholesterol_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TotalCholesterol_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Triglyceride_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Triglyceride_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Triglyceride_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Triglyceride_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Triglyceride_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HDL_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HDL_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HDL_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HDL_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_HDL_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_LDL_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_LDL_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_LDL_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_LDL_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_LDL_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_VitaminDLevel_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_VitaminDLevel_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_VitaminDLevel_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_VitaminDLevel_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_VitaminDLevel_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Microalbumin_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Microalbumin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Microalbumin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Microalbumin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Microalbumin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albuminuria_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albuminuria_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albuminuria_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albuminuria_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albuminuria_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albumincreatinine_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albumincreatinine_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albumincreatinine_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albumincreatinine_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_albumincreatinine_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Creatinine_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Creatinine_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Creatinine_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Creatinine_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Creatinine_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Urea_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Urea_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Urea_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Urea_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Urea_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_egfr_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_egfr_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_egfr_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_egfr_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_egfr_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_sodium_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_sodium_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_sodium_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_sodium_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_sodium_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_potassium_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_potassium_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_potassium_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_potassium_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_potassium_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_calcium_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_calcium_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_calcium_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_calcium_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_calcium_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Magnesium_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Magnesium_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Magnesium_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Magnesium_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Magnesium_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Phosphorus_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Phosphorus_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Phosphorus_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Phosphorus_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Phosphorus_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Bicarbonate_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Bicarbonate_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Bicarbonate_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Bicarbonate_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Bicarbonate_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALT_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALT_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALT_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALT_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALT_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALP_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALP_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALP_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALP_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ALP_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_AST_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_AST_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_AST_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_AST_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_AST_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_bilirubin_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_bilirubin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_bilirubin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_bilirubin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_bilirubin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Protein_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Protein_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Protein_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Protein_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Protein_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Serum_albumin_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Serum_albumin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Serum_albumin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Serum_albumin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Serum_albumin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_cprotein_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_cprotein_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_cprotein_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_cprotein_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_cprotein_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fibrinogen_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fibrinogen_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fibrinogen_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fibrinogen_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Fibrinogen_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Interleukin_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Interleukin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Interleukin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Interleukin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Interleukin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Procalcitonin_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Procalcitonin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Procalcitonin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Procalcitonin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Procalcitonin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_PAI1_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_PAI1_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_PAI1_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_PAI1_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_PAI1_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Insulin_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Insulin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Insulin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Insulin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Insulin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Cortisol_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Cortisol_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Cortisol_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Cortisol_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Cortisol_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T3_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T3_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T3_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T3_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T3_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T4_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T4_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T4_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T4_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_T4_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FreeT4_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FreeT4_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FreeT4_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FreeT4_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_FreeT4_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TSH_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TSH_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TSH_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TSH_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_TSH_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_parathyroid_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_parathyroid_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_parathyroid_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_parathyroid_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_parathyroid_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Estrogen_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Estrogen_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Estrogen_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Estrogen_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Estrogen_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Progesterone_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Progesterone_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Progesterone_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Progesterone_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Progesterone_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Testosterone_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Testosterone_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Testosterone_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Testosterone_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Testosterone_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_Count_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_Count_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_Count_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_Count_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_Count_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_DiffCount_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_DiffCount_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_DiffCount_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_DiffCount_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_WBC_DiffCount_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RBC_Count_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RBC_Count_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RBC_Count_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RBC_Count_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RBC_Count_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haemoglobin_Count_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haemoglobin_Count_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haemoglobin_Count_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haemoglobin_Count_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haemoglobin_Count_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haematocrit_Count_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haematocrit_Count_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haematocrit_Count_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haematocrit_Count_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Haematocrit_Count_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ferritin_Count_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ferritin_Count_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ferritin_Count_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ferritin_Count_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ferritin_Count_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RDW_Count_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RDW_Count_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RDW_Count_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RDW_Count_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_RDW_Count_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Redbloodcellindice_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Redbloodcellindice_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Redbloodcellindice_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Redbloodcellindice_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Redbloodcellindice_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCV_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCV_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCV_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCV_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCV_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCH_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCH_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCH_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCH_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCH_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCHC_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCHC_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCHC_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCHC_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MCHC_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Reticulocyte_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Reticulocyte_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Reticulocyte_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Reticulocyte_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Reticulocyte_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Platelet_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Platelet_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Platelet_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Platelet_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Platelet_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MPVPlatelet_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MPVPlatelet_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MPVPlatelet_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MPVPlatelet_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_MPVPlatelet_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta40_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta40_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta40_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta40_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta40_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta42_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta42_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta42_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta42_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Abeta42_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_tTau_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_tTau_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_tTau_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_tTau_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_tTau_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSmacroscopic_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSmacroscopic_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSmacroscopic_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSmacroscopic_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSmacroscopic_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSpH_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSpH_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSpH_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSpH_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSpH_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGlucose_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGlucose_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGlucose_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGlucose_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGlucose_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGravity_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGravity_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGravity_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGravity_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSGravity_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSNitrite_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSNitrite_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSNitrite_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSNitrite_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSNitrite_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSWBC_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSWBC_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSWBC_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSWBC_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSWBC_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSProtein_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSProtein_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSProtein_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSProtein_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSProtein_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBilirubin_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBilirubin_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBilirubin_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBilirubin_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBilirubin_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBlood_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBlood_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBlood_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBlood_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSBlood_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSLeukocyte_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSLeukocyte_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSLeukocyte_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSLeukocyte_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSLeukocyte_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_cells_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_cells_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_cells_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_cells_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_cells_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_casts_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_casts_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_casts_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_casts_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_casts_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_crystals_before": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_crystals_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_crystals_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_crystals_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_UTSMicroscopy_crystals_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Blood_ketone_level_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Blood_ketone_level_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Blood_ketone_level_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Blood_ketone_level_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Blood_ketone_level_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_beta_amyloid_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_beta_amyloid_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_beta_amyloid_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_beta_amyloid_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_beta_amyloid_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ptau181_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ptau181_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ptau181_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ptau181_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ptau181_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ketones_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ketones_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ketones_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ketones_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Ketones_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ABG_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ABG_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ABG_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ABG_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_ABG_result_after12": new FormControl({value: '', disabled: this.disableInput}),
"BIO_Comments": new FormControl({value: '', disabled: this.disableInput}),

// Additional Fields 26/10/2020
"BIO_covid19_before_medication": new FormControl({value: '', disabled: this.disableInput}),
"BIO_covid19_result_after3": new FormControl({value: '', disabled: this.disableInput}),
"BIO_covid19_result_after6": new FormControl({value: '', disabled: this.disableInput}),
"BIO_covid19_result_after9": new FormControl({value: '', disabled: this.disableInput}),
"BIO_covid19_result_after12": new FormControl({value: '', disabled: this.disableInput}),


    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(10,10).subscribe((res)=> {
      this.formAttributes = res;
    })
  }

  prepareForm() {
    this.splashService.splashScreen({ isLoading : true, message : "LOADING" })

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
