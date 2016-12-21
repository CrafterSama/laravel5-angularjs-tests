<?php

namespace App;

use Alsofronie\Uuid\UuidModelTrait;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;

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
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'id_rol', 'email', 'password'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function company()
    {
        return $this->hasOne('App\Company');
    }

    public function roles()
    {
        return $this->hasOne('App\Role');
    }
}
