import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {ModelApiService, Model, ModelParams} from '../api/models.api.service';
import {YearsApiService, Year, YearQueryParams} from '../api/years.api.service';
import { ManufacturerApiService, Manufacturer, ManuParams} from '../api/manufacturer.api.service';

const LIMIT_NO: number = 1000;

export interface SelectorItem {
	cachedData: Array<any>,
	loadAll(): Promise<Array<any>>;
	loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>>;
}

// This class is for Model to load data from server.
@Injectable()
export class ModelServiceSelectorItem implements SelectorItem {
	public cachedData: Array<any>;

	constructor(private modelApiService: ModelApiService) {
		this.cachedData = [];
	}

	async loadAll(): Promise<Array<any>> {
		return [];	// we don't implement this item for now
	}

	async loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>> {
		const {uvdb_make_id, uvdb_year_id} = paramsOfPreviousValue;
		const limit: number = LIMIT_NO;
		const newParams: ModelParams = {
			uvdb_make_id,
			uvdb_year_id,
			limit
		}
		this.cachedData = await this.modelApiService.queryAllModels(newParams).pipe(
			map((data: any) => data.items as Array<Model>)
		).toPromise();
		
		return this.cachedData;
	}
}

// This class is for Year to load data from server.
@Injectable()
export class YearServiceSelectorItem implements SelectorItem {
	public cachedData: Array<any>;
	constructor(private yearApiService: YearsApiService) {
		this.cachedData = [];
	}

	async loadAll(): Promise<Array<Year>> {
		const params: YearQueryParams = {
			limit: LIMIT_NO,
		};

		this.cachedData = await this.yearApiService.queryYearsForVehicle(params).pipe(
			map((data: any) => data.items as Array<Year>)
		).toPromise();

		return this.cachedData;
	}

	async loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>> {
		const {uvdb_make_id, uvdb_model_id} = paramsOfPreviousValue;
		const limit: number = LIMIT_NO;
		const params: YearQueryParams = {
			limit: LIMIT_NO,
			uvdb_make_id, 
			uvdb_model_id,
		};
		this.cachedData =  await this.yearApiService.queryYearsForVehicle(params).pipe(
			map((data: any) => data.items as Array<Year>)
		).toPromise();

		return this.cachedData;
	}
}

// This class is for Manufacturer to load data from server.
@Injectable()
export class ManufacturerServiceSelectorItem implements SelectorItem {
	public cachedData: Array<any>;
	constructor(private manuApiService: ManufacturerApiService) {
		this.cachedData = [];
	}

	async loadAll(): Promise<Array<Manufacturer>> {
		const params = {
			limit: LIMIT_NO
		};
		this.cachedData = await this.manuApiService.queryAllMakes(params).pipe(
			map((data: any) => data.items as Array<Manufacturer>)
		).toPromise();

		return this.cachedData;
	}

	async loadDataByPreviousValue(paramsOfPreviousValue: any): Promise<Array<any>> {
		const {uvdb_year_id} = paramsOfPreviousValue;
		const limit: number = LIMIT_NO;
		const params = {
			uvdb_year_id,
			limit,
		}

		//store data to cached first
		this.cachedData = await this.manuApiService.queryAllMakes(params).pipe(
			map((data: any) => data.items as Array<Manufacturer>)
		).toPromise();


		return this.cachedData;
	}
}

