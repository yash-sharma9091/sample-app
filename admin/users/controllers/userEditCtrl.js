'use strict';

myapp.controller('userEditCtrl',['$state','RestSvr','$scope','appSvr','user',function($state,RestSvr,$scope,appSvr,user){
    $scope.$on('$viewContentLoaded', function() {
        /**
         * Initialize the jquery components when view contents loaded properly
         */
        appSvr.init();
    });

    $scope.new_user=user.record.data;
    let id=$state.params.id;
    $scope.formSubmit=function(){
        RestSvr.put(`edit-user/${id}`,$scope.new_user)
        .then((response)=>{
            $state.go('users');
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
   
   
}])