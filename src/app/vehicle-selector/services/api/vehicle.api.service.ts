import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Vehicle {
	id: number,
	name: string,
}

export interface VehicleParams {
	uvdb_make_id?: number, 
	uvdb_model_id?: number, 
	uvdb_year?: number, 
	page?: number, 
	limit?: number
}

// query for Vehicle
const retrieveVehiclesQuery = gql`
	query retrieveVehicle($uvdb_make_id: Int, $uvdb_model_id: Int, $uvdb_year: Int, $page: Int, $limit: Int) {
		uvdb {
			vehicles(uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id, uvdb_year: $uvdb_year, page: $page, limit: $limit) {
				cursor {
					currentPage
					perPage
					total
				}
				items {
					id
					name
					body_color
					body_style
					description
					plate_number
					engine_number
					uvdb_base_vehicle {
						uvdb_year_id
						uvdb_make_id
						uvdb_model_id
					}
					uvdb_vehicle_definition {
						name
					}
				}
			}
		}
	}
`;

@Injectable()
export class VehicleApiService {
	constructor(private appolo: Apollo) {
		
	}

	public queryAllVehicles(params: VehicleParams): Observable<any> {
		const {uvdb_make_id, uvdb_model_id, uvdb_year, limit, page} = params
		
		return this.appolo.query({
			query: retrieveVehiclesQuery,
			variables: {
				uvdb_make_id,
				uvdb_model_id,
				uvdb_year,
				limit,
				page
			}
		}).pipe(
			map((data: any) => data.data.uvdb.vehicles)
		);
	}
}