
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
  selector: 'kt-diabetes-female-questions',
  templateUrl: './female-questions.component.html'
})
export class DiabetesFemaleQuestionsComponent implements OnInit {
  Mform: FormGroup;
  title: string = "Female Questions";
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
        this.Mform.patchValue({ "SavedFormID": id })

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

  this.getFormAttributeValues();
    }

getFormAttributeValues() {
  this._service.getFormAttribute(12, 8).subscribe((res) => {
  this.formAttributes = res;
  })

  }
  prepareForm() {
  Object.keys(this.formData[0]).forEach(name => {
  if (this.Mform.controls[name]) {
    this.Mform.controls[name].patchValue(this.formData[0][name], { onlySelf: true });
  }
  });

  }
  createForm() {
    this.Mform = this.eformFB.group({
 "SavedFormID": new FormControl({value: 0, disabled: this.disableInput}),
 "female_first_period": new FormControl({value: '', disabled: this.disableInput}),
 "female_menopause": new FormControl({value: '', disabled: this.disableInput}),
 "female_menopause_year": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_How_often": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_How_often_others": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_regular_time_intervals": new FormControl({value: '', disabled: this.disableInput}),
 "female_pregnant": new FormControl({value: '', disabled: this.disableInput}),
 "female_pregnant_when": new FormControl({value: '', disabled: this.disableInput}),
 "female_birth_control": new FormControl({value: '', disabled: this.disableInput}),
 "female_birth_control_when": new FormControl({value: '', disabled: this.disableInput}),
 "female_birth_control_Which_medication": new FormControl({value: '', disabled: this.disableInput}),
 "female_birth_control_dose": new FormControl({value: '', disabled: this.disableInput}),
 "female_facial_hair": new FormControl({value: '', disabled: this.disableInput}),
 "female_fg_points": new FormControl({value: '', disabled: this.disableInput}),
 //"collection_point": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_regular_time_intervals_yes": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_regular_time_intervals_no": new FormControl({value: '', disabled: this.disableInput}),
 "female_first_period_year": new FormControl({value: '', disabled: this.disableInput}),
 "other_specify": new FormControl({value: '', disabled: this.disableInput}),
 "metformin_current_dose": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_days": new FormControl({value: '', disabled: this.disableInput}),
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
  onSubmit(){

    if (!this.Mform.value["SavedFormID"] && !this.saveFormId) {
      this.createSampleId();
    }else {
        this.Mform.patchValue({"SavedFormID": this.Mform.value["SavedFormID"] || this.saveFormId})
        this.isSampleSubmit = false;
        let data = this.finalFormValues.prepareAttibuteForm(this.Mform.value, this.formAttributes, "SavedFormID",this.formId)
        if (this.formId ||  this.isFormSubmit) {
            this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
            this._service.getFormAttributeValues(this.formId || this.Mform.controls["SavedFormID"].value ).subscribe((res:any) => {

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
            this._service.createSample8(data, false).subscribe((res)=> {
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
