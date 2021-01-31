import { ManufacturerApiService } from '../api/manufacturer.api.service';
import { ModelApiService } from '../api/models.api.service';
import { YearsApiService } from '../api/years.api.service';
import { ManufacturerServiceSelectorItem, ModelServiceSelectorItem, YearServiceSelectorItem } from '../item-selector/item-selector.service';
import { NameSelectorParams } from './rule-selector.service';
import {
	MAKE_NAME_SELECTOR, MODEL_NAME_SELECTOR, YEAR_NAME_SELECTOR,
	VehicleSelectorLoader
} from './ymm-selector-rule.service';

export class MMYSelectorRule extends VehicleSelectorLoader {
	name: string = 'MMY';
	
	constructor(
		protected yearItemSelector: YearServiceSelectorItem,
		protected manufacturerItemSelector: ManufacturerServiceSelectorItem,
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
		console.log('loadDataAtPosition  MMYSelectorRule >>', indexPosition);
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

export const MMYSelectorFactory = ( yearApiService: YearsApiService, manufacturerService: ManufacturerApiService, modelApiService: ModelApiService) => {
	console.log('MMYSelectorFactory>>');
	const yearItemSelector: YearServiceSelectorItem = new YearServiceSelectorItem(yearApiService);
	const manufacturerItemSelector: ManufacturerServiceSelectorItem = new ManufacturerServiceSelectorItem(manufacturerService);
	const modelItemSelector: ModelServiceSelectorItem = new ModelServiceSelectorItem(modelApiService);

	return new MMYSelectorRule(yearItemSelector, manufacturerItemSelector, modelItemSelector);
}