// script.js

var textApp = angular.module('textApp', ['ngRoute']);

textApp.config(function($routeProvider) {

	$routeProvider

		.when('/', {
			templateUrl : 'postList.html',
			controller  : 'PostController'
		})

		.when('/add', {
			templateUrl : 'add.html',
			controller  : 'AddPost'
		})

		.when('/edit/:id', {
			templateUrl : 'edit.html',
			controller  : 'EditPost'
		})
});

textApp.controller('mainController', function($scope) {
});

textApp.controller('PostController', function($scope, $http) {

	//function to search the posts that have the searchText value in his text. I call the solr services to get the list
	$scope.searchPosts = function() {

		$scope.searchText = $scope.searchText != null && $scope.searchText != undefined ? $scope.searchText : "";

		//var searchPosts = $http.get("http://localhost:8983/solr/textdb/select?q=text%3A*" + $scope.searchText + "*&wt=json&indent=true");
		var searchPosts = $http.get("api/v1/getAll");

		searchPosts.success(function(data, status, headers, config) {
			console.log(data);
			$scope.posts = data;
		});
		searchPosts.error(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			alert("AJAX failed!");
		});
	};

	//At the start I call explicitly the function searchPosts, that call solr with searchText = empty. In this manner I obtain alla the posts
	$scope.searchPosts();

});

textApp.controller('AddPost', function($scope, $http, $location) {
	$scope.addPost = function() {

		var json = {
			title : $scope.title,
			text : $scope.text
		};

		var responsePromise = $http({
			method: 'POST',
			url: 'api/v1/addNewPost',
			data: json,
			headers: {'Content-Type': 'application/json'}
		});

		responsePromise.success(function(data, status, headers, config) {
			$location.path('/');
		});

		responsePromise.error(function(data, status, headers, config) {
			alert("AJAX failed!");
		});

	};
});

textApp.controller('EditPost', function($scope, $http, $location, $routeParams) {

	//I do a get to obtain the information to insert into the edit page
	var responsePromise = $http.get("api/v1/" + $routeParams.id);

	responsePromise.success(function(data, status, headers, config) {
		console.log("data", data);
		$scope.post = data[0];
		console.log($scope.post);
	});
	responsePromise.error(function(data, status, headers, config) {
		alert("AJAX failed!");
	});

	$scope.open = function(post) {
		$location.path("#/edit/" + post.id);
	};

	$scope.editPost = function() {

		var json = {
			title : $scope.post.title,
			text : $scope.post.text
		};

		console.log("id", $scope.post);

		var responsePromise = $http({
			method: 'POST',
			url: 'api/v1/' + $scope.post._id + '/update',
			data: json,
			headers: {'Content-Type': 'application/json'}
		});

		responsePromise.success(function(data, status, headers, config) {
			$location.path('/');
		});

		responsePromise.error(function(data, status, headers, config) {
			alert("AJAX failed!");
		});

	};

});
