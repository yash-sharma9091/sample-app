'use strict';

myapp.controller('userViewCtrl',['$scope','RestSvr','$state','userSvr','user',function($scope,RestSvr,$state,userSvr,user){
    console.log("inside view controller")
    let id=$state.params.id;
    $scope.user_info=user.record.data; //get data by resolver
     $scope.goBack=()=>{
         $state.go('users')
     }

     $scope.goToEdit=()=>{
         $state.go('edit_User',{id:id})
        }

}])