'use strict';

	app.factory('UserResource',['$resource', function($resource) {
		return $resource("http://localhost:8000/users/:id", {
			id: "@id"
		}, {
			update: {
				method: "PUT"
			}
		});
	}]);