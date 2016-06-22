<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

class PartialController extends Controller
{
    public function partial($view)
    {
        return view('partial.' . $view);
    }
}
