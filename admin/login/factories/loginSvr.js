'use strict';

/*this login Srvice will be calles in login controller */
myapp.factory('loginSrv',['localStorageService', '$rootScope',function(localStorageService,$rootScope){
	return {
			setAdmin:function(admin,token){
				localStorageService.set('admin',admin); 
				localStorageService.set('token',token);
			},
			updateAdminSession: function(admin, token) { 
				$rootScope.admin = localStorageService.get('admin');
			},
			getToken:function(){
				return localStorageService.get('token');
			}
	}
}]);