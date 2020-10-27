// RxJS
import { of } from 'rxjs';
import { catchError, finalize, tap, debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../../core/reducers';
import { selectFormsInStore, selectFormsPageLoading, selectFormsShowInitWaitingMessage } from '../_selectors/form.selectors';


export class FormsDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectFormsPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectFormsShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectFormsInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
