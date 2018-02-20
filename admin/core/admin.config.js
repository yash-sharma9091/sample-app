'use strict';


myapp.config(['$httpProvider',function($httpProvider){
	var interceptor=['$rootScope','loginSrv',function($rootScope,loginSrv){
        return {
            request: function(config) {
            	  var token = loginSrv.getToken();
                if (token ) {
                    config.headers['Authorization'] = "Bearer " + token;
                }
                return config;
            }
        }    
      
	}]
	$httpProvider.interceptors.push(interceptor);
}])
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}])
.config(['localStorageServiceProvider',function(localStorageServiceProvider){
    var prefix = 'localAdmin';
	localStorageServiceProvider.setPrefix('localAdmin')
}])
.run(['$location','$rootScope','loginSrv','$state','localStorageService',function($location,$rootScope,loginSrv,$state,localStorageService){

		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate  && !localStorageService.get('admin')){
                $state.go("login");
                event.preventDefault(); 
            }else {
                var token = localStorageService.get('token');
                if($location.path() === '/' && token ){
                    $location.path('/dashboard');
                }
            }
		});


 /* This will logout the admin from the application */

        $rootScope.clearToken = function () {
            localStorageService.remove('token');
            localStorageService.remove('admin');
            delete $rootScope.admin;
          $state.go("login");
        };

        // Set the admin for entire application
        $rootScope.token = localStorageService.get('token');
        if($rootScope.token){
            console.log('in token')
        }else{
            console.log('without token')
        }
        $rootScope.admin=localStorageService.get('admin')
}])

