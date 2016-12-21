<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pp = $request->input('per_page');
        $currentRole = \Auth::user()->role_id;
        $role = \DB::table('roles')->where('id', $currentRole)->pluck('access');
        $currentUser = \Auth::user()->id;
        $data = User::paginate($pp);
        if($role == 1):
            if($data  = User::paginate($pp)):
        
                return $data;

            else:

                response()->json(['success' => false, 'error' => 'Error Trying to obtein the User Data']);

            endif;
        else:
        
            return response()->json(['success' => false, 'error' => 'You don´t have permission to access this area']);
        
        endif;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*User::create($request->all());
        return ['created' => true];*/
        if (!is_array($request->all())) {
            return response()->json(['success' => false, 'error' => 'request must be an array']);
        }
        // Creamos las reglas de validación
        $rules = [
            'name'      => 'required',
            'email'     => 'required|email',
            'password'  => 'required'
            ];
 
        try {
            // Ejecutamos el validador y en caso de que falle devolvemos la respuesta
            $validator = \Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return [
                    'created' => false,
                    'errors'  => $validator->errors()->all()
                ];
            }
 
            User::create($request->all());
            return response()->json(['success' => true]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' =>  'error creating the new user'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if($data = User::find($id)):
            return response()->json(['success' => true, 'data' => $data]);
        else:
            return response()->json(['success' => false, 'message' => 'We lost the id info']);
        endif;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = User::find($id);
        if($data->update($request->all())):
            return response()->json(['success' => true, 'updated' => $data]);
        else:
            return response()->json(['success'=> false, 'error' => 'error making update to the user table'], 500);
        endif;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['success' => true]);
    }

    /**
     * Auth0 Method to Login and register
     *
     */
    public function register()
    {
        $this->app->bind(
            '\Auth0\Login\Contract\Auth0UserRepository',
            '\Auth0\Login\Repository\Auth0UserRepository');
    }
}
