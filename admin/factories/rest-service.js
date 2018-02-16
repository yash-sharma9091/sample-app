'use strict';
/*
to call all http methods*/


myapp.factory('RestSvr',function($http, $window, $httpParamSerializerJQLike, $q) {
	let baseUrl='/admin_api'
    return{
        login:(url,data)=>{
        	var req={
        		method:POST,
        		url:baseUrl+url,
        		data:data
        	}
        	return $q((resolve,reject)=>{
        		$http(req).then(function(response){
        			resolve(response)
        		})
        		.catch(function(response){
        			reject(response)
        		})
        	})
        },
        get:(url,params)=>{
        	req = {
					method: 'GET',
					url: baseUrl(apiUrl),
				 	params: p
				};
				return $q((resolve,reject)=>{
        		$http(req).then(function(response){
        			resolve(response)
        		})
        		.catch(function(response){
        			reject(response)
        		})
        	})
        },
         post:(url,data)=>{
        	req = {
					method: 'POST',
					url: baseUrl(apiUrl),
				 	data:data
				};
				return $q((resolve,reject)=>{
        		$http(req).then(function(response){
        			resolve(response)
        		})
        		.catch(function(response){
        			reject(response)
        		})
        	})
        },
        delete:(url,params)=>{
    	req = {
				method: 'DELETE',
				url: baseUrl(apiUrl),
			 	params:p
			};
			return $q((resolve,reject)=>{
    		$http(req).then(function(response){
    			resolve(response)
    		})
    		.catch(function(response){
    			reject(response)
    		})
    	})
    },
    put:(url,data)=>{
        	req = {
					method: 'PUT',
					url: baseUrl(apiUrl),
				 	data:data
				};
				return $q((resolve,reject)=>{
        		$http(req).then(function(response){
        			resolve(response)
        		})
        		.catch(function(response){
        			reject(response)
        		})
        	})
        }

    }
});

