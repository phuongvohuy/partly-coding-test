import { Component, OnInit, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { delay } from 'rxjs/operators';
import { Manufacturer } from '../services/manufacturer/manufacturer.api.service';
import { ManufacturerService } from '../services/manufacturer/manufacturer.service';
import { Model } from '../services/models/models.api.service';
import { ModelService } from '../services/models/models.service';
import { Year } from '../services/years/years.api.service';
import { YearService } from '../services/years/years.service';

export interface MMYParameter {
	year?: number,
	manufacturer?: number,
	model?: number
}

@Component({
  selector: 'mmy-selector',
  templateUrl: './mmy-selector.component.html',
  styleUrls: ['./mmy-selector.component.sass']
})
export class MmySelectorComponent implements OnInit {
	selectedYear: Year|undefined = undefined;
	years: Array<Year> = [];

	manufaturers: Array<Manufacturer> = [];
	selectedManufacturer: Manufacturer|undefined = undefined;

	models: Array<Model> = [];
	selectedModel: Model|undefined = undefined;

	@Output() onDoneSelectorEvent = new EventEmitter<MMYParameter>();
	@Output() onShowLoader = new EventEmitter<boolean>();

  constructor(
		private yearService: YearService,
		private manufacturerService: ManufacturerService,
		private modelService: ModelService
	) { }

	private resetManufacurer() {
		this.manufaturers = [];
		this.selectedManufacturer = undefined;
	}

	private resetModel() {
		this.models = [];
		this.selectedModel = undefined;
	}

	private resetYears() {
		this.years = [];
		this.selectedYear = undefined; 
	}

  async ngOnInit() {
		// trick to remove the error message when display loader which try to change value in the parent after it's checked
		await delay(100);
		this.onShowLoader.emit(true);
		this.manufaturers = await this.manufacturerService.retrieveAllManufacturer().toPromise();
		this.onShowLoader.emit(false);
	}

	async onManufacturerChange(e: MatSelectChange) {
		this.onShowLoader.emit(true);
		this.selectedManufacturer = this.manufaturers.find((item: Manufacturer) => item.id === e.value);
		
		//reset models and years
		this.resetModel();
		this.resetYears();

		const manufacturer: number|undefined = this.selectedManufacturer ? this.selectedManufacturer.id : undefined;
		
		this.models = await this.modelService.retrieveModelsByManufacturer(manufacturer).toPromise();
		this.onShowLoader.emit(false);
		
		// check if models has only one element, then trigger the onModelChange flow.
		if(this.models.length === 1) { 
			// trigger onModelChange flow
			this.onModelChange({value: this.models[0].id});
		}
	}

	async onModelChange(e: MatSelectChange | {value: number}) {
		this.onShowLoader.emit(true);
		this.selectedModel = this.models.find((item: Model) => item.id === e.value);

		//reset years
		this.resetYears();

		const manufacturer: number|undefined = this.selectedManufacturer ? this.selectedManufacturer.id : undefined;
		const model: number|undefined = this.selectedModel ? this.selectedModel.id : undefined;
		
		this.years = await this.yearService.retrieveYearsByManufactorAndModel(manufacturer, model).toPromise();
		this.onShowLoader.emit(false);

		// check if years has only one element, then trigger the onYearChange flow.
		if(this.years.length === 1) {
			this.onYearChange({value: this.years[0].id})
		}
	}
	
	async onYearChange(e: MatSelectChange|{value: number}) {
		this.selectedYear = this.years.find((item: Year) => item.id === e.value);

		const manufacturer: number|undefined = this.selectedManufacturer ? this.selectedManufacturer.id : undefined;
		const model: number|undefined = this.selectedModel ? this.selectedModel.id : undefined;
		const year: number| undefined = this.selectedYear ? this.selectedYear.id : undefined;

		this.onDoneSelectorEvent.emit({
			year,
			manufacturer,
			model,
		})
	}
}
