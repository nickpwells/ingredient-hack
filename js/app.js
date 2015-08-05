$(document).ready(function() {
	var ingredientsArr = [];

	$("#ingredients").on('click', function(e){
		e.preventDefault();
		this.placeholder='';
	});

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

	$("#active-ingredients").on('click', '#active-ingredient', function(e){
		e.preventDefault();
		
		//removes item from ingredients array
		var index = $(this).index();
		ingredientsArr.splice(index, 1);
		console.log(ingredientsArr);
		$(this).remove();
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