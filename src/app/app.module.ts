import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {VehicleSelectorComponent} from './vehicles-selector/vehicles-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { GraphQLModule } from './graphql.module';

// declare all services
import {ApiService} from './services/api.service';
import {YearsApiService} from './services/years/years.api.service';
import {YearService} from './services/years/years.service';
import {ManufacturerApiService} from './services/manufacturer/manufacturer.api.service';
import {ManufacturerService} from './services/manufacturer/manufacturer.service';
import {ModelApiService} from './services/models/models.api.service';
import {ModelService} from './services/models/models.service';
import { VehicleApiService } from './services/vehicles/vehicle.api.service';
import { VehicleService } from './services/vehicles/vehicle.service';
import { YmmSelectorComponent } from './ymm-selector/ymm-selector.component';
import { MmySelectorComponent } from './mmy-selector/mmy-selector.component';



@NgModule({
  declarations: [
		AppComponent,
		VehicleSelectorComponent,
		YmmSelectorComponent,
		MmySelectorComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		GraphQLModule,
		BrowserAnimationsModule,
		MatSliderModule,
		MatSelectModule,
		MatFormFieldModule,
		MatOptionModule,
		MatSliderModule,
		MatCheckboxModule,
		MatRadioModule,
		MatProgressSpinnerModule
  ],
  providers: [
		ApiService,
		YearsApiService,
		YearService,
		ManufacturerService,
		ManufacturerApiService,
		ModelApiService,
		ModelService,
		VehicleApiService,
		VehicleService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
