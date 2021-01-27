import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular'

// graphGL query
const retrieveYearsQuery = gql`
	query retrieveYears($uvdb_make_id:Int, $uvdb_model_id: Int, $page: Int, $limit: Int) {
		uvdb {
			vehicle_selector {
				uvdb_years(uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id, page: $page, limit: $limit) {
					cursor {
						currentPage
						perPage
						total
					}
					items {
						id
						uvdb_base_vehicle {
							uvdb_year_id
							uvdb_model_id
							uvdb_make_id
						}
					}
				}
			}
		}
	}
`;

export interface Year {
	id: number,
}

export interface YearQueryParams {
	uvdb_make_id?: number, 
	uvdb_model_id?: number, 
	limit?: number, 
	page?: number
}

@Injectable()
export class YearsApiService {
	constructor(private appolo: Apollo) {

	}

	public queryYearsForVehicle(params: YearQueryParams): Observable<any> {
		const {uvdb_make_id, uvdb_model_id, limit, page} = params;
		return this.appolo.query({
			query: retrieveYearsQuery,
			variables: {
				limit,
				page,
				uvdb_make_id,
				uvdb_model_id
			}
		}).pipe(
			map((item: any) => item.data.uvdb.vehicle_selector.uvdb_years),
		);
	}
}