/**
 * Created by TCITSS on 1/16/2020.
 */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PrepareFinalForm {

    imageAttriubute : any = [307,301];

    constructor() { }

    prepareAttibuteForm(formValue, formAttributes,idField,isFormId?:number,updateFormAttr:any = null){
        let _result = [];
        for (let prop in formValue) {
            for(let i=0;i<formAttributes.length;i++){
                // console.log(this.imageAttriubute.indexOf(formAttributes[i].FormAttributeID) < 0);
                // console.log('prepare',formAttributes[i]);
                if(prop == formAttributes[i].AttributeName && (isFormId || formValue[prop] != ""  ) && this.imageAttriubute.indexOf(formAttributes[i].FormAttributeID) < 0 ){
                    _result.push({
                        "savedFormID": formValue[idField],
                        "formAttributeID": formAttributes[i].FormAttributeID,
                        "attributeValue": formValue[prop]
                    })
                }
            }
        }
        return _result;
    }
}
