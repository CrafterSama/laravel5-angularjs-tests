<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*Route::get('home', function () {
    	return redirect('auth/login')->with('status', 'Account Created!!');
	});*/

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', ['as' =>'auth/login', 'uses' => 'Auth\AuthController@postLogin']);
Route::get('auth/logout', ['as' => 'auth/logout', 'uses' => 'Auth\AuthController@getLogout']);

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', ['as' => 'auth/register', 'uses' => 'Auth\AuthController@postRegister']);

Route::get('bootstrap', 'BootstrapController@index');

Route::group(['middleware' => 'auth'], function () {

	Route::get('/', function () {
	    return redirect('/client/#/');
	});
	Route::get('home', function () {
	    return redirect('/client/#/');
	});
	Route::resource('users', 'UserController');
	Route::resource('roles', 'RoleController');
	Route::resource('courses', 'CourseController');
	Route::resource('course-executed', 'CoursesExecutedController');
	Route::resource('clients', 'ClientController');
	Route::resource('signers', 'SignerController');
	Route::resource('attendants', 'AttendantController');
	Route::resource('companies', 'CompanyController');
	Route::post('/companies/edit/{id}', 'CompanyController@edit');
	Route::post('/companies/delete/{id}', 'CompanyController@delete');
	Route::post('/courses/edit/{id}', 'CourseController@edit');
	Route::post('/clients/delete/{id}', 'CourseController@delete');
	Route::post('/clients/edit/{id}', 'CourseController@edit');
	Route::post('/courses/delete/{id}', 'CourseController@delete');
	Route::post('/signers/edit/{id}', 'SignerController@edit');
	Route::post('/signers/delete/{id}', 'SignerController@delete');
	Route::post('/attendants/edit/{id}', 'AttendantController@edit');
	Route::post('/attendants/delete/{id}', 'AttendantController@delete');
	Route::get('/courses/name/{name}', 'CourseController@name');
	Route::get('/signers/name/{name}', 'SignerController@name');
	Route::get('/attendants/name/{name}', 'AttendantController@name');
	Route::get('/companies/name/{name}', 'CompanyController@name');

	/**
	 * Route to Generate the PDF Certificate
	 */
	Route::get('pdf', 'PdfController@certificate');
});
