import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { MatSelectChange } from '@angular/material/select';
// import {
// 	SelectorRule, 
// 	YMMSelectorRule, 
// 	NameSelectorParams,
// } from '../../app/vehicle-selector/services/selector-rule.service';
// // Base view for 

// export interface SelectorParameter {
// 	year?: number,
// 	manufacturer?: number,
// 	model?: number
// }

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.sass']
})
export class SelectorComponent implements OnInit {
	async ngOnInit() {
	}
	// selectorNameList: Array<NameSelectorParams> = [];

	// @Output() onDoneSelectorEvent = new EventEmitter<SelectorParameter>();
	// @Output() onShowLoader = new EventEmitter<boolean>();

  // constructor(private yymSelector: YMMSelectorRule) { }

  // async ngOnInit() {
	// 	this.selectorNameList = this.yymSelector.getRuleWithNames();
		
	// 	await this.yymSelector.loadDataAtPosition(0);
	// }
	
	// async onDropDownChangeAtIndex(e: MatSelectChange, item: NameSelectorParams) {
	// 	this.onShowLoader.emit(true);
	// 	item.selectedValue = item.selector.cachedData.find((item:any) => item.id === e.value);

	// 	//find index of dropdown
	// 	const index = this.selectorNameList.indexOf(item);
	// 	if(index === this.selectorNameList.length - 1) {
	// 		console.log('this.selectorNameList ', this.selectorNameList);
	// 	} else {
	// 		const nextSelectorIndex: number = index + 1;
	// 		await this.yymSelector.loadDataAtPosition(nextSelectorIndex);
	// 		this.onShowLoader.emit(false);

	// 		// check if data is 
	// 	}
	// }

}


