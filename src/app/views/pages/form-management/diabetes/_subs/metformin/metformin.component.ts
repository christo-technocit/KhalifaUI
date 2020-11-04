
import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { ComponentInteractionService } from "@services/component-interaction.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrepareFinalForm } from "../../../../../../core/_utils/prepareFinalForm";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first, reduce } from 'rxjs/operators';
import { Countries } from '../../../../../../core/_utils/countries';
import { mediaPath } from '../../../../../../core/_utils/api.url';
import {VitamindService} from "@services/vitamind.form.service";
const AVAILABLE_NATIONALITIES: any[] = Countries;
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-diabetes-metformin',
  templateUrl: './metformin.component.html'
})
export class DiabetesMetforminComponent implements OnInit {
  form: FormGroup;
  title: string = "Metformin";
  @Input('formData') formId: any;
  formData: any;
  formAttributes: any;
  filteredNationalities: Observable<string[]>;
  @Input('disableInput') disableInput: boolean;
  saveFormId: any = 0;
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  url: string | ArrayBuffer = '';
  fileToUpload: File = null;
  fileUploadSuccess: boolean = false;
  isSampleSubmit: boolean = false;
  isFormSubmit : boolean = false;
  mediaPath: string = mediaPath;
  constructor(private _service: VitamindService,
    private eformFB: FormBuilder,
    private _interactionService: ComponentInteractionService,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private splashService : SplashScreenService,
    private finalFormValues: PrepareFinalForm) { }

  ngOnInit() {
    this.createForm();
    if (!this.formId)
    this._interactionService._Refid$.subscribe((id) => {
      this.form.patchValue({ "savedFormID": id })

    })
  else {
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this._service.getQuestionnaire(this.formId,12).subscribe((res: any[]) => {
      this.formData = res;
      this.saveFormId = this.formId;
          this.splashService.splashScreen({isLoading : false, message : "" })
          if(res.length)
      this.prepareForm();
    })
  }

//this.getFormAttributeValues();
  }

getFormAttributeValues() {
  this._service.getFormAttribute(12, 2).subscribe((res) => {
  this.formAttributes = res;
  })

  }
  prepareForm() {
  Object.keys(this.formData[0]).forEach(name => {
  if (this.form.controls[name]) {
    this.form.controls[name].patchValue(this.formData[0][name], { onlySelf: true });
  }
  });

  }
  createForm() {
    this.form = this.eformFB.group({
	  "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
	  "Metformin_antidiabetic_medications": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_nof_medications": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication1_name": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication1_date": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication1_dos": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication2_name": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication2_date": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication2_dos": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication3_name": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication3_date": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication3_dos": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication3_stop": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Name_Stop": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Stop_Reason": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Name_Stop1": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Stop_Reason1": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Name_Stop2": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Stop_Reason2": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Name_Stop3": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_Medication_Stop_Reason3": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_medication_yesterday": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_prescribed": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_prescribed_doctor": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_how_often": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_past_week": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_how_many": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_how_many_time": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_usually": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_missed": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_medication_work": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_medication_bother": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_hard_remember": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_hard_refill": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_hard_pay": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_side_effects": new FormControl({value: '', disabled: this.disableInput}),
"Metformin_other_concerns": new FormControl({value: '', disabled: this.disableInput}),
"MetforminNausea": new FormControl({value: '', disabled: this.disableInput}),
"MetforminVomiting": new FormControl({value: '', disabled: this.disableInput}),
"MetforminDiarrhea": new FormControl({value: '', disabled: this.disableInput}),
"MetforminAbdominal_pain": new FormControl({value: '', disabled: this.disableInput}),
"MetforminBloating": new FormControl({value: '', disabled: this.disableInput}),
"MetforminLoss_appetite": new FormControl({value: '', disabled: this.disableInput}),
"MetforminOther_symptoms": new FormControl({value: '', disabled: this.disableInput}),
"MetforminOther_anorexia": new FormControl({value: '', disabled: this.disableInput}),
});

    this.getFormAttributeValues();
}

createSampleId() {
  this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
  this._service.createSampleId(12, 0).subscribe((res) => {
if (!this.formId) {
this.saveFormId = res;
this._interactionService.sendRefId(parseInt(this.saveFormId));
}
  this.splashService.splashScreen({isLoading : false, message : "" })
  this.isSampleSubmit = true;
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
          this.splashService.splashScreen({isLoading : false, message : "" })
          this.isFormSubmit = true;
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
