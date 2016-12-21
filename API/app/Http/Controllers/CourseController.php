<?php

namespace App\Http\Controllers;

use App\Company;
use App\Course;
use App\Http\Controllers\Controller;
use App\Role;
use DB;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pp        = $request->input('per_page');
        if(is_null($pp)):
            $pp = '2';
        endif;
        $dataUser  = \Auth::user();
        $role      = Role::where('id', $dataUser->role_id)->pluck('access');
        $companyId = Company::where('user_id', $dataUser->id)->pluck('id');
        /*$courses = DB::table('courses')
            ->join('companies','courses.company_id','=','companies.id')
            ->select('courses.name','courses.date_start','courses.date_end','courses.company_id','courses.created_at','courses.updated_at','courses.deleted_at','companies.name AS company_name')->paginate($pp);*/

        if ($role == 1):

            if ($courses = Course::where('company_id', $companyId)->with('company')->paginate($pp)):
                //dd($courses);
                return $courses;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Course Data']);

            endif;

        elseif ($role == 2 && Course::where('company_id', $companyId)):

            if ($courses = Course::where('company_id', $companyId)->paginate($pp)):

                return $courses;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to obtein the Course Data']);

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

        if (!is_array($data)) {
            return response()->json(['success' => false, 'error' => 'request must be an array']);
        }

        // Creamos las reglas de validación
        $rules = [
            'name'       => 'required',
            'date_start' => 'required',
            'date_end'   => 'required',
        ];

        try {
            // Ejecutamos el validador y en caso de que falle devolvemos la respuesta
            $validator = \Validator::make($data, $rules);

            if ($validator->fails()) {
                return [
                    'success' => false,
                    'error'   => $validator->errors()->all(),
                ];
            }

            $currentUser = \Auth::user()->id;

            $data['company_id'] = Company::where('user_id', $currentUser)->pluck('id');

            Course::create($data);

            return response()->json(['success' => true, 'data' => $data]);

        } catch (Exception $e) {

            return response()->json(['success' => false, 'error' => 'Error creating the new user']);

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
        if ($data = Course::find($id)):

            return $data;

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

        $currentRole = \Auth::user()->id_rol;

        $role = \DB::table('roles')->where('id', $currentRole)->pluck('access');

        $currentUser = \Auth::user()->id;

        $companyId = Company::where('user_id', $currentUser)->pluck('id');

        $data = Course::find($id)->where('company_id', $companyId);

        if ($role == 1):

            if ($data->update($request->all())):

                return $data;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the user data']);

            endif;

        elseif ($role == 2 && Course::where('company_id', $companyId)):

            if ($data->update($request->all())):

                return $data;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the user data']);

            endif;

        else:

            return response()->json(['success' => false, 'error' => 'You don´t have permission to edit this'], 500);

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

        $companyId = Company::where('user_id', $currentUser)->pluck('id');

        $data = Course::find($id);

        if ($role == 1):
            //dd($request->all());
            if ($data->update($request->all())):
                return $data;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the user data']);

            endif;

        elseif ($role == 2 && Course::find($id)->where('company_id', $companyId)):

            if ($data->update($request->all())):

                return $data;

            else:

                return response()->json(['success' => false, 'error' => 'Error Trying to update the user data']);

            endif;

        else:

            return response()->json(['success' => false, 'error' => 'You don´t have permission to edit this'], 500);

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
        Course::destroy($id);
        return response()->json(['success' => true]);
    }

    /**
     * @param string $name
     * @return \Illuminate\Http\Response
     */

    public function name(Request $request, $name)
    {
        $data = Course::where('name','LIKE','%'.$name.'%')->get();
        if(count($data) > 0):
            return $data;
        else:
            return response()->json(['error' => 'No Results Found']);
        endif;
    }

}
