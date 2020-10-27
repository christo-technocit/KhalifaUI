import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitamindService} from "@services/vitamind.form.service";
import {SplashScreenService} from "@services/splash-screen-service";
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import {PrepareFinalForm} from "../../../../../../core/_utils/prepareFinalForm";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'kt-family-history-details',
  templateUrl: './family-history-details.component.html'
})
export class FamilyHistoryDetailsComponent implements OnInit {
  form:FormGroup;
  title:string = "Family History Details";
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
          this.saveFormId = id;
        }
      })
    else {
      this.splashService.splashScreen({
        isLoading : true,
        message : "LOADING"
      })
      this._service.getQuestionnaire1(this.formId).subscribe((res:any[])=> {
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
      "diabetes": new FormControl({value: '', disabled: this.disableInput}), // Need to Check
      "diabetesc": new FormControl({value: '', disabled: this.disableInput}),
      "obesity": new FormControl({value: '', disabled: this.disableInput}),
      "hypertension": new FormControl({value: '', disabled: this.disableInput}),
      "cvd": new FormControl({value: '', disabled: this.disableInput}),
      "dyslipidaemia": new FormControl({value: '', disabled: this.disableInput}),
      "familyothers": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_maside_no": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_maside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_maside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_maside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_maside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_maside_no": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_maside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_maside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_maside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_maside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_faside_no": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_faside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_faside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_faside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "grandfa_faside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_faside_no": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_faside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_faside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_faside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "grandma_faside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "ma_no": new FormControl({value: '', disabled: this.disableInput}),
      "ma_dec": new FormControl({value: '', disabled: this.disableInput}),
      "ma_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "ma_aff": new FormControl({value: '', disabled: this.disableInput}),
      "ma_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "fa_no": new FormControl({value: '', disabled: this.disableInput}),
      "fa_dec": new FormControl({value: '', disabled: this.disableInput}),
      "fa_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "fa_aff": new FormControl({value: '', disabled: this.disableInput}),
      "fa_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "sister_no": new FormControl({value: '', disabled: this.disableInput}),
      "sister_dec": new FormControl({value: '', disabled: this.disableInput}),
      "sister_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "sister_aff": new FormControl({value: '', disabled: this.disableInput}),
      "sister_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "brother_no": new FormControl({value: '', disabled: this.disableInput}),
      "brother_dec": new FormControl({value: '', disabled: this.disableInput}),
      "brother_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "brother_aff": new FormControl({value: '', disabled: this.disableInput}),
      "brother_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "wives_no": new FormControl({value: '', disabled: this.disableInput}),
      "wives_dec": new FormControl({value: '', disabled: this.disableInput}),
      "wives_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "wives_aff": new FormControl({value: '', disabled: this.disableInput}),
      "wives_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "husband_no": new FormControl({value: '', disabled: this.disableInput}),
      "husband_dec": new FormControl({value: '', disabled: this.disableInput}),
      "husband_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "husband_aff": new FormControl({value: '', disabled: this.disableInput}),
      "husband_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "son_no": new FormControl({value: '', disabled: this.disableInput}),
      "son_dec": new FormControl({value: '', disabled: this.disableInput}),
      "son_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "son_aff": new FormControl({value: '', disabled: this.disableInput}),
      "son_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "daughters_no": new FormControl({value: '', disabled: this.disableInput}),
      "daughters_dec": new FormControl({value: '', disabled: this.disableInput}),
      "daughters_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "daughters_aff": new FormControl({value: '', disabled: this.disableInput}),
      "daughters_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "grandsons_no": new FormControl({value: '', disabled: this.disableInput}),
      "grandsons_dec": new FormControl({value: '', disabled: this.disableInput}),
      "grandsons_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "grandsons_aff": new FormControl({value: '', disabled: this.disableInput}),
      "grandsons_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "grand_daughters_no": new FormControl({value: '', disabled: this.disableInput}),
      "grand_daughters_dec": new FormControl({value: '', disabled: this.disableInput}),
      "grand_daughters_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "grand_daughters_aff": new FormControl({value: '', disabled: this.disableInput}),
      "grand_daughters_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_maside_no": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_maside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_maside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_maside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_maside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_maside_no": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_maside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_maside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_maside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_maside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_faside_no": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_faside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_faside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_faside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "uncles_faside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_faside_no": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_faside_dec": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_faside_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_faside_aff": new FormControl({value: '', disabled: this.disableInput}),
      "aunts_faside_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_aunt_no": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_aunt_dec": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_aunt_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_aunt_aff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_aunt_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_uncle_no": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_uncle_dec": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_uncle_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_uncle_aff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_maside_uncle_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_aunt_no": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_aunt_dec": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_aunt_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_aunt_aff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_aunt_notsur": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_uncle_no": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_uncle_dec": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_uncle_notaff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_uncle_aff": new FormControl({value: '', disabled: this.disableInput}),
      "cousins_faside_uncle_notsur": new FormControl({value: '', disabled: this.disableInput}),
    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(1,6).subscribe((res)=> {
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
    this._service.createSampleId(1,0).subscribe((res)=> {
      this.saveFormId = res;
      this.splashService.splashScreen({
        isLoading : false,
        message : ""
      })
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
        this._service.createSample3(data, this.formId ? true : false).subscribe((res)=> {
          if (res) {
            this.splashService.splashScreen({
              isLoading : false,
              message : ""
            })
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
