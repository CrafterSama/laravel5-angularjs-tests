@extends('layout')
@section('content')
<style>
    body {
        font-weight: 400;
        font-family: 'Lato';
        background-image: url('../client/assets/images/photo1.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>

<div class="container form-container">
    <div class="content-fluid">
        <div class="row">
            <div class="login-form col-md-6 col-md-offset-3">
                <div class="page-header text-center">
                    <h1 class="title"><strong>diplomas</strong></h1>
                    <small>Login Form</small>
                </div>
                {!! Form::open(['route' => 'auth/login', 'class' => 'form']) !!}
                    <div class="form-group">
                        {!! Form::email('email', '', ['class'=> 'form-control', 'placeholder'=> 'Email']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::password('password', ['class'=> 'form-control', 'placeholder'=> 'Password']) !!}
                    </div>
                    <div class="checkbox">
                        <label class="remember"><input name="remember" type="checkbox"> Remember me</label>
                    </div>
                    <div>                            
                        {!! Form::submit('Login',['class' => 'btn btn-primary btn-block']) !!}
                    </div>
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <p></p>
                    <p class="nav">
                        <a href="#" class="pull-left">Forgot your Password?</a>
                        <a href="/auth/register" class="pull-right">Sing Up</a>
                    </p>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</div>
@endsection