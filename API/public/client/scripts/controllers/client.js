'use strict';
app.controller('ListClientCtrl', ['$scope', 'SweetAlert', 'ClientResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, ClientResource, $http, $location, $routeParams, $timeout, ngDialog) {
	/*$scope.Companies = CompanyResource.query({

	});*/
	$scope.url = '/clients';
	$scope.add = "Add Client";
	$scope.cancel = ngDialog.closeAll;
	$scope.createClient = function() {
		ngDialog.open({
			template: 'create.html',
			controller: 'CreateClientCtrl',
			scope: $scope,
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});
	};
	$scope.editClient = function(id) {
		$scope.companyId = id;
		ngDialog.open({
			template: 'create.html',
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
			confirmButtonColor: "#FF9900",
			confirmButtonText: "Yes, Delete it!",
			cancelButtonText: "No, Cancel this!",
			closeOnConfirm: false,
			closeOnCancel: false
		}, function(isConfirm) {
			if (isConfirm) {
				CompanyResource.delete({
					id: id
				});
				swal("Deleted!", "The Data Was Deleted", "success");
				$scope.getModelData();
			} else {
				swal("Cancelled", "Your Data is Safe:)", "error");
			}
		});
	};
}]).controller('CreateClientCtrl', ['$scope', 'SweetAlert', 'ClientResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, ClientResource, $http, $location, $routeParams, $timeout, ngDialog) {
	$scope.title = "Add Client";
	$scope.button = "Save";
	$scope.Client = {};
	$scope.cancel = ngDialog.closeAll;
	$scope.saveClient = function() {
		ClientResource.save($scope.Client, function() {
			$scope.getModelData();
			ngDialog.closeAll();
			$.notify({
				title: '<strong>Data Saved! </strong>',
				message: 'Client Saved.'
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
			SweetAlert.swal("Error!", $scope.model, "error");
		});
	};
	$scope.save = $scope.saveClient;
}]).controller('EditClientCtrl', ['$scope', 'SweetAlert', 'ClientResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, ClientResource, $http, $location, $routeParams, $timeout, ngDialog) {
	$scope.title = "Edit Client";
	$scope.button = "Update";
	$scope.Client = ClientResource.get({
		id: $scope.companyId
	});
	$scope.cancel = ngDialog.closeAll;
	$scope.updateClient = function() {
		ClientResource.update($scope.Client, function() {
			$scope.getModelData();
			ngDialog.closeAll();
			$.notify({
				title: '<strong>Data Updated! </strong>',
				message: 'Client Updated.'
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
	$scope.save = $scope.updateClient;
}]).controller('ProfileClientCtrl', ['$scope', 'SweetAlert', 'ClientResource', '$http', '$location', '$routeParams', '$timeout', 'ngDialog', function($scope, SweetAlert, ClientResource, $http, $location, $routeParams, $timeout, ngDialog) {
	$scope.Client = ClientResource.get({
		id: $routeParams.id
	});
	$scope.url = '/clients';
	$scope.cancel = ngDialog.closeAll;
	$scope.titleClient = 'Edit';
	$scope.buttonCompany = "Update";
	$scope.editCompany = function(id) {
		$scope.companyId = id;
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
	//$scope.url = '/clients';
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
