<!DOCTYPE html>
<html lang="en" ng-app="PersonaCRUDAPP">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>CRUD Persona basico.</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
        .table tbody tr {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Persona CRUD AngularJS</h1>
    <div id="MyPersona" ng-controller="PersonaCtrl" ng-init="fillPersonas()">
        <div class="col-md-5">
            <form id="PersonaForm">
                <div class="form-group">
                    <label for="identificacion">Indentidicacion</label>
                    <input type="text" class="form-control" ng-model="persona.identificacion" placeholder="v-12345678912">
                </div>
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" ng-model="persona.nombre" placeholder="Juan">
                </div>
                <div class="form-group">
                    <label for="edad">Edad</label>
                    <input type="text" class="form-control" ng-model="persona.edad" placeholder="25">
                </div>
                <div class="form-group">
                    <label for="direccion">Direccion</label>
                    <input type="text" class="form-control" ng-model="persona.direccion" placeholder="Av, calle, ciudad">
                </div>
                <input type="hidden" ng-model="persona.id">

                <button ng-show="persona.id == null" type="button" class="btn btn-default" ng-click="crear_persona()">Guardar</button>
                <button ng-hide="persona.id == null" type="button" class="btn btn-default" ng-click="actualizar_persona()">Actualizar</button>
            </form>
        </div>
        <div class="col-md-7">
            <table class="table" >
                <thead>
                    <tr>
                        <th>Identificacion</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Direccion</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="persona in personas" ng-click="seleccionar(persona)">
                        <td>{{persona.identificacion}}</td>
                        <td>{{persona.nombre}}</td>
                        <td>{{persona.edad}}</td>
                        <td>{{persona.direccion}}</td>
                        <td><button type="button" class="btn btn-danger" ng-click="deletePersona(persona.id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="js/app.js"></script>
</body>
</html>

