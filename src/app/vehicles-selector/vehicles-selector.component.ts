import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Vehicle } from '../services/vehicles/vehicle.api.service';
import { VehicleService } from '../services/vehicles/vehicle.service';
import { YMMParameter } from '../ymm-selector/ymm-selector.component';

const MMY: string = 'mmy';
const YMM: string = 'ymm';

@Component({
  selector: 'vehicles-selector',
  templateUrl: './vehicles-selector.component.html',
  styleUrls: ['./vehicles-selector.component.sass']
})
export class VehicleSelectorComponent implements OnInit {
	isShowLoader: boolean|undefined;
	vehicles: Array<Vehicle> | undefined;

	selectedSelector: string = MMY;	//default value is MMY
	
	constructor(private vehicleService: VehicleService) {}

	ngOnInit() {
		this.isShowLoader = false;
	}

	onShowLoader(isShow: boolean) {
		this.isShowLoader = isShow;
	}

	// handle event from MMY/YMM selectors component
	async onFinishedSelector(params: YMMParameter) {
		this.onShowLoader(true);
		const { year, manufacturer, model} = params

		console.log('onFinishedSelector >> ', year, manufacturer, model);

		this.vehicles = await this.vehicleService.retrieveManufactureByYear(year, manufacturer, model).toPromise();

		this.onShowLoader(false);
	}

	onChangeSelector(e: MatRadioChange) {
		this.selectedSelector = e.value;
		this.vehicles = undefined;	//reset vehicle searching data
	}

}
