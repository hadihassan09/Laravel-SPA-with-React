<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(
            ['categories' => Category::all()]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ], [
            'name.required' => "Category Name is Required.",
        ]);

        $category = Category::create([
            'name'=>$request->input('name')
        ]);

        return response()->json(
            [
                'category' => Category::where('id', $category->id)->get()
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required',
        ], [
            'name.required' => "Category Name is Required.",
        ]);

        $category->name = $request->input('name');
        $category->save();

        return response([
            'success' => true,
            'category' => Category::where('id', $category->id)->get()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response(['success'=> true]);
    }

    public function pieChartData(Request $request){
        return response(
            [
                'data'=> DB::table('expenses')
                    ->rightJoin('categories', 'expenses.category_id', '=', 'categories.id')
                    ->select('categories.name as label', DB::raw('count(expenses.category_id) as y'))
                    ->groupBy('categories.id')->get()
            ]
        );
    }
}
