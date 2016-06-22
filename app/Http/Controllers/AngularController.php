<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

class AngularController extends Controller
{
    public function angular()
    {
        return view('angular');
    }

    public function view()
    {
        return view('view');
    }
}
