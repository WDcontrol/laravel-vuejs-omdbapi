<?php

namespace App\Http\Controllers\API;

use App\Activity;
use App\Http\Controllers\Controller;
use App\Http\Helpers\InputHelper;
use App\Http\Helpers\ResponseHelper;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    /**
     * Register a new user
     * @param Request $request
     * @return JsonResponse
     */
    public function signUp(Request $request)
    {

        InputHelper::inputChecker(
            $request,
            [
                $request->username,
                $request->password
            ],
            function (Request $request) {
                User::create($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'))->send();
            });

    }

    /**
     * Login user and return a token
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $token = $this->guard($request->username, $request->password);


        if ($token) {
            return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'))->header('Authorization', $token)->send();
        } else {
            return ResponseHelper::jsonResponse(null, Response::HTTP_BAD_REQUEST, config('messages.fail'))->send();
        }

    }

    public function createActivity(Request $request)
    {

        InputHelper::inputChecker(
            $request,
            [
                $request->rating,
                $request->comment,
                $request->imdbID,
                $request->filmtitle,
            ],
            function (Request $request) {
                Activity::create($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'))->send();
            });

    }

    public function updateActivity(Request $request)
    {

        InputHelper::inputChecker(
            $request,
            [
                $request->id,
                $request->rating,
                $request->comment,
                $request->imdbID,
                $request->filmtitle,
            ],
            function (Request $request) {
                Activity::updateOne($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'))->send();
            });

    }

    public function deleteActivity(Request $request)
    {

        InputHelper::inputChecker(
            $request,
            [
                $request->id
            ],
            function (Request $request) {
                Activity::deleteOne($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'))->send();
            });

    }

    public function readActivities(Request $request)
    {

        InputHelper::inputChecker(
            $request,null,
            function (Request $request) {
                $activities = Activity::readAll($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, $activities)->send();
            });

    }

    public function readActivitiesImdbID(Request $request)
    {

        InputHelper::inputChecker(
            $request,
            [
                $request->imdbID
            ],
            function (Request $request) {
                $activities = Activity::readByImdbID($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, $activities)->send();
            });

    }

    /**
     * Return auth guard
     * @param $username
     * @param $password
     * @return Auth
     */
    private function guard($username, $password)
    {
        return Auth::guard('user')->attempt(array('username' => $username, 'password' => $password));
    }

}
