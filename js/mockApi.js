class MockAPI {
	getFilters(url){
		this._makeAJAXCall(url).then((resp) => {
			return JSON.parse(resp).filters;
		})
		.catch((err) => {
			throw new Error(err);
		});
	}

	getProducts(url){
		this._makeAJAXCall(url).then((resp) => {
			return JSON.parse(resp).products;
		})
		.catch((err) => {
			throw new Error(err);
		});
	}

	_makeAJAXCall(url){
		return new Promise ((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.send();
			xhr.onreadystatechange = (e) => {
				let $this = e.target;
				if($this.readyState === 4 && $this.status === 200){
					if(!$this.responseText) reject("Server Down");
					resolve($this.responseText)
				}
			}
		});
	}
}

export default MockAPI;