import { HttpClient } from "@angular/common/http";
import { VehicleDataService } from "src/app/vehicle-data.service";
import { ManufacturerApiService } from "../api/manufacturer.api.service";
import { ModelApiService } from "../api/models.api.service";
import { YearsApiService } from "../api/years.api.service";
import { 
	ManufacturerLocalServiceSelectorItem,
	ModelLocalServiceSelectorItem,
	YearLocalServiceSelectorItem,
} from "../item-selector/item-selector-local.service";
import { ModelServiceSelectorItem, YearServiceSelectorItem } from "../item-selector/item-selector.service";
import { NameSelectorParams } from "./rule-selector.service";
import { MAKE_NAME_SELECTOR, MODEL_NAME_SELECTOR, VehicleSelectorLoader, YEAR_NAME_SELECTOR } from "./ymm-selector-rule.service";

export class MMYLocalSelectorRule extends VehicleSelectorLoader {
	name: string = 'MMY';
	
	constructor(
		protected yearItemSelector: YearLocalServiceSelectorItem,
		protected manufacturerItemSelector: ManufacturerLocalServiceSelectorItem,
		protected modelItemSelector: ModelLocalServiceSelectorItem
	) {
		super();

		this.savedData = [{
			title: 'Makes',
			name: MAKE_NAME_SELECTOR,
			selector: this.manufacturerItemSelector,
			selectedValue: null,
		}, {
			title: 'Models',
			name: MODEL_NAME_SELECTOR,
			selector: this.modelItemSelector,
			selectedValue: null
		}, {
			title: 'Years',
			name: YEAR_NAME_SELECTOR,
			selector: this.yearItemSelector,
			selectedValue: null,
		}]
	}

	async loadDataAtPosition(indexPosition: number): Promise<Array<any>> {
		const actionList: Array<Function> = [
			this.loadDataForManufacturer,
			this.loadDataForModel,
			this.loadDataForYear,
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

export const MMYLocalSelectorFactory = (httpClient: HttpClient, vehicleDataService: VehicleDataService) => {
	const yearItemSelector: YearLocalServiceSelectorItem = new YearLocalServiceSelectorItem(httpClient, vehicleDataService);
	const manufacturerLocalItemSelector: ManufacturerLocalServiceSelectorItem = new ManufacturerLocalServiceSelectorItem(httpClient, vehicleDataService);
	const modelItemSelector: ModelLocalServiceSelectorItem = new ModelLocalServiceSelectorItem(httpClient, vehicleDataService);

	return new MMYLocalSelectorRule(yearItemSelector, manufacturerLocalItemSelector, modelItemSelector);
}