'use strict';

app.controller('ListAttendantCtrl', ['$scope', 'SweetAlert', 'AttendantResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, AttendantResource, $http, $location, $routeParams, $timeout, ngDialog) {

        $scope.url = '/attendants';

        $scope.add = "Add Attendant";

        $scope.createAttendant = function() {
            ngDialog.open({
                template: 'create.html',
                controller: 'CreateAttendantCtrl',
                scope: $scope,
                className: 'ngdialog-theme-default ngdialog-theme-custom'
            });
        };

        $scope.editAttendant = function(id) {
            $scope.attendantId = id;
            ngDialog.open({
                template: 'create.html',
                controller: 'EditAttendantCtrl',
                scope: $scope,
                className: 'ngdialog-theme-default ngdialog-theme-custom'
            });
        };

        $scope.removeAttendant = function(id) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover data!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#FF9900",
                    confirmButtonText: "Yes, Delete it!",
                    cancelButtonText: "No, Cancel this!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        AttendantResource.delete({
                            id: id
                        });
                        swal("Deleted!", "The Data Was Deleted", "success");
                        $scope.getModelData();
                    } else {
                        swal("Cancelled", "Your Data is Safe:)", "error");
                    }
                });
        };

    }])
    .controller('CreateAttendantCtrl', ['$scope', 'SweetAlert', 'AttendantResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, AttendantResource, $http, $location, $routeParams, $timeout, ngDialog) {

        $scope.title = "Add Attendant";

        $scope.button = "Save";

        $scope.Attendant = {};

        $scope.cancel = ngDialog.closeAll;

        $scope.saveAttendant = function() {
            AttendantResource.save($scope.Attendant, $scope.getModelData);
            ngDialog.closeAll();
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
    }])
    .controller('EditAttendantCtrl', ['$scope', 'SweetAlert', 'AttendantResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, AttendantResource, $http, $location, $routeParams, $timeout, ngDialog) {

        $scope.title = "Edit Attendant";

        $scope.button = "Update";

        $scope.Attendant = AttendantResource.get({
            id: $scope.attendantId
        });

        $scope.cancel = ngDialog.closeAll;

        $scope.updateAttendant = function() {
            AttendantResource.update($scope.Attendant, $scope.getModelData);
            ngDialog.closeAll();
            $.notify({
                title: '<strong>Data Updated! </strong>',
                message: 'Attendant Updated.'
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

        $scope.save = $scope.updateAttendant;
    }]);
