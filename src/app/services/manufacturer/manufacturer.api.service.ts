import { Injectable } from "@angular/core";
//import { ApolloQueryResult } from "@apollo/client";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Manufacturer {
	id: number,
	name: string,
}

export interface ManuParams {
	uvdb_year_id?: number, 
	limit?: number, 
	page?: number
}

// query for Makes
const retrieveMakeQuery = gql`
	query retrieveMakes($uvdb_year_id: Int, $page: Int, $limit: Int) {
		uvdb {
			vehicle_selector {
				uvdb_makes(uvdb_year_id: $uvdb_year_id, page: $page, limit: $limit) {
					cursor {
						currentPage
						perPage
						total
					}
					items {
						id
						name
					}
				}
			}
		}
	}
`;

@Injectable()
export class ManufacturerApiService {
	constructor(private appolo: Apollo) {
		
	}

	public queryAllMakes(params: ManuParams): Observable<any> {
		console.log('queryAllMakes');
		const {page, limit, uvdb_year_id} = params;
		return this.appolo.query({
			query: retrieveMakeQuery,
			variables: {
				page,
				limit,
				uvdb_year_id
			}
		}).pipe(
			map((data:any) => data.data.uvdb.vehicle_selector.uvdb_makes)
		);
	}
}