// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap } from 'rxjs/operators';
import { Observable, defer, of, forkJoin } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
// CRUD
import { QueryResultsModel, QueryParamsModel } from '../../_base/crud';
// Services
import { AuthService } from '../../../core/auth/_services';
import { FormService } from '../_services';
// State
import { AppState } from '../../../core/reducers';
import {
    FormActionTypes,
    FormsPageRequested,
    FormsPageLoaded,
    FormCreated,
    FormDeleted,
    FormUpdated,
    FormOnServerCreated,
    FormsActionToggleLoading,
    FormsPageToggleLoading
} from '../_actions/form.actions';


@Injectable()
export class FormEffects {
    showPageLoadingDistpatcher = new FormsPageToggleLoading({ isLoading: true });
    hidePageLoadingDistpatcher = new FormsPageToggleLoading({ isLoading: false });

    showActionLoadingDistpatcher = new FormsActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new FormsActionToggleLoading({ isLoading: false });

    @Effect()
    loadFormsPage$ = this.actions$
        .pipe(
            ofType<FormsPageRequested>(FormActionTypes.FormsPageRequested),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.formService.findForms(payload.page);
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
            }),
            map(response => {
                const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                return new FormsPageLoaded({
                    forms: result.items,
                    totalCount: result.totalCount,
                    page: lastQuery
                });
            }),
        );

    @Effect()
    deleteForm$ = this.actions$
        .pipe(
            ofType<FormDeleted>(FormActionTypes.FormDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.formService.deleteForm(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateForm$ = this.actions$
        .pipe(
            ofType<FormUpdated>(FormActionTypes.FormUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.formService.updateForm(payload.form);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    createForm$ = this.actions$
        .pipe(
            ofType<FormOnServerCreated>(FormActionTypes.FormOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.formService.createForm(payload.form).pipe(
                    tap(res => {
                        this.store.dispatch(new FormCreated({ form: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private formService: FormService, private store: Store<AppState>) { }
}
