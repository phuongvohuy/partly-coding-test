import { Injectable } from "@angular/core";
import {ManufacturerApiService, Manufacturer} from './manufacturer.api.service';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class ManufacturerService {
	constructor(private manuApiService: ManufacturerApiService) {

	}

	public retrieveManufactureByYear(year?: number): Observable<Array<Manufacturer>> {
		const params = {
			uvdb_year_id: year
		}
		return this.manuApiService.queryAllMakes(params).pipe(
			map((data: any) => data.items as Array<Manufacturer>)
		)
	}

	public retrieveAllManufacturer(): Observable<Array<Manufacturer>> {
		return this.manuApiService.queryAllMakes({}).pipe(
			map((data: any) => data.items as Array<Manufacturer>)
		)
	}
}