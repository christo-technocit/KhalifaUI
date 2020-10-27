/**
 * Created by TCITSS on 3/9/2020.
 */
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

export interface ILoader {
    isLoading: boolean;
    message: string;
}
@Injectable({
    providedIn: 'root'
})
export class SplashScreenService {

    private _isLoading = new BehaviorSubject<ILoader>({
        isLoading: false,
        message: ""
    });

    _isLoading$ = this._isLoading.asObservable();

    constructor() { }
    splashScreen(data : ILoader){
        this._isLoading.next({
            isLoading: data.isLoading,
            message: data.message
        });
    }

}