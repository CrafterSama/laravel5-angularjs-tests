'use strict';

app.factory('CoursesExecutedResource', ['$resource', function($resource) {
    return $resource("http://localhost:8000/course-executed/:id", {
        id: "@id"
    }, {
        update: {
            method: "PUT"
        }
        /*,
		query: {
			method: 'GET',
			isArray: false
		}*/
    });
}]);
