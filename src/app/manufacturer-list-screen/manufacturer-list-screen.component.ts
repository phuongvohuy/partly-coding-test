import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Manufacturer } from '../vehicle-selector/services/api/manufacturer.api.service';
import { Model } from '../vehicle-selector/services/api/models.api.service';
import { Vehicle } from '../vehicle-selector/services/api/vehicle.api.service';
import { VehicleService } from '../vehicle-selector/services/api/vehicle.service';
import { Year } from '../vehicle-selector/services/api/years.api.service';
import { MMYLocalSelectorRule } from '../vehicle-selector/services/rule-selector/mmy-local-selector.service';
import { NameSelectorParams, NameSelectorParamsHelper } from '../vehicle-selector/services/rule-selector/rule-selector.service';
import { MAKE_NAME_SELECTOR, MODEL_NAME_SELECTOR, YEAR_NAME_SELECTOR } from '../vehicle-selector/services/rule-selector/ymm-selector-rule.service';

const MMY: string = 'mmy';
const YMM: string = 'ymm';

@Component({
  selector: 'manufacturer-list-screen',
  templateUrl: './manufacturer-list-screen.component.html',
  styleUrls: ['./manufacturer-list-screen.component.sass']
})
export class ManufacturerListScreenComponent implements OnInit {

  isShowLoader: boolean|undefined;
	vehicles: Array<Vehicle> | undefined;

	selectedSelector: string = MMY;	//default value is MMY
	
	constructor(
		private vehicleService: VehicleService, 
		public mmyLocalRule: MMYLocalSelectorRule ) {
			this.selectedSelector = MMY;
		}

	ngOnInit() {
		this.isShowLoader = false;
	}

	onShowLoader(isShow: boolean) {
		this.isShowLoader = isShow;
	}

	//handle event from MMY/YMM selectors component
	async onFinishedSelector(data: Array<NameSelectorParams>) {
		this.onShowLoader(true);
		const year: Year = NameSelectorParamsHelper.retrieveSelectedValueByName(data, YEAR_NAME_SELECTOR) as Year;
		const manufacturer: Manufacturer = NameSelectorParamsHelper.retrieveSelectedValueByName(data, MAKE_NAME_SELECTOR) as Manufacturer;
		const model: Model = NameSelectorParamsHelper.retrieveSelectedValueByName(data, MODEL_NAME_SELECTOR) as Model;

		console.log('onFinishedSelector ', year, manufacturer, model);

		this.vehicles = await this.vehicleService.retrieveManufactureByYear(year.id, manufacturer.id, model.id).toPromise();

		this.onShowLoader(false);
	}

	onChangeSelector(e: MatRadioChange) {
		this.selectedSelector = e.value;
		this.vehicles = undefined;	//reset vehicle searching data
	}

}
