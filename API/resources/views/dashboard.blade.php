<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>SAD</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
	<!-- link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/flatly/bootstrap.min.css" rel="stylesheet" / -->
		<!-- Font Awesome -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		<!-- Ionicons -->
		<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
		<!-- DataTables -->
		<link rel="stylesheet" href="../assets/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="../assets/plugins/datatables/extensions/Responsive/css/dataTables.responsive.css">
		<!-- Theme style -->
		<link rel="stylesheet" href="../assets/dist/css/AdminLTE.min.css">
		<!-- AdminLTE Skins. Choose a skin from the css/skins
				 folder instead of downloading all of them to reduce the load. -->
		<link rel="stylesheet" href="../assets/dist/css/skins/_all-skins.min.css">

		<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/united/bootstrap.min.css" rel="stylesheet" />
		
		<!-- Theme style -->
		<link rel="stylesheet" href="../assets/plugins/jquery-confirm/css/jquery-confirm.css">
		
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
				<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
				<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
</head>
<body class="hold-transition skin-blue sidebar-mini">
	<!-- Site wrapper -->
	<div class="wrapper">

		@include('partials.header')

		<!-- =============================================== -->

		@include('partials.sidebar')

		<!-- =============================================== -->

		@yield('content')

		@include('partials.footer')

		@include('partials.options')
		
	</div><!-- ./wrapper -->
	
	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	
	<!-- Bootstrap -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
		
	<!-- DataTables -->
	<script src="../../assets/plugins/datatables/jquery.dataTables.js"></script>
	<script src="../../assets/plugins/datatables/extensions/Responsive/js/dataTables.responsive.js"></script>
	<script src="../../assets/plugins/datatables/dataTables.bootstrap.js"></script>

	<!-- SlimScroll -->
	<script src="../../assets/plugins/slimScroll/jquery.slimscroll.min.js"></script>
	
	<!-- FastClick -->
	<script src="../../assets/plugins/fastclick/fastclick.min.js"></script>

	<!-- AdminLTE App -->
	<script src="../../assets/dist/js/app.min.js"></script>
	
	<!-- AdminLTE for demo purposes -->
	<script src="../../assets/dist/js/demo.js"></script>

	<!-- JqueryConfirm -->
	<script src="../../assets/plugins/jquery-confirm/js/jquery-confirm.js"></script>

	<!-- Bootstrap Notify -->
	<script src="../../assets/plugins/bootstrap-notify/bootstrap-notify.min.js"></script>

	@yield('scripts')
</body>
</html>