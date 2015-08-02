$(document).ready(function() {
	var ingredientsArr = [];

	$("#ingredients").on('click', function(e){
		e.preventDefault();
		this.placeholder='';
	});

	$("button[type='submit']").click(function(e){
		e.preventDefault();
		var ingredient = $("#ingredients").val();
		if (ingredient.length > 0) {
			ingredientsArr.push(ingredient);
			createIngredientButton(ingredient);
		}	
		$("#ingredients").val('');
	});

	$("#ingredient-display").on('click', "#active-ingredient", function(e){
		e.preventDefault();
		$(this).remove();
		console.log('test');
	});


});

function createIngredientButton (ingredient) {
	this.El = document.createElement("button");
	this.El.className = "btn btn-default btn-sm";
	this.El.id = "active-ingredient"
	var t = document.createTextNode(ingredient);
	this.El.appendChild(t);
	document.getElementById("ingredient-display").appendChild(this.El);
}