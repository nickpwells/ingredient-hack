$(document).ready(function() {

	var ingredientsArr = [];

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


	$.ajax({
	    url: 'https://webknox-recipes.p.mashape.com/recipes/findByIngredients', // The URL to the API. You can get this in the API page of the API you intend to consume
	    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
	    data: {"ingredients": "chicken", "number": "5"}, // Additional parameters here
	    dataType: 'json',
	    success: function(data) { 
	    	createRecipeThumbnail(data);
	     },
	    error: function(err) { alert(err); },
	    beforeSend: function(xhr) {
	    	xhr.setRequestHeader("X-Mashape-Authorization", "95cPWKn2s2mshrWZr7MapR0N7IKnp118VyEjsnHs22zu7SUara"); // Enter here your Mashape key
    	}
	});

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
		console.log(value);

		this.El = document.createElement("div")
		this.El.id = "recipe-thumb";


		this.img = document.createElement("img");
		this.img.className = "img-responsive img-thumbnail";
		this.img.src = value.image;

		this.El.appendChild(this.img);
	
		document.getElementById("recipe-display").appendChild(this.El);
	});
	

}