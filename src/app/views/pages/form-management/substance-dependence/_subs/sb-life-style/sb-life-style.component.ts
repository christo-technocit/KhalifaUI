import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'kt-sb-life-style',
  templateUrl: './sb-life-style.component.html',
})
export class SbLifeStyleComponent implements OnInit {

  form:FormGroup;
  title:string = "Lifestyle Details";
  @Input('formData') formId:any;
  formData:any;
  formAttributes:any;
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
      this.splashService.splashScreen({
        isLoading : true,
        message : "LOADING"
      })
      this._service.getQuestionnaire(this.formId,2).subscribe((res:any[])=> {
        this.formData = res;
        this.saveFormId = this.formId;
        this.splashService.splashScreen({
          isLoading : false,
          message : ""
        })
        if(res.length)
          this.prepareForm();
      })
    }
  }

  createForm() {
    this.form = this.eformFB.group({
      "savedFormID": new FormControl({value: 0, disabled: this.disableInput}),
      "Walk": new FormControl({value: '', disabled: this.disableInput}),
      "Walk_others_Specify": new FormControl({value: '', disabled: this.disableInput}),
      "Walk_IfYes": new FormControl({value: '', disabled: this.disableInput}),
      "Healthy": new FormControl({value: '', disabled: this.disableInput}),
      "SpecifyHealthy": new FormControl({value: '', disabled: this.disableInput}),
      "smoking_status": new FormControl({value: '', disabled: this.disableInput}),
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(2,3).subscribe((res)=> {
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
    this.splashService.splashScreen({
      isLoading : true,
      message : "SAVING"
    })
    this._service.createSampleId(2,0).subscribe((res)=> {
      this.saveFormId = res;
      this._interactionService.sendRefId(parseInt(this.saveFormId));
      this.splashService.splashScreen({
        isLoading : false,
        message : ""
      })
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
        this.splashService.splashScreen({
          isLoading : true,
          message : "UPDATING"
        })
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
                this.splashService.splashScreen({
                  isLoading : false,
                  message : ""
                })
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
        this.splashService.splashScreen({
          isLoading : true,
          message : "INSERTING"
        })
        this._service.createSample1 (data, this.formId ? true : false).subscribe((res)=> {
          if (res) {
            this.isFormSubmit = true;
            this.splashService.splashScreen({
              isLoading : false,
              message : ""
            })
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
