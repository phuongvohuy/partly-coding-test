import { Injectable } from "@angular/core";
//import { ApolloQueryResult } from "@apollo/client";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Model {
	id: number,
	name: string,
}

export interface ModelParams {
	uvdb_make_id?: number, 
	uvdb_year_id?: number, 
	page?: number, 
	limit?: number
}

// query for Models
const retrieveModesQuery = gql`
	query retrieveModel($uvdb_make_id:Int!, $uvdb_year_id: Int, $page: Int, $limit: Int) {
		uvdb {
			vehicle_selector {
				uvdb_models(uvdb_make_id:$uvdb_make_id, uvdb_year_id: $uvdb_year_id, page: $page, limit: $limit) {
					cursor {
						currentPage
						perPage
						total
					}
					items {
						id
						name
						uvdb_base_vehicle {
							uvdb_year_id
						}
					}
				}
			}
		}
	}
`;

@Injectable()
export class ModelApiService {
	constructor(private appolo: Apollo) {
		
	}

	public queryAllModels(params: ModelParams): Observable<any> {
		const {uvdb_make_id, uvdb_year_id, limit, page} = params;
		return this.appolo.query({
			query: retrieveModesQuery,
			variables: {
				uvdb_make_id,
				uvdb_year_id,
				limit,
				page
			}
		}).pipe(
			map((data: any) => data.data.uvdb.vehicle_selector.uvdb_models)
		);
	}
}