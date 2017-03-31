angular.module('app').controller('UserController', function ($scope, $http,$location,$window) {

    $scope.users=[];
    $scope.user='';
    var host = "http://localhost:3000/";

    load_users= function() {
      $http.get(host).then(function callback(res) {
        if (res.status==200){
          $scope.users=res.data;
        }else {
          alert('Error al traer los usuarios')
        }

        });
    }
      load_users();
      $scope.create= function () {
        console.log($scope.user)
        //some validation client-side TODO
        $http.post(host,{
            name : $scope.user.name,
            email : $scope.user.email,
            password: $scope.user.password
        }).success( function (data,status) {
          console.log(status);
          load_users();
          $scope.msg="Creacion exitosa";
        }).error(function(data,status){
          $scope.msg="Error en creacion"
        })
      }
      $scope.delete=function (id) {
        $http.delete(host+'delete/'+id)
        .success(function (data,status) {
          alert(status)
          load_users();
          $scope.msg ="Usuario eliminado"
        }).error(function (data,status) {
          $scope.msg="No se pudo eliminar el usuario"
        });
      }

      $scope.edit = function(id){
        $http.get(host+'findById/'+id).then(function (response) {
          if (response.status==200){
            console.log(response.data);
            $scope.user=response.data;

          }else {
            $scope.msg="Algo paso";
          }
        })
      }

      $scope.update = function (id) {
        console.log("side client "+id);
        $http.put(host+'update/'+id,
        {
          name: $scope.user.name,
          email:$scope.user.email,
          password:$scope.user.password
        })
        .success(function (data,status){
          if (status==201){
            $scope.msg="Guardado"
            load_users();
          }else{
            $scope.msg="No guardado"
          }
        })
      }

      $scope.clear= function () {
        $scope.user="";
      }

      $scope.register = function(){
        console.log($scope.user.username);
        $http.post(host+'register',
        {
          username : $scope.user.username,
          name : $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password

        }).success(function(data,status){
          if(status==200){
            $scope.msg='Registro exitoso';
            $location.path("/login");
          }else{
            console.log("algo paso");
          }
        }).error(function (data,status) {
            if (status==401){
              $scope.msg='Nombre de usuario existente';
              $location.path("/register");
            }
        });
      }

      $scope.login= function () {
        $http.post(host+'login',{
          username: $scope.user.username,
          password: $scope.user.password
        }).success(function (data,status) {
          console.log(status);
          if (status==200){
            console.log('entre a post login');
            $scope.msg='Login correcto';
            $location.path("/users");

          }
        }).error(function (data,status) {
          console.log(status);
          if (status!=200){
            $scope.msg='Login incorrecto';
          $location.path("/login");
          }
        });
      }


      getLogin= function () {
        $http.get(host+'login').then(function (res) {
          console.log("Entre al getLOgin");
          alert(res);
          alert("status "+res.status)
          console.log();
          if(res.status==200){
            $scope.userlog=res.data;
          }else{
            $scope.userlog='';
          }
        }, function(res){
          console.log(res.status);
        });
      }
      getLogin();
      console.log("Scope: "+$scope);
      console.log("userlog "+$scope.userlog);

})
