// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// Actions
import { FormActions, FormActionTypes } from '../_actions/vitamind-form.actions';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { VitaminDForm4 } from '../_models/VitaminDForm';

// tslint:disable-next-line:no-empty-interface
export interface FormsState extends EntityState<VitaminDForm4> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedFormId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<VitaminDForm4> = createEntityAdapter<VitaminDForm4>();

export const initialFormsState: FormsState = adapter.getInitialState({
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastQuery:  new QueryParamsModel({}),
    lastCreatedFormId: undefined,
    showInitWaitingMessage: true
});

export function formsReducer(state = initialFormsState, action: FormActions): FormsState {
    switch  (action.type) {
        case FormActionTypes.FormsPageToggleLoading: return {
            ...state, listLoading: action.payload.isLoading, lastCreatedFormId: undefined
        };
        case FormActionTypes.FormsActionToggleLoading: return {
            ...state, actionsloading: action.payload.isLoading
        };
        case FormActionTypes.FormOnServerCreated: return {
            ...state
        };
        case FormActionTypes.FormCreated: return adapter.addOne(action.payload.form, {
            ...state, lastCreatedFormId: action.payload.form.id
        });
        case FormActionTypes.FormUpdated: return adapter.updateOne(action.payload.partialForm, state);
        case FormActionTypes.FormDeleted: return adapter.removeOne(action.payload.id, state);
        case FormActionTypes.FormsPageCancelled: return {
            ...state, listLoading: false, lastQuery: new QueryParamsModel({})
        };
        case FormActionTypes.FormsPageLoaded: {
            return adapter.addMany(action.payload.forms, {
                ...initialFormsState,
                totalCount: action.payload.totalCount,
                lastQuery: action.payload.page,
                listLoading: false,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getFormState = createFeatureSelector<FormsState>('forms');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
