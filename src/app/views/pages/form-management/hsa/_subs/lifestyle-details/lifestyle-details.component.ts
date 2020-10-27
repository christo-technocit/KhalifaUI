
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
  selector: 'kt-hsa-lifestyle-details',
  templateUrl: './lifestyle-details.component.html'
})
export class HsaLifestyleDetailsComponent implements OnInit {
  Mform: FormGroup;
  title: string = "Life Style Details";
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
  this._service.getFormAttribute(10, 2).subscribe((res) => {
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
      "health_overall_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_physical_problem_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_difficulty_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_body_pain_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_energy_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_emotional_problems_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_bothered_emotional_problems_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_bothered_emotional_problems_affect_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_brushteethtwice_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_weight_change": new FormControl({value: '', disabled: this.disableInput}),
"health_special_diet_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_bowel_movement_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_urinate_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_urinate_night_4weeks": new FormControl({value: '', disabled: this.disableInput}),
"health_urinate_night_4weeks_often": new FormControl({value: '', disabled: this.disableInput}),
"health_advcontact": new FormControl({value: '', disabled: this.disableInput}),
"health_emergency": new FormControl({value: '', disabled: this.disableInput}),
"health_emergency_reason": new FormControl({value: '', disabled: this.disableInput}),
"health_hospital": new FormControl({value: '', disabled: this.disableInput}),
"health_hospital_reason": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_noone": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_Dietitian": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_Nurse": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_GP": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_Pharmacist": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_Diabetes_specialist": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_others": new FormControl({value: '', disabled: this.disableInput}),
"health_advice_others_remarks": new FormControl({value: '', disabled: this.disableInput}),
"health_annual_medical_checkup": new FormControl({value: '', disabled: this.disableInput}),
"health_annual_medical_checkuptxtdateyear": new FormControl({value: '', disabled: this.disableInput}),
"female_first_period": new FormControl({value: '', disabled: this.disableInput}),
"female_first_period_others": new FormControl({value: '', disabled: this.disableInput}),
"female_menopause": new FormControl({value: '', disabled: this.disableInput}),
"female_menopause_others": new FormControl({value: '', disabled: this.disableInput}),
"female_period_days": new FormControl({value: '', disabled: this.disableInput}),
"female_period_days_number": new FormControl({value: '', disabled: this.disableInput}),
"female_period_How_often": new FormControl({value: '', disabled: this.disableInput}),
"female_period_How_often_others": new FormControl({value: '', disabled: this.disableInput}),
"female_period_regular_time_intervals": new FormControl({value: '', disabled: this.disableInput}),
"female_period_regular_time_intervals_yes_when": new FormControl({value: '', disabled: this.disableInput}),
"female_period_regular_time_intervals_no_when": new FormControl({value: '', disabled: this.disableInput}),
"female_pregnant": new FormControl({value: '', disabled: this.disableInput}),
"female_pregnant_when": new FormControl({value: '', disabled: this.disableInput}),
"female_pregnant_when_year": new FormControl({value: '', disabled: this.disableInput}),
"female_birth_control": new FormControl({value: '', disabled: this.disableInput}),
"female_birth_control_when": new FormControl({value: '', disabled: this.disableInput}),
"female_birth_control_Which_medication": new FormControl({value: '', disabled: this.disableInput}),
"female_birth_control_dose": new FormControl({value: '', disabled: this.disableInput}),
"female_facial_hair": new FormControl({value: '', disabled: this.disableInput}),
"female_fg_points": new FormControl({value: '', disabled: this.disableInput}),
"health_emergency_my_mental_health": new FormControl({value: '', disabled: this.disableInput}),
"health_emergency_my_physical_health": new FormControl({value: '', disabled: this.disableInput}),
"health_emergency_my_diabetes_status": new FormControl({value: '', disabled: this.disableInput}),
"health_emergency_Non_applicable": new FormControl({value: '', disabled: this.disableInput}),
"health_hospital_my_mental_health": new FormControl({value: '', disabled: this.disableInput}),
"health_hospital_my_physical_health": new FormControl({value: '', disabled: this.disableInput}),
"health_hospital_my_diabetes_status": new FormControl({value: '', disabled: this.disableInput}),
"health_hospital_Non_applicable": new FormControl({value: '', disabled: this.disableInput}),
"PPA_vigorous_physical_activities": new FormControl({value: '', disabled: this.disableInput}),
"PPA_vigorous_physical_activities_days_per_week": new FormControl({value: '', disabled: this.disableInput}),//1
"PPA_vigorous_physical_activities_time": new FormControl({value: '', disabled: this.disableInput}),
"PPA_vigorous_physical_activities_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_vigorous_physical_activities_min": new FormControl({value: '', disabled: this.disableInput}),
"PPA_moderate_physical_activities": new FormControl({value: '', disabled: this.disableInput}),
"PPA_moderate_physical_activities_time": new FormControl({value: '', disabled: this.disableInput}),
"PPA_moderate_physical_activities_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_moderate_physical_activities_min": new FormControl({value: '', disabled: this.disableInput}),
"PPA_walk": new FormControl({value: '', disabled: this.disableInput}),
"PPA_walk_days": new FormControl({value: '', disabled: this.disableInput}),
"PPA_walk_time": new FormControl({value: '', disabled: this.disableInput}),
"PPA_walk_time_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_walk_time_min": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_min": new FormControl({value: '', disabled: this.disableInput}),
"PPA_work_days": new FormControl({value: '', disabled: this.disableInput}),//2
"PPA_work": new FormControl({value: '', disabled: this.disableInput}),
"PPA_getintobed_hour": new FormControl({value: '', disabled: this.disableInput}),
"PPA_getintobed_minute": new FormControl({value: '', disabled: this.disableInput}),
"PPA_getintobed_AMPM": new FormControl({value: '', disabled: this.disableInput}),
"PPA_getoutbed_hour": new FormControl({value: '', disabled: this.disableInput}),
"PPA_getoutbed_minute": new FormControl({value: '', disabled: this.disableInput}),
"PPA_getoutbed_AMPM": new FormControl({value: '', disabled: this.disableInput}),
"PPA_startwork_hour": new FormControl({value: '', disabled: this.disableInput}),
"PPA_startwork_minute": new FormControl({value: '', disabled: this.disableInput}),
"PPA_startwork_AMPM": new FormControl({value: '', disabled: this.disableInput}),
"PPA_leavework_hour": new FormControl({value: '', disabled: this.disableInput}),
"PPA_leavework_minute": new FormControl({value: '', disabled: this.disableInput}),
"PPA_leavework_AMPM": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_yourdeskperc": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_awaydeskperc": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_yourdeskperc_sitting": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_yourdeskperc_standing": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_yourdeskperc_moving": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_awaydeskperc_sitting": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_awaydeskperc_standing": new FormControl({value: '', disabled: this.disableInput}),
"PPA_workhours_awaydeskperc_moving": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_transport_nonworkhours_workdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_transport_nonworkhours_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_transport_nonworkhours_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_transport_nonworkdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_transport_nonwork_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_transport_nonwork_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_tv_nonworkhours_workdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_tv_nonworkhours_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_tv_nonworkhours_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_tv_nonworkdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_tv_nonwork_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_tv_nonwork_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_computer_nonworkhours_workdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_computer_nonworkhours_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_computer_nonworkhours_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_computer_nonworkdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_computer_nonwork_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_computer_nonwork_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_others_nonworkhours_workdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_others_nonworkhours_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_others_nonworkhours_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_others_nonworkdays": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_others_nonwork_hours": new FormControl({value: '', disabled: this.disableInput}),
"PPA_sit_others_nonwork_mininutes": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_vegetables": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_by_ordering": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fruit": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_cake": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_sugary_drinks": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fullfat_spread": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fullfat_cheese": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_processed_meat": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_savory_food": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_savory_pastry": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fast_food": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_meal_at_home": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_pudding": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_oilyfish": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_regular_meals": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_breakfast": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_snack_between_meals": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_portion_bread": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_highfiber_bread": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_bowl_breakfast": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_bowl_highfiber": new FormControl({value: '', disabled: this.disableInput}),
"PD_milk_type": new FormControl({value: '', disabled: this.disableInput}),
"PD_milk_type_others": new FormControl({value: '', disabled: this.disableInput}),
"PD_weight_concern": new FormControl({value: '', disabled: this.disableInput}),
"PD_important_change_diet": new FormControl({value: '', disabled: this.disableInput}),
"PD_confident_change_diet": new FormControl({value: '', disabled: this.disableInput}),
"PSE_unable_to_control": new FormControl({value: '', disabled: this.disableInput}),
"PSE_handle_problem": new FormControl({value: '', disabled: this.disableInput}),
"PSE_yourway": new FormControl({value: '', disabled: this.disableInput}),
"PSE_difficulty_handle_problem": new FormControl({value: '', disabled: this.disableInput}),
"PSE_little_interest": new FormControl({value: '', disabled: this.disableInput}),
"PSE_depressed": new FormControl({value: '', disabled: this.disableInput}),
"PSE_sleeping_toomuch": new FormControl({value: '', disabled: this.disableInput}),
"PSE_little_energy": new FormControl({value: '', disabled: this.disableInput}),
"PSE_overeating": new FormControl({value: '', disabled: this.disableInput}),
"PSE_feelingbad": new FormControl({value: '', disabled: this.disableInput}),
"PSE_concentrating_trouble": new FormControl({value: '', disabled: this.disableInput}),
"PSE_restless": new FormControl({value: '', disabled: this.disableInput}),
"PSE_dead_thoughts": new FormControl({value: '', disabled: this.disableInput}),
"PSE_get_along": new FormControl({value: '', disabled: this.disableInput}),
"PSH_falling_asleep": new FormControl({value: '', disabled: this.disableInput}),
"PSH_staying_asleep": new FormControl({value: '', disabled: this.disableInput}),
"PSH_wakeup_tooearly": new FormControl({value: '', disabled: this.disableInput}),
"PSH_satisfied_sleep_pattern": new FormControl({value: '', disabled: this.disableInput}),
"PSH_noticeable_sleeping_problem": new FormControl({value: '', disabled: this.disableInput}),
"PSH_worried_sleeping_problem": new FormControl({value: '', disabled: this.disableInput}),
"PSH_interfere_sleeping_problem": new FormControl({value: '', disabled: this.disableInput}),
"PSS_smoked_100_cigarettes": new FormControl({value: '', disabled: this.disableInput}),
"PSS_first_smoke_age": new FormControl({value: '', disabled: this.disableInput}),
"PSS_first_smoke_age694_txt": new FormControl({value: '', disabled: this.disableInput}),//3
"PSS_current_smoker": new FormControl({value: '', disabled: this.disableInput}),
"PSS_quit_smoking": new FormControl({value: '', disabled: this.disableInput}),
"PSS_quit_smoking_days_txt": new FormControl({value: '', disabled: this.disableInput}),//4
"PSS_quit_smoking_week_txt": new FormControl({value: '', disabled: this.disableInput}),//5
"PSS_quit_smoking_month_txt": new FormControl({value: '', disabled: this.disableInput}),//6
"PSS_quit_smoking_yrs_txt": new FormControl({value: '', disabled: this.disableInput}),//7
"PSS_quit_smoking_since1year": new FormControl({value: '', disabled: this.disableInput}),
"PSS_avg_cigarettes_perday": new FormControl({value: '', disabled: this.disableInput}),
"PSS_avg_cigarettes_perday194_txt": new FormControl({value: '', disabled: this.disableInput}),//8
"PSS_cigarettes_30days": new FormControl({value: '', disabled: this.disableInput}),
"PSS_avg_cigarettes_30days": new FormControl({value: '', disabled: this.disableInput}),
"PSS_cigarettes_30days_number": new FormControl({value: '', disabled: this.disableInput}),
"PSS_trying_quit_smoke": new FormControl({value: '', disabled: this.disableInput}),
"PSS_avg_cigarettes_30days_1_94": new FormControl({value: '', disabled: this.disableInput}),
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

onSubmit() {
  if (!this.Mform.value["savedFormID"] && !this.saveFormId) {
    this.createSampleId();
  } else {
    this.Mform.patchValue({"savedFormID" : this.Mform.value["savedFormID"] || this.saveFormId })

    let data = this.finalFormValues.prepareAttibuteForm(this.Mform.value, this.formAttributes, "savedFormID",this.formId)
    if (this.formId || this.isFormSubmit) {
      this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
      this._service.getFormAttributeValues(this.formId || this.Mform.controls["savedFormID"].value).subscribe((res:any) => {
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