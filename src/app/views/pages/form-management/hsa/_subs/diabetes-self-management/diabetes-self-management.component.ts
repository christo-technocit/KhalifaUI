
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
  selector: 'kt-hsa-diabetes-self-management',
  templateUrl: './diabetes-self-management.component.html'
})
export class HsaDiabetesSelfManagementComponent implements OnInit {
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
        this._service.getQuestionnaire(this.formId,10).subscribe((res: any[]) => {
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
  this._service.getFormAttribute(10, 5).subscribe((res) => {
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
      
      "DSM_longterm_diabetic_complications": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_longterm_diabetic_complications_year": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_longterm_diabetic_complications_others": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_medication": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_2year_dose": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_3year_dose": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_4year_dose": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_1year_dose": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_longterm_diabetic_complications_Kidney": new FormControl({value: '', disabled: this.disableInput}),
"DSM_longterm_diabetic_complications_Foot": new FormControl({value: '', disabled: this.disableInput}),
"DSM_longterm_diabetic_complication_Stroke": new FormControl({value: '', disabled: this.disableInput}),
"DSM_longterm_diabetic_complications_Heart": new FormControl({value: '', disabled: this.disableInput}),
"DSM_longterm_diabetic_complications_Eye": new FormControl({value: '', disabled: this.disableInput}),
"DSM_longterm_diabetic_complications_other": new FormControl({value: '', disabled: this.disableInput}),
"DSM_longterm_diabetic_complications_dontknow": new FormControl({value: '', disabled: this.disableInput}),
"DSM_longterm_diabetic_complications_notdisclose": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_blood_sugar_levels_with_care": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_achieve_optimal_blood_sugar_level": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_keep_doctors_appointments": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_diabetes_medication": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_Occasionally_eat_sweets": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_record_blood_sugar": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_avoid_diabetes_related_appointments": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_physically_active": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_follow_dietary_recommendations": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_do_not_check_blood_sugar_levels": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_avoid_physical_activity": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_skip_medication": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_food_binges": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_morevisit": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_less_physically_active": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_self_care_poor": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_none": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_1name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_1year": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_2name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_2year": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_3name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_3year": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_4name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_DiabetesTreatment_4year": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_reason": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_1name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_1reason": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_2name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_2reason": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_3name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_3reason": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_4name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_stop_medication_4reason": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_medication_yesterday": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_prescribed_metformin": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_period": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_pastweek": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_days": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_times": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_qty": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_missed": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_works": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_take_metformin_bothers": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_difficulty_hard_to_remember": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_difficulty_hard_to_pay": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_difficulty_hard_to_refill": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_difficulty_unwanted_side_effect": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_difficulty_other_concern": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_discomfort_Nausea": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_discomfort_Vomiting": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_discomfort_Diarrhea": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_discomfort_Abdominal_pain": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_discomfort_Bloating": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_discomfort_Loss_of_appetite": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_discomfort_Loss_of_appetite_specify": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_Metformin_anorexia": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_Name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_Period": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_take": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_days": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_times": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_qty": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_miss": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_works": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_bothers": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_Difficulty_hard_to_remember": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_Difficulty_hard_to_pay": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_Difficulty_hard_to_refill": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_Difficulty_unwanted_side_effect": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_1OAD_Difficulty_other_concern": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_Name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_Period": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_take": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_days": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_times": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_qty": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_miss": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_works": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_bothers": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_Difficulty_hard_to_remember": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_Difficulty_hard_to_pay": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_Difficulty_hard_to_refill": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_Difficulty_unwanted_side_effect": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_2OAD_Difficulty_other_concern": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_Name": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_Period": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_take": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_days": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_times": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_qty": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_miss": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_works": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_bothers": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_Difficulty_hard_to_remember": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_Difficulty_hard_to_pay": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_Difficulty_hard_to_refill": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_Difficulty_unwanted_side_effect": new FormControl({value: '', disabled: this.disableInput}),
      "DSM_3OAD_Difficulty_other_concern": new FormControl({value: '', disabled: this.disableInput}), 
   
      "physical_activity": new FormControl({value: '', disabled: this.disableInput}),   
      "physical_activity_specify": new FormControl({value: '', disabled: this.disableInput}),   
      "physical_activity_year": new FormControl({value: '', disabled: this.disableInput}),   
      "diet": new FormControl({value: '', disabled: this.disableInput}),   
      "diet_specify": new FormControl({value: '', disabled: this.disableInput}),   
      "diet_specify_year": new FormControl({value: '', disabled: this.disableInput}),   
      "diet_specify_until_year": new FormControl({value: '', disabled: this.disableInput}),   
      "education": new FormControl({value: '', disabled: this.disableInput}),   
      "education_specify": new FormControl({value: '', disabled: this.disableInput}),   
      "education_specify_year": new FormControl({value: '', disabled: this.disableInput}),   
      "education_specify_date": new FormControl({value: '', disabled: this.disableInput}),  
      //"long_term_diabetic" : new FormControl({value: '', disabled: this.disableInput}),  
      //"term_diabetic_txt": new FormControl({value: '', disabled: this.disableInput}),  
      "metformin": new FormControl({value: '', disabled: this.disableInput}),     
      "metformin_specify": new FormControl({value: '', disabled: this.disableInput}),     
      "metformin_year": new FormControl({value: '', disabled: this.disableInput}),     
      "metformin_current_dose": new FormControl({value: '', disabled: this.disableInput}),     
      "antidiabetic": new FormControl({value: '', disabled: this.disableInput}),     
      "antidiabetic_date": new FormControl({value: '', disabled: this.disableInput}),     
      "antidiabetic_year": new FormControl({value: '', disabled: this.disableInput}),     
      "antidiabetic_current_dose": new FormControl({value: '', disabled: this.disableInput}),     
      "insulin": new FormControl({value: '', disabled: this.disableInput}),     
      "insulin_specify": new FormControl({value: '', disabled: this.disableInput}),  
      "insulin_date": new FormControl({value: '', disabled: this.disableInput}),  
      "insulin_year": new FormControl({value: '', disabled: this.disableInput}),  
      "insulin_current_dose": new FormControl({value: '', disabled: this.disableInput}),  
      "others": new FormControl({value: '', disabled: this.disableInput}),  
      "other_specify": new FormControl({value: '', disabled: this.disableInput}),
      "other_year": new FormControl({value: '', disabled: this.disableInput}),
      "none": new FormControl({value: '', disabled: this.disableInput}),
      "other_txt": new FormControl({value: '', disabled: this.disableInput}),  
      "DSM_absence_reason": new FormControl({value: '', disabled: this.disableInput}),  
      "DSM_absence_death_date": new FormControl({value: '', disabled: this.disableInput}),  
      "DSM_absence_death_reason": new FormControl({value: '', disabled: this.disableInput}),  
      "DSM_absence_other_reason": new FormControl({value: '', disabled: this.disableInput}),  

      // Additional Field
      "DSM_longterm_diabetic_complications_others_Specify": new FormControl({value: '', disabled: this.disableInput}),
    });
    
    this.getFormAttributeValues();
  }

  
  createSampleId() {
    this.splashService.splashScreen({ isLoading : true, message : "SAVING" })
    this._service.createSampleId(10, 0).subscribe((res) => {
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
