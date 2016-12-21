<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoursesExecutedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses_executed', function (Blueprint $table) {
            $table->char('id', 32);
            $table->char('course_id', 32);
            $table->string('course_name');
            $table->string('course_overview');
            $table->char('signer_id', 32);
            $table->string('signer_name');
            $table->char('attendant_id', 32);
            $table->string('attendant_name');
            $table->timestamps();
            $table->softDeletes();
            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('courses_executed');
    }
}
