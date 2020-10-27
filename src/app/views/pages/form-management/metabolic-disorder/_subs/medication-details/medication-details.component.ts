import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'kt-medication-details',
  templateUrl: './medication-details.component.html'
})
export class MedicationDetailsComponent implements OnInit {
  Mform:FormGroup;
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
      private finalFormValues:PrepareFinalForm,
      private splashService : SplashScreenService
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
      this.splashService.splashScreen({
        isLoading : true,
        message : "LOADING"
      })
      this._service.getQuestionnaire1(this.formId).subscribe((res:any[])=> {
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
    this.Mform = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "medications_allergies": new FormControl({value: '', disabled: this.disableInput}),
      "medications_allergies_specify": new FormControl({value: '', disabled: this.disableInput}),
      "medication_intolerance": new FormControl({value: '', disabled: this.disableInput}),
      "medication_intolerance_specify": new FormControl({value: '', disabled: this.disableInput}),
      "medication_medication": new FormControl({value: '', disabled: this.disableInput}),
      "medication_medication_specify": new FormControl({value: '', disabled: this.disableInput}),
      "inhibit_ace": new FormControl({value: '', disabled: this.disableInput}),
      "perindop": new FormControl({value: '', disabled: this.disableInput}),
      "captopril": new FormControl({value: '', disabled: this.disableInput}),
      "enalapril": new FormControl({value: '', disabled: this.disableInput}),
      "lisinop": new FormControl({value: '', disabled: this.disableInput}),
      "medications_others": new FormControl({value: '', disabled: this.disableInput}),
      "inhibit_arbs": new FormControl({value: '', disabled: this.disableInput}),
      "losartan": new FormControl({value: '', disabled: this.disableInput}),
      "Valsartan": new FormControl({value: '', disabled: this.disableInput}),
      "anti_dose": new FormControl({value: '', disabled: this.disableInput}),
      "inhibit_beta": new FormControl({value: '', disabled: this.disableInput}),
      "atenolol": new FormControl({value: '', disabled: this.disableInput}),
      "bisopr": new FormControl({value: '', disabled: this.disableInput}),
      "beta_dose": new FormControl({value: '', disabled: this.disableInput}),
      "inhibit_diuret": new FormControl({value: '', disabled: this.disableInput}),
      "indapam": new FormControl({value: '', disabled: this.disableInput}),
      "hydroch": new FormControl({value: '', disabled: this.disableInput}),
      "fruse": new FormControl({value: '', disabled: this.disableInput}),
      "diur_others": new FormControl({value: '', disabled: this.disableInput}),
      "inhibit_channel": new FormControl({value: '', disabled: this.disableInput}),
      "amlodip": new FormControl({value: '', disabled: this.disableInput}),
      "nifedip": new FormControl({value: '', disabled: this.disableInput}),
      "verapamil": new FormControl({value: '', disabled: this.disableInput}),
      "diur_inhibit_others": new FormControl({value: '', disabled: this.disableInput}),
      "others_oh": new FormControl({value: '', disabled: this.disableInput}),
      "methyldop": new FormControl({value: '', disabled: this.disableInput}),
      "otr_dose": new FormControl({value: '', disabled: this.disableInput}),
      "AntiRadio_statinsan": new FormControl({value: '', disabled: this.disableInput}),
      "simvast": new FormControl({value: '', disabled: this.disableInput}),
      "atorvast": new FormControl({value: '', disabled: this.disableInput}),
      "rosuvas": new FormControl({value: '', disabled: this.disableInput}),
      "OtherD": new FormControl({value: '', disabled: this.disableInput}),
      "AntiRadio_Fibrates": new FormControl({value: '', disabled: this.disableInput}),
      "gemfib": new FormControl({value: '', disabled: this.disableInput}),
      "fenofib": new FormControl({value: '', disabled: this.disableInput}),
    //  "fibrat1": new FormControl({value: '', disabled: this.disableInput}),
    //  "fibrat2": new FormControl({value: '', disabled: this.disableInput}),
      "AntiRadio_others": new FormControl({value: '', disabled: this.disableInput}),
      "AntiOthers": new FormControl({value: '', disabled: this.disableInput}),

      "anti_hyper_Biguanides": new FormControl({value: '', disabled: this.disableInput}),
      "Metformin": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_sus": new FormControl({value: '', disabled: this.disableInput}),
      "glibenclamide": new FormControl({value: '', disabled: this.disableInput}),
      "glimepir": new FormControl({value: '', disabled: this.disableInput}),
      "glipizide": new FormControl({value: '', disabled: this.disableInput}),
      "gliclazide_mr": new FormControl({value: '', disabled: this.disableInput}),
      "glipizide_dose": new FormControl({value: '', disabled: this.disableInput}),
      "pride_dose": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_other_su": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_thiazolid": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_pioglit": new FormControl({value: '', disabled: this.disableInput}),
      "AntiOther": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_meglitin": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_nateglinide": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_nateglinide_repaglinide": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_nateglinide_others": new FormControl({value: '', disabled: this.disableInput}), // Need to check
      "anti_hyper_glucosid": new FormControl({value: '', disabled: this.disableInput}),
      "acarbose": new FormControl({value: '', disabled: this.disableInput}),
      "acarbose_others": new FormControl({value: '', disabled: this.disableInput}), // Need to check
      "anti_hyper_dipeptidyl": new FormControl({value: '', disabled: this.disableInput}),
      "sitaglip": new FormControl({value: '', disabled: this.disableInput}),
      "vildaglip": new FormControl({value: '', disabled: this.disableInput}),
      "saxaglip": new FormControl({value: '', disabled: this.disableInput}),
      "linaglip": new FormControl({value: '', disabled: this.disableInput}),
      "dipeptidyl_others": new FormControl({value: '', disabled: this.disableInput}),  // Need to check
      "anti_hyper_peptid_others": new FormControl({value: '', disabled: this.disableInput}),
      "pramlintide": new FormControl({value: '', disabled: this.disableInput}),
      "other_inhibit": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_incretinm": new FormControl({value: '', disabled: this.disableInput}),
      "exenatide": new FormControl({value: '', disabled: this.disableInput}),
      "liraglut": new FormControl({value: '', disabled: this.disableInput}),
      "exenatide_dose": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_incretinm_others_dose": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_insulin_lin": new FormControl({value: '', disabled: this.disableInput}), // Next Panel
      "lispro_dose": new FormControl({value: '', disabled: this.disableInput}),
      "aspart_dose": new FormControl({value: '', disabled: this.disableInput}),
      "regular_dose": new FormControl({value: '', disabled: this.disableInput}),
      "nph_dose": new FormControl({value: '', disabled: this.disableInput}),
      "Detemir_Dose": new FormControl({value: '', disabled: this.disableInput}),
      "glargine": new FormControl({value: '', disabled: this.disableInput}),
      "insulin_lin_other_su": new FormControl({value: '', disabled: this.disableInput}),
      "combination": new FormControl({value: '', disabled: this.disableInput}),
      "combination_other_su": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_vitamin": new FormControl({value: '', disabled: this.disableInput}),
      "OtherVit": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_prozac": new FormControl({value: '', disabled: this.disableInput}),
      "OthersPro": new FormControl({value: '', disabled: this.disableInput}),
      "anti_hyper_diazepam": new FormControl({value: '', disabled: this.disableInput}),
      "OthersDia": new FormControl({value: '', disabled: this.disableInput}),
      "medication_traditional_chinese": new FormControl({value: '', disabled: this.disableInput}), //Need to Check
      "chin_specify": new FormControl({value: '', disabled: this.disableInput})
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(1,5).subscribe((res)=> {
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
    this.splashService.splashScreen({
      isLoading : true,
      message : "SAVING"
    })
    this._service.createSampleId(1,0).subscribe((res)=> {
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
    if (!this.Mform.value["savedFormID"] && !this.saveFormId) {
      this.createSampleId();
    } else {
      this.Mform.patchValue({"savedFormID" : this.Mform.value["savedFormID"] || this.saveFormId })

      let data = this.finalFormValues.prepareAttibuteForm(this.Mform.value, this.formAttributes, "savedFormID",this.formId)
      if (this.formId || this.isFormSubmit) {
        this.splashService.splashScreen({
          isLoading : true,
          message : "UPDATING"
        })
        this._service.getFormAttributeValues(this.formId || this.Mform.controls["savedFormID"].value).subscribe((res:any) => {
          if(res){
            for(var i=0;i<data.length;i++) {
              for (var j = 0; j < res.length; j++) {
                if(data[i]["formAttributeID"] == res[j]["FormAttributeID"]){
                  data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
                }
              }
            }
            this._service.createSample1(data, true).subscribe((res)=> {
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
        this._service.createSample3(data, this.formId ? true : false).subscribe((res)=> {
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
