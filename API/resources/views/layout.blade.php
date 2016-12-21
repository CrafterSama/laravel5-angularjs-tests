<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SAD</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="../client/assets/dist/css/AdminLTE.min.css">
	<!-- AdminLTE Skins. Choose a skin from the css/skins
	folder instead of downloading all of them to reduce the load. -->
	<link rel="stylesheet" href="../client/assets/dist/css/skins/_all-skins.min.css">
	<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/united/bootstrap.min.css" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css?family=Lato:400" rel="stylesheet" type="text/css">
	<style>
	    html, body {
	        height: 100%;
	    }

	    .form-container {
	        text-align: center;
	    }

	    .form-container .title {
	        font-size: 72px;
	    }

	    .form-container .panel {
	        margin-top: 150px;
	    }
	    
	    .login-form {
	        background-color: rgba(255,255,255,0.7);
	        padding: 25px;
	        margin-top: 150px;  
	        border-radius: 0.5em;
	    }

	    .login-form input {
	        border: none;
	    }

	    .login-form input:focus {
	        box-shadow: 0px 0px 3px #333;
	    }
	</style>
</head>
<body>
    @yield('content')
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<!-- FastClick -->
	<script src="../client/assets/plugins/fastclick/fastclick.js"></script>
	<!-- AdminLTE App -->
	<script src="../client/assets/dist/js/app.min.js"></script>
	<!-- AdminLTE for demo purposes -->
	<script src="../client/assets/dist/js/demo.js"></script>
	@yield('scripts')
</body>
</html>