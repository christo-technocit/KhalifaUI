import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'kt-sb-treatment',
  templateUrl: './sb-treatment.component.html',
})
export class SbTreatmentComponent implements OnInit {

  form:FormGroup;
  title:string = " Substance Dependence Treatment";
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
      private splashService : SplashScreenService,
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
      this.splashService.splashScreen({
        isLoading : true,
        message : "LOADING"
      })
      this._service.getQuestionnaire(this.formId,2).subscribe((res:any[])=> {
        this.formData = res;
        this.saveFormId = this.formId;
        this.splashService.splashScreen({
          isLoading : false,
          message : ""
        })
        if(res.length)
          this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "addiction_treatment": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Naltrexone_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Naltrexone_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Naltrexone_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Naltrexone_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Buprenorphine_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Buprenorphine_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Buprenorphine_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Buprenorphine_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Inpatient_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Inpatient_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Inpatient_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_Inpatient_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_rehab_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_rehab_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_rehab_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_rehab_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_detox_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_detox_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_detox_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_detox_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_counselling_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_counselling_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_counselling_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_outpatient_counselling_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_self_help_group_times": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_self_help_group_star": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_self_help_group_finis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treat_prescribed_self_help_group_encoun": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treatment_completed": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treatment_recent_specify": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treatment_relapse": new FormControl({value: '', disabled: this.disableInput}),
      "sub_treatment_relapse_specify": new FormControl({value: '', disabled: this.disableInput}),
      "relapse_period": new FormControl({value: '', disabled: this.disableInput}),
      "current_treat_readiness": new FormControl({value: '', disabled: this.disableInput}),
      "risk_of_relapse": new FormControl({value: '', disabled: this.disableInput}),
      "risk_of_relapse_specify": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_methadon": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_methadon_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Clonide": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Clonide_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Bupemorphine": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Bupemorphine_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_suboxon": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_suboxon_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Naloxon": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Naloxon_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Naltrexon": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Naltrexon_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Naltrexon_xr": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_Naltrexon_xr_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_LOFex": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_LOFex_text": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_others": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_others_specify": new FormControl({value: '', disabled: this.disableInput}),
      "opiate_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_acamprosate": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_acamprosate_text": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_disulfirm": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_disulfirm_text": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_naltrexon": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_naltrexon_text": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_naltrexon_xr": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_naltrexon_xr_text": new FormControl({value: '', disabled: this.disableInput}),
      "Benzodiazphine_flumazenil": new FormControl({value: '', disabled: this.disableInput}),
      "Benzodiazphine_flumazenil_text": new FormControl({value: '', disabled: this.disableInput}),
      "Benzodiazphine_others": new FormControl({value: '', disabled: this.disableInput}),
      "Benzodiazphine_others_specify": new FormControl({value: '', disabled: this.disableInput}),
      "Benzodiazphine_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_vaenicline": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_vaenicline_text": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_bupropion": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_bupropion_text": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_nicotinnell": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_nicotinnell_text": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_nicotinnell_gum": new FormControl({value: '', disabled: this.disableInput}),
      "nicotine_nicotinnell_gum_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_antipsycotic": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_abilify_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_zebraxa_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_seriquol_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_risperdal_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_ziprasidone_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_haldol_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_zuclopenthixol_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antipsycotic_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_amitryptyline_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_clomiparamine_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_fluxetine_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_effexor_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_seroxate_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_escitalopram_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_sertraline_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_mirtazapine_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_bupropion_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antidepressants_others_dose": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_central_nervous": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_central_nervous_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_imovane_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_diazepam_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_librium_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_buspar_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_alprazolam_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_lorazepam_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_hydroxyzine_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_anxiolytics_others_dose": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_Antiepileptics": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_carbamazepine_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_klonopin_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_gabapentin_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_lamotrigine_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_topamax_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_dilantin_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_epilim_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "other_medic_hypnotic_antiepileptics_others_dose": new FormControl({value: '', disabled: this.disableInput})
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(2,7).subscribe((res)=> {
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
    this.splashService.splashScreen({
      isLoading : true,
      message : "SAVING"
    })
    this.splashService.splashScreen({
      isLoading : true,
      message : "SAVING"
    })
    this._service.createSampleId(2,0).subscribe((res)=> {
      this.saveFormId = res;
      this.splashService.splashScreen({
        isLoading : false,
        message : ""
      })
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
        this.splashService.splashScreen({
          isLoading : true,
          message : "UPDATING"
        })
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
                this.splashService.splashScreen({
                  isLoading : false,
                  message : ""
                })
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
        this.splashService.splashScreen({
          isLoading : true,
          message : "INSERTING"
        })
        this._service.createSample1 (data, this.formId ? true : false).subscribe((res)=> {
          if (res) {
            this.isFormSubmit = true;
            this.splashService.splashScreen({
              isLoading : false,
              message : ""
            })
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
