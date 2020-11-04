


import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-diabetes-diet',
  templateUrl: './diet.component.html'
})

export class DiabetesDietComponent implements OnInit {
  form:FormGroup;
  title:string = "Cognitive Test Result";
  @Input('formData') formId:any;
  formData:any;
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
  ) { }

  ngOnInit() {
    this.createForm();
    if (!this.formId)
      this._interactionService._Refid$.subscribe((id)=> {
        if(id) {
          this.form.patchValue({"savedFormID": id})

        }
      })
    else {
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this._service.getQuestionnaire(this.formId,12).subscribe((res:any[])=> {
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
	  "PPA_sit_computer_nonworkhours_hours": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fruit": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_cake": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_sugary_drinks": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fullfat_spread": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fullfat_cheese": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_processed_meat": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_savory_food": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_savory_pastry": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_fast_food": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_buffet_restaurant": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_meal_at_home": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_pudding": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_oilyfish": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_regular_meals": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_breakfast": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_snack_between_meals": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_portion_bread": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_highfiber_bread": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_bowl_breakfast": new FormControl({value: '', disabled: this.disableInput}),
"PD_eat_bowl_highfiber": new FormControl({value: '', disabled: this.disableInput}),
"PD_milk_type": new FormControl({value: '', disabled: this.disableInput}),
"PD_milk_type_others": new FormControl({value: '', disabled: this.disableInput}),
"PD_weight_concern": new FormControl({value: '', disabled: this.disableInput}),
"PD_important_change_diet": new FormControl({value: '', disabled: this.disableInput}),
"PD_confident_change_diet": new FormControl({value: '', disabled: this.disableInput}),
 })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(12,6).subscribe((res)=> {
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
    this._service.createSampleId(12,0).subscribe((res)=> {
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

