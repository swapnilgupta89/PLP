export class PriceFilter{
	constructor(filters){
		this.filters = filters[2];
	}
	create(id){
		//create filter here
	}
};

export class BrandFilter{
	constructor(filters){
		this.filters = filters[0];
	}
	create(id){
		//create filter here
	}
};

export class ColorFilter{
	constructor(filters){
		this.filters = filters[1];
	}
	create(id){
		const filterEls = this.filters.map((el) => {
			return `<label for=${el.title}></label><input type="checkbox" id=${el.title} value=${el.value}/>`;
		});
		document.getElementById(id).innerHTML = filterEls;
	}
};