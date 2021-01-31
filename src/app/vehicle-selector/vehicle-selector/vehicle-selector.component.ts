import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import {
	SelectorRule,  
	NameSelectorParams,
	EmptyRule,
	NameSelectorParamsHelper,
} from '../services/rule-selector/rule-selector.service';

@Component({
  selector: 'vehicle-selector-comp',
  templateUrl: './vehicle-selector.component.html',
	styleUrls: ['./vehicle-selector.component.sass'],
	providers: [
		
	]
})
export class VehicleSelectorComponent implements OnInit {
	
	selectorNameList: Array<NameSelectorParams> = [];
	ruleName: string = '';

	@Output() onDoneSelectorEvent = new EventEmitter<Array<NameSelectorParams>>();
	@Output() onShowLoader = new EventEmitter<boolean>();

	@Input() ruleSelector: SelectorRule = new EmptyRule();

  constructor() { }

  async ngOnInit() {
		this.selectorNameList = this.ruleSelector.getRuleWithNames();
		//reset value 
		NameSelectorParamsHelper.resetValueAndCachedData(this.selectorNameList);
		this.ruleName = this.ruleSelector.name;
		
		await this.ruleSelector.loadDataAtPosition(0);
	}
	
	async onDropDownChangeAtIndex(e: MatSelectChange, item: NameSelectorParams) {
		this.onShowLoader.emit(true);
		item.selectedValue = item.selector.cachedData.find((item:any) => item.id === e.value);

		//find index of dropdown
		const index = this.selectorNameList.indexOf(item);
		if(index === this.selectorNameList.length - 1) {
			this.onDoneSelectorEvent.emit(this.selectorNameList);
		} else {
			const nextSelectorIndex: number = index + 1;
			// reset value for following dropdown
			this.ruleSelector.resetSelectedValueByRange(nextSelectorIndex);
			//load data for next dropdown
			await this.ruleSelector.loadDataAtPosition(nextSelectorIndex);
			
			this.onShowLoader.emit(false);
		}
	}

}
