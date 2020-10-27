import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-new-biochemical',
  templateUrl: './biochemical.component.html'
})
export class NewBiochemicalComponent implements OnInit {
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
      this._service.getQuestionnaire(this.formId,9).subscribe((res:any[])=> {
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
      "BIO_FastingGlucose_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_FastingGlucose_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_FastingGlucose_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_FastingGlucose_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_FastingGlucose_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_RandomGlucose_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_RandomGlucose_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_RandomGlucose_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_RandomGlucose_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_RandomGlucose_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG2_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG2_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG2_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG2_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_OGTT_FBG2_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HbA1c_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HbA1c_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HbA1c_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HbA1c_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HbA1c_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_TotalCholesterol_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_TotalCholesterol_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_TotalCholesterol_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_TotalCholesterol_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_TotalCholesterol_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Triglyceride_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Triglyceride_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Triglyceride_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Triglyceride_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Triglyceride_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HDL_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HDL_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HDL_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HDL_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_HDL_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_LDL_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_LDL_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_LDL_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_LDL_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_LDL_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Microalbumin_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Microalbumin_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Microalbumin_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Microalbumin_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Microalbumin_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albuminuria_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albuminuria_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albuminuria_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albuminuria_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albuminuria_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albumincreatinine_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albumincreatinine_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albumincreatinine_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albumincreatinine_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_albumincreatinine_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Creatinine_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Creatinine_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Creatinine_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Creatinine_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Creatinine_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Urea_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Urea_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Urea_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Urea_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Urea_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_VitaminDLevel_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_VitaminDLevel_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_VitaminDLevel_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_VitaminDLevel_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_VitaminDLevel_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_egfr_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_egfr_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_egfr_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_egfr_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_egfr_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_sodium_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_sodium_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_sodium_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_sodium_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_sodium_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_potassium_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_potassium_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_potassium_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_potassium_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_potassium_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_calcium_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_calcium_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_calcium_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_calcium_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_calcium_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mag_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mag_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mag_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mag_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mag_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_phos_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_phos_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_phos_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_phos_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_phos_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bicar_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bicar_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bicar_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bicar_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bicar_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_protein_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_protein_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_protein_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_protein_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_protein_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_serum_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_serum_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_serum_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_serum_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_serum_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_cprotein_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_cprotein_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_cprotein_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_cprotein_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_cprotein_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alt_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alt_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alt_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alt_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alt_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alp_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alp_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alp_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alp_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_alp_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ast_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ast_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ast_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ast_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ast_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bilirubin_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bilirubin_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bilirubin_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bilirubin_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_bilirubin_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t3_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t3_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t3_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t3_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t3_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t4_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t4_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t4_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t4_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_t4_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_freet4_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_freet4_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_freet4_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_freet4_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_freet4_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_tsh_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_tsh_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_tsh_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_tsh_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_tsh_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_parathyroid_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_parathyroid_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_parathyroid_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_parathyroid_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_parathyroid_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_diff_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_diff_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_diff_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_diff_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_wbc_diff_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbc_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbc_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbc_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbc_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbc_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haemoglobin_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haemoglobin_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haemoglobin_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haemoglobin_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haemoglobin_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haematocrit_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haematocrit_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haematocrit_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haematocrit_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_haematocrit_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ferritin_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ferritin_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ferritin_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ferritin_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_ferritin_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rdw_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rdw_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rdw_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rdw_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rdw_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmcv_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmcv_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmcv_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmcv_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmcv_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmch_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmch_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmch_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmch_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmch_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmchc_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmchc_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmchc_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmchc_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_rbcmchc_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Reticulocyte_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Reticulocyte_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Reticulocyte_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Reticulocyte_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Reticulocyte_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Platelet_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Platelet_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Platelet_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Platelet_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_Platelet_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mpv_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mpv_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mpv_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mpv_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_mpv_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSmacroscopic_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSmacroscopic_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSmacroscopic_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSmacroscopic_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSmacroscopic_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSph_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSph_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSph_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSph_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSph_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSglu_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSglu_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSglu_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSglu_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSglu_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSgravity_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSgravity_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSgravity_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSgravity_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSgravity_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSNitrite_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSNitrite_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSNitrite_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSNitrite_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSNitrite_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSLeukocyte_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSLeukocyte_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSLeukocyte_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSLeukocyte_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSLeukocyte_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocells_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocells_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocells_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocells_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocells_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocasts_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocasts_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocasts_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocasts_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocasts_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocrystals_RecentTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocrystals_RecentTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocrystals_LastTest_Date": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocrystals_LastTest_Result": new FormControl({value: '', disabled: this.disableInput}),
      "BIO_UTSMicrocrystals_IsNormalResult": new FormControl({value: '', disabled: this.disableInput}),
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(9,7).subscribe((res)=> {
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
