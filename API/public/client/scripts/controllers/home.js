'use strict';
app.controller('HomeCtrl', ['$scope', 'ngDialog', '$location', function($scope, ngDialog, $location) {
	$scope.courseWizard = function() {
		ngDialog.open({
			template: 'firstDialog',
			controller: 'WizardCtrl',
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};
	$scope.createCompany = function() {
		$location.url('/companies');
	};
}]).controller('WizardCtrl', ['$scope', 'ngDialog', '$http', 'SweetAlert', 'CoursesExecutedResource', function($scope, ngDialog, $http, SweetAlert, CoursesExecutedResource) {
	
	$scope.save = function() {
		CoursesExecutedResource.save($scope.CourseExecuted, function() {
			ngDialog.closeAll();
			$.notify({
				title: '<strong>Data Saved! </strong>',
				message: 'Course Executed Saved.'
			}, {
				type: 'success',
				placement: {
					from: 'bottom',
					align: 'right'
				},
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
			});
		}, function(errResponse) {
			$scope.model = errResponse.data.error;
			//console.log($scope.model);
			SweetAlert.swal("Error!", $scope.model, "error");
		});
		console.log($scope.CourseExecuted);
		ngDialog.closeAll();
	};
	$scope.cancel = ngDialog.closeAll;
	var _selected;
	$scope.selected = undefined;
	$scope.getCourses = function(val) {
		return $http.get('/courses/name/' + val)
			.then(function(response) {
				return response.data.map(function(item) {
					return {
						id: item.id,
						name: item.name,
						overview: item.overview
					};
				});
			});
	};
	$scope.ngModelOptionsSelected = function(value) {
		if (arguments.length) {
			_selected = value;
		} else {
			return _selected;
		}
	};
	//$scope.CourseExecuted.Course = []
	$scope.addCourse = function(value) {
		if (!$scope.CourseExecuted) {
			$scope.CourseExecuted = {
				course_id: value.id,
				course_name: value.name, 
				course_overview: value.overview,
				Signers: [],
				Attendants: []
			};
		} else {
				$scope.CourseExecuted.course_id = value.id;
				$scope.CourseExecuted.course_name = value.name;
				$scope.CourseExecuted.course_overview = value.overview;
		}
		console.log($scope.CourseExecuted);
		/*var len = $scope.CourseExecuted.Course.length;
		if (len == 1) {
			SweetAlert.swal("Error", "You Can only add 2 Course in the List", "error");
		} else {
			$scope.CourseExecuted.Course.push({
				course_id: value.id,
				course_name: value.name
			});
		}*/
	};
	$scope.removeCourse = function() {
		/*var len = $scope.CourseExecuted.Course.length;
		$scope.CourseExecuted.Course.splice(index, 1);*/
		$scope.CourseExecuted = '';
	};
	$scope.getSigners = function(val) {
		return $http.get('/signers/name/' + val)
			.then(function(response) {
				return response.data.map(function(item) {
					return {
						id: item.id,
						name: item.name
					};
				});
			});
	};
	$scope.addSigner = function(value) {
		var len = $scope.CourseExecuted.Signers.length;
		if (len == 2) {
			SweetAlert.swal("Error", "You Can only add 2 Course in the List", "error");
		} else {
			$scope.CourseExecuted.Signers.push({
				signer_id: value.id,
				signer_name: value.name
			});
			console.log($scope.CourseExecuted.Signers);
		}
	};
	$scope.removeSigner = function(index) {
		var len = $scope.CourseExecuted.Signers.length;
		$scope.CourseExecuted.Signers.splice(index, 1);
	};
	$scope.getAttendants = function(val) {
		return $http.get('/attendants/name/' + val)
			.then(function(response) {
				return response.data.map(function(item) {
					return {
						id: item.id,
						name: item.name
					};
				});
			});
	};
	$scope.addAttendant = function(value) {
		var len = $scope.CourseExecuted.Attendants.length;
		/*if (len == 2) {
			SweetAlert.swal("Error", "You Can only add 2 Course in the List", "error");
		} else {*/
		$scope.CourseExecuted.Attendants.push({
			attendant_id: value.id,
			attendant_name: value.name
		});
		/*}*/
	};
	$scope.removeAttendant = function(index) {
		var len = $scope.CourseExecuted.Attendants.length;
		$scope.CourseExecuted.Attendants.splice(index, 1);
	};
	$scope.modelOptions = {
		debounce: {
			default: 500,
			blur: 250
		},
		getterSetter: true
	};
	$scope.createCourse = function() {
		ngDialog.open({
			template: 'createCourse.html',
			controller: 'CreateCourseCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};
	$scope.createSigner = function () {
		ngDialog.open({
			template: 'createSigner.html',
			controller: 'CreateSignerCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};
	$scope.createAttendant = function() {
		ngDialog.open({
			template: 'createAttendant.html',
			controller: 'CreateAttendantCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};
}]).controller('CreateCourseCtrl', ['$scope', 'SweetAlert', 'CourseResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, CourseResource, $http, $location, $routeParams, $timeout, ngDialog) {
	$scope.title = "Add Course";
	$scope.button = "Save";
	$scope.Course = {
		date_start: new Date()
	};
	$scope.cancel = ngDialog.close('createCourse.html');
	$scope.saveCourse = function() {
		if ($scope.Course.date_start > $scope.Course.date_end) {
			SweetAlert.swal("Error", "The Start Date is bigger than the End Date", "error");
		} else {
			CourseResource.save($scope.Course);
			ngDialog.close('createCourse.html');
			$.notify({
				title: '<strong>Data Saved! </strong>',
				message: 'Course Saved.'
			}, {
				type: 'success',
				placement: {
					from: 'bottom',
					align: 'right'
				},
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
			});
		}
	};
	$scope.save = $scope.saveCourse;
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();
	$scope.clear = function() {
		$scope.dt = null;
	};
	$scope.inlineOptions = {
		customClass: getDayClass,
		minDate: new Date(),
		showWeeks: false
	};
	$scope.dateOptions = {
		dateDisabled: disabled,
		daysOfWeekDisabled: disabled,
		datepickerPopup: 'yyyy-MM-dd',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 0,
		showWeeks: false
	};
	$scope.dateOptions2 = {
		dateDisabled: disabled,
		datepickerPopup: 'yyyy-MM-dd',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 0,
		showWeeks: false
	};
	// Disable weekend selection
	function disabled(data) {
		var date = data.date,
			mode = data.mode;
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	}
	$scope.toggleMin = function() {
		$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
		$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	};
	$scope.toggleMin();
	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};
	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};
	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.altInputFormats = ['M!/d!/yyyy'];
	$scope.popup1 = {
		opened: false
	};
	$scope.popup2 = {
		opened: false
	};
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 1);
	$scope.events = [{
		date: tomorrow,
		status: 'full'
	}, {
		date: afterTomorrow,
		status: 'partially'
	}];

	function getDayClass(data) {
		var date = data.date,
			mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}
		return '';
	}
}]).controller('CreateSignerCtrl', ['$scope','SweetAlert','SignerResource','$http', '$location', '$routeParams','$timeout','ngDialog', function ($scope, SweetAlert, SignerResource, $http, $location, $routeParams, $timeout, ngDialog) {
		
	$scope.title = "Add Signer";
	
	$scope.button = "Save";
	
	$scope.Signer = {};
	
	$scope.cancel = ngDialog.close('createSigner.html');
	
	$scope.saveSigner = function() {
		SignerResource.save($scope.Signer, function(){
			ngDialog.close('createSigner.html');
			$.notify({
				title: '<strong>Data Saved! </strong>',
				message: 'Signer Saved.'
			},{
				type: 'success',
				placement: {
					from: 'bottom',
					align: 'right'
				},
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
			});
		}, function (error) {
			$.notify({
				title: '<strong>Have an Error!</strong>',
				message: 'Error!'
			},{
				type: 'error',
				placement: {
					from: 'bottom',
					align: 'right'
				},
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
			});
		});
	};
}]).controller('CreateAttendantCtrl', ['$scope', 'SweetAlert', 'AttendantResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, AttendantResource, $http, $location, $routeParams, $timeout, ngDialog) {

	$scope.title = "Add Attendant";

	$scope.button = "Save";

	$scope.Attendant = {};

	$scope.cancel = ngDialog.close('createAttendant.html');

	$scope.saveAttendant = function() {
		AttendantResource.save($scope.Attendant);
		ngDialog.close('createAttendant.html');
		$.notify({
			title: '<strong>Data Saved! </strong>',
			message: 'Attendant Saved.'
		}, {
			type: 'success',
			placement: {
				from: 'bottom',
				align: 'right'
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
		});
	};

	$scope.save = $scope.saveAttendant;
}]);
