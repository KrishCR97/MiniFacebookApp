var app = angular.module("myApp",["ngRoute"]);

app.config(function($routeProvider){


$routeProvider.when('/',{
    templateUrl : '/login.html',
    controller : 'controller1'
}).when('/signup',{
templateUrl : '/signup.html',
controller : 'controller2'
})
});

app.controller("controller1",function($scope,$http){

$scope.checkLogin = function(){
$http.get("")
}
});
app.controller("controller2",function($scope){
$scope.createNewUser = function(){
    alert($scope.userName + " "+ $scope.password + " "+ $scope.firstName + " "+ $scope.lastName + " "+ $scope.email + " "+ $scope.phNum + " "+  $scope.location );
}
});