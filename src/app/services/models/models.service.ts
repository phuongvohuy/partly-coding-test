import { Injectable } from "@angular/core";
import {ModelApiService, Model} from './models.api.service';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class ModelService {
	constructor(private modelApiService: ModelApiService) {

	}

	public retrieveModelsByYearAndManufacturer(year?: number, manufacturerID?: number): Observable<Array<Model>> {
		const params = {
			uvdb_make_id: manufacturerID,
			uvdb_year_id: year,
		}
		return this.modelApiService.queryAllModels(params).pipe(
			map((data: any) => data.items as Array<Model>)
		);
	}

	public retrieveModelsByManufacturer(manufacturerID?: number): Observable<Array<Model>> {
		const params = {
			uvdb_make_id: manufacturerID,
		};
		return this.modelApiService.queryAllModels(params).pipe(
			map((data: any) => data.items as Array<Model>)
		);
	}
}