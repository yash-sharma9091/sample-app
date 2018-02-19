'use strict';
/*
to call all http methods*/


myapp.factory('RestSvr',function($http, $window, $httpParamSerializerJQLike, $q) {
    return{
        login:(url,data)=>{
        	var req={
        		method:'POST',
        		url:baseUrl(url),
        		data:data
        	}
        	return $q((resolve,reject)=>{
        		$http(req).then(function(response){
        			resolve({
                            result: response.data.message, 
                            user: response.data.data,
                            token: response.data.token
                    })
        		})
        		.catch(function(response){
                    console.log(response)
        			reject({
                            errors: true,
                            message: response.data.message || 'Internal Server Error',
                    })
        		})
        	})
        },
        get:(url,params)=>{
            let p = !angular.isUndefined(params) ? params : null,
        	 req = {
					method: 'GET',
					url: baseUrl(url),
				 	params: p
				};
				return $q((resolve,reject)=>{
        		$http(req).then(function(response){
        			resolve({
                        record: response.data
                    })
        		})
        		.catch(function(response){
        			reject({
                        errors: true,
                        message: response.data.message || 'Internal Server Error',
                    })
        		})
        	})
        },
         post:(url,data)=>{
        	req = {
					method: 'POST',
					url: baseUrl(url),
				 	data:data
				};
				return $q((resolve,reject)=>{
        		$http(req).then(function(response){
        			resolve({
                        result: response.data.message, 
                        user: response.data.data,
                        records: response.data.result
                    })
        		})
        		.catch(function(response){
        			reject({
                        message: response.data.message || 'Internal Server Error',
                        status: response.data.status
                    })
        		})
        	})
        },
        delete:(url,params)=>{
    	req = {
				method: 'DELETE',
				url: baseUrl(url),
			 	params:p
			};
			return $q((resolve,reject)=>{
    		$http(req).then(function(response){
    			resolve({
                    record: response.data
                })
    		})
    		.catch(function(response){
    			reject({
                     errors: true,
                    message: response.data.message || 'Internal Server Error',
                })
    		})
    	})
    },
    put:(url,data)=>{
        	req = {
					method: 'PUT',
					url: baseUrl(url),
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

function baseUrl(apiUrl) {
    return  '/admin_api/' + apiUrl;
}

