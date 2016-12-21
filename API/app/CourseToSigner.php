<?php

namespace App;

use Alsofronie\Uuid\UuidModelTrait;
use Illuminate\Database\Eloquent\Model;

class CourseToAttendants extends Model
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
    protected $table = 'courses_to_attendants';

    protected $fillable = ['course_id', 'signer_id'];
    
    protected $dates = ['deleted_at'];
}
