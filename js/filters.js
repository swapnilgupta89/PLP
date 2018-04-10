import config from './config';
import MockAPI from './mockApi';

const mockApi = new MockAPI();

export class ColorFilter{
	constructor(id){
		this.id = id;
	}
	async create(){
		this.filters = await mockApi.getFilters(config.filters);
		this._create(this.filters[1].values);
	}
	_create(colorFilters){
		const filterEls = colorFilters.map((el) => {
			return `<label for=${el.title}>${el.title}</label><input type="checkbox" id=${el.title} value=${el.color}/>`;
		});

		document.getElementById(this.id).innerHTML = filterEls;
		
		this._attachEvents();
	}

	_attachEvents(){
		//attach events to this.id
	}
};