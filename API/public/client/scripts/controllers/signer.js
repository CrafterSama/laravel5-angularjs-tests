'use strict';

	app.controller('ListSignerCtrl', ['$scope','SweetAlert','SignerResource','$http', '$location', '$routeParams','$timeout','ngDialog', function ($scope, SweetAlert, SignerResource, $http, $location, $routeParams, $timeout, ngDialog) {

		$scope.url = '/signers';

		$scope.add = "Add Signer";
		
		$scope.createSigner = function () {
			ngDialog.open({
				template: 'create.html',
				controller: 'CreateSignerCtrl',
				scope: $scope,
				className: 'ngdialog-theme-default ngdialog-theme-custom'
			});
		};
		
		$scope.editSigner = function (id) {
			$scope.signerId = id;
			ngDialog.open({
				template: 'create.html',
				controller: 'EditSignerCtrl',
				scope: $scope,
				className: 'ngdialog-theme-default ngdialog-theme-custom'
			});
		};

		$scope.removeSigner = function (id) {
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
			function(isConfirm){   
				if (isConfirm) {     
					SignerResource.delete({
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
	.controller('CreateSignerCtrl', ['$scope','SweetAlert','SignerResource','$http', '$location', '$routeParams','$timeout','ngDialog', function ($scope, SweetAlert, SignerResource, $http, $location, $routeParams, $timeout, ngDialog) {
		
		$scope.title = "Add Signer";
		
		$scope.button = "Save";
		
		$scope.Signer = {};
		
		$scope.cancel = ngDialog.closeAll;
		
		$scope.saveSigner = function() {
			SignerResource.save($scope.Signer, function(){
				$scope.getModelData();
				ngDialog.closeAll();
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
	}])
	.controller('EditSignerCtrl', ['$scope','SweetAlert','SignerResource','$http', '$location', '$routeParams','$timeout','ngDialog', function ($scope, SweetAlert, SignerResource, $http, $location, $routeParams, $timeout,ngDialog) {
		
		$scope.title = "Edit Signer";
		
		$scope.button = "Update";
		
		$scope.Signer = SignerResource.get({
			id: $scope.signerId
		});
		$scope.cancel = ngDialog.closeAll;

		$scope.saveSigner = function() {
			SignerResource.update($scope.Signer, $scope.getModelData);
			ngDialog.closeAll();
			$.notify({
				title: '<strong>Data Updated! </strong>',
				message: 'Signer Updated.'
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
		};
	}]);