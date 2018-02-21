'use strict';
myapp.controller('userAddCtrl', ['$scope', '$state', '$rootScope', 'Upload','appSvr','RestSvr',
	function($scope, $state, $rootScope, Upload, appSvr,RestSvr){
	
		$scope.formSubmit = function () {
			console.log($scope.new_user)
			RestSvr.post('add-user', $scope.new_user)
			.then(function (response) {
				$state.go('users');
			})
			.catch(function (error) {
				console.log(error)
			})
			
		};

}])