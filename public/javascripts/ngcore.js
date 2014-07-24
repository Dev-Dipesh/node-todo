(function() {
	var scotchTodo = angular.module('scotchTodo', []);

	scotchTodo.controller('mainController', ['$http', '$scope', function($http, $scope) {
		$scope.formData = {};

		// when landing on page, get all todos and show them
		$http.get('/api/todos')
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});

		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			$http.post('/api/todos', $scope.formData)
				.success(function(data) {
					// Clear the form so our user can enter another
					$scope.formData = {};
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$http.delete('/api/todos/' + id)
				.success(function(data) {
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
	}]);
})();