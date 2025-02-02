<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;

class Profile extends Model
{
    use HasFactory, SoftDeletes;


    protected $filllable = [
        'fullname',
        'phone_number',
        'nin',
        'date_of_birth',
        'gender',
        'country',
        'district',
        'village',
        'user_id'
    ];



    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = Uuid::uuid4();
            }
        });
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
