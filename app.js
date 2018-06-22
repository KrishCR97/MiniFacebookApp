var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {


    $routeProvider.when('/', {
        templateUrl: '/login.html',
        controller: 'controller1'
    }).when('/signup', {
        templateUrl: '/signup.html',
        controller: 'controller2'
    })
});

app.controller("controller1", function ($scope, $http) {

    var loginDetails = {
        userName: $scope.userName,
        password: $scope.password
    }
    $scope.checkLogin = function () {
        $http.post("http://localhost:3000/registerUser", JSON.stringify(loginDetails)).then((data) => {

        });
    }
});
app.controller("controller2", function ($scope) {
    var newUserDetails =
    {
        userName: "String",
        password: "String",
        firstName: "String",
        lastName: "String",
        email: "String",
        phoneNum: 123,
        location: "String"
    }
    $scope.createNewUser = function () {
        alert($scope.userName + " " + $scope.password + " " + $scope.firstName + " " + $scope.lastName + " " + $scope.email + " " + $scope.phNum + " " + $scope.location);
    }
});