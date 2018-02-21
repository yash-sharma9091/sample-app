'use strict';

myapp.factory('userSvr', ['RestSvr', (RestSvr) => {
    return {
        getUser: (id) => RestSvr.get(`get-user/${id}`)
       
    };
}]);