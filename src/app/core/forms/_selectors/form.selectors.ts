// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { FormsState } from '../_reducers/form.reducers';
import { each } from 'lodash';
import { EForm } from '../_models/form.model';


export const selectFormsState = createFeatureSelector<FormsState>('forms');

export const selectFormById = (formId: number) => createSelector(
    selectFormsState,
    formsState => formsState.entities[formId]
);

export const selectFormsPageLoading = createSelector(
    selectFormsState,
    formsState => {
        return formsState.listLoading;
    }
);

export const selectFormsActionLoading = createSelector(
    selectFormsState,
    formsState => formsState.actionsloading
);

export const selectLastCreatedFormId = createSelector(
    selectFormsState,
    formsState => formsState.lastCreatedFormId
);

export const selectFormsPageLastQuery = createSelector(
    selectFormsState,
    formsState => formsState.lastQuery
);

export const selectFormsInStore = createSelector(
    selectFormsState,
    formsState => {
        const items: EForm[] = [];
        each(formsState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: EForm[] = httpExtension.sortArray(items, formsState.lastQuery.sortField, formsState.lastQuery.sortOrder);
        return new QueryResultsModel(result, formsState.totalCount, '');
    }
);

export const selectFormsShowInitWaitingMessage = createSelector(
    selectFormsState,
    formsState => formsState.showInitWaitingMessage
);

export const selectHasFormsInStore = createSelector(
    selectFormsState,
    queryResult => {
        if (!queryResult.totalCount) {
            return false;
        }

        return true;
    }
);
