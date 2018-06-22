var app = angular.module("myApp", ["ngRoute"]);
localStorage.isLoggedIn = false;

app.config(function ($routeProvider) {


    $routeProvider.when('/', {
        templateUrl: '/login.html',
        controller: 'loginController'
    }).when('/signup', {
        templateUrl: '/signup.html',
        controller: 'signUpController'
    }).when('/profile',{
        templateUrl: '/profile.html',
        controller: 'profileController',
        resolve : ['authService',function(authService){
            return authService.checkUserStatus();
        }]
    }).when('/messages',{
        templateUrl: '/messages.html',
        controller: 'messagesController',
        resolve : ['authService',function(authService){
            return authService.checkUserStatus();
        }]
    })
});
var loginDetails = {
    userName: '',
    password: ''
}
app.factory("authService",function($http,$q){
    return {
        'checkUserStatus' : function(){
            var defer = $q.defer();
            $http.post("http://localhost:3000/loginValidation", JSON.stringify(loginDetails)).then((data) => {
            console.log(data);
            defer.resolve();
            if (data.data.validUser) {
                //localStorage.isLoggedIn = true;
                defer.resolve();
            } else {
                //localStorage.isLoggedIn = false;
                defer.reject();
            }
        });
        return defer.promise;
        }
    }

});

app.controller("loginController", function ($scope, $http) {


    $scope.checkLogin = function () {
        // var loginDetails = {
        //     userName: $scope.userName,
        //     password: $scope.password
        // }
        //if($scope.userName &&  $scope.password){
        // $http.post("http://localhost:3000/loginValidation", JSON.stringify(loginDetails)).then((data) => {
        //     console.log(data);
        //     if (data.data.validUser) {
        //         localStorage.isLoggedIn = true;
        //     } else {
        //         localStorage.isLoggedIn = false;
        //     }
        // });
        //}
        //else{
        //    alert("Enter all the fields");
        // }

    }
});
app.controller("signUpController", function ($scope, $http) {
    $scope.createNewUser = function () {
        var newUserDetails = {
            userName: $scope.userName,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            phoneNum: $scope.phNum,
            location: $scope.location
        }
        // if($scope.userName && $scope.password && $scope.firstName && $scope.lastName && 
        //   $scope.email && $scope.phNum && $scope.location){
        $http.post("http://localhost:3000/newUserRegistration", JSON.stringify(newUserDetails)).then((data) => {

        });
        //}
        //else{
        //    alert("Enter all the field");
        // }
    }
});

app.controller('profileController',function($scope){

});

app.controller('messagesController',function($scope){

});