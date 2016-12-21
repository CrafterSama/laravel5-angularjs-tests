<?php

namespace App;

use Alsofronie\Uuid\UuidModelTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
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

    use SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'companies';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'fiscal_id', 'address', 'phone','user_id'];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

/*    public function clients()
    {
        return $this->hasMany('App\Client');
    }*/

    public function courses()
    {
        return $this->hasMany('App\Course');
    }

    /*public function signers()
    {
        return $this->hasMany('App\Signer');
    }

    public function attendants()
    {
        return $this->hasMany('App\Attendant');
    }*/

    /*public function getNameAttribute()
    {
        return $this->pluck('name');
    }*/

}
