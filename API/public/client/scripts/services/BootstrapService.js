'use strict';

	app.factory('BootstrapResource',['$resource', function($resource) {
		return $resource("http://localhost:8000/bootstrap/");
	}]);