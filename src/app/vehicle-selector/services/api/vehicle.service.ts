import { Injectable } from "@angular/core";
import {VehicleApiService, Vehicle, VehicleParams} from './vehicle.api.service';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

// we don't load the data by pagination but retrieving all data by specifying the limit = 1000
// If we have big data, then we need to revive the UI logic for the user to query data
// For example: Allowing users to search by text(for make and model) and search by a range of date(for years)
// That will be beneficial for user experiences.
const LIMIT_NO: number = 1000;

@Injectable()
export class VehicleService {
	constructor(private vehicleApiService: VehicleApiService) {

	}

	public retrieveManufactureByYear(year?: number, manufacturerID?: number, modelID?: number): Observable<Array<Vehicle>> {
		const params:VehicleParams = {
			uvdb_make_id: manufacturerID,
			uvdb_model_id: modelID, 
			uvdb_year: year,
			limit: LIMIT_NO
		}
		return this.vehicleApiService.queryAllVehicles(params).pipe(
			map((data: any) => data.items as Array<Vehicle>)
		)
	}
}