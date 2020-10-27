/**
 * Created by TCITSS on 1/9/2020.
 */
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
    selector: 'kt-t1d-biochemical-details',
    templateUrl: './t1d-biochemical-details.html'
})

export class T1DBiochemicalDetails implements OnInit {
    VForm1:FormGroup;
    title:string = "Biochemical Details";
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
                this.prepareForm();
            })
        }

    }

    createForm() {
        this.VForm1 = this.eformFB.group({
            "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
            "BIOC_HbA1c_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HbA1c_Test_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HbA1c_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_TotalCholesterol_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_TotalCholesterol_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_TotalCholesterol_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_Triglyceride_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_Triglyceride_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_Triglyceride_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HDL_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HDL_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HDL_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_LDL_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_LDL_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_LDL_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_VitaminDLevel_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_VitaminDLevel_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_VitaminDLevel_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HCO3PH_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HCO3PH_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_HCO3PH_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FastingCPEP_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FastingCPEP_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FastingCPEP_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Haemoglobin_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Haemoglobin_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Haemoglobin_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_WhiteCellCount_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_WhiteCellCount_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_WhiteCellCount_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Platelets_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Platelets_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Platelets_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Neutrophils_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Neutrophils_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Neutrophils_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Lymphocytes_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Lymphocytes_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Lymphocytes_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Monocytes_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Monocytes_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Monocytes_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Eosinophils_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Eosinophils_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Eosinophils_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Haematocrit_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Haematocrit_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Haematocrit_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCV_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCV_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCV_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCH_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCH_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCH_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCHC_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCHC_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_MCHC_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Test_Date" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_Result" : new FormControl({value: '', disabled: this.disableInput}),
            "BIOC_FBC_IsNormalResult" : new FormControl({value: '', disabled: this.disableInput}),

        })
        this.getFormAttributeValues();
    }

    getFormAttributeValues() {
        this._vService.getFormAttribute(8,3).subscribe((res)=> {
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

    createSampleId() {
        this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
        this._vService.createSampleId(8,0).subscribe((res)=> {
              this.saveFormId = res;
            this.splashService.splashScreen({isLoading : false, message : "" })
            this._interactionService.sendRefId(res);
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
                this._vService.getFormAttributeValues(this.formId).subscribe((res : any) => {
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