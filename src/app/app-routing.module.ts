import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeScreen } from './home-screen/home-screen.component';
import {ManufactorListScreenComponent} from './manufactor-list-screen/manufactor-list-screen.component';

const routes: Routes = [{
	path: '', component: HomeScreen	
}, {
	path: 'makes/makeA', component: ManufactorListScreenComponent
}];

@NgModule({
  imports: [
		RouterModule.forRoot(routes),
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
