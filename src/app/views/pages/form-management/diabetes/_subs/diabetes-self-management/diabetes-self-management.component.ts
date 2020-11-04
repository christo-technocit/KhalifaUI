
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
  selector: 'kt-diabetes-diabetes-self-management',
  templateUrl: './diabetes-self-management.component.html'
})
export class DiabetesDiabetesSelfManagementComponent implements OnInit {
  Mform: FormGroup;
  title: string = "Diabetes Self Management Details";
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
        this.Mform.patchValue({ "savedFormID": id })

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
  this._service.getFormAttribute(12, 3).subscribe((res) => {
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
 "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
 "DSM_long_term_diabetic": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_long_term_diabetic_years": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_kidney_problems": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_foot_problems": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_stroke": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_heart_problems": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_eye_problems": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_other": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_dont_know": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_not_disclose": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_physically_active": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_physically_active_Year": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Diet": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Diet_Type": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Diet_StartDate": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Diet_EndDate": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_diabetes_education": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_diabetes_education_specify": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_diabetes_education_year": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Metformin": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_diabetes_dose_year": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Metformin_dose": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_antidiabetic": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_antidiabetic_name": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_antidiabetic_year": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_antidiabetic_dose": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Insulin": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Insulin_name": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Insulin_year": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Insulin_dose": new FormControl({value: '', disabled: this.disableInput}),
 "DSMCDM_Other": new FormControl({value: '', disabled: this.disableInput}),
 "DSMCDM_Other_Specify": new FormControl({value: '', disabled: this.disableInput}),
 "DSMCDM_None": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_blood_sugar_levels_with_care": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_achieve_optimal_blood_sugar_level": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_keep_doctors_appointments": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_take_diabetes_medication": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_Occasionally_eat_sweets": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_record_blood_sugar": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_avoid_diabetes_related_appointments": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_regularly_physically_improve_treatment": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_follow_dietary_recommendations": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_do_not_check_blood_sugar_levels": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_avoid_physical_activity": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_skip_medication": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_food_binges": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_morevisit": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_less_physically_active": new FormControl({value: '', disabled: this.disableInput}),
 "DSM_self_care_poor": new FormControl({value: '', disabled: this.disableInput}),
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
 "collection_point": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_regular_time_intervals_yes": new FormControl({value: '', disabled: this.disableInput}),
 "female_period_regular_time_intervals_no": new FormControl({value: '', disabled: this.disableInput}),
 "female_first_period_year": new FormControl({value: '', disabled: this.disableInput}),
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

    if (!this.Mform.value["savedFormID"] && !this.saveFormId) {
      this.createSampleId();
    }else {
        this.Mform.patchValue({"savedFormID": this.Mform.value["savedFormID"] || this.saveFormId})
        this.isSampleSubmit = false;
        let data = this.finalFormValues.prepareAttibuteForm(this.Mform.value, this.formAttributes, "savedFormID",this.formId)
        if (this.formId ||  this.isFormSubmit) {
            this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
            this._service.getFormAttributeValues(this.formId || this.Mform.controls["savedFormID"].value ).subscribe((res:any) => {

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
