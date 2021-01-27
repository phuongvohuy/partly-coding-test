import { Injectable } from "@angular/core";
import {VehicleApiService, Vehicle, VehicleParams} from './vehicle.api.service';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class VehicleService {
	constructor(private vehicleApiService: VehicleApiService) {

	}

	public retrieveManufactureByYear(year?: number, manufacturerID?: number, modelID?: number): Observable<Array<Vehicle>> {
		const params:VehicleParams = {
			uvdb_make_id: manufacturerID,
			uvdb_model_id: modelID, 
			uvdb_year: year
		}
		return this.vehicleApiService.queryAllVehicles(params).pipe(
			map((data: any) => data.items as Array<Vehicle>)
		)
	}
}