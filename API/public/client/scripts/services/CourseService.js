'use strict';

	app.factory('CourseResource',['$resource', function($resource) {
		return $resource("http://localhost:8000/courses/:id", {
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