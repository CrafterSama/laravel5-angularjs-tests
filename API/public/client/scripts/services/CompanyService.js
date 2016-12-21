'use strict';

	app.factory('CompanyResource',['$resource', function($resource) {
		return $resource("http://localhost:8000/companies/:id", {
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