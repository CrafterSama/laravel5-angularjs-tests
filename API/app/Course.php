<?php

namespace App;

use Alsofronie\Uuid\UuidModelTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
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
    protected $table = 'courses';

    //protected $guarded = ['id'];

    protected $fillable = ['name','overview','content','place','date_start','date_end','company_id'];

    //protected $dates = ['deleted_at','date_start','date_end','update_at','created_at'];

    protected $dateformat = 'U';

    public function company()
    {
        //dd($this);
        return $this->belongsTo('App\Company', 'company_id', 'id');
    }

}
