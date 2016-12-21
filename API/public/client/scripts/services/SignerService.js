'use strict';

	app.factory('SignerResource',['$resource', function($resource) {
		return $resource("http://localhost:8000/signers/:id", {
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