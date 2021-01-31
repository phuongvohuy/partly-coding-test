import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Manufacturer } from "../api/manufacturer.api.service";
import { SelectorItem } from "./item-selector.service";

@Injectable()
export class ManufacturerLocalServiceSelectorItem implements SelectorItem {
	public cachedData: Array<any>;
	constructor(private http: HttpClient) {
		this.cachedData = [];
	}

	async loadAll(): Promise<Array<Manufacturer>> {
		return [];
	}

	async loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>> {
		this.cachedData = await this.http.get('./assets/data3.json').pipe(
			map((data: any) => data.data.uvdb.vehicle_selector.uvdb_makes.items)
		).toPromise();

		return this.cachedData;
	}
}