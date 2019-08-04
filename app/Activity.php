<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

/**
 * @property integer $id
 * @property integer $user_id
 * @property string $rating
 * @property string $comment
 * @property string $imdbid
 * @property string $filmtitle
 * @property string $created_at
 * @property string $updated_at
 * @property User $user
 */
class Activity extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['user_id', 'rating', 'comment', 'imdbID', 'filmtitle', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public static function create(Request $request) {
        $activity = new Activity();

        $activity->user_id = $request->User()->id;
        $activity->rating = $request->get('rating');
        $activity->comment = $request->get('comment');
        $activity->imdbID = $request->get('imdbID');
        $activity->filmtitle = $request->get('filmtitle');

        $activity->save();

        return $activity;

    }

    public static function updateOne(Request $request) {
        $activity = Activity::where('id',$request->get('id'))->first();

        $activity->rating = $request->get('rating');
        $activity->comment = $request->get('comment');
        $activity->imdbID = $request->get('imdbID');
        $activity->filmtitle = $request->get('filmtitle');

        $activity->save();

        return $activity;

    }

    public static function deleteOne(Request $request) {
        Activity::where('id',$request->get('id'))->delete();
    }

    public static function readAll(Request $request) {
        return Activity::where('user_id',$request->User()->id)->get();
    }

    public static function readByImdbID(Request $request) {
        return Activity::where('imdbID',$request->get('imdbID'))->get();
    }
}
