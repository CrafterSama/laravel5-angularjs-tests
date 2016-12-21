<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Attendant;
use App\Course;
use App\Company;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AttendantController extends Controller
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
        $attendants = Attendant::where('company_id',$currentCompany)->paginate($pp);
        if($role == '1'):

            if(Attendant::where('company_id',$currentCompany)->paginate($pp)):

                return $attendants;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Attendant Data']);

            endif;

        elseif($role == '2' && Attendant::where('company_id', $currentCompany)->paginate($pp)):

            if(Attendant::where('company_id', $currentCompany)->paginate($pp)):

                return $attendants;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Attendant Data']);

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

            $data['user_id'] = $currentUser;

            $idCurrentCompany = Company::where('user_id', $currentUser)->pluck('id');

            $data['company_id'] = $idCurrentCompany;

           /* $idCurrentCourse = Course::where('user_id', $currentUser)->where('company_id', $idCurrentCompany)->pluck('id');

            $data['course_id'] = $idCurrentCourse;*/

            Attendant::create($data);

            return response()->json(['success' => true, 'data' => $data]);

        } catch (Exception $e) {

            return response()->json(['success' => false, 'message' =>  'error creating the new attendant']);

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
        if($data = Attendant::find($id)):

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
        $currentRole = \Auth::user()->role_id;

        $role = \DB::table('roles')->where('id', $currentRole)->pluck('access');

        $currentUser = \Auth::user()->id;

        $data = Attendant::find($id);

        if($role == 1):

            if($data->update($request->all())):

                return response()->json(['success' => true, 'data' => $data]);

            else:

                return response()->json(['success'=> false, 'error' => 'Error Trying to update the attendant data']);

            endif;

        elseif($role == 2 && Attendant::where('user_id', $currentUser)):

            if($data->update($request->all())):

                return response()->json(['success' => true, 'data' => $data]);

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the attendant data']);

            endif;

        else:

            return response()->json(['success' => false, 'error' => 'You don´t have permission to edit this']);

        endif;
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

        $data = Attendant::find($id);

        if($role == 1):

            if($data->update($request->all())):

                return response()->json(['success' => true, 'data' => $data]);

            else:

                return response()->json(['success'=> false, 'error' => 'Error Trying to update the attendant data']);

            endif;

        elseif($role == 2 && Attendant::where('user_id', $currentUser)):

            if($data->update($request->all())):

                return response()->json(['success' => true, 'data' => $data]);

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the attendant data']);

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
        Attendant::destroy($id);
        return response()->json(['success' => true]);
    }

    public function name(Request $request, $name)
    {
        $data = Attendant::where('name','LIKE','%'.$name.'%')->get();
        if(count($data) > 0):
            return $data;
        else:
            return response()->json(['error' => 'No Results Found']);
        endif;
    }
}
