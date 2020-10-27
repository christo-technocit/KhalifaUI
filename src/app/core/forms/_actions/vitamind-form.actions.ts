// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { VitaminDForm4 } from '../_models/VitaminDForm';
// Models
import { QueryParamsModel } from '../../_base/crud';

export enum FormActionTypes {
    AllFormsRequested = '[Forms Module] All Forms Requested',
    AllFormsLoaded = '[Forms API] All Forms Loaded',
    FormOnServerCreated = '[Edit Form Component] Form On Server Created',
    FormCreated = '[Edit Form Dialog] Form Created',
    FormUpdated = '[Edit Form Dialog] Form Updated',
    FormDeleted = '[Forms List Page] Form Deleted',
    FormsPageRequested = '[Forms List Page] Forms Page Requested',
    FormsPageLoaded = '[Forms API] Forms Page Loaded',
    FormsPageCancelled = '[Forms API] Forms Page Cancelled',
    FormsPageToggleLoading = '[Forms] Forms Page Toggle Loading',
    FormsActionToggleLoading = '[Forms] Forms Action Toggle Loading'
}

export class FormOnServerCreated implements Action {
    readonly type = FormActionTypes.FormOnServerCreated;
    constructor(public payload: { form: VitaminDForm4 }) { }
}

export class FormCreated implements Action {
    readonly type = FormActionTypes.FormCreated;
    constructor(public payload: { form: VitaminDForm4 }) { }
}


export class FormUpdated implements Action {
    readonly type = FormActionTypes.FormUpdated;
    constructor(public payload: {
        partialForm: Update<VitaminDForm4>,
        form: VitaminDForm4
    }) { }
}

export class FormDeleted implements Action {
    readonly type = FormActionTypes.FormDeleted;
    constructor(public payload: { id: number }) {}
}

export class FormsPageRequested implements Action {
    readonly type = FormActionTypes.FormsPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class FormsPageLoaded implements Action {
    readonly type = FormActionTypes.FormsPageLoaded;
    constructor(public payload: { forms: VitaminDForm4[], totalCount: number, page: QueryParamsModel  }) { }
}


export class FormsPageCancelled implements Action {
    readonly type = FormActionTypes.FormsPageCancelled;
}

export class FormsPageToggleLoading implements Action {
    readonly type = FormActionTypes.FormsPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class FormsActionToggleLoading implements Action {
    readonly type = FormActionTypes.FormsActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type FormActions = FormCreated
| FormUpdated
| FormDeleted
| FormOnServerCreated
| FormsPageLoaded
| FormsPageCancelled
| FormsPageToggleLoading
| FormsPageRequested
| FormsActionToggleLoading;
