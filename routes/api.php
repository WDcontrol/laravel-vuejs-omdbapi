<?php

// Create New User
Route::post('v1/sign-up', 'Api\ActivityController@signUp');
// Login User
Route::post('v1/login', 'Api\ActivityController@login');
// Read commentaries
Route::post('/read-activities-imdb', 'API\ActivityController@readActivitiesImdbID');

Route::middleware('auth:user')->prefix('v1/')->group(function () {
    Route::post('/create-activity', 'API\ActivityController@createActivity');
    Route::post('/update-activity', 'API\ActivityController@updateActivity');
    Route::post('/delete-activity', 'API\ActivityController@deleteActivity');
    Route::post('/read-activities', 'API\ActivityController@readActivities');
    Route::post('/read-activities-imdb', 'API\ActivityController@readActivitiesImdbID');
});

Route::get('/login',function(){
    return ('Login Fail !!!');
})->name('login');
    