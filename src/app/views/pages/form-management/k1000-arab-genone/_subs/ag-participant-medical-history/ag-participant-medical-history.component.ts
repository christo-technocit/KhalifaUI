import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-ag-participant-medical-history',
  templateUrl: './ag-participant-medical-history.component.html',
})
export class AgParticipantMedicalHistoryComponent implements OnInit {

  form: FormGroup;
  title: string = "Participation Medical History";
  @Input('formData') formId: any;
  formData: any;
  formAttributes: any;
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
      this._service.getQuestionnaire(this.formId,5).subscribe((res:any[])=> {
        this.formData = res;
        this.splashService.splashScreen({isLoading : false, message : "" })
        this.saveFormId = this.formId;
        if(res.length)
          this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "MEDI_Any_Allergies": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Any_Allergies_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Intolerance": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Intolerance_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Any_Medications": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Any_Vitamins_Supplements": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Any_Vitamins_Supplements_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Any_Diseases": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Type1Diabetes": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Type1Diabetes_Age": new FormControl({value: '', disabled: this.disableInput}),
    /*Need to Check*/
      "MEDI_Type2Diabetes": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Type2Diabetes_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Cardiovascular": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Cardiovascular_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Cancer": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Cancer_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Asthma": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Asthma_Age": new FormControl({value: '', disabled: this.disableInput}),
      /*Need to Check End*/
      "MEDI_Seizures": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Seizures_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Hypertension": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Hypertension_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Arthritis_Rheumatism": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Arthritis_Rheumatism_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Eczema": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Eczema_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Kidneydisease": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Kidneydisease_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Liverdisease": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Liverdisease_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Neurologicaldisorder": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Neurologicaldisorder_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Psychologicaldiseases": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Psychologicaldiseases_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Thyroid": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Thyroid_Age": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Others": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Others_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Any_Surgery": new FormControl({value: '', disabled: this.disableInput}),
      "MEDI_Any_Surgery_Remarks": new FormControl({value: '', disabled: this.disableInput}),
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(5,4).subscribe((res)=> {
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
    this._service.createSampleId(5,0).subscribe((res)=> {
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
            this._service.createSample3(data, true).subscribe((res)=> {
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
        this._service.createSample1 (data, this.formId ? true : false).subscribe((res)=> {
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
