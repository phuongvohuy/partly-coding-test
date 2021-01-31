import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HomeScreen} from './home-screen/home-screen.component';
import { ManufacturerListScreenComponent } from './manufacturer-list-screen/manufacturer-list-screen.component';

import { GraphQLModule } from './graphql.module';

// declare all services
import {VehicleSelectorModule} from './vehicle-selector/vehicle-selector.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
		AppComponent,
		HomeScreen,
		ManufacturerListScreenComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		GraphQLModule,
		BrowserAnimationsModule,
		VehicleSelectorModule,

		MatFormFieldModule,
		MatSelectModule,
		MatOptionModule,
		MatSliderModule,
		MatCheckboxModule,
		MatRadioModule,
		MatProgressSpinnerModule
  ],
  providers: [
		
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
