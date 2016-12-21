var app = angular.module('PersonaCRUDAPP', [])
    .controller('PersonaCtrl', ['$scope', '$http', '$templateCache',
    function($scope, $http, $templateCache) {
        $scope.url = 'api.php';
        $scope.persona;
        $scope.personas = [];
        $scope.fillPersonas = function(){
            $http.get('api.php?op=lista').success(function(data){
                $scope.personas =data;
            });
            console.log($scope.personas);
        };
        $scope.crear_persona = function(){
            var persona = $.param($scope.persona);
            $http.get($scope.url+"?op=create&"+persona).success(function(response){
                $scope.fillPersonas();
                $("#PersonaForm").trigger("reset");
            });
        };

        $scope.deletePersona = function(id){
            $http.get('api.php?op=borrar&id='+id).success(function(data){
                $scope.fillPersonas();
            });
        }

        $scope.seleccionar = function(persona){
            $scope.persona = persona
        }

        $scope.actualizar_persona = function(){
            var persona = $.param($scope.persona);
            $http.get($scope.url+"?op=update&"+persona).success(function(response){
                $scope.fillPersonas();
                $("#PersonaForm").trigger("reset");
            });
        }

    }]);//end controller



