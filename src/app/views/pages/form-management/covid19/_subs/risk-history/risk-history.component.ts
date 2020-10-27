

import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { Countries } from '../../../../../../core/_utils/countries';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

const AVAILABLE_NATIONALITIES: any[] = Countries;
@Component({
  selector: 'kt-covid19-risk-history',
  templateUrl: './risk-history.component.html'
})
export class Covid19RiskHistoryComponent implements OnInit {
  form:FormGroup;
  title:string = "Biomechanics Details";
  @Input('formData') formId:any;
  formData:any;
  filteredNationalities: Observable<string[]>;
  formAttributes:any;
  @Input('disableInput') disableInput:boolean;
  saveFormId : any = 0;
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  isFormSubmit : boolean = false;
  constructor(
      private _service:VitamindService,
      private eformFB:FormBuilder,
      private _interactionService:ComponentInteractionService,
      private _snackBar: MatSnackBar,
      private splashService : SplashScreenService,
      private finalFormValues:PrepareFinalForm
  ) {  }

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
      this._service.getQuestionnaire(this.formId,11).subscribe((res:any[])=> {
        this.formData = res;
        this.saveFormId = this.formId;
        this.splashService.splashScreen({isLoading : false, message : "" })
        if(res.length)
        this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
"TRP_traveled_outside": new FormControl({value: '', disabled: this.disableInput}),
"TRP_traveled_outside_country": new FormControl({value: '', disabled: this.disableInput}),
"TRP_traveled_outside_city": new FormControl({value: '', disabled: this.disableInput}),
"TRP_flight_no": new FormControl({value: '', disabled: this.disableInput}),
"TRP_seat_no": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Arrival_Date": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Departure_Date": new FormControl({value: '', disabled: this.disableInput}),
"TRP_travel_with_organized_tour": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Type_of_accommodation": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Type_of_accommodation_other": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Able_to_enter_travel_specific_details": new FormControl({value: '', disabled: this.disableInput}),
"TRP_modes_of_transportation_Airplane": new FormControl({value: '', disabled: this.disableInput}),
"TRP_modes_of_transportation_Ship": new FormControl({value: '', disabled: this.disableInput}),
"TRP_modes_of_transportation_Bus": new FormControl({value: '', disabled: this.disableInput}),
"TRP_modes_of_transportation_Train": new FormControl({value: '', disabled: this.disableInput}),
"TRP_modes_of_transportation_Other": new FormControl({value: '', disabled: this.disableInput}),
"TRP_modes_of_transportation_Other_text": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Transit_stopover": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Other_travel_Information": new FormControl({value: '', disabled: this.disableInput}),
"TRP_Other_travel_Information_Notes": new FormControl({value: '', disabled: this.disableInput}),
"OTI_1_Date": new FormControl({value: '', disabled: this.disableInput}),
"OTI_1_Seat_Cabin": new FormControl({value: '', disabled: this.disableInput}),
"OTI_1_Carrier": new FormControl({value: '', disabled: this.disableInput}),
"OTI_1_Departed_from": new FormControl({value: '', disabled: this.disableInput}),
"OTI_1_Flight": new FormControl({value: '', disabled: this.disableInput}),
"OTI_1_Arrived_in": new FormControl({value: '', disabled: this.disableInput}),
"OTI_2_Date": new FormControl({value: '', disabled: this.disableInput}),
"OTI_2_Seat_Cabin": new FormControl({value: '', disabled: this.disableInput}),
"OTI_2_Carrier": new FormControl({value: '', disabled: this.disableInput}),
"OTI_2_Departed_from": new FormControl({value: '', disabled: this.disableInput}),
"OTI_2_Flight": new FormControl({value: '', disabled: this.disableInput}),
"OTI_2_Arrived_in": new FormControl({value: '', disabled: this.disableInput}),
"OTI_3_Date": new FormControl({value: '', disabled: this.disableInput}),
"OTI_3_Seat_Cabin": new FormControl({value: '', disabled: this.disableInput}),
"OTI_3_Carrier": new FormControl({value: '', disabled: this.disableInput}),
"OTI_3_Departed_from": new FormControl({value: '', disabled: this.disableInput}),
"OTI_3_Flight": new FormControl({value: '', disabled: this.disableInput}),
"OTI_3_Arrived_in": new FormControl({value: '', disabled: this.disableInput}),
"OTI_4_Date": new FormControl({value: '', disabled: this.disableInput}),
"OTI_4_Seat_Cabin": new FormControl({value: '', disabled: this.disableInput}),
"OTI_4_Carrier": new FormControl({value: '', disabled: this.disableInput}),
"OTI_4_Departed_from": new FormControl({value: '', disabled: this.disableInput}),
"OTI_4_Flight": new FormControl({value: '', disabled: this.disableInput}),
"OTI_4_Arrived_in": new FormControl({value: '', disabled: this.disableInput}),
"PRH_2D_contact_with_possible_COVID_19": new FormControl({value: '', disabled: this.disableInput}),
"PRH_2D_contact_with_possible_COVID_19_specify": new FormControl({value: '', disabled: this.disableInput}),
"PRH_2D_Date_of_last_contact": new FormControl({value: '', disabled: this.disableInput}),
"PRH_2D_Likely_source_of_infection": new FormControl({value: '', disabled: this.disableInput}),
"PRH_2D_Likely_source_of_infection_Locally_Acquired_Details": new FormControl({value: '', disabled: this.disableInput}),
      /*"profilePicture": new FormControl({value: '', disabled: this.disableInput}),
          */
    })
    this.filteredNationalities = this.form.controls["TRP_traveled_outside_country"].valueChanges
        .pipe(
            startWith(''),
            map(val => { return this.filterNationalities(val != null && val != "" ? val.toString() : '') })
        );
    this.getFormAttributeValues();
  }

  filterNationalities(val: string): string[] {
    return AVAILABLE_NATIONALITIES.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
    }
  getFormAttributeValues() {
    this._service.getFormAttribute(11,2).subscribe((res)=> {
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
    this._service.createSampleId(11,0).subscribe((res)=> {
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

}
