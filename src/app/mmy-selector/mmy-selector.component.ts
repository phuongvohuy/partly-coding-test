import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Manufacturer } from '../services/manufacturer/manufacturer.api.service';
import { ManufacturerService } from '../services/manufacturer/manufacturer.service';
import { Model } from '../services/models/models.api.service';
import { ModelService } from '../services/models/models.service';
import { Year } from '../services/years/years.api.service';
import { YearService } from '../services/years/years.service';

export interface MMYParameter {
	year: string,
	manufacturer: string,
	model: string
}

@Component({
  selector: 'mmy-selector',
  templateUrl: './mmy-selector.component.html',
  styleUrls: ['./mmy-selector.component.sass']
})
export class MmySelectorComponent implements OnInit {
	selectedYear: string = '';
	years: Array<Year> = [];

	manufaturers: Array<Manufacturer> = [];
	selectedManufacturer: string = '';

	models: Array<Model> = [];
	selectedModel: string = "";

	@Output() onDoneSelectorEvent = new EventEmitter<MMYParameter>();

  constructor(
		private yearService: YearService,
		private manufacturerService: ManufacturerService,
		private modelService: ModelService
	) { }

	private resetManufacurer() {
		this.manufaturers = [];
		this.selectedManufacturer = '';
	}

	private resetModel() {
		this.models = [];
		this.selectedModel = '';
	}

	private resetYears() {
		this.years = [];
		this.selectedYear = ''; 
	}

  ngOnInit(): void {
		this.manufacturerService.retrieveAllManufacturer().subscribe((result: Array<Manufacturer>) => {
			this.manufaturers = result;
		});
	}

	onManufacturerChange(e: any) {
		//reset models and years
		this.resetModel();
		this.resetYears();

		this.selectedManufacturer = e.value;
		this.modelService.retrieveModelsByManufacturer(this.selectedManufacturer).subscribe((result: Array<Model>) => {
			this.models = result;
		})
	}

	onModelChange(e: any) {
		//reset years
		this.resetYears();
		this.selectedModel = e.value;
		this.yearService.retrieveYearsByManufactorAndModel(this.selectedManufacturer, this.selectedModel)
			.subscribe((result: Array<Year>) => {
				this.years = result;
		})
	}
	
	onYearChange(e: any) {
		this.selectedYear = e.value;
		this.onDoneSelectorEvent.emit({
			year: this.selectedYear,
			manufacturer: this.selectedManufacturer,
			model: this.selectedModel,
		})
	}
}
