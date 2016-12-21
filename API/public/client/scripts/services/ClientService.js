'use strict';

	app.factory('ClientResource',['$resource', function($resource) {
		return $resource("http://localhost:8000/clients/:id", {
			id: "@id"
		}, {
			update: {
				method: "PUT"
			}/*,
			query: {
				method: 'GET', 
				isArray: false 
			}*/
		});
	}]);