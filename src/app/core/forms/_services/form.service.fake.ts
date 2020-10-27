// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
// Lodash
import { filter, some, find, each } from 'lodash';
// Environment
import { environment } from '../../../../environments/environment';
// CRUD
import { QueryParamsModel, QueryResultsModel, HttpUtilsService } from '../../_base/crud';
// Models
import { EForm } from '../_models/form.model';

const API_FORMS_URL = 'api/forms';

@Injectable()
export class FormService {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// Forms

	// CREATE =>  POST: add a new form to the server
	createForm(form: EForm): Observable<EForm> {
		const httpHeaders = new HttpHeaders();
		// Note: Add headers if needed (tokens/bearer)
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<EForm>(API_FORMS_URL, form, { headers: httpHeaders });
	}

	// READ
	getAllForms(): Observable<EForm[]> {
		return this.http.get<EForm[]>(API_FORMS_URL);
	}

	getFormById(formId: number): Observable<EForm> {
		if (!formId) {
			return of(null);
		}

		return this.http.get<EForm>(API_FORMS_URL + `/${formId}`);
	}

	// DELETE => delete the form from the server
	deleteForm(formId: number) {
		const url = `${API_FORMS_URL}/${formId}`;
		return this.http.delete(url);
	}

	// UPDATE => PUT: update the form on the server
	updateForm(_form: EForm): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_FORMS_URL, _form, { headers: httpHeaders }).pipe(
			catchError(err => {
				return of(null);
			})
		);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findForms(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		return this.getAllForms().pipe(
			mergeMap((response: EForm[]) => {
				const result = this.httpUtils.baseFilter(response, queryParams, []);
				return of(result);
			})
		);
	}

	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}
}
