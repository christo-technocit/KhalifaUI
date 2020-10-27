import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  private _Refid = new BehaviorSubject<any>(0);
  _Refid$ = this._Refid.asObservable();
  constructor() { }
  sendRefId(id : any){
   this._Refid.next(id);
  }
}
