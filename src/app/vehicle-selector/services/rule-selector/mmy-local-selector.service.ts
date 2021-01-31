import { HttpClient } from "@angular/common/http";
import { ManufacturerApiService } from "../api/manufacturer.api.service";
import { ModelApiService } from "../api/models.api.service";
import { YearsApiService } from "../api/years.api.service";
import { ManufacturerLocalServiceSelectorItem } from "../item-selector/item-selector-local.service";
import { ModelServiceSelectorItem, YearServiceSelectorItem } from "../item-selector/item-selector.service";
import { NameSelectorParams } from "./rule-selector.service";
import { MAKE_NAME_SELECTOR, MODEL_NAME_SELECTOR, VehicleSelectorLoader, YEAR_NAME_SELECTOR } from "./ymm-selector-rule.service";

export class MMYLocalSelectorRule extends VehicleSelectorLoader {
	name: string = 'MMY';
	
	constructor(
		protected yearItemSelector: YearServiceSelectorItem,
		protected manufacturerItemSelector: ManufacturerLocalServiceSelectorItem,
		protected modelItemSelector: ModelServiceSelectorItem
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

export const MMYLocalSelectorFactory = ( yearApiService: YearsApiService, httpClient: HttpClient, modelApiService: ModelApiService) => {
	const yearItemSelector: YearServiceSelectorItem = new YearServiceSelectorItem(yearApiService);
	const manufacturerLocalItemSelector: ManufacturerLocalServiceSelectorItem = new ManufacturerLocalServiceSelectorItem(httpClient);
	const modelItemSelector: ModelServiceSelectorItem = new ModelServiceSelectorItem(modelApiService);

	return new MMYLocalSelectorRule(yearItemSelector, manufacturerLocalItemSelector, modelItemSelector);
}