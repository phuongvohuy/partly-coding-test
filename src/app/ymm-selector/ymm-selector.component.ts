import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Manufacturer } from '../services/manufacturer/manufacturer.api.service';
import { ManufacturerService } from '../services/manufacturer/manufacturer.service';
import { Model } from '../services/models/models.api.service';
import { ModelService } from '../services/models/models.service';
import { Year } from '../services/years/years.api.service';
import { YearService } from '../services/years/years.service';

export interface YMMParameter {
	year?: number,
	manufacturer?: number,
	model?: number
}

@Component({
  selector: 'ymm-selector',
  templateUrl: './ymm-selector.component.html',
  styleUrls: ['./ymm-selector.component.sass']
})
export class YmmSelectorComponent implements OnInit {
	selectedYear: Year|undefined = undefined;
	years: Array<Year> = [];

	manufaturers: Array<Manufacturer> = [];
	selectedManufacturer: Manufacturer|undefined = undefined;

	models: Array<Model> = [];
	selectedModel: Model|undefined = undefined;

	@Output() onDoneSelectorEvent = new EventEmitter<YMMParameter>();

  constructor(
		private yearService: YearService,
		private manufacturerService: ManufacturerService,
		private modelService: ModelService
	) {}

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
		this.years = await this.yearService.retrieveAllYears().toPromise();
		this.selectedYear = this.years.length > 1 ? this.years[0] : undefined;
	}

	async onYearChange(e: MatSelectChange) {
		this.selectedYear = this.years.find((item: Year) => item.id === e.value);
		
		// reset manufacturer and model
		this.resetManufacurer();
		this.resetModel();
		
		const year: number|undefined = this.selectedYear ? this.selectedYear.id : undefined;
		
		this.manufaturers = await this.manufacturerService.retrieveManufactureByYear(year).toPromise();
	}

	async onManufacturerChange(e: MatSelectChange) {
		this.selectedManufacturer = this.manufaturers.find((item:Manufacturer) => item.id === e.value);
		this.resetModel();

		const year: number|undefined = this.selectedYear ? this.selectedYear.id : undefined;
		const manufacturer: number|undefined = this.selectedManufacturer ? this.selectedManufacturer.id: undefined;

		console.log('selectedManufacturer ', this.selectedManufacturer);
		this.models = await this.modelService.retrieveModelsByYearAndManufacturer(year, manufacturer).toPromise();
		console.log('modelService >', this.models);
	}

	onModelChange(e: MatSelectChange) {
		this.selectedModel = this.models.find((item: Model) => item.id === e.value);
		
		const year: number|undefined = this.selectedYear ? this.selectedYear.id : undefined;
		const manufacturer: number|undefined = this.selectedManufacturer ? this.selectedManufacturer.id : undefined;
		const model: number|undefined = this.selectedModel ? this.selectedModel.id : undefined;

		this.onDoneSelectorEvent.emit({
			year,
			manufacturer,
			model,
		});
	}

}
