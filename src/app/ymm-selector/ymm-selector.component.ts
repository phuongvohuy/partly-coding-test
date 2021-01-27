import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { delay } from 'rxjs/operators';
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
	@Output() onShowLoader = new EventEmitter<boolean>();

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
		// trick to remove the error message when display loader which try to change value in the parent after it's checked
		await delay(100);
		this.onShowLoader.emit(true);
		this.years = await this.yearService.retrieveAllYears().toPromise();
		this.onShowLoader.emit(false);
	}

	async onYearChange(e: MatSelectChange) {
		this.onShowLoader.emit(true);
		this.selectedYear = this.years.find((item: Year) => item.id === e.value);
		
		// reset manufacturer and model
		this.resetManufacurer();
		this.resetModel();
		
		const year: number|undefined = this.selectedYear ? this.selectedYear.id : undefined;
		
		this.manufaturers = await this.manufacturerService.retrieveManufactureByYear(year).toPromise();

		this.onShowLoader.emit(false);

		// check if manufaturers has only one element, then trigger the onManufacturerChange flow.
		if(this.manufaturers.length === 1) {
			this.onManufacturerChange({value: this.manufaturers[0].id});
		}
	}

	async onManufacturerChange(e: MatSelectChange|{value: number}) {
		this.onShowLoader.emit(true);
		this.selectedManufacturer = this.manufaturers.find((item:Manufacturer) => item.id === e.value);
		this.resetModel();

		const year: number|undefined = this.selectedYear ? this.selectedYear.id : undefined;
		const manufacturer: number|undefined = this.selectedManufacturer ? this.selectedManufacturer.id: undefined;

		this.models = await this.modelService.retrieveModelsByYearAndManufacturer(year, manufacturer).toPromise();
		this.onShowLoader.emit(false);

		// check if models has only one element, then trigger the onModelChange flow.
		if(this.models.length === 1) {
			this.onModelChange({value: this.models[0].id});
		}
	}

	onModelChange(e: MatSelectChange|{value: number}) {
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
