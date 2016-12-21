<?php

namespace App;

use Alsofronie\Uuid\UuidModelTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CoursesExecuted extends Model
{

    /*
     * Just use the trait and the magic happens :)
     */
    use UuidModelTrait;

    /*
     * Should use the binary form to store in database ?
     * @default false
     */
     // protected $uuidBinary = false;

     /*
      * The UUID version to use (1 - 5)
      * @default 4
      */
     // protected $uuidVersion = 4;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'courses_executed';

    protected $fillable = ['course_id','course_name', 'course_overview', 'signer_id','signer_name', 'attendant_id', 'attendant_name'];

    protected $dates = ['deleted_at'];

    public function course()
    {
        //dd($this);
        return $this->hasMany('App\Course', 'course_id', 'id');
    }
    public function signer()
    {
        //dd($this);
        return $this->hasMany('App\Signer', 'signer_id', 'id');
    }
    public function attendant()
    {
        //dd($this);
        return $this->hasMany('App\Attendant', 'attendant_id', 'id');
    }

}
