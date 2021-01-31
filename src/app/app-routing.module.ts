import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeScreen } from './home-screen/home-screen.component';

const routes: Routes = [{
	path: '', component: HomeScreen
}];

@NgModule({
  imports: [
		RouterModule.forRoot(routes),
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
