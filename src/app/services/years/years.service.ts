// this class to handle bridge logic between component and api
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { YearsApiService, Year, YearQueryParams } from './years.api.service';

@Injectable()
export class YearService {
	constructor(private yearApiService: YearsApiService) {

	}

	// logic to retrieve all years of all vehicle at ones
	public retrieveAllYears(): Observable<Array<Year>> {
		const params: YearQueryParams = {
			limit: 500,
		}
		
		return this.yearApiService.queryYearsForVehicle(params).pipe(
			map((data: any) => data.items as Array<Year>)
		);
	}

	public retrieveYearsByManufactorAndModel(manufacturerID: string, modelID: string): Observable<Array<Year>> {
		const params: YearQueryParams = {
			limit: 500,
			uvdb_make_id: parseFloat(manufacturerID), 
			uvdb_model_id: parseFloat(modelID),
		};

		return this.yearApiService.queryYearsForVehicle(params).pipe(
			map((data: any) => data.items as Array<Year>)
		);
	}
}