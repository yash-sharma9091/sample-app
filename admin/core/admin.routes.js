'use strict';

/* Application routes */
myapp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
	 // the known route
    $urlRouterProvider.when('', '/');

    // For any unmatched url, send to 404
    //$urlRouterProvider.otherwise('/404');
 
    
	$stateProvider
	.state('login',{
		url: '/',
		controller: 'loginCtrl',
		templateUrl: '/login/views/login.html',
		authenticate: false,
		data: {pageTitle: 'Login'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                '/assets/css/admin-login-style.css'
		            ] 
		        });
		    }]
		},
	})
	.state('dashboard',{
		url: '/dashboard',
		controller: 'DashboardController',
		templateUrl: '/dashboard/views/dashboard.html',
		data: {pageTitle: 'Dashboard', smallTitle: 'dashboard & statistics'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'myapp',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                '/assets/global/plugins/morris/morris.css',                            
		                '/assets/global/plugins/morris/morris.min.js',
		                '/assets/global/plugins/morris/raphael-min.js',                            
		                '/assets/global/plugins/jquery.sparkline.min.js',
		                '/assets/pages/scripts/dashboard.min.js',
		            ] 
		        });
		    }]
		},
		authenticate: true
	})
	.state('404',{
		templateUrl: '/tpl/404.html',
		data: {pageTitle: '404 Page Not Found'},
		authenticate: false,
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'myapp',
		            insertBefore: '#ng_load_plugins_before',
		            files: [
		                '/assets/pages/css/error.min.css',
		            ] 
		        });
		    }]
		},
	})
	.state('500',{
		templateUrl: '/tpl/500.html',
		data: {pageTitle: '500 Internal Server Error'},
		authenticate: false,
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'myapp',
		            insertBefore: '#ng_load_plugins_before',
		            files: [
		                '/assets/pages/css/error.min.css',
		            ] 
		        });
		    }]
		},
	})

	.state('resetpassword',{
		url: '/resetpassword/:key',
		templateUrl: '/resetpassword/views/resetpassword.html',
		data: {pageTitle: 'Reset Password'},
		authenticate: false,
	    controller:'resetPasswordCtrl',
	    resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'myapp',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                '/assets/css/admin-login-style.css'
		            ] 
		        });
		    }]
		}
	});
}]);