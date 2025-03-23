<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LogRequestMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // リクエスト情報をログに記録
        // Log::info('リクエスト開始', [
        //     'url' => $request->fullUrl(),

        // ]);

        $response = $next($request);

        return $response;
    }
}
