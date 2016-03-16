(function(){
  "use strict"
  angular
    .module('main')
    .factory('MainService',function($http){
      var token;
      if(localStorage.getItem('token')){
         token = localStorage.getItem('token');
         console.log(token,'token')
      }
    var registerUser = function(user){
      return $http.post('/register',user)
    }
    var authenticateUser = function(user){
      return $http.post("/api/authenticate",user)
    }

    var getUsers = function(){
      return $http({
            url: '/api/users',
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token

            }
          });
          }
    return{
      registerUser:registerUser,
      authenticateUser:authenticateUser,
      getUsers:getUsers
    };
  });
})();
