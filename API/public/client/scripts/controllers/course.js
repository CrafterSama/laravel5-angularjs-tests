'use strict';
app.controller('ListCourseCtrl', ['$scope', 'SweetAlert', 'CompanyResource', 'CourseResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, CompanyResource, CourseResource, $http, $location, $routeParams, $timeout, ngDialog) {
    $scope.url = '/courses';
    $scope.add = "Add Course";
    $scope.createCourse = function() {
        ngDialog.open({
            template: 'create.html',
            controller: 'CreateCourseCtrl',
            scope: $scope,
            className: 'ngdialog-theme-default ngdialog-theme-custom'
        });
    };
    $scope.editCourse = function(id) {
        $scope.courseId = id;
        ngDialog.open({
            template: 'create.html',
            controller: 'EditCourseCtrl',
            scope: $scope,
            className: 'ngdialog-theme-default ngdialog-theme-custom'
        });
    };
    $scope.removeCourse = function(id) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You will not be able to recover the data!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF9900",
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel this!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                CourseResource.delete({
                    id: id
                });
                swal("Deleted!", "The Data Was Deleted", "success");
                $scope.getModelData();
            } else {
                swal("Cancelled", "Your Data is Safe", "error");
            }
        });
    };
}]).controller('CreateCourseCtrl', ['$scope', 'SweetAlert', 'CourseResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, CourseResource, $http, $location, $routeParams, $timeout, ngDialog) {
    $scope.title = "Add Course";
    $scope.button = "Save";
    $scope.Course = {
        date_start: new Date()
    };
    $scope.cancel = ngDialog.closeAll;
    $scope.saveCourse = function() {
        if ($scope.Course.date_start > $scope.Course.date_end) {
            SweetAlert.swal("Error", "The Start Date is bigger than the End Date", "error");
        } else {
            CourseResource.save($scope.Course, $scope.getModelData);
            ngDialog.closeAll();
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
}]).controller('EditCourseCtrl', ['$scope', 'SweetAlert', 'CourseResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, CourseResource, $http, $location, $routeParams, $timeout, ngDialog) {
    $scope.title = "Edit Course";
    $scope.button = "Update";
    $scope.Course = CourseResource.get({
        id: $scope.courseId,
    });
    console.log($scope.Course);

    $scope.cancel = ngDialog.closeAll;
    $scope.updateCourse = function() {
        CourseResource.update($scope.Course, $scope.getModelData);
        ngDialog.closeAll();
        $.notify({
            title: '<strong>Data Updated! </strong>',
            message: 'Course Updated.'
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
    $scope.save = $scope.updateCourse;

    /*var _selected;
    $scope.selected = undefined;
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(response) {
            return response.data.results.map(function(item) {
                return item.formatted_address;
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
    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };*/
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
        daysOfWeekDisabled: disabled,
        datepickerPopup: 'yyyy-MM-dd',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 0,
        showWeeks: false
    };
    $scope.dateOptions2 = {
        daysOfWeekDisabled: disabled,
        datepickerPopup: 'yyyy-MM-dd',
        maxDate: new Date(2020, 5, 22),
        minDate: $scope.Course.date_start,
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
}]);
