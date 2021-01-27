import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular'

// query all years 
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

// // query for Makes
// const retrieveMakeQuery = gql`
// 	query retrieveMakes($uvdb_year_id: Int, $page: Int, $limit: Int) {
// 		uvdb {
// 			vehicle_selector {
// 				uvdb_makes(uvdb_year_id: $uvdb_year_id, page: $page, limit: $limit) {
// 					cursor {
// 						currentPage
// 						perPage
// 						total
// 					}
// 					items {
// 						id
// 						name
// 					}
// 				}
// 			}
// 		}
// 	}
// `;

// // query for Models
// const retrieveModesQuery = gql`
// 	query retrieveModel($uvdb_make_id:Int!, $uvdb_year_id: Int, $page: Int, $limit: Int) {
// 		uvdb {
// 			vehicle_selector {
// 				uvdb_models(uvdb_make_id:$uvdb_make_id, uvdb_year_id: $uvdb_year_id, page: $page, limit: $limit) {
// 					cursor {
// 						currentPage
// 						perPage
// 						total
// 					}
// 					items {
// 						id
// 						name
// 						uvdb_base_vehicle {
// 							uvdb_year_id
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// `;

// // query for Vehicle
// const retrieveVehiclesQuery = gql`
// 	query retrieveVehicle($uvdb_make_id: Int, $uvdb_model_id: Int, $uvdb_year: Int, page: $page, limit: $limit) {
// 		uvdb {
// 			vehicles(uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id, uvdb_year: $uvdb_year, page: $page, limit: $limit) {
// 				cursor {
// 					currentPage
// 					perPage
// 					total
// 				}
// 				items {
// 					id
// 					name
// 					body_color
// 					body_style
// 					description
// 					plate_number
// 					engine_number
// 					uvdb_base_vehicle {
// 						uvdb_year_id
// 						uvdb_make_id
// 						uvdb_model_id
// 					}
// 					uvdb_vehicle_definition {
// 						name
// 					}
// 				}
// 			}
// 		}
// 	}
// `;

@Injectable()
export class ApiService {
	constructor(private http: HttpClient, private appolo: Apollo) {

	}

	public getJSON(limit: number, year: number): Observable<any> {
		return this.http.get('./assets/data3.json');
	}

	public queryYearsForVehicle(params: {
		uvdb_make_id?: number, 
		uvdb_model_id?: number, 
		limit?: number, 
		page?: number
	}): Observable<any> {
		const {uvdb_make_id, uvdb_model_id, limit, page} = params;
		console.log('params >>  ', uvdb_make_id, uvdb_model_id, limit, page)
		return this.appolo.watchQuery({
			query: retrieveYearsQuery,
			variables: {
				limit,
				page,
				uvdb_make_id,
				uvdb_model_id
			}
		}).valueChanges;
	}

	// public queryAllMakes(uvdb_year_id?: number, limit?: number, page?: number): Observable<any> {
	// 	return this.appolo.watchQuery({
	// 		query: retrieveMakeQuery,
	// 		variables: {
	// 			page,
	// 			limit,
	// 			uvdb_year_id
	// 		}
	// 	}).valueChanges;
	// }

	// public queryAllModels(uvdb_make_id: number, uvdb_year_id: number, page?: number, limit?: number): Observable<any> {
	// 	return this.appolo.watchQuery({
	// 		query: retrieveModesQuery,
	// 		variables: {
	// 			uvdb_make_id,
	// 			uvdb_year_id,
	// 			limit,
	// 			page
	// 		}
	// 	}).valueChanges;
	// }

	// public queryAllVehicles(uvdb_make_id: number, uvdb_model_id: number, uvdb_year: number, page?: number, limit?: number): Observable<any> {
	// 	return this.appolo.watchQuery({
	// 		query: retrieveModesQuery,
	// 		variables: {
	// 			uvdb_make_id,
	// 			uvdb_model_id,
	// 			uvdb_year,
	// 			limit,
	// 			page
	// 		}
	// 	}).valueChanges;
	// }
}