import { Injectable } from "@angular/core";
import { Manufacturer, ManufacturerApiService, ManuParams } from "../api/manufacturer.api.service";
import { Model, ModelApiService, ModelParams } from "../api/models.api.service";
import { Year, YearQueryParams, YearsApiService } from "../api/years.api.service";
import { 
	ManufacturerServiceSelectorItem, 
	ModelServiceSelectorItem, 
	SelectorItem, 
	YearServiceSelectorItem 
} from "../item-selector/item-selector.service";
import { 
	NameSelectorParams, 
	SelectorRule, 
	SequenceSelectorRule,
	NameSelectorParamsHelper
} from "./rule-selector.service";

export const YEAR_NAME_SELECTOR: string = 'Years';
export const MAKE_NAME_SELECTOR: string = 'Makes';
export const MODEL_NAME_SELECTOR: string = 'Models';


// define loader Mixxin for Model Year Make Loader
// This class for handle how to connect Selector together, constraint data between selector items
const applyVehicleLoaderMixn = (Base: any) => {
	return class VehicleLoaderMixin extends Base {
		protected yearItemSelector: SelectorItem | undefined;
		protected manufacturerItemSelector: SelectorItem | undefined;
		protected modelItemSelector: SelectorItem | undefined;

		// load data for year base on saveData
		protected async loadDataForYear(savedData: Array<NameSelectorParams>): Promise<Array<Year>> {
			const currentSectorIndex: number = NameSelectorParamsHelper.retrieveCurrentPosition(savedData);
			if(currentSectorIndex < savedData.length) {
				const previousData: Array<NameSelectorParams> = NameSelectorParamsHelper.retrieveAllDataToPosition(savedData, currentSectorIndex);
				const modelData: Model = NameSelectorParamsHelper.retrieveSelectedValueByName(previousData, MODEL_NAME_SELECTOR);
				const uvdb_model_id: number|undefined = modelData? modelData.id : undefined;

				const manufacturerData: Manufacturer = NameSelectorParamsHelper.retrieveSelectedValueByName(previousData, MAKE_NAME_SELECTOR);
				const uvdb_make_id: number|undefined = manufacturerData ? manufacturerData.id: undefined;
				
				const params: YearQueryParams = {
					uvdb_make_id,
					uvdb_model_id,
				}
				return this.yearItemSelector ? await this.yearItemSelector.loadDataByPreviousValue(params) : []
			}
			return [];
		}

		// load data for manufacturere base on saveData
		protected async loadDataForManufacturer(savedData: Array<NameSelectorParams>): Promise<Array<Manufacturer>> {
			const currentSectorIndex: number = NameSelectorParamsHelper.retrieveCurrentPosition(savedData);
			if(currentSectorIndex < savedData.length) {
				const previousData: Array<NameSelectorParams> = NameSelectorParamsHelper.retrieveAllDataToPosition(savedData, currentSectorIndex);

				const yearModel: Year = NameSelectorParamsHelper.retrieveSelectedValueByName(previousData, YEAR_NAME_SELECTOR);
				const uvdb_year_id: number|undefined = yearModel? yearModel.id : undefined;

				const params: ManuParams = {
					uvdb_year_id,
				}

				return this.manufacturerItemSelector ? await this.manufacturerItemSelector.loadDataByPreviousValue(params) : [];				
			}

			return [];
		}
	
		// load data for model base on savedData
		protected async loadDataForModel(savedData: Array<NameSelectorParams>): Promise<Array<Model>> {
			const currentSectorIndex: number = NameSelectorParamsHelper.retrieveCurrentPosition(savedData);
			if(currentSectorIndex < savedData.length) {
				const previousData: Array<NameSelectorParams> = NameSelectorParamsHelper.retrieveAllDataToPosition(savedData, currentSectorIndex);

				const yearModel: Year = NameSelectorParamsHelper.retrieveSelectedValueByName(previousData, YEAR_NAME_SELECTOR);
				const uvdb_year_id: number|undefined = yearModel? yearModel.id : undefined;

				const manufacturerData: Manufacturer = NameSelectorParamsHelper.retrieveSelectedValueByName(previousData, MAKE_NAME_SELECTOR);
				const uvdb_make_id: number|undefined = manufacturerData ? manufacturerData.id: undefined;

				const params: ModelParams = {
					uvdb_make_id,
					uvdb_year_id,
				};

				return this.modelItemSelector ? await this.modelItemSelector.loadDataByPreviousValue(params): [];
			}

			return [];
		}

	}
	
}

export const VehicleSelectorLoader = applyVehicleLoaderMixn(SequenceSelectorRule);

export class YMMSelectorRule extends VehicleSelectorLoader implements SelectorRule {
	name: string = 'YMM';
	
	constructor(
		protected yearItemSelector: SelectorItem,
		protected manufacturerItemSelector: SelectorItem,
		protected modelItemSelector: SelectorItem
	) {
		super();

		this.savedData = [{
			title: 'Years',
			name: YEAR_NAME_SELECTOR,
			selector: this.yearItemSelector,
			selectedValue: null,
		}, {
			title: 'Makes',
			name: MAKE_NAME_SELECTOR,
			selector: this.manufacturerItemSelector,
			selectedValue: null,
		}, {
			title: 'Models',
			name: MODEL_NAME_SELECTOR,
			selector: this.modelItemSelector,
			selectedValue: null
		}]
	}

	async loadDataAtPosition(indexPosition: number): Promise<Array<any>> {
		const actionList: Array<Function> = [
			this.loadDataForYear,
			this.loadDataForManufacturer,
			this.loadDataForModel
		];

		return await actionList[indexPosition].call(this, this.savedData);
	}

	//for checking type only
	retrieveAllDataToPosition(indexPosition: number): Array<any> {
		return super.retrieveAllDataToPosition(indexPosition);
	}
	//for checking type only
	getRuleWithNames():Array<NameSelectorParams> {
		return super.getRuleWithNames();
	}
	//for checking type only
	resetSelectedValueByRange(fromIndex?: number, toIndex?: number) : void {
		super.resetSelectedValueByRange(fromIndex, toIndex);
	}
}

export const YMMSelectorFactory = ( yearApiService: YearsApiService, manufacturerService: ManufacturerApiService, modelApiService: ModelApiService) => {
	const yearItemSelector: YearServiceSelectorItem = new YearServiceSelectorItem(yearApiService);
	const manufacturerItemSelector: ManufacturerServiceSelectorItem = new ManufacturerServiceSelectorItem(manufacturerService);
	const modelItemSelector: ModelServiceSelectorItem = new ModelServiceSelectorItem(modelApiService);

	return new YMMSelectorRule(yearItemSelector, manufacturerItemSelector, modelItemSelector);
}

