<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

class GameController extends Controller
{
    public function pong()
    {
        return view('games.pong.index');
    }
}
