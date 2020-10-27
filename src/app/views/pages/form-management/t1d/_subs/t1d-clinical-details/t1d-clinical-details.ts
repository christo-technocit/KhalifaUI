/**
 * Created by TCITSS on 1/9/2020.
 */
import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
    selector: 'kt-t1d-clinical-details',
    templateUrl: './t1d-clinical-details.html'
})

export class T1DClinicalDetails implements OnInit {
    VForm1:FormGroup;
    title:string = "Clinical Details";
    @Input('formData') formId:any;
    formData:any;
    formAttributes:any;
    @Input('disableInput') disableInput:boolean;
    saveFormId : any = 0;
    constructor(private _vService:VitamindService,
                private eformFB:FormBuilder,
                private _interactionService:ComponentInteractionService,
                private _snackBar: MatSnackBar,
                private splashService : SplashScreenService,
                private finalFormValues:PrepareFinalForm) {
    }

    ngOnInit() {
        this.createForm();
        if (!this.formId)
            this._interactionService._Refid$.subscribe((id)=> {
                this.VForm1.patchValue({"savedFormID": id})
            })
        else {
            this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
            this._vService.getQuestionnaire(this.formId,8).subscribe((res:any[])=> {
                this.formData = res;
                this.saveFormId = this.formId;
                this.splashService.splashScreen({isLoading : false, message : "" })
                if(res.length)
                this.prepareForm();
            })
        }
    }

    createForm() {
        this.VForm1 = this.eformFB.group({
            "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
            "CLIN_BodyWeight_KG"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_Height_CM"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_BMI_KGM2"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_WaistCircumference_CM"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_BloodPressure_SYS_mmHg"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_BloodPressure_DIA_mmHg"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_Hypertension"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_HypertensionAge"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_Diabetes"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_DiabetesType"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_DiabetesAge"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_OtherDiseases"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_YesRemarks"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Type2Diabetes"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Type1Diabetes"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Hypertension"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Dyslipidemia"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_DiabetesComplications"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Retinopathy"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Neuropathy"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Neuropathy_Other"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_CVA"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Nephropathy"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Nephropathy_Albuminuria"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Nephropathy_eGFR"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_CAD"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Others"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_Diabetes_Others_Remarks"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_PastHistory"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_PastHistory_Autoimmune"   : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_PastHistory_Celiac"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_PastHistory_Hypothyroidism"   : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_PastHistory_Arthritis"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_PastHistory_Other"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_PastHistory_Other_Remarks"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_OtherCon"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CLIN_MC_OtherCon_Remarks"  : new FormControl({value: '', disabled: this.disableInput}), 
        })
        this.getFormAttributeValues();
    }

    getFormAttributeValues() {
        this._vService.getFormAttribute(8,2).subscribe((res)=> {
            this.formAttributes = res;
        })
    }

        prepareForm() {
            Object.keys(this.formData[0]).forEach(name => {
                if (this.VForm1.controls[name]) {
                    this.VForm1.controls[name].patchValue(this.formData[0][name], {onlySelf: true});
                }
            });
        }


   // calculateBodyMass() {

//        if (this.VForm1.controls["BodyWeight"].value && this.VForm1.controls["Height"].value) {
//            this.VForm1.patchValue({"BodyMass": (this.VForm1.controls["BodyWeight"].value / this.VForm1.controls["Height"].value).toFixed(2)})
 //       }
 //   }

    createSampleId() {
        this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
        this._vService.createSampleId(8,0).subscribe((res)=> {
              this.saveFormId = res;
            this.splashService.splashScreen({isLoading : false, message : "" })
            this._interactionService.sendRefId(parseInt(this.saveFormId));
             this.onSubmit();
        });
    }


    onSubmit() {
        if (!this.VForm1.value["savedFormID"] && !this.saveFormId) {
            this.createSampleId();
        } else {
            this.VForm1.patchValue({"savedFormID" : this.VForm1.value["savedFormID"] || this.saveFormId })

            let data = this.finalFormValues.prepareAttibuteForm(this.VForm1.value, this.formAttributes, "savedFormID",this.formId)
            if (this.formId) {
                this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
                this._vService.getFormAttributeValues(this.formId).subscribe((res:any) => {
                    if(res){
                        for(var i=0;i<data.length;i++) {
                            for (var j = 0; j < res.length; j++) {
                                if(data[i]["formAttributeID"] == res[j]["FormAttributeID"]){
                                    data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
                                }
                            }
                        }
                        this._vService.createSample3(data, true).subscribe((res)=> {
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
                this._vService.createSample3(data, this.formId ? true : false).subscribe((res)=> {
                    if (res) {
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