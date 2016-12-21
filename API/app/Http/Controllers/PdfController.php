<?php

namespace App\Http\Controllers;
use App\Course;
use App\Company;
use App\User;
use App\Signer;
use App\Attendant;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PdfController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function certificate() 
    {
        $data['date'] = date('Y-m-d');
        $data['certificate'] = "2222";
        $data = $this->getData();
        //$view =  \View::make('pdf.certificate', $data);
        $pdf = \App::make('dompdf.wrapper');
        //$pdf->loadView($view);
        $pdf->loadView('pdf.certificate', $data);
        return $pdf->stream('certificate');
    }

    public function getData() 
    {
        $data =  [
            'quantity'      => '1' ,
            'description'   => 'some ramdom text',
            'price'   => '500',
            'total'     => '500'
        ];
        return $data;
    }

}
