'use strict'
myapp.controller('loginCtrl',["$scope",'$rootScope','$state','loginSrv','RestSvr',function($scope,$rootScope,$state,loginSrv,RestSvr){

<<<<<<< HEAD
	console.log("loginctrl")
	$scope.submitForm=function(){
		// RestSvr.login('',$scope.user)
		// .then((response)=>{

		// })
		// .catch((error))
		console.log("user",$scope.user)
		loginSrv.setAdmin($scope.user,'asvffdfs')
		// loginSrv.initAdminSession($scope.user,'asvffdfs')
		console.log(loginSrv.getToken())
=======
		/**
		 * login function will authenticate user 
		 * and redirect to specific dashboard
		 * @param  {Boolean} isValid [Check if form is valid]
		 * @return {none}   [User will redirect to dashboard]
		 */
		$scope.login = (isValid) => {
			if( !isValid ){
				return;
			}
			$scope.isLoading = true;
			RestSvr.login('login', $scope.user)
			.then(response => {
				/* loginSrv will initialize user session
				 * and store user data into localStorage
				 * $rootScope.admin assign a globle variable
				 */
				loginSrv.initAdminSession(response.user, response.token);
				$state.go('dashboard');	
			})
			.catch(errors => {
				$scope.message = errors.message;
			})
			.then(() => {
				$scope.isLoading = false;
			});
		};

	   $scope.forgotpassword = () => {
	   	    $scope.isLoading = true;
	   	     let inputjson={email:$scope.email};
			$http.post('adminapi/forgotpassword', inputjson)
			.then(response => {
				App.alert({type: ('success'), icon: ( 'success'), message: response.data.message, container: $rootScope.settings.errorContainer, place: 'prepend', closeInSeconds: 5});
				$state.go('login');	
			})
			.catch(({data}) => {
				const {responsedata} = data;
				App.alert({type: ('danger'), icon: ( 'warning'), message: responsedata.message, container: $rootScope.settings.errorContainer, place: 'prepend', closeInSeconds: 5});
			})
			.then(() => {
				$scope.isLoading = false;
			});
	  };
>>>>>>> c7eae3b548a8da2c7a76ae39d151a9f95518a98d
	}


}])
