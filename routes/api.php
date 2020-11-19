<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ExpenseController;
use \App\Http\Controllers\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Expenses Routes
Route::middleware('auth:sanctum')->get('/expenses', [ExpenseController::class, 'index']);
Route::middleware('auth:sanctum')->post('/expenses/create', [ExpenseController::class, 'store']);
Route::middleware('auth:sanctum')->get('/expenses/delete/{expense}', [ExpenseController::class, 'destroy']);
Route::middleware('auth:sanctum')->post('/expenses/update/{expense}', [ExpenseController::class, 'update']);


//Categories Routes
Route::middleware('auth:sanctum')->get('/categories', [CategoryController::class, 'index']);
