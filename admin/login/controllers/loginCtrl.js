'use strict'
myapp.controller('loginCtrl',["$scope",'$rootScope','$state','loginSrv','RestSvr',function($scope,$rootScope,$state,loginSrv,RestSvr){

	console.log("loginctrl",$scope.user)
	$scope.submitForm=function(){
		RestSvr.login('login', $scope.user)
			.then(response => {
				console.log(response)
			loginSrv.setAdmin(response.user, response.token);
			$state.go('dashboard');	
			})
			.catch(errors => {
				$scope.message = errors.message;
			})
		};


}])
