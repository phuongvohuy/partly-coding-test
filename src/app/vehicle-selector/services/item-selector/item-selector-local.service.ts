import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Manufacturer } from "../api/manufacturer.api.service";
import { SelectorItem } from "./item-selector.service";

import {VehicleDataService} from '../../../vehicle-data.service';

@Injectable()
export class ManufacturerLocalServiceSelectorItem implements SelectorItem {
	public cachedData: Array<any>;
	constructor(private http: HttpClient, private vehicleDataService: VehicleDataService) {
		this.cachedData = [];
	}

	async loadAll(): Promise<Array<Manufacturer>> {
		return [];
	}

	async loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>> {
		// this.cachedData = await this.http.get('./assets/data3.json').pipe(
		// 	map((data: any) => data.data.uvdb.vehicle_selector.uvdb_makes.items)
		// ).toPromise();

		// return this.cachedData;
		this.cachedData = this.vehicleDataService.retrieveMakes();
		return this.cachedData;
	}
}

@Injectable()
export class ModelLocalServiceSelectorItem implements SelectorItem {
	public cachedData: Array<any>;
	constructor(private http: HttpClient, private vehicleDataService: VehicleDataService) {
		this.cachedData = [];
	}

	async loadAll(): Promise<Array<Manufacturer>> {
		return [];
	}

	async loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>> {
		const {uvdb_make_id, uvdb_year_id} = paramsOfPreviousValue;

		this.cachedData = this.vehicleDataService.retrieveModelByMake(uvdb_make_id);
		return this.cachedData;
	}
}

@Injectable()
export class YearLocalServiceSelectorItem implements SelectorItem {
	public cachedData: Array<any>;
	constructor(private http: HttpClient, private vehicleDataService: VehicleDataService) {
		this.cachedData = [];
	}

	async loadAll(): Promise<Array<Manufacturer>> {
		return [];
	}

	async loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>> {
		const {uvdb_make_id, uvdb_model_id} = paramsOfPreviousValue;

		this.cachedData = this.vehicleDataService.retrieveYearByModelAndMake(uvdb_make_id, uvdb_model_id);

		return this.cachedData;
	}
}

