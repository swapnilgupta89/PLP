window.onload =  function(){
  var productPromise = factory.getJSONData("http://demo1853299.mockable.io/products"),
      filterPromise =  factory.getJSONData("http://demo1853299.mockable.io/filters"),
      products;
  productPromise.then(function(data){
    products = factory.getProducts(data);
    factory.displayProdcuts(products);
    displayData = products;
  });
  filterPromise.then(function(data){
    filters = factory.getFilters(data);
    factory.displayFilters(filters);
    factory.addListenersToCheckBoxes();
  });


};

var factory = {
  getJSONData: function(url){
    var promise = new Promise(function(resolve, reject){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        //console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
          if(typeof(this.responseText) !== "undefined"){
            resolve(this.responseText);
          }
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    });
    return promise;
  },
  getProducts: function(data){
    try{
      var jsonObj = JSON.parse(data),
          products = (typeof jsonObj.products !== "undefined") ? jsonObj.products : [];
      return products;
    }
    catch(e){
      return [];
    }
  },
  getFilters: function(data){
    try{
      var jsonObj = JSON.parse(data),
          filters = (typeof jsonObj.filters !== "undefined") ? jsonObj.filters : [];
      return filters;
    }
    catch(e){
      return [];
    }
  },
  displayProdcuts: function(productsArray){
    if(typeof productsArray !== "undefined"){
      var html = "";
      for(var i=0; i<productsArray.length; i++){
          html += factory.createTile(productsArray[i]);
      }
    }
    var productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = html;
  },
  createTile: function(arrayElement){
    var html = "<div class='tile' data-id=" + arrayElement["id"] + ">\
                  <img src='" + arrayElement["image"] + "' alt='"+ arrayElement["title"]  +"'/>'\
                  <p>" + arrayElement["title"] + "</p>\
                  <p>" + arrayElement["rating"] + "</p>\
                  <p>\
                    <span class='final_price'>" + arrayElement["price"]["final_price"] + "</span>\
                    <span class='mrp'>" + ((typeof arrayElement["price"]["mrp"] !== "undefined")? arrayElement["price"]["mrp"]: "")  + "</span>\
                    <span class='discount'>" + arrayElement["discount"] + "% off</span>\
                  </p>\
              </div>";
    return html;
  },
  displayFilters: function(filtersArray){
    if(typeof filtersArray !== "undefined"){
      console.log(filtersArray);
      for(var i=0; i<filtersArray.length; i++){
        var valueArray = filtersArray[i].values;
        switch(filtersArray[i].type){
          case "BRAND": factory.displayBrandFilter(valueArray);break;
          case "COLOUR": factory.displayColourFilter(valueArray);break;
          case "PRICE": factory.displayPriceFilter(valueArray);break;
        }
      }
    }
  },
  displayBrandFilter: function(valueArray){
    //console
  },
  displayColourFilter: function(valueArray){
    if(typeof valueArray !== "undefined"){
      var html = "";
      for(var i=0; i<valueArray.length; i++){
        html += factory.createColorField(valueArray[i]);
      }
      var colourContainer = document.querySelector(".color-filter-container");
      colourContainer.innerHTML = html;
    }
  },
  createColorField: function(arrayElement){
    var html = "<div class='color-container'>\
                  <input type='checkbox' id= '" + arrayElement["title"] + "'/>\
                  <label for=" + arrayElement["title"] + ">" + arrayElement["title"] + "</label>\
                </div>";
    return html;
  },
  displayPriceFilter: function(valueArray){
    if(typeof valueArray !== "undefined"){
      var minPrice = document.getElementById("min-price"),
          maxPrice = document.getElementById("max-price");
      minPrice.innerHTML = factory.createDropDownOptions("min", valueArray);
      maxPrice.innerHTML = factory.createDropDownOptions("max", valueArray);
    }
  },
  createDropDownOptions: function(dropDown, valueArray){
    if(typeof valueArray !== "undefined"){
      var html = "";
      switch (dropDown) {
        case "min": return factory.createHTMLForDropDown(0, valueArray.length - 1, valueArray);break;
        case "max": return factory.createHTMLForDropDown(1, valueArray.length, valueArray);break;
      }
    }
  },
  createHTMLForDropDown: function(min, max, valueArray){
    var html = "", selected;
    if(min==0)
      selected=0;
    if(max==valueArray.length)
      selected=max-1;
    for(var i=min; i<max; i++){
      if(i === selected){
        html += "<option value=" + valueArray[i]["key"]+" selected='selected'>" +  valueArray[i]["displayValue"] + "</option>";
      }
      else html += "<option value=" + valueArray[i]["key"]+">" +  valueArray[i]["displayValue"] + "</option>";
    }
    return html;
  },
  addListenersToCheckBoxes: function(){
    var checkBoxes =  document.querySelectorAll("input[type=checkbox]");
    for(var i = 0; i< checkBoxes.length; i++){
      checkBoxes[i].addEventListener("click", function(e){
        var checkBox = e.target;
        var colourId = checkBox.getAttribute("id");
        factory.filterData();

      });
    }

  },
  filterData: function(){
    var checkBoxes =  document.querySelectorAll("input[type=checkbox]"), checkBoxArr=[];
    for(var i = 0; i< checkBoxes.length; i++){
        if(checkBoxes[i].checked){
            checkBoxArr.push(checkBoxes[i].getAttribute("id"));
        }
    }
    var dataToDisplay = displayData.filter(function(element){
      for(var i=0; i<checkBoxArr.length;i++){
        if(element["colour"]["title"] === checkBoxArr[i]){
          return true;
        }
      }
    });
    factory.displayProdcuts(dataToDisplay);
  }
};
