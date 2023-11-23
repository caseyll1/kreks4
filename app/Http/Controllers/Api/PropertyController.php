<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Property;

class PropertyController extends Controller
{
    public function get(Request $request) {
      $query = Property::where('id', '>', 0);

      if($request->get('dateFrom')) {
        $query = $query->where('closedDate', '>=', $request->get('dateFrom'));
      }

      if($request->get('dateTo')) {
        $query = $query->where('closedDate', '<=', $request->get('dateTo'));
      }

      if($request->get('soldFrom')) {
        $query = $query->where('soldPrice', '>=', $request->get('soldFrom'));
      }

      if($request->get('soldTo')) {
        $query = $query->where('soldPrice', '<=', $request->get('soldTo'));
      }

      if($request->get('zipCode')) {
        $query = $query->where('zipCode', 'LIKE', '%'.$request->get('zipCode').'%');
      }

      $properties = $query->with('images:url,property_id')->get();

      return response()->json($properties);
    }
}
