// this class to handle bridge logic between component and api
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { YearsApiService, Year, YearQueryParams } from './years.api.service';

// we don't load the data by pagination but retrieving all data by specifying the limit = 1000
// If we have big data, then we need to revive the UI logic for the user to query data
// For example: Allowing users to search by text(for make and model) and search by a range of date(for years)
// That will be beneficial for user experiences.
const LIMIT_NO: number = 1000;

@Injectable()
export class YearService {
	constructor(private yearApiService: YearsApiService) {

	}

	// logic to retrieve all years of all vehicle at ones
	public retrieveAllYears(): Observable<Array<Year>> {
		const params: YearQueryParams = {
			limit: LIMIT_NO,
		}
		
		return this.yearApiService.queryYearsForVehicle(params).pipe(
			map((data: any) => data.items as Array<Year>)
		);
	}

	public retrieveYearsByManufactorAndModel(manufacturerID?: number, modelID?: number): Observable<Array<Year>> {
		const params: YearQueryParams = {
			limit: LIMIT_NO,
			uvdb_make_id: manufacturerID, 
			uvdb_model_id: modelID,
		};

		return this.yearApiService.queryYearsForVehicle(params).pipe(
			map((data: any) => data.items as Array<Year>)
		);
	}
}