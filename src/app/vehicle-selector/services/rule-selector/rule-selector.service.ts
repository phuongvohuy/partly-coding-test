// Implement Selector rule
import { Injectable } from '@angular/core';
import {
	SelectorItem, 
} from '../item-selector/item-selector.service';

export interface NameSelectorParams {
	title: string,
	name: string,	//unique value
	selector: SelectorItem,
	selectedValue: any,
}

export const NameSelectorParamsHelper = {
	retrieveSelectedValueByName : (selectorParamsList: Array<NameSelectorParams>, name: string): any|undefined => {
		const result: NameSelectorParams|undefined = selectorParamsList.find(item => item.name === name);
		return result ? result.selectedValue : null;
	},
	retrieveAllDataToPosition: (selectorParamsList: Array<NameSelectorParams>, indexPosition: number): Array<NameSelectorParams> => {
		return selectorParamsList.slice(0, indexPosition + 1);
	},
	retrieveCurrentPosition: (selectorParamsList: Array<NameSelectorParams>) => {
		const indexOfNull: number = selectorParamsList.findIndex((item: NameSelectorParams) => item.selectedValue === null || item.selectedValue === undefined);
		return indexOfNull === -1 ? selectorParamsList.length : indexOfNull;
	},
	resetValueAndCachedData: (selectorParamsList: Array<NameSelectorParams>) => {
		selectorParamsList.forEach((item: NameSelectorParams) => {
			if(item.selector) {
				item.selector.cachedData = [];
			}

			item.selectedValue = null;
		});
	}
}

export interface SelectorRule {
	name: string,
	loadDataAtPosition: (indexPosition: number) => Promise<Array<any>>;
	retrieveAllDataToPosition: (indexPosition: number) => Array<any>;
	getRuleWithNames: () => Array<NameSelectorParams>;
	resetSelectedValueByRange: (fromIndex?: number, toIndex?: number) => void;
}

export class EmptyRule implements SelectorRule {
	name: string = 'EmptyRule';

	async loadDataAtPosition(indexPosition: number): Promise<Array<any>> {
		return [];
	}
	retrieveAllDataToPosition(indexPosition: number): Array<any> {
		return [];
	}
	getRuleWithNames(): Array<NameSelectorParams> {
		return [];
	}
	resetSelectedValueByRange(fromIndex?: number, toIndex?: number): void {
	}
}

export class SequenceSelectorRule implements SelectorRule {
	name: string = 'SequenceSelectorRule'
	savedData: Array<NameSelectorParams>;
	constructor() {
		this.savedData = [];
	}

	async loadDataAtPosition(indexPosition: number): Promise<Array<any>> {
		return await [];
	}
	
	getRuleWithNames(): Array<NameSelectorParams> {
		return this.savedData;
	};

	retrieveAllDataToPosition(indexPosition: number): Array<any> {
		//return this.savedData.slice(0, indexPosition + 1);
		return NameSelectorParamsHelper.retrieveAllDataToPosition(this.savedData, indexPosition);
	}

	resetSelectedValueByRange(fromIndex?: number, toIndex?: number): void {
		const newToIndex: number = toIndex === undefined || toIndex < 0 ? this.savedData.length - 1 : toIndex;
		const newFromIndex: number = fromIndex === undefined || fromIndex > this.savedData.length - 1 ? 0 : fromIndex;

		const list:Array<NameSelectorParams> = this.savedData.filter((value: any, index: number) => index >= newFromIndex && index <= newToIndex);
		list.forEach((item: NameSelectorParams) => item.selectedValue = null);
	}
}
