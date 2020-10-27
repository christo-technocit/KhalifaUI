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
    selector: 'kt-t1d-medication',
    templateUrl: './t1d-medication.html'
})

export class T1DMedication implements OnInit {
    VForm1:FormGroup;
    title:string = "Medication";
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
            "MEDI_Any_Medication" : new FormControl({value: '', disabled: this.disableInput}),
            "MEDI_Any_Medication_Remarks" : new FormControl({value: '', disabled: this.disableInput}),
            "MEDI_CurrentInsulinDose" : new FormControl({value: '', disabled: this.disableInput}),

        })
        this.getFormAttributeValues();
    }

    getFormAttributeValues() {
        this._vService.getFormAttribute(8,5).subscribe((res)=> {
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