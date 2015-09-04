$(document).ready(function() {

	var ingredientsArr = [];
	var obj;

	//removes the placeholder in the submit form
	$("#ingredients").on('click', function(e){
		e.preventDefault();
		this.placeholder='';
	});

	//adds ingredient to list
	$("button[type='submit']").click(function(e){
		e.preventDefault();
		var ingredient = $("#ingredients").val().toLowerCase();
		if (ingredient.length > 0) {
			ingredientsArr.push(ingredient);
			console.log(ingredientsArr);
			createIngredientButton(ingredient);
		}	
		$("#ingredients").val('');
	});

	$("button#submit-ingredients").click(function(e){
		e.preventDefault();
		$(".recipe-entry").toggle();
		getRecipeThumbs();
		console.log(obj);
	});

	//removes ingredient from list
	$("#active-ingredients").on('click', '#active-ingredient', function(e){
		e.preventDefault();
	
		//removes item from ingredients array
		var index = $(this).index();
		ingredientsArr.splice(index, 1);

		$(this).remove();
	});

	//clears all ingredients from list
	$("#clear").click(function(e){
		e.preventDefault();
		$("#active-ingredients").empty();
		ingredientsArr.length = 0;
	});

	$("#recipe-display").on('click', "#recipe-thumb", function(e){
		console.log(this.id);
		/*
		$.ajax({
		    url: 'https://webknox-recipes.p.mashape.com/recipes/'+id+'/information', // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    dataType: 'json',
		    success: function(data) { 
		    	
		     },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    	    	}
		});*/
		$("#recipeModal").modal();
	})

	function getRecipeThumbs () {
		$.ajax({
		    url: 'https://webknox-recipes.p.mashape.com/recipes/findByIngredients', // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {"ingredients": "[chicken, eggs, salt, pepper, garlic, asdlfkj]", "number": "20"}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) { 
		    	createRecipeThumbnail(data);
		    	obj = data;
		    	console.log(obj);
		     },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    	xhr.setRequestHeader("X-Mashape-Authorization", "95cPWKn2s2mshrWZr7MapR0N7IKnp118VyEjsnHs22zu7SUara"); // Enter here your Mashape key
	    	}

		});
	}	
});

function createIngredientButton (ingredient) {
	this.El = document.createElement("button");
	this.El.className = "btn btn-default btn-sm";
	this.El.id = "active-ingredient"
	var t = document.createTextNode(ingredient);
	this.El.appendChild(t);
	document.getElementById("active-ingredients").appendChild(this.El);
}

function createRecipeThumbnail (data) {

	$.each(data, function(index, value){
		this.El = document.createElement("div")
		this.El.id = "recipe-thumb";

		//add thumbnail image of recipe
		var img = document.createElement("img");
		img.className = "img-responsive img-thumbnail recipe-element";
		img.id = "recipe-image";
		img.src = value.image;
		this.El.appendChild(img);

		//add recipe title
		var title = document.createElement("h4");
		title.className = "recipe-element";
		title.id = "recipe-title";
		var titleText = document.createTextNode(value.title);
		title.appendChild(titleText);
		this.El.appendChild(title);

		//add missing ingredients
		var missed = document.createElement("h5");
		missed.className = "recipe-element";
		missed.id = "recipe-missed";
		var missedText = document.createTextNode("You need " + value.missedIngredientCount + " ingredients");
		missed.appendChild(missedText);
		this.El.appendChild(missed);

		document.getElementById("recipe-display").appendChild(this.El);
		recipeThumbHeight();

	});
}

//calculates the height of the children within the recipe div
function recipeThumbHeight () {
	var childrenHeight = 0

	$("#recipe-thumb:last-child").children(".recipe-element").each(function(){
		childrenHeight = childrenHeight + $(this).outerHeight(true);
	});

	return childrenHeight;
}

function getRecipe(id) {

	$.ajax({
	    url: 'https://webknox-recipes.p.mashape.com/recipes/'+id+'/information', // The URL to the API. You can get this in the API page of the API you intend to consume
	    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
	    dataType: 'json',
	    success: function(data) { 
	    	
	     },
	    error: function(err) { alert(err); },
	    beforeSend: function(xhr) {
	    	xhr.setRequestHeader("X-Mashape-Authorization", "95cPWKn2s2mshrWZr7MapR0N7IKnp118VyEjsnHs22zu7SUara"); // Enter here your Mashape key
    	}
	});
}