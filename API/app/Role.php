<?php

namespace App;

use DB;
use Alsofronie\Uuid\UuidModelTrait;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    /*
     * Just use the trait and the magic happens :)
     */
    use UuidModelTrait;

    /*
     * Should use the binary form to store in database ?
     * @default: false
     */
     // protected $uuidBinary = false;

     /*
      * The UUID version to use (1 - 5)
      * @default: 4
      */
     // protected $uuidVersion = 4;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'access', 'created_at', 'updated_at'];

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var string
     */
    static public function getIdSupervisor()
    {
        $role = DB::table('roles')->where('access', 2)->pluck('id');
        return $role;
    }
    
    
}
