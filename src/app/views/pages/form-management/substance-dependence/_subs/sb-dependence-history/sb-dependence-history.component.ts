import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'kt-sb-dependence-history',
  templateUrl: './sb-dependence-history.component.html',

})
export class SbDependenceHistoryComponent implements OnInit {

  form:FormGroup;
  title:string = "Substance Dependence History Details";
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
      "substance": new FormControl({value: '', disabled: this.disableInput}),
      "medhadone_used": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_symoron": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_dolophine": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_amidone": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_physeptone": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_heptadon": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_methadose": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_disket": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_symoron_first": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_dolophine_first": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_amidone_first": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_physeptone_first": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_heptadon_first": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_methadose_first": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_disket_first": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_symoron_total": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_dolophine_total": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_amidone_total": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_physeptone_total": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_heptadon_total": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_methadose_total": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_disket_total": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_symoron_amn": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_dolophine_amn": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_amidone_amn": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_physeptone_amn": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_heptadon_amn": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_methadose_amn": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_disket_amn": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_symoron_freq": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_dolophine_freq": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_amidone_freq": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_physeptone_freq": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_heptadon_freq": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_methadose_freq": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_disket_freq": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_symoron_admin": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_dolophine_admin": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_amidone_admin": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_physeptone_admin": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_heptadon_admin": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_methadose_admin": new FormControl({value: '', disabled: this.disableInput}),
      "methadone_disket_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Buprenorphine_used": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_subutex": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_suboxone": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_buprenex": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_subutex_first": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_suboxone_first": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_buprenex_first": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_subutex_total": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_suboxone_total": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_buprenex_total": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_subutex_amn": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_suboxone_amn": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_buprenex_amn": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_subutex_freq": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_suboxone_freq": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_buprenex_freq": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_subutex_admin": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_suboxone_admin": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_buprenex_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Opiates_used": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_heroin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_heroin_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_heroin_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_heroin_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_heroin_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_heroin_admin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_morphine": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_morphine_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_morphine_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_morphine_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_morphine_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_morphine_admin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_codine": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_codine_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_codine_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_codine_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_codine_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_codine_admin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxycodon": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxycodon_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxycodon_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxycodon_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxycodon_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxycodon_admin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxymorphon": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxymorphon_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxymorphon_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxymorphon_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxymorphon_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_oxymorphon_admin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydrocodon": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydrocodon_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydrocodon_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydrocodon_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydrocodon_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydrocodon_admin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydromorphon": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydromorphon_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydromorphon_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydromorphon_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydromorphon_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_hydromorphon_admin": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_tramadol": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_tramadol_first": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_tramadol_total": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_tramadol_amn": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_tramadol_freq": new FormControl({value: '', disabled: this.disableInput}),
      "opiates_tramadol_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_used": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_valium": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_valium_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_valium_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_valium_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_valium_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_valium_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_librium": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_librium_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_librium_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_librium_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_librium_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_librium_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_halcion": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_halcion_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_halcion_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_halcion_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_halcion_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_halcion_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_prosom": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_prosom_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_prosom_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_prosom_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_prosom_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_prosom_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_xanax": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_xanax_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_xanax_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_xanax_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_xanax_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_xanax_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ativan": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ativan_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ativan_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ativan_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ativan_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ativan_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_klonopin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_klonopin_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_klonopin_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_klonopin_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_klonopin_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_klonopin_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_restoril": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_restoril_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_restoril_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_restoril_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_restoril_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_restoril_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_rohypnol": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_rohypnol_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_rohypnol_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_rohypnol_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_rohypnol_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_rohypnol_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_dalmane": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_dalmane_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_dalmane_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_dalmane_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_dalmane_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_dalmane_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_imovane": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_imovane_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_imovane_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_imovane_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_imovane_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_imovane_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ambien": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ambien_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ambien_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ambien_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ambien_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_ambien_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_lunesta": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_lunesta_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_lunesta_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_lunesta_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_lunesta_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_lunesta_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_others": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_others_first": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_others_total": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_others_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_others_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tranquilizers_others_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_used": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_marijuana": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_hashish": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_dope": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_synthetic": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_marijuana_first": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_hashish_first": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_dope_first": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_synthetic_first": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_marijuana_total": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_hashish_total": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_dope_total": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_synthetic_total": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_marijuana_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_hashish_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_dope_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_synthetic_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_marijuana_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_hashish_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_dope_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_synthetic_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_marijuana_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_hashish_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_dope_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Cannabis_synthetic_admin": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_used": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_amphetamine": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_amphetamine_first": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_amphetamine_total": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_amphetamine_amn": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_amphetamine_freq": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_amphetamine_admin": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_crystal": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_crystal_first": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_crystal_total": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_crystal_amn": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_crystal_freq": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_crystal_admin": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_hcl": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_hcl_first": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_hcl_total": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_hcl_amn": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_hcl_freq": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_methamphetamine_hcl_admin": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_dextroamphetamine": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_dextroamphetamine_first": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_dextroamphetamine_total": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_dextroamphetamine_amn": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_dextroamphetamine_freq": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_dextroamphetamine_admin": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_mdma": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_mdma_first": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_mdma_total": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_mdma_amn": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_mdma_freq": new FormControl({value: '', disabled: this.disableInput}),
      "amphetamines_mdma_admin": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_used": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_coke": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_crack": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_snow": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_coke_first": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_crack_first": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_snow_first": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_coke_total": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_crack_total": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_snow_total": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_coke_amn": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_crack_amn": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_snow_amn": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_coke_freq": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_crack_freq": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_snow_freq": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_coke_admin": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_crack_admin": new FormControl({value: '', disabled: this.disableInput}),
      "cocaine_snow_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Hallucinogens_used": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_lsd": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_mushroom": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_lsd_first": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_mushroom_first": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_lsd_total": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_mushroom_total": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_lsd_amn": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_mushroom_amn": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_lsd_freq": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_mushroom_freq": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_lsd_admin": new FormControl({value: '', disabled: this.disableInput}),
      "hallucinogens_mushroom_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_used": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_petrolume": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_petrolume_first": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_petrolume_total": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_petrolume_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_petrolume_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_petrolume_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_toulene": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_toulene_first": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_toulene_total": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_toulene_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_toulene_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_toulene_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_acetone": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_acetone_first": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_acetone_total": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_acetone_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_acetone_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_acetone_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_aerosols": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_aerosols_first": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_aerosols_total": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_aerosols_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_aerosols_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_aerosols_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_nitrites": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_nitrites_first": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_nitrites_total": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_nitrites_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_nitrites_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Inhalants_nitrites_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_used": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_Amobarbital": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_Amobarbital_first": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_Amobarbital_total": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_Amobarbital_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_Amobarbital_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_Amobarbital_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_pentobarbital": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_pentobarbital_first": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_pentobarbital_total": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_pentobarbital_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_pentobarbital_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_pentobarbital_admin": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_nembutal": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_nembutal_first": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_nembutal_total": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_nembutal_amn": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_nembutal_freq": new FormControl({value: '', disabled: this.disableInput}),
      "Barbiturates_nembutal_admin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_used": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_beer": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wiseky": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_vodka": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_tequila": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_gin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_rum": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wines": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_beer_first": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wiseky_first": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_vodka_first": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_tequila_first": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_gin_first": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_rum_first": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wines_first": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_beer_total": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wiseky_total": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_vodka_total": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_tequila_total": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_gin_total": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_rum_total": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wines_total": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_beer_amn": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wiseky_amn": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_vodka_amn": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_tequila_amn": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_gin_amn": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_rum_amn": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wines_amn": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_beer_freq": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wiseky_freq": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_vodka_freq": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_tequila_freq": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_gin_freq": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_rum_freq": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wines_freq": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_beer_admin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wiseky_admin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_vodka_admin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_tequila_admin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_gin_admin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_rum_admin": new FormControl({value: '', disabled: this.disableInput}),
      "alcohol_wines_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_used": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigarette": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigar": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_midwakh": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_shisha": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigarette_first": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigar_first": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_midwakh_first": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_shisha_first": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigarette_total": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigar_total": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_midwakh_total": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_shisha_total": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigarette_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigar_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_midwakh_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_shisha_amn": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigarette_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigar_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_midwakh_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_shisha_freq": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigarette_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_cigar_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_midwakh_admin": new FormControl({value: '', disabled: this.disableInput}),
      "tobacco_shisha_admin": new FormControl({value: '', disabled: this.disableInput}),
      "substance_dependence_his_others": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_state": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_first": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_total": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_amn": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_freq": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_admin": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_seizures": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_blackout": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_hallucination": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_chest_pain": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_sleep_dis": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_anxiety": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_nausea": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_Diarrhea": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_eating_problem": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_fatigue": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_overdose": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_headache": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_dizziness": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_paranoid": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_palpitation": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_uncontrollable": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_hyperactive": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_vomitting": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_constipation": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_urinating": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_irritability": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_others": new FormControl({value: '', disabled: this.disableInput}),
      "sub_symptoms_others_text": new FormControl({value: '', disabled: this.disableInput}),
      "substance_diagnosed": new FormControl({value: '', disabled: this.disableInput}),
      "drug_dosage": new FormControl({value: '', disabled: this.disableInput}),
      "sub_time_frame": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_state_1": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_first_1": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_total_1": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_amn_1": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_freq_1": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_admin_1": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_state_2": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_first_2": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_total_2": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_amn_2": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_freq_2": new FormControl({value: '', disabled: this.disableInput}),
      "prescribed_others_admin_2": new FormControl({value: '', disabled: this.disableInput})
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(2,5).subscribe((res)=> {
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
    this._service.createSampleId(2,0).subscribe((res)=> {
      this.saveFormId = res;
      this._interactionService.sendRefId(parseInt(this.saveFormId));
      this.splashService.splashScreen({
        isLoading : false,
        message : ""
      })
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
