'use strict'
myapp.controller('loginCtrl',["$scope",'$rootScope','$state','loginSrv','RestSvr',function($scope,$rootScope,$state,loginSrv,RestSvr){

	console.log("loginctrl")
	$scope.submitForm=function(){
		// RestSvr.login('',$scope.user)
		// .then((response)=>{

		// })
		// .catch((error))
		console.log("user",$scope.user)
		loginSrv.setAdmin($scope.user,'asvffdfs')
		// loginSrv.initAdminSession($scope.user,'asvffdfs')
		// console.log(loginSrv.getToken())

			// 		RestSvr.login('login', $scope.user)
			// .then(response => {
				
			// 	loginSrv.initAdminSession(response.user, response.token);
			// 	$state.go('dashboard');	
			// })
			// .catch(errors => {
			// 	$scope.message = errors.message;
			// })
			
		};


}])
