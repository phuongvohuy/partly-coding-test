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
	vehicles: Array<Vehicle> | undefined;

	selectedSelector: string = MMY;	//default value is MMY
	
	constructor(private vehicleService: VehicleService) {
		
	}

	ngOnInit() {

	}

	// handle event from MMY/YMM selectors component
	onFinishedSelector(params: YMMParameter) {
		const { year, manufacturer, model} = params

		console.log('onFinishedSelector >> ', year, manufacturer, model);

		this.vehicleService.retrieveManufactureByYear(year, manufacturer, model).subscribe((result: Array<Vehicle>) => {
			this.vehicles = result;
		});	
	}

	onChangeSelector(e: MatRadioChange) {
		this.selectedSelector = e.value;
		this.vehicles = undefined;	//reset vehicle searching data
	}

}
