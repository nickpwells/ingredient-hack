app.directive('ingredientSubmit', function(){
	return {
		restrict: 'E',
		scope: {
			submit: '='
		},
		templateUrl: 'js/directives/ingredientSubmit.html'
	};
});