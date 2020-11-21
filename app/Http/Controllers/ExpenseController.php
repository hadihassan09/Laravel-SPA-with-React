<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response(Expense::where('user_id', $request->user()->id)->with('category')->orderBy('created_at')->paginate(4), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'price' => 'required',
            'category' => 'required|exists:categories,id',
        ], [
            'name.required' => "Expense Name is Required.",
            'amount.required' => "Expense Amount is Required.",
            'price.required' => "Expense Price is Required.",
            'category.required' => "Expense Category is Required.",
            'category.exists' => "Category Does Not Exist",
        ]);

        $expense = Expense::create([
                    'item'=>$request->input('name'),
                    'amount'=>$request->input('amount'),
                    'price'=>$request->input('price'),
                    'category_id'=>$request->input('category'),
                    'user_id' => $request->user()->id
                ]);

        return response()->json(
            [
                'expense' => Expense::where('id', $expense->id)->with('category')->get()
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Expense $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Expense $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Expense $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'price' => 'required',
            'category' => 'required|exists:categories,id',
        ], [
            'name.required' => "Expense Name is Required.",
            'amount.required' => "Expense Amount is Required.",
            'price.required' => "Expense Price is Required.",
            'category.required' => "Expense Category is Required.",
            'category.exists' => "Category Does Not Exist",
        ]);

        if($expense->user_id === $request->user()->id) {
            $expense->item = $request->input('name');
            $expense->amount = $request->input('amount');
            $expense->price = $request->input('price');
            $expense->category_id = $request->input('category');
            $expense->save();

            return response([
                'success'=>true,
                'expense' => Expense::where('id', $expense->id)->with('category')->get()
            ]);
        }
        return response(['success'=> false],401);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param Expense $expense
     */
    public function destroy(Request $request, Expense $expense)
    {
        if($expense->user_id === $request->user()->id){
            $expense->delete();
            return response(['success'=> true]);
        }
        return response(['success'=> false],401);
    }
}
