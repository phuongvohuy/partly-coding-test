import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeScreen } from './home-screen/home-screen.component';
import {ManufacturerListScreenComponent} from './manufacturer-list-screen/manufacturer-list-screen.component';

const routes: Routes = [{
	path: '', component: HomeScreen	
}, {
	path: 'makes/localVehicle', component: ManufacturerListScreenComponent
}];

@NgModule({
  imports: [
		RouterModule.forRoot(routes),
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
