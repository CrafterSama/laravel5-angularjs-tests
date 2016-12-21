@extends('layout')
@section('content')
<style>
    body {
        font-weight: 400;
        font-family: 'Lato';
        background-image: url('../client/assets/images/photo1.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
    <div class="container form-container">
        <div class="content-fluid">
            <div class="row">
                <div class="login-form col-md-6 col-md-offset-3">
                    <div class="page-header text-center">
                        <h1 class="title"><strong>certificate.us</strong></h1>
                        <small>Register Form</small>
                    </div>
                    {!! Form::open(['route' => 'auth/register', 'class' => 'form']) !!}

                        <div class="form-group">
                            {!! Form::input('text', 'name', '', ['class'=> 'form-control', 'placeholder'=> 'Name']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::email('email', '', ['class'=> 'form-control', 'placeholder'=> 'Email']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::password('password', ['class'=> 'form-control', 'placeholder'=> 'Password']) !!}
                        </div>

                        <div class="form-group">
                            {!! Form::password('password_confirmation', ['class'=> 'form-control', 'placeholder'=> 'Re-enter the Password']) !!}
                        </div>
                        <div>
                            {!! Form::submit('Register',['class' => 'btn btn-primary btn-block']) !!}
                        </div>
                        <p></p>
                        <p>
                            <span class="pull-right">Have Account? <a href="/auth/login">Click here!</a></span>
                        </p>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection