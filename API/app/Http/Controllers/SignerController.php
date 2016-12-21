<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Signer;
use App\Course;
use App\Company;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SignerController extends Controller
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
        $currentCompany = Company::where('user_id',$currentUser)->pluck('id');
        $signers = Signer::where('company_id',$currentCompany)->paginate($pp);
        if($role == 1):

            if($signers  = Signer::where('company_id',$currentCompany)->paginate($pp)):

                return $signers;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Signer Data']);

            endif;

        elseif($role == 2 && Signer::where('company_id', $currentCompany)):

            if($signers  = Signer::where('company_id', $currentCompany)->paginate($pp)):

                return $signers;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Signer Data']);

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
        if (!is_array($request->all())) {
            return response()->json(['success' => false, 'error' => 'request must be an array']);
        }
        // Creamos las reglas de validación
        $rules = [
            'name'      => 'required'
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

            $data = $request->all();

            $currentUser = \Auth::user()->id;

            $idCurrentCompany = Company::where('user_id', $currentUser)->pluck('id');

            $data['company_id'] = $idCurrentCompany;

            Signer::create($data);

            return response()->json(['success' => true, 'data' => $data]);

        } catch (Exception $e) {

            return response()->json(['success' => false, 'message' =>  'error creating the new signer']);

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
        if($data = Signer::find($id)):

            return $data;

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
        $currentRole = \Auth::user()->role_id;

        $role = \DB::table('roles')->where('id', $currentRole)->pluck('access');

        $currentUser = \Auth::user()->id;

        $currentCompany = Company::where('user_id', $currentUser);

        $data = Signer::find($id);

        if($role == 1):

            if($data->update($request->all())):

                return response()->json(['success' => true, 'data' => $data]);

            else:

                return response()->json(['success'=> false, 'error' => 'Error Trying to update the signer data']);

            endif;

        elseif($role == 2 && Signer::where('company_id', $currentCompany)):

            if($data->update($request->all())):

                return $data;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the signer data']);

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
        Signer::destroy($id);
        return response()->json(['success' => true]);
    }

    public function name(Request $request, $name)
    {
        $data = Signer::where('name','LIKE','%'.$name.'%')->get();
        if(count($data) > 0):
            return $data;
        else:
            return response()->json(['error' => 'No Results Found']);
        endif;
    }
}
