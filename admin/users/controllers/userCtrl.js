'use strict';
myapp.controller('userCtrl', ['$scope', '$state', '$rootScope', 'Upload','appSvr','RestSvr',
	function($scope, $state, $rootScope, Upload, appSvr,RestSvr){
		
		$scope.$on('$viewContentLoaded', function() {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();

		    /**
		     * only Intialize datatable if current state is users
		     * @param  {String} $state.current.name [current state name]
		     */
		
			    // Intialize datatable
			    TableAjax.init({
			    	url: 'view-user',
			    	columns: [
		                { "data": "id", "orderable": false },
		                { "data": "username" },
		                { "data": "mobile" },
		                { "data": "email" },  
		                { "data": "status" },
		                { "data": "action"}
		              
		            ]
			    });
			   
		});

		$scope.formSubmit = function () {
			console.log($scope.new_user)
			RestSvr.post('add-user', $scope.new_user)
			.then(function (response) {
				$state.go('users');
			})
			.catch(function (error) {
				console.log(error)
			})
			.finally(function () {
				$scope.isLoading = false;
			});
		};

}])