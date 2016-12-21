<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;

use DB;
use App\Client;
use App\Company;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ClientController extends Controller
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
        $currentCompany = Company::where('user_id', $currentUser)->pluck('id');
        $clients  =  Client::where('company_id', $currentCompany)->paginate($pp);

        //dd($clients);
        if($role == '1'):

            if($clients  =  Client::where('company_id', '=', $currentCompany)->paginate($pp)):

                return $clients;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Client Data']);

            endif;

        elseif($role == '2' && Client::where('company_id', '=', $currentCompany)):

            if($clients  = Client::where('company_id', '=', $currentCompany)->paginate($pp)):

                return $clients;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Client Data']);

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
        $data = $request->all();
        if (!is_array($request->all())) {
            return response()->json(['success' => false, 'error' => 'The request must be an array']);
        }
        // Creamos las reglas de validación
        $rules = [
            'name'      => 'required',
            'fiscal_id' => 'required',
            'address'   => 'required',
            'phone'     => 'required'
            ];

        try {
            // Ejecutamos el validador y en caso de que falle devolvemos la respuesta
            $validator = \Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return [
                    'success' => false,
                    'error'  => $validator->errors()->all()
                ];
            }

            $currentUser = \Auth::user()->id;
            $currentCompany = Company::where('user_id', $currentUser)->pluck('id');
            $data['company_id'] = $currentCompany;
            $data = Client::create($data);

            return response()->json(['success' => true, 'message' => 'The data was insert correctly']);

        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' =>  'Error creating the new company']);
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
        if($company = Client::find($id)):
            return $company;
        else:
            return response()->json(['success' => false, 'error' => 'We lost the id info']);
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
        //
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
         $currentRole = \Auth::user()->id_rol;

        $role = \DB::table('roles')->where('id', $currentRole)->pluck('access');

        $currentUser = \Auth::user()->id;

        $currentCompany = Company::where('user_id', $currentUser)->pluck('id');

        $data = Client::find($id);

        if($role == 1):

            if($data->update($request->all())):

                return $data;

            else:

                return response()->json(['success'=> false, 'error' => 'Error Trying to update the company data']);

            endif;

        elseif($role == 2 && Client::where('company_id', '=', $currentCompany)->get()):

            if($data->update($request->all())):

                return $data;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the company data']);

            endif;

        else:

            return response()->json(['success' => false, 'error' => 'You don´t have permission to edit this']);

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
        if(Client::destroy($id)):
            return response()->json(['success' => true, 'message' => 'The Data was deleted']);
        else:
            return response()->json(['success' => false, 'error' => 'Error trying to delete the company data']);
        endif;
    }
}
