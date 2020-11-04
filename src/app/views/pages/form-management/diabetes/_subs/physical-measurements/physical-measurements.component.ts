
import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first , reduce } from 'rxjs/operators';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
@Component({
  selector: 'kt-diabetes-physical-measurements',
  templateUrl: './physical-measurements.component.html'
})
export class DiabetesPhysicalMeasurementsComponent implements OnInit {
  form:FormGroup;
  title:string = "Physical Measurements";
  @Input('formData') formId:any;
  formData:any;
  formAttributes:any;
  filteredNationalities: Observable<string[]>;
  @Input('disableInput') disableInput:boolean;
  saveFormId : any = 0;
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
    if(!this.formId)
      this._interactionService._Refid$.subscribe((id)=>{
        if(id) {
          this.form.patchValue({"savedFormID": id})
          this.saveFormId = id;
       }
        })

    else{
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this._service.getQuestionnaire(this.formId,12).subscribe((res:any[])=> {
        this.formData  = res;
        if(res.length)
        this.prepareForm();
        this.splashService.splashScreen({isLoading : false, message : "" })
        this.saveFormId = this.formId;
      })
    }
    this.createForm();
  }
  createForm(){
   this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "PCD_BodyWeight": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_Waist": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_BodyMass": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_Height": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_hip": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_neck": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_bodyfatper": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_bmi": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_WHR": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_BloodPressure": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_BloodPressureSystolic": new FormControl({value: '', disabled: this.disableInput}),
      "PCD_BloodPressureDiastolic": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_walk_From_Home": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_walk_At_Home": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Drive": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_watch_TV": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_sit": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_walk_For_exercise": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Running": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Bicycling": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Lap_Swimming": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Tennis": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Aerobic": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_ PPA_Yoga": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Other_vigorous": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_Arm_Weights": new FormControl({value: '', disabled: this.disableInput}),
	  "PPA_leg_Weights": new FormControl({value: '', disabled: this.disableInput}),
	  "Note_Death": new FormControl({value: '', disabled: this.disableInput}),
	  "Note_Date": new FormControl({value: '', disabled: this.disableInput}),
	  "Note_Cause_of_Death": new FormControl({value: '', disabled: this.disableInput}),
	  "Note_Other": new FormControl({value: '', disabled: this.disableInput}),
	  "Note_Unknown": new FormControl({value: '', disabled: this.disableInput}),
   });
    this.getFormAttributeValues();
  }
  getFormAttributeValues() {
    this._service.getFormAttribute(12,5).subscribe((res)=> {
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
    this._service.createSampleId(12,0).subscribe((res)=> {
      this.saveFormId = res;
      this.splashService.splashScreen({isLoading : false, message : "" })
      this._interactionService.sendRefId(parseInt(this.saveFormId));
      this.onSubmit();
    });
  }

  onSubmit() {
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
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


  calculateBodyMass(){
    if(this.form.controls["BodyWeight"].value && this.form.controls["Height"].value){
      this.form.patchValue({"bmi" : (this.form.controls["BodyWeight"].value/(this.form.controls["Height"].value*this.form.controls["Height"].value)).toFixed(2) })
    }
  }

}
