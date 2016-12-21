'use strict';
app.controller('ListUserCtrl', ['$scope', 'SweetAlert', 'UserResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, UserResource, $http, $location, $routeParams, $timeout, ngDialog) {

	$scope.url = '/users';

	$scope.add = "Add User";

	$scope.cancel = ngDialog.closeAll;

	$scope.createUser = function() {
		ngDialog.open({
			template: 'create.html',
			controller: 'CreateUserCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};

	$scope.editUser = function(id) {
		$scope.userId = id;
		ngDialog.open({
			template: 'create.html',
			controller: 'EditUserCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};

	$scope.removeUser = function(id) {
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
		}, function(isConfirm) {
			if (isConfirm) {
				UserResource.delete({
					id: id
				});
				swal("Deleted!", "The Data Was Deleted", "success");
				$scope.getModelData();
			} else {
				swal("Cancelled", "Your Data is Safe:)", "error");
			}
		});
	};

}]).controller('CreateUserCtrl', ['$scope', 'SweetAlert', 'UserResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, UserResource, $http, $location, $routeParams, $timeout, ngDialog) {

	$scope.title = "Add User";

	$scope.button = "Save";

	$scope.User = {};

	$scope.cancel = ngDialog.closeAll;

	$scope.saveUser = function() {
		UserResource.save($scope.User, function() {
			$scope.getModelData();
			ngDialog.closeAll();
			$.notify({
				title: '<strong>Data Saved! </strong>',
				message: 'User Saved.'
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
			console.log($scope.model);
			SweetAlert.swal("Error!", $scope.model, "error");
		});
	};

	$scope.save = $scope.saveUser;

}]).controller('EditUserCtrl', ['$scope', 'SweetAlert', 'UserResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, UserResource, $http, $location, $routeParams, $timeout, ngDialog) {

	$scope.title = "Edit User";

	$scope.button = "Update";

	$scope.User = UserResource.get({
		id: $scope.userId
	});

	$scope.cancel = ngDialog.closeAll;

	$scope.updateUser = function() {
		UserResource.update($scope.User, function() {
			$scope.getModelData();
			ngDialog.closeAll();
			$.notify({
				title: '<strong>Data Updated! </strong>',
				message: 'User Updated.'
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
		});
	};

	$scope.save = $scope.updateUser;

}]).controller('ProfileUserCtrl', ['$scope', 'SweetAlert', 'UserResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, UserResource, $http, $location, $routeParams, $timeout, ngDialog) {

	$scope.User = UserResource.get({
		id: $routeParams.id
	});

	$scope.editCompany = function(id) {
		$scope.userId = id;
		ngDialog.open({
			template: 'create.html',
			controller: 'ProfileCompanyCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};

	$scope.updateCompany = function() {
		CompanyResource.update($scope.Company, function() {
			$scope.getModelData();
			ngDialog.closeAll();
			$.notify({
				title: '<strong>Data Updated! </strong>',
				message: 'Company Updated.'
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
		});
	};

	$scope.add = 'Add Client';

	$scope.createClient = function() {
		ngDialog.open({
			template: 'createClient.html',
			controller: 'EditClientCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};

	$scope.editClient = function(id) {
		$scope.clientId = id;
		ngDialog.open({
			template: 'createClient.html',
			controller: 'EditClientCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};

	$scope.removeClient = function(id) {
		SweetAlert.swal({
			title: "Are you sure?",
			text: "You will not be able to recover data!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, Delete it!",
			cancelButtonText: "No, Cancel this!",
			closeOnConfirm: false,
			closeOnCancel: false
		}, function(isConfirm) {
			if (isConfirm) {
				ClientResource.delete({
					id: id
				});
				swal("Deleted!", "The Data Was Deleted", "success");
				$scope.getModelData();
			} else {
				swal("Cancelled", "Your Data is Safe:)", "error");
			}
		});
	};

}]);
