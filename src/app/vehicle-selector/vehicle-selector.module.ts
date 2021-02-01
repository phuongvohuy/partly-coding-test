import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ManufacturerApiService} from './services/api/manufacturer.api.service';
import {ModelApiService} from './services/api/models.api.service';
import {VehicleApiService} from './services/api/vehicle.api.service';
import {YearsApiService} from './services/api/years.api.service';
import {VehicleService} from './services/api/vehicle.service';

import {
	ModelServiceSelectorItem,
	YearServiceSelectorItem,
	ManufacturerServiceSelectorItem,
} from './services/item-selector/item-selector.service';

import { YMMSelectorRule, YMMSelectorFactory} from './services/rule-selector/ymm-selector-rule.service';
import { MMYSelectorFactory, MMYSelectorRule } from './services/rule-selector/mmy-selector.service';


import {VehicleSelectorComponent} from './vehicle-selector/vehicle-selector.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MMYLocalSelectorFactory, MMYLocalSelectorRule } from './services/rule-selector/mmy-local-selector.service';
import { HttpClient } from '@angular/common/http';

import {VehicleDataService} from '../vehicle-data.service';


@NgModule({
  declarations: [
		VehicleSelectorComponent
	],
  imports: [
		CommonModule,
		MatFormFieldModule,
		MatSelectModule,
		MatOptionModule,
		MatSliderModule,
		MatCheckboxModule,
		MatRadioModule,
		MatProgressSpinnerModule
	],
	providers: [
		ManufacturerApiService,
		ModelApiService,
		VehicleApiService,
		YearsApiService,
		VehicleService,

		ModelServiceSelectorItem,
		YearServiceSelectorItem,
		ManufacturerServiceSelectorItem,
		
		{
			provide: YMMSelectorRule, 
			useFactory: YMMSelectorFactory, 
			deps: [YearsApiService, ManufacturerApiService, ModelApiService]
		},
		{
			provide: MMYSelectorRule,
			useFactory: MMYSelectorFactory,
			deps: [YearsApiService, ManufacturerApiService, ModelApiService]
		},
		{
			provide: MMYLocalSelectorRule,
			useFactory: MMYLocalSelectorFactory,
			deps: [HttpClient, VehicleDataService]
		}
	],
	exports: [
		VehicleSelectorComponent
	]
})
export class VehicleSelectorModule { }
