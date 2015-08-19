(function() {
	"use strict";
	
	angular.module("orgExplorer.services", [])
	.factory("orgService", ["$rootScope", "$http", "$q", "adalAuthenticationService", function ($rootScope, $http, $q, adalService) {
		var orgService = {};
		
		orgService.getUser = function(path) {
			var deferred = $q.defer();
			
			//setup response
			var user = { user: null, manager: null, directReports: null };
			
			//get the user
			$http.get("https://graph.microsoft.com/beta/" + path).then(function(r) { 
				user.user = r.data;
				if (user.user !== null && user.manager !== null && user.directReports !== null)
					deferred.resolve(user); 
			});
			//get the manager
			$http.get("https://graph.microsoft.com/beta/" + path + "/manager").then(function(r) { 
				user.manager = r.data;
				if (user.user !== null && user.manager !== null && user.directReports !== null)
					deferred.resolve(user); 
			}, function(er) {
				user.manager = {};
				if (user.user !== null && user.manager !== null && user.directReports !== null)
					deferred.resolve(user); 
			});
			//get the directReports
			$http.get("https://graph.microsoft.com/beta/" + path + "/directReports").then(function(r) { 
				user.directReports = r.data;
				if (user.user !== null && user.manager !== null && user.directReports !== null)
					deferred.resolve(user); 
			});
				
			return deferred.promise;
		};
		
		return orgService;
	}]);
	
	angular.module("orgExplorer.controllers", [])
	.controller("loginCtrl", ["$scope", "$location", "adalAuthenticationService", "orgService", function ($scope, $location, adalService, orgService) {
		if (adalService.userInfo.isAuthenticated) {
			$location.path("/user");
		}
		
		$scope.login = function() {
			adalService.login();	
		};
	}])
	.controller("meCtrl", ["$scope", "orgService", function ($scope, orgService) {
		orgService.getUser("me").then(function(d) { 
			$scope.data = d; 
		});
	}])
	.controller("userCtrl", ["$scope", "$routeParams", "orgService", function ($scope, $routeParams, orgService) {
		orgService.getUser("myorganization/users/" + $routeParams.id).then(function(d) { 
			$scope.data = d; 
		});
	}]);
	
	angular.module("orgExplorer", ["ngRoute", "orgExplorer.services", "orgExplorer.controllers", "AdalAngular"])
	.config(["$routeProvider", "$httpProvider", "adalAuthenticationServiceProvider", function ($routeProvider, $httpProvider, adalProvider) {
		$routeProvider.when("/login", {
			controller: "loginCtrl",
			templateUrl: "/app/templates/view-login.html",
			requireADLogin: false
		})
		.when("/user", {
			controller: "meCtrl",
			templateUrl: "/app/templates/view-user.html",
			requireADLogin: true
		})
		.when("/user/:id", {
			controller: "userCtrl",
			templateUrl: "/app/templates/view-user.html",
			requireADLogin: true
		})
		.otherwise({ redirectTo: "/login" });
	
		adalProvider.init({
			instance: "https://login.microsoftonline.com/",
			tenant: "dxdemos.onmicrosoft.com",
			clientId: "0fe23ba5-f632-4a93-a898-b6b42adbfe2b",
			endpoints: {
				"https://graph.microsoft.com/": "https://graph.microsoft.com"
			}
		}, $httpProvider);
	}]);
})();