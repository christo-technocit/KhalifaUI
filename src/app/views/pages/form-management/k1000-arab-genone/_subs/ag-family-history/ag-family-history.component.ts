import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Countries } from './../../../../../../core/_utils/countries';
import {SplashScreenService} from "@services/splash-screen-service";
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first, reduce } from 'rxjs/operators';

const BIOLOGICAL_FATHER: any[] = Countries;

@Component({
  selector: 'kt-ag-family-history',
  templateUrl: './ag-family-history.component.html',
})
export class AgFamilyHistoryComponent implements OnInit {

  form: FormGroup;
  title: string = "Family History";
  @Input('formData') formId: any;
  formData: any;
  formAttributes: any;
  @Input('disableInput') disableInput:boolean;
  saveFormId : any = 0;
  isFormSubmit : boolean = false;
  filteredBioMother: Observable<string[]>;
  filteredBioFather: Observable<string[]>;
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
        this.saveFormId = this.formId;
        this.splashService.splashScreen({isLoading : false, message : "" })
        if(res.length)
          this.prepareForm();
      })
    }
  }

  filterCountry(val: string): string[] {
    return BIOLOGICAL_FATHER.filter(option =>
        option.toLowerCase().includes(val.toLowerCase()));
  }



  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "FAMI_Ethnicity_BiologicalMother": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_Ethnicity_BiologicalFather": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_BiologicalMother_BirthCountry": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_BiologicalFather_BirthCountry": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_IsParents_Related": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_IsParents_Related_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Asthma": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Asthma_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Blooddisorders": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Blooddisorders_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Cancer": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Cancer_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Depression": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Depression_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_DiabetesType1": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_DiabetesType1_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Hypertension": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Hypertension_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Cardiovascular": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Cardiovascular_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Hearingloss": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Hearingloss_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Obesity": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Obesity_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Diabetestype2": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Diabetestype2_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Others": new FormControl({value: '', disabled: this.disableInput}),
      "FADI_Others_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_Ethnicity_BiologicalMother_Mixed_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_Ethnicity_BiologicalMother_Others_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_Ethnicity_BiologicalFather_Mixed_Remarks": new FormControl({value: '', disabled: this.disableInput}),
      "FAMI_Ethnicity_BiologicalFather_Others_Remarks": new FormControl({value: '', disabled: this.disableInput})
    })


    this.filteredBioMother = this.form.controls["FAMI_BiologicalMother_BirthCountry"].valueChanges
        .pipe(
            startWith(''),
            map(val => {  return this.filterCountry(val != null && val != "" ? val.toString() : '') })
        );
    this.filteredBioFather = this.form.controls["FAMI_BiologicalFather_BirthCountry"].valueChanges
        .pipe(
            startWith(''),
            map(val => {  return this.filterCountry(val != null && val != "" ? val.toString() : '') })
        );

    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(5,5).subscribe((res)=> {
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
