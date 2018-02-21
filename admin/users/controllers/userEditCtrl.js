'use strict';

myapp.controller('userEditCtrl',['$state','RestSvr','$scope','appSvr','user',function($state,RestSvr,$scope,appSvr,user){
    $scope.$on('$viewContentLoaded', function() {
        /**
         * Initialize the jquery components when view contents loaded properly
         */
        appSvr.init();
    });
    $scope.new_user=user.record.data;

    if($scope.new_user.isDeleted){
        $scope.new_user.status='delete'
    }
    
   
    let id=$state.params.id;
    $scope.formSubmit=function(){
        if($scope.new_user.status=='delete'){
            $scope.new_user.isDeleted=true;
            $scope.new_user.status=false;
        }
        RestSvr.put(`edit-user/${id}`,$scope.new_user)
        .then((response)=>{
            $state.go('users');
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
   
   
}])