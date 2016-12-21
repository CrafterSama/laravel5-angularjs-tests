<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;

use DB;
use App\Role;
use App\Client;
use App\Company;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
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
        $role = Role::where('id',$currentRole)->pluck('access');
        $currentUser = \Auth::user()->id;
        $currentUserInfo = \Auth::user();
        $companyId  =  Company::where('user_id', $currentUser)->pluck('id');

        //dd($role);
        if($role == '1'):

            if($companies  =  Company::where('user_id', '=', $currentUser)->paginate($pp)):

                return $companies;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Company Data']);

            endif;

        elseif($role == '2' && Company::where('user_id', '=', $currentUser)):

            if($companies  = Company::where('user_id', '=', $currentUser)->paginate($pp)):

                return $companies;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Company Data']);

            endif;

        else:

            return response()->json(['success' => false, 'error' => 'You don´t have permission to access to this area'], 500);

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
        $currentRole = \Auth::user()->role_id;
        $role = Role::where('id',$currentRole)->pluck('access');
        $currentUser = \Auth::user()->id;
        if($role == '1' || $role == '2'):
            $data = $request->all();
            if (!is_array($request->all())):
                return response()->json(['success' => false, 'error' => 'The request must be an array'], 412);
            endif;
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
                    return response()->json([
                        'success' => false,
                        'error'  => $validator->errors()->all()
                    ]);
                }

                $currentUser = \Auth::user()->id;
                $data['user_id'] = $currentUser;
                $data = Company::create($data);
                $clientData['name'] = 'particular';
                $companies = Company::all();
                $clientData['company_id'] = $companies->last()->pluck('id');
                Client::create($clientData);

                return response()->json(['success' => true, 'message' => 'The data was insert correctly']);

            } catch (Exception $e) {

                return response()->json(['success' => false, 'error' =>  'Error creating the new company']);

            }
        else:
            return response()->json(['success' => false, 'error' => 'You don´t have permission to access to this area'], 500);
        endif;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $currentUserInfo = \Auth::user();
        if($company = Company::find($id)):

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
    public function edit(Request $request, $id)
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
        $currentRole = \Auth::user()->id_rol;

        $role = \DB::table('roles')->where('id', $currentRole)->pluck('access');

        $currentUser = \Auth::user()->id;

        $data = Company::find($id);

        if($role == 1):

            if($data->update($request->all())):

                return $data;

            else:

                return response()->json(['success'=> false, 'error' => 'Error Trying to update the company data']);

            endif;

        elseif($role == 2 && Company::where('user_id', '=', $currentUser)->get()):

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
    public function destroy($id, Request $request)
    {
        if(Company::destroy($id)):
            return response()->json(['success' => true, 'message' => 'The Data was deleted']);
        else:
            return response()->json(['success' => false, 'error' => 'Error trying to delete the company data']);
        endif;
    }

    public function name(Request $request, $name)
    {
        $data = Company::where('name','LIKE','%'.$name.'%')->get();
        if(count($data) > 0):
            return $data;
        else:
            return response()->json(['error' => 'No Results Found']);
        endif;
    }
}
