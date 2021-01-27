import { Injectable } from "@angular/core";
import {ModelApiService, Model} from './models.api.service';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

// we don't load the data by pagination but retrieving all data by specifying the limit = 1000
// If we have big data, then we need to revive the UI logic for the user to query data
// For example: Allowing users to search by text(for make and model) and search by a range of date(for years)
// That will be beneficial for user experiences.
const LIMIT_NO: number = 1000;

@Injectable()
export class ModelService {
	constructor(private modelApiService: ModelApiService) {

	}

	public retrieveModelsByYearAndManufacturer(year?: number, manufacturerID?: number): Observable<Array<Model>> {
		const params = {
			uvdb_make_id: manufacturerID,
			uvdb_year_id: year,
			limit: LIMIT_NO
		}
		return this.modelApiService.queryAllModels(params).pipe(
			map((data: any) => data.items as Array<Model>)
		);
	}

	public retrieveModelsByManufacturer(manufacturerID?: number): Observable<Array<Model>> {
		const params = {
			uvdb_make_id: manufacturerID,
			limit: LIMIT_NO
		};
		return this.modelApiService.queryAllModels(params).pipe(
			map((data: any) => data.items as Array<Model>)
		);
	}
}