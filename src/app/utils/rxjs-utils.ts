import { Observer, of} from 'rxjs';
import { map } from 'rxjs/operators';

export const collectObserver = (nextFun: Function, errFun?: Function, completeFun?: Function): Observer<Array<any>> => {
	let result: Array<any> = [];
	return {
		next: (item: any) => {
			let list = item;
			if(!Array.isArray(list)){
				list = [item]
			}
			result = result.concat(list);
		},
		error: (e: any) => {
			if(errFun) errFun();	
		},
		complete: () => {
			nextFun(result);
		}
	}
}

export const test = () => {
	const mapFun = (x: number, count: number) => {
		console.log('count ', count);
		return 2*x;
	}
	map(mapFun)(of(1, 2)).subscribe((item: number) => {
		
	});
}