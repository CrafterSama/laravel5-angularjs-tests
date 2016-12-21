'use strict';

	app.factory('AttendantResource',['$resource', function($resource) {
		return $resource("http://localhost:8000/attendants/:id", {
			id: "@id"
		}, {
			update: {
				method: "PUT"
			}
		});
	}]);
