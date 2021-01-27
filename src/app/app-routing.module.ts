import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleSelectorComponent } from './vehicles-selector/vehicles-selector.component';

const routes: Routes = [{
	path: '', component: VehicleSelectorComponent
}];

@NgModule({
  imports: [
		RouterModule.forRoot(routes),
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
