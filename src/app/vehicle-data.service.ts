import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Manufacturer } from "./vehicle-selector/services/api/manufacturer.api.service";
import { Model } from "./vehicle-selector/services/api/models.api.service";
import { Year } from "./vehicle-selector/services/api/years.api.service";

import data from '../assets/data2.json';

interface Vehicle {
		id: number,
		name: string,
		uvdb_base_vehicle: {
			uvdb_year_id: number,
			uvdb_make_name: string,
			uvdb_make_id: number,
			uvdb_model_id: number,
			uvdb_model_name: string
		}
}

function onlyUnique(value: any, index: number, self: Array<any>): boolean {
	return self.findIndex(item => item.id === value.id) === index;
}

@Injectable()
export class VehicleDataService {
	vehicleGarage: Array<Vehicle> = []

	constructor(private http: HttpClient) {
		this.loadData();
	}

	private async loadData() {
		this.vehicleGarage = data.data.uvdb.vehicles.items as Array<Vehicle>;
		// this.vehicleGarage = await this.http.get('./assets/data2.json').pipe(
		// 	map((data: any) => data.data.uvdb.vehicles.items)
		// ).toPromise();
	}

	public retrieveMakes(): Array<Manufacturer> {
		return this.vehicleGarage.map((item: Vehicle) => {
			return {
				id: item.uvdb_base_vehicle.uvdb_make_id,
				name: item.uvdb_base_vehicle.uvdb_make_name,
			}
		}).filter(onlyUnique);
	}

	public retrieveModelByMake(makeId: number): Array<Model> {
		return this.vehicleGarage.filter((item: Vehicle) => item.uvdb_base_vehicle.uvdb_make_id === makeId)
			.map((item: Vehicle) => {
				return {
					id: item.uvdb_base_vehicle.uvdb_model_id,
					name: item.uvdb_base_vehicle.uvdb_model_name
				}
		}).filter(onlyUnique);
	}

	public retrieveYearByModelAndMake(makeId: number, modelId: number): Array<Year> {
		return this.vehicleGarage.filter((item: Vehicle) => {
			return item.uvdb_base_vehicle.uvdb_make_id === makeId && item.uvdb_base_vehicle.uvdb_model_id === modelId;
		}).map((item: Vehicle) => {
				return {
					id: item.uvdb_base_vehicle.uvdb_year_id,
					name: item.uvdb_base_vehicle.uvdb_year_id.toString()
				}
		}).filter(onlyUnique);
	}

}