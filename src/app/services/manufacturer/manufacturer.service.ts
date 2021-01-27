import { Injectable } from "@angular/core";
import {ManufacturerApiService, Manufacturer} from './manufacturer.api.service';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

// we don't load the data by pagination but retrieving all data by specifying the limit = 1000
// If we have big data, then we need to revive the UI logic for the user to query data
// For example: Allowing users to search by text(for make and model) and search by a range of date(for years)
// That will be beneficial for user experiences.
const LIMIT_NO: number = 1000;

@Injectable()
export class ManufacturerService {
	constructor(private manuApiService: ManufacturerApiService) {

	}

	public retrieveManufactureByYear(year?: number): Observable<Array<Manufacturer>> {
		const params = {
			uvdb_year_id: year,
			limit: LIMIT_NO
		}
		return this.manuApiService.queryAllMakes(params).pipe(
			map((data: any) => data.items as Array<Manufacturer>)
		)
	}

	public retrieveAllManufacturer(): Observable<Array<Manufacturer>> {
		const params = {
			limit: LIMIT_NO
		};
		return this.manuApiService.queryAllMakes(params).pipe(
			map((data: any) => data.items as Array<Manufacturer>)
		)
	}
}