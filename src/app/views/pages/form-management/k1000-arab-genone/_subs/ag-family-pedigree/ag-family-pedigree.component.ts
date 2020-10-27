import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ComponentInteractionService } from "@services/component-interaction.service";
import { VitamindService } from "@services/vitamind.form.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrepareFinalForm } from "../../../../../../core/_utils/prepareFinalForm";
import { MatSnackBar } from '@angular/material/snack-bar';
import { mediaPath } from '../../../../../../core/_utils/api.url';
import {SplashScreenService} from "@services/splash-screen-service";

@Component({
  selector: 'kt-ag-family-pedigree',
  templateUrl: './ag-family-pedigree.component.html',
})
export class AgFamilyPedigreeComponent implements OnInit {
  form: FormGroup;
  title: string = "Family Pedigree";
  @Input('formData') formId: any;
  formData: any;
  formAttributes: any;
  @Input('disableInput') disableInput: boolean;
  saveFormId: any = 0;
  url: string | ArrayBuffer = '';
  fileToUpload: File = null;
  fileUploadSuccess: boolean = false;
  mediaPath: string = mediaPath;
  isFormSubmit : boolean = false;
  constructor(
      private _service: VitamindService,
      private eformFB: FormBuilder,
      private _interactionService: ComponentInteractionService,
      private _snackBar: MatSnackBar,
      private splashService : SplashScreenService,
      private finalFormValues: PrepareFinalForm,
      public cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.createForm();
    if (!this.formId)
      this._interactionService._Refid$.subscribe((id) => {
        this.form.patchValue({ "savedFormID": id })
        this.saveFormId = id;
      })
    else {
      this.splashService.splashScreen({ isLoading : true, message : "LOADING" })
      this._service.getQuestionnaire(this.formId,5).subscribe((res: any[]) => {
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
      "savedFormID": new FormControl({ value: 0, disabled: this.disableInput }),
      "FamilyPedigree": new FormControl({ value: '', disabled: this.disableInput }),

    })
    this.getFormAttributeValues();
  }

  getFormAttributeValues() {
    this._service.getFormAttribute(5, 6).subscribe((res) => {
      this.formAttributes = res;
    })
  }
  prepareForm() {
    Object.keys(this.formData[0]).forEach(name => {
      if (this.form.controls[name]) {
        this.form.controls[name].patchValue(this.formData[0][name], { onlySelf: true });
      }
    });
    if (this.url == "" && this.form.controls["family_pedigree"].value ) {
      this.url = this.mediaPath +"/images/"+  this.formId + "_" + this.form.controls["family_pedigree"].value;
    }
  }
  uploadImage() {
    this._service.postUploadImages(this.fileToUpload, this.saveFormId).subscribe((res: any) => {
      this.form.patchValue({ "family_pedigree": this.fileToUpload.name })
      this.fileUploadSuccess = true;
      this.onSubmit();
    });
  }
  createSampleId() {
    this._service.createSampleId(5, 0).subscribe((res) => {
      this.saveFormId = res;
      this._interactionService.sendRefId(parseInt(this.saveFormId));
      this.onSubmit();
    });
  }
  updatedSingleAttributes(mode: boolean) {
    let data = {
      "FormAttributeID": 1453,
      "SavedFormID": this.saveFormId,
      "AttributeValue": this.form.value["FamilyPedigree"]
    };
    if(!mode) {
      this.splashService.splashScreen({ isLoading : true, message : "INSERTING" })
      this._service.postSingleFormAttr(data, mode).subscribe(res => {
        this.splashService.splashScreen({isLoading : false, message : "" })
        this._snackBar.open("Data has been inserted successfully!", 'Ok', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      })
    }else{
      let id =  this.saveFormId;
      this.splashService.splashScreen({isLoading : true, message : "UPDATING" })
      this._service.getFormAttributeValues(id).subscribe((res: any) => {
        if (res) {
          for (var j = 0; j < res.length; j++) {
            if (data["FormAttributeID"] == res[j]["FormAttributeID"]) {
              data["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
              break;
            }
          }
          this._service.postSingleFormAttr(data, mode).subscribe(res => {
            this.splashService.splashScreen({isLoading : false, message : "" })
            this._snackBar.open("Data has been updated successfully!", 'Ok', {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          })
        }
      })
    }
  }

  onSubmit() {
    if (!this.form.value["savedFormID"] && !this.saveFormId) {
      this.createSampleId();
    } else {

      this.form.patchValue({ "savedFormID": this.form.value["savedFormID"] || this.saveFormId })

      if (this.fileToUpload  && !this.fileUploadSuccess) {
        this.uploadImage();
        return;
      }
      let data = this.finalFormValues.prepareAttibuteForm(this.form.value, this.formAttributes, "savedFormID", this.formId)


      if (this.formId  || this.isFormSubmit) {
        if (this.fileToUpload) {
          this.updatedSingleAttributes(true);
        }
        if(data.length == 0)
          return;
        this._service.getFormAttributeValues(this.formId || this.form.controls["savedFormID"].value).subscribe((res: any) => {
          if (res) {
            for (var i = 0; i < data.length; i++) {
              for (var j = 0; j < res.length; j++) {
                if (data[i]["formAttributeID"] == res[j]["FormAttributeID"]) {
                  data[i]["FormAttributeValueID"] = res[j]["FormAttributeValueID"]
                }
              }
            }
            this._service.createSample3(data, true).subscribe((res) => {
              if (res) {
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
        if (this.fileToUpload) {
          this.updatedSingleAttributes(false);
        }

        this._service.createSample3(data, this.formId ? true : false).subscribe((res) => {
          if (res) {
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        if (event.target) {
          this.url = reader.result;
          this.fileUploadSuccess = false;
          this.cd.detectChanges();
        }
      }
    }
  }

  onClick(): void {
    // const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    // fileUpload.click();
  }

}
