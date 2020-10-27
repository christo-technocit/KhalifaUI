import { Injectable } from '@angular/core';
import { api } from '../_utils/api.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class VitamindService {

  baseUrl: string = api;

  constructor(private httpClient: HttpClient) { }

  getList(data: any) {
    return this.httpClient.get(this.baseUrl + `form/listforms?templateID=${data.templateId}&pagenumber=${data.pageNumber}&pagesize=${data.pageSize}&filter=${data.filter}&orderby=1&sortorder=${data.sortOrder}`);
  }
  createSampleId(id: number, sampleId: number, isEdit: boolean = false, savedFormID: any = 0) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    let data = {
      "savedFormID": savedFormID,
      "templateID": id,
      "savedFormName": sampleId,
      "createdBy": 0,
      "createdDate": new Date(),
      "updatedBy": 0,
      "updateDate": new Date()
    }
    // isEdit && (delete data.createdDate , delete data.createdBy);
    if (!isEdit)
      return this.httpClient.post(this.baseUrl + 'form/AddForms', data, options);
    else
      return this.httpClient.post(this.baseUrl + 'form/UpdateForms', data, options);
  }
  createSample3(data, isEdit: boolean) {
    if (!isEdit)
      return this.httpClient.post(this.baseUrl + 'form/Addformattributevalue', data);
    else
      return this.httpClient.post(this.baseUrl + 'form/Updateformattributevalue', data);
  }
  createSample1(data, isEdit: boolean) {
    if (!isEdit)
      return this.httpClient.post(this.baseUrl + 'form/Addformattributevalue', data);
    else
      return this.httpClient.post(this.baseUrl + 'form/Updateformattributevalue', data);
  }
  getFormAttributeValues(SavedFormID: number) {
    return this.httpClient.get(this.baseUrl + 'form/formattributevalues?SavedFormID=' + SavedFormID);
  }
  getQuestionnaire3(id: number) {
    return this.httpClient.get(this.baseUrl + `form/Questionnaire3?SavedformID=${id}`);
  }
  getQuestionnaire1(id: number) {
    return this.httpClient.get(this.baseUrl + `form/Questionnaire1?SavedformID=${id}`);
  }
  getFormAttribute(formId: number, sectionId: number) {
    return this.httpClient.get(this.baseUrl + `form/formattribute?templateID=${formId}&SectionID=${sectionId}`);
  }
  getTotalRecordsCount(templateID: number, searchStr?: any) {
    return this.httpClient.get(this.baseUrl + `form/totalrecords?templateID=${templateID}&SearchStr=${searchStr}`);
  }
  postSingleFormAttr(data: any, isEdit: boolean) {
    if (isEdit)
      return this.httpClient.post(this.baseUrl + `form/UpdateformattributevalueSingle?FormAttributeID=${data.FormAttributeID}`, data);
    else
      return this.httpClient.post(this.baseUrl + `form/Addformattributevaluesingle?FormAttributeID=${data.FormAttributeID}`, data);
  }
  postUploadImages(data, savedFormID) {
    const formData: FormData = new FormData();
    formData.append('file', data, data.name);
    return this.httpClient.post(this.baseUrl + `Image?foldername=tempimages&SavedFormID=${savedFormID}`, formData);
  }
  createSample8(data, isEdit: boolean) {
    if (!isEdit)
      return this.httpClient.post(this.baseUrl + 'form/Addformattributevalue', data);
    else
      return this.httpClient.post(this.baseUrl + 'form/Updateformattributevalue', data);
  }
  getQuestionnaire(id: number, templateID: number) {
    return this.httpClient.get(this.baseUrl + `form/Questionnaire?SavedformID=${id}&TemplateID=${templateID}`);
  }
  getQuestionnaire9(id: number) {
    return this.httpClient.get(this.baseUrl + `form/Questionnaire9?SavedformID=${id}`);
  }
  createSample(data, isEdit: boolean) {
    if (!isEdit)
      return this.httpClient.post(this.baseUrl + 'form/Addformattributevalue', data);
    else
      return this.httpClient.post(this.baseUrl + 'form/Updateformattributevalue', data);
  }

  postDocumentUpload(data, savedFormID) {
    return this.httpClient.post(this.baseUrl + `Image?foldername=Documents&SavedFormID=${savedFormID}`, data);
  }

  AddDocuments(data) {
    return this.httpClient.post(this.baseUrl + `form/AddDocuments`, data);
  }
  DeleteDocuments(data) {
    return this.httpClient.post(this.baseUrl + `form/DeleteDocuments`, data);
  }
  GetDocuments(savedFormID) {
    return this.httpClient.get(this.baseUrl + `form/GetDocuments?SavedFormID=${savedFormID}`);
  }

  getFormAttributeReports(formId : number,sectionId : number){
    return this.httpClient.get<any>(this.baseUrl+`form/formattributeReports?templateID=${formId}&SectionID=${sectionId}`).pipe(map(res => {
      // let api_response = JSON.parse(res.response);
      // console.log("getSOWRecords API Duration", { "Result": "success" });
      return res;
    }), catchError((e: any) => {
      console.log("getRecords API Duration", { "Result": "failed", "Error": e });
      return Observable.throw('Oops! Something went wrong. Please try again.');
    }));
  }
  getReportsTotal(templateID : number, sectionId : number){
    return this.httpClient.get<any>(this.baseUrl+`Report/Reports?TemplateID=${templateID}&SectionID=${sectionId}`).pipe(map(res => {
      // let api_response = JSON.parse(res.response);
      // console.log("getSOWRecords API Duration", { "Result": "success" });
      return res;
    }), catchError((e: any) => {
      console.log("getRecords API Duration", { "Result": "failed", "Error": e });
      return Observable.throw('Oops! Something went wrong. Please try again.');
    }));}
  getReports(templateID : number, sectionId : number, pageNumber : number, pageSize : number){

    console.log("getExceptions API Duration",pageNumber,pageSize);
    //  console.log("getRecords Request", payload);
    //  + branchId

    return this.httpClient.get<any>(this.baseUrl+`Report/Reports?TemplateID=${templateID}&SectionID=${sectionId}&pagesize=${pageSize}&pagenumber=${pageNumber}`)
        .pipe(map((res:any) => {
          // let api_response = JSON.parse(res.response);
          // console.log("getSOWRecords API Duration", { "Result": "success" });
          return res;
        }), catchError((e: any) => {
          console.log("getRecords API Duration", { "Result": "failed", "Error": e });
          return Observable.throw('Oops! Something went wrong. Please try again.');
        }));
  }
  getReports9(templateID : number, sectionId : number, pageNumber : number, pageSize : number){

    console.log("getExceptions API Duration",pageNumber,pageSize);
    //  console.log("getRecords Request", payload);
    //  + branchId

    return this.httpClient.get<any>(this.baseUrl+`Report/Reports?TemplateID=${templateID}&SectionID=9&pagesize=${pageSize}&pagenumber=${pageNumber}`)
        .pipe(map((res:any) => {
          // let api_response = JSON.parse(res.response);
          // console.log("getSOWRecords API Duration", { "Result": "success" });
          return res;
        }), catchError((e: any) => {
          console.log("getRecords API Duration", { "Result": "failed", "Error": e });
          return Observable.throw('Oops! Something went wrong. Please try again.');
        }));
  }
  getReportsByParms(_templateID : number, sectionId : number,collectedBy: string,collectedPoint:string,BeginPeriod : string,EndPeriod : string,nationality: string,diabetes:string,gender:string,sampleId: string, pageNumber : number, pageSize : number,filter: string){

    console.log('templateID1',_templateID);
    if(_templateID == undefined){
      console.log('templateID',_templateID);

      _templateID = 1;
    }
    if (sectionId != 0){
      sectionId=0;
    }
    if(collectedBy ==undefined)collectedBy='';
    if(collectedPoint == undefined)
    {
      collectedPoint='';
    }
    if(filter ==undefined)filter='';
    if(BeginPeriod == undefined )BeginPeriod='';
    if(EndPeriod ==  undefined )EndPeriod='';
    if(gender == undefined   || gender == '-1')gender='';
    if(diabetes ==  undefined )diabetes='';
    if(sampleId ==  undefined )sampleId='';
    if(nationality ==  undefined  || nationality == '-1')nationality='';
    console.log('vitamin',_templateID,pageNumber,pageSize);

    return this.httpClient.get<any>(this.baseUrl+`Report/Reports?TemplateID=${_templateID}&SectionID=${sectionId}&collectedBy=${collectedBy}&collectedPoint=${collectedPoint}&BeginPeriod=${BeginPeriod}&EndPeriod=${EndPeriod}&nationality=${nationality}&diabetes=${diabetes}&gender=${gender}&sampleId=${sampleId}&pagesize=${pageSize}&pagenumber=${pageNumber}&filter=${filter}`).pipe(map(res => {

      console.log('templateID1',_templateID);
      console.log('vitamin',res.result);
      return res;
    }), catchError((e: any) => {
      console.log("getRecords API Duration", { "Result": "failed", "Error": e });
      return Observable.throw('Oops! Something went wrong. Please try again.');
    }));
  }
  getReportsTotalRecordsByParms(_templateID : number, sectionId : number,collectedBy: string,collectedPoint:string,BeginPeriod : string,EndPeriod : string,nationality: string,diabetes:string,gender:string,sampleId: string, pageNumber : number, pageSize : number,filter : string){
    if(_templateID == undefined){
      console.log('templateID',_templateID);

      _templateID = 1;
    }
    if (sectionId != 0){
      sectionId=0;
    }
    if(collectedBy ==undefined )collectedBy='';
    if(collectedPoint == undefined)
    {
      collectedPoint='';
    }
    if(filter ==undefined)filter='';
    if(BeginPeriod ==undefined)BeginPeriod='';
    if(EndPeriod == undefined )EndPeriod='';
    if(gender == undefined   || gender == '-1')gender='';
    if(diabetes == undefined )diabetes='';
    if(sampleId ==  undefined )sampleId='';
    if(nationality ==  undefined || nationality == '-1')nationality='';
    console.log('vitamin',_templateID,pageNumber,pageSize);

    return this.httpClient.get<any>(this.baseUrl+`Report/ReportTotal?TemplateID=${_templateID}&SectionID=${sectionId}&collectedBy=${collectedBy}&collectedPoint=${collectedPoint}&BeginPeriod=${BeginPeriod}&EndPeriod=${EndPeriod}&nationality=${nationality}&diabetes=${diabetes}&gender=${gender}&sampleId=${sampleId}&pagesize=${pageSize}&pagenumber=${pageNumber}&filter=${filter}`).pipe(map(res => {
      console.log('vitamin',res);
      return res;
    }), catchError((e: any) => {
      console.log("getRecords API Duration", { "Result": "failed", "Error": e });
      return Observable.throw('Oops! Something went wrong. Please try again.');
    }));
  }
  getReportsTotalRecords(_templateID : number, sectionId : number, pageNumber : number, pageSize : number){
    if(_templateID == undefined){
      console.log('templateID',_templateID);

      _templateID = 1;
    }
    if (sectionId != 0){
      sectionId=0;
    }
    
    console.log('vitamin',_templateID,pageNumber,pageSize);

    return this.httpClient.get<any>(this.baseUrl+`Report/ReportTotal?TemplateID=${_templateID}&SectionID=${sectionId}&pagesize=${pageSize}&pagenumber=${pageNumber}`).pipe(map(res => {
      console.log('vitamin',res);
      return res;
    }), catchError((e: any) => {
      console.log("getRecords API Duration", { "Result": "failed", "Error": e });
      return Observable.throw('Oops! Something went wrong. Please try again.');
    }));
  }

  getCountries(){
    return this.httpClient.get<any>(this.baseUrl+`form/Countries`);
  }


}
