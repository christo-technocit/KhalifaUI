/**
 * Created by TCITSS on 1/9/2020.
 */
import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first , reduce } from 'rxjs/operators';
import { Countries  } from './../../../../../../core/_utils/countries';
const AVAILABLE_NATIONALITIES: any[] =Countries;
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
    selector: 'kt-t1d-participation-details',
    templateUrl: './t1d-participation-details.html'
})


export class T1DParticipationComponent implements OnInit {
    VForm1: FormGroup;
    AVAILABLE_NATIONALITIES: any[] = Countries;
    title : string =  'Participation Details';
    filteredNationalities: Observable<string[]>;
    _coutries = Countries;
    formAttributes : any;
    saveFormId : any = 0;
    @Input('formData') formId: any;
    formData : any;
    @Input('disableInput') disableInput: boolean;
    startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    constructor(
        private _vService : VitamindService,
        private eformFB: FormBuilder,
        private _interactionService : ComponentInteractionService,
        private _snackBar: MatSnackBar,
        private splashService : SplashScreenService,
        private finalFormValues : PrepareFinalForm
    ){}

    ngOnInit(){
        this.createForm();
        if(!this.formId)
        this._interactionService._Refid$.subscribe((id)=>{  this.VForm1.patchValue({"savedFormID" : id})  })
        else{
            //this._vService.getQuestionnaire3(this.formId).subscribe((res:any[])=> {
            //    this.formData  = res;
            //    this.prepareForm();
            //    this.saveFormId = this.formId;
           // })
            this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
            this._vService.getQuestionnaire(this.formId,8).subscribe((res:any[])=> {
                this.formData  = res;
                this.prepareForm();
                this.saveFormId = this.formId;
                this.splashService.splashScreen({isLoading : false, message : "" })
            })
        }
        this.getFormAttributeValues();
    }



    createForm(){
        this.VForm1 = this.eformFB.group({
            "savedFormID": new FormControl({value : 0, disabled : this.disableInput}),
            "SampleID"  : new FormControl({value: '', disabled: this.disableInput}),
            "Depository_ID": new FormControl({value : '', disabled : this.disableInput}),
            "CollectionPoint"  : new FormControl({value: '', disabled: this.disableInput}), 
            "CollectedBy"  : new FormControl({value: '', disabled: this.disableInput}), 
            "DateofAssessment"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_T1DChild"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_YearofDiagnosis"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Mother"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Father"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Sibling"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Firstname"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_MiddleName"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_FamilyName"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Gender"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_PlaceofBirth"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_DateofBirth"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Nationality"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_MaritalStatus"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Ethnicity"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_ParentAgeDuringPregnancy"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_marriage_con"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_NumberofChildren"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Address"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Mobile_Number"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_SiblingDiabetesType1"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_OtherRel"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_OtherRel_Remarks"  : new FormControl({value: '', disabled: this.disableInput}), 
            "PERS_Others"  : new FormControl({value: '', disabled: this.disableInput}), // Need to Check
        })

        this.filteredNationalities = this.VForm1.controls["PERS_Nationality"].valueChanges
            .pipe(
                startWith(''),
                map(val => {return this.filterNationalities(val != null && val != "" ? val.toString() : '') } )
            );
    }

    prepareForm(){
        Object.keys(this.formData[0]).forEach(name => {
            if (this.VForm1.controls[name]) {
                this.VForm1.controls[name].patchValue(this.formData[0][name]);
            }
        });
    }

   getFormAttributeValues(){
       this._vService.getFormAttribute(8,1).subscribe((res)=>{
           this.formAttributes = res;
       })
   }

    prepareAttibuteForm(){
        let res = this.VForm1.value;
        let _result = [];
        for (let prop in res) {
            for(let i=0;i<this.formAttributes.length;i++){
               if(prop == this.formAttributes[i].attributeName && res[prop] != ""){
                   _result.push({
                       "savedFormID": res["savedFormID"],
                       "formAttributeID": this.formAttributes[i].formAttributeID,
                       "attributeValue": res[prop]
                   })
               }
            }
        }
        return _result;
    }
createSampleId(){
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._vService.createSampleId(8,this.VForm1.value["SampleID"]).subscribe((res)=> {
        this.saveFormId = res;
        this.splashService.splashScreen({isLoading : false, message : "" })
        this._interactionService.sendRefId( this.saveFormId);
       this.onSubmit();
    });
    }


    onSubmit(){

        if(!this.VForm1.value["savedFormID"] && !this.saveFormId ){
          this.createSampleId();
        }else {
            this.VForm1.patchValue({"savedFormID": this.VForm1.value["savedFormID"] || this.saveFormId})
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
                this._vService.createSample3(data, true).subscribe((res)=> {
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
    filterNationalities(val: string): string[] {
        return this.AVAILABLE_NATIONALITIES.filter(option =>
         option.toLowerCase().includes(val.toLowerCase()));
        }
}