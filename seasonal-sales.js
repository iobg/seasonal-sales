var categories;
var products;
var storedProducts;
var XHL = function(){
var myProductRequest = new XMLHttpRequest();
var myCategoryRequest = new XMLHttpRequest();

myCategoryRequest.addEventListener("load", loadCategories);
myProductRequest.addEventListener("load", loadProducts);


myProductRequest.open("GET", "products.json");
myProductRequest.send();
myCategoryRequest.open("GET","categories.json");
myCategoryRequest.send();
}();


function loadCategories(){
	categories = JSON.parse(event.target.responseText).categories;
	var seasonSelect = document.getElementById("season-select");
	
	categories.forEach(function(category){
	seasonSelect.innerHTML += "<option value='"+category.id+"'>" + category.season_discount + " -"+ category.discount + "</option>";
	
	});
	seasonSelect.addEventListener("change", function(){
		 
		calculateDiscount(products);
	});
	
}

function loadProducts(){
	 products = JSON.parse(event.target.responseText).products;
	 
	 writeProducts(products);
	
}


function writeProducts(prod){
	var productPage = document.getElementById("products");
	productPage.innerHTML="";
	prod.forEach(function(product){
		productPage.innerHTML+="<div class='product'>"+ product.name +" "+product.price + "</div>";
	});
	var reloader = new XMLHttpRequest();
	reloader.addEventListener("load", function(){
	products=JSON.parse(event.target.responseText).products;
});
	reloader.open("GET", "products.json");
	reloader.send();
	

}
function calculateDiscount(prod){
	console.log(event.target.value);
	for(i=0;i<prod.length;i++){
		
		if(prod[i].category_id == event.target.value){
			prod[i].price -= prod[i].price*categories[event.target.value-1].discount;
			prod[i].price =prod[i].price.toFixed(2);
			
		}

		
			
		
	}
	writeProducts(prod);
}
