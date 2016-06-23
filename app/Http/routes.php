<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//ANGULAR UI ROUTE VIEWS
Route::group(
    ['prefix' => 'v'],
    function () {

    Route::get(
        '{random1?}/{random2?}/{random3?}/{random4?}/{random5?}/{random6?}',
        [
            'as' => 'angular',
            'uses' =>'AngularController@view'
        ]
    );

});

//GAMES
Route::get(
    'g/pong',
    [
        'as' => 'pong',
        'uses' => 'GameController@pong'
    ]
);

//PARTIALS
Route::get(
    'p/{view}',
    [
        'as' => 'partial',
        'uses' => 'PartialController@partial'
    ]
);

//ANGULAR ROOT
Route::get(
    '{random1?}/{random2?}/{random3?}/{random4?}/{random5?}/{random6?}',
    [
        'as' => 'angular',
        'uses' =>'AngularController@angular'
    ]
);
