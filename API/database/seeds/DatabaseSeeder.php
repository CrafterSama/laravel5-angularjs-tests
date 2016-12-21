<?php

use \App\Role;
use \App\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //DB::table('roles')->delete();

        Role::create(array('name' => 'Administrator', 'access' => 1));
        Role::create(array('name' => 'Supervisor', 'access' => 2));
        Role::create(array('name' => 'User', 'access' => 3));

        $admin = App\Role::where('name', 'Administrator')->first();

        User::create([
            'name'          => 'SoftArs Admin',
            'role_id'        => $admin->id,
            'email'         => 'admin@softars.com',
            'password'      =>  Hash::make('123456')
        ]);

        // Note: check your database manual for the specifics on
        // how to add a binary field of fixed size and
        // to make it primary key. This example does not make the id
        // field a primary key.
        //DB::statement('ALTER TABLE users ADD COLUMN id BINARY(16)');

        //factory('App\User', 10)->create();

        // $this->call(UserTableSeeder::class);

        Model::reguard();
    }
}
