<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Property extends Model
{
    use HasFactory;

    protected $table = 'properties';

    protected $fillable = [
        'listNumber',
        'streetAddress',
        'postalCity',
        'state',
        'zipCode',
        'lat',
        'lng',
        'closedDate',
        'soldPrice',
        'yearBuilt',
        'acres',
        'market',
        'yTotal',
        'opinionTotal'
    ];

    protected $appends = ['date', 'title'];

    public function getDateAttribute(){
      return Carbon::parse($this->attributes['closedDate'])->toDateString();
    }

    public function getTitleAttribute(){
      return $this->attributes['streetAddress'];
    }

    public function opinions()
    {
        return $this->hasMany(Opinion::class, 'property_id');
    }

    public function images()
    {
        return $this->hasMany(PropertyImage::class, 'property_id');
    }
}
