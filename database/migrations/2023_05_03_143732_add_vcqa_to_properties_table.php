<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->integer('v')->nullable();
            $table->integer('q')->nullable();
            $table->integer('c')->nullable();
            $table->integer('a')->nullable();
            $table->integer('difference_in_opinion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('properties', function (Blueprint $table) {
          $table->dropColumn('v');
          $table->dropColumn('q');
          $table->dropColumn('c');
          $table->dropColumn('a');
          $table->dropColumn('difference_in_opinion');
        });
    }
};
