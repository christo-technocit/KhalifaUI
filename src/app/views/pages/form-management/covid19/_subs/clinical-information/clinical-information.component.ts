

import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-covid19-clinical-information',
  templateUrl: './clinical-information.component.html'
})
export class Covid19ClinicalInformationComponent implements OnInit {
  form:FormGroup;
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
      private splashService : SplashScreenService,
      private finalFormValues:PrepareFinalForm
  ) {  }

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
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this._service.getQuestionnaire(this.formId,11).subscribe((res:any[])=> {
        this.formData = res;
        this.saveFormId = this.formId;
        this.splashService.splashScreen({isLoading : false, message : "" })
        if(res.length)
        this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
"PCI_4A_Participants_blood_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4A_Participants_Weight": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4A_Participants_Height": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Hepatitis_B_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Hepatitis_B_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Hepatitis_B_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Deptheria_Tetanus_Pertussis_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Deptheria_Tetanus_Pertussis_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Deptheria_Tetanus_Pertussis_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Haemophilus_influenza_type_b_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Haemophilus_influenza_type_b_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Haemophilus_influenza_type_b_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Pneumococcal_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Pneumococcal_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Pneumococcal_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Polio_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Polio_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Polio_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Rotavirus_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Rotavirus_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Rotavirus_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Measles_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Measles_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Measles_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Varicella_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Varicella_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Varicella_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Hepatitis_A_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Hepatitis_A_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Hepatitis_A_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Meningococcal_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Meningococcal_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Meningococcal_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Human_papillomavirus_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Human_papillomavirus_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Human_papillomavirus_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Zoster_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Zoster_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Zoster_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Influenza_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Influenza_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Influenza_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Bacillus_Calmette_type": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Bacillus_Calmette_date_given": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Bacillus_Calmette_administered_by": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Asthma_wheezing_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Asthma_wheezing_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Asthma_wheezing_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Asthma_wheezing_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Other_breathing_problems_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Other_breathing_problems_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Other_breathing_problems_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Other_breathing_problems_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Sinus_trouble_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Sinus_trouble_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Sinus_trouble_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Sinus_trouble_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hay_fever_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hay_fever_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hay_fever_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hay_fever_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hives_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hives_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hives_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Hives_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Eczema_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Eczema_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Eczema_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Eczema_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Frequent_infections_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Frequent_infections_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Frequent_infections_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Frequent_infections_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Food_reactions_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Food_reactions_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Food_reactions_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Food_reactions_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Drug_reactions_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Drug_reactions_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Drug_reactions_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Drug_reactions_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Others_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Others_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Others_OnsetAge": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Others_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Others_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_1_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_1_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_1_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_1_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_1_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_2_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_2_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_2_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_2_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_2_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_3_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_3_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_3_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_3_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_3_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_4_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_4_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_4_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_4_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_4_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_5_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_5_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_5_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_5_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_5_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_6_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_6_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_6_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_6_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_6_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_7_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_7_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_7_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_7_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_7_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_8_Viral_Infection_YesNo": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_8_Viral_Infection_Name": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_8_Viral_Infection_year": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_8_Viral_Infection_Severity": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_8_Viral_Infection_Comments": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4B_Immunization_record": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4C_Allergies": new FormControl({value: '', disabled: this.disableInput}),
"PCI_4D_Previous_viral_infections": new FormControl({value: '', disabled: this.disableInput}),

})
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(11,4).subscribe((res)=> {
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
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._service.createSampleId(11,0).subscribe((res)=> {
      this.saveFormId = res;
      this.splashService.splashScreen({isLoading : false, message : "" })
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
        this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
        this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value).subscribe((res:any) => {
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

