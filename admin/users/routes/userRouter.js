'use strict';

myapp.config(['$stateProvider',function($stateProvider){

	let userResolver = {
		user: ['userSvr', '$stateParams', (userSvr, $stateParams) => userSvr.getUser($stateParams.id)]
	};
	$stateProvider
	.state('users',{
		url: '/users',
		controller: 'userCtrl',
		templateUrl: '/users/views/userListing.html',
		data: {pageTitle: 'User Listing'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'myapp',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                
		                '/assets/global/plugins/datatables/datatables.min.css', 
                        '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                        '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

                        '/assets/global/plugins/datatables/datatables.all.min.js',
                        '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '/assets/global/scripts/datatable.min.js',
		            ] 
		        });
		    }]
		},
		authenticate: true
	})
	.state('new_User',{
		url: '/new-user',
		controller: 'userAddCtrl',
		templateUrl: '/users/views/new_user.html',
		data: {pageTitle: 'Add New User'},
		authenticate: true
	})
	.state('view_User',{
		url: '/view-user/:id',
		controller: 'userViewCtrl',
		templateUrl: '/users/views/view_user.html',
		data: {pageTitle: 'User Info'},
		authenticate: true,
		resolve:userResolver
	})
	.state('edit_User',{
		url: '/edit-user/:id',
		controller: 'userEditCtrl',
		templateUrl: '/users/views/edit_user.html',
		data: {pageTitle: 'User Edit'},
		authenticate: true,
		resolve:userResolver
	})


}])