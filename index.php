<?php
require 'vendor/predis/predis/autoload.php';
Predis\Autoloader::register();
$client = new Predis\Client();

// 127.0 .0 .1 and 6379 is default host and port for redis server. 
// The default timeout for the connect() operation is 5 seconds

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Here is where you can register routes for your application.
|
*/

$request = $_SERVER['REQUEST_URI'];

if ($request == '/') {
    require __DIR__ . '/base.html';
} else {
    $param = explode('/', $request);
    switch ($param[1]) {
        case 'verify':
            require __DIR__ . '/app/verifynumber.php';
            break;
        case 'verify_voice':
            require __DIR__ . '/app/verifynumber_voice.php';
            break;
        case 'checkcode':
            require __DIR__ . '/app/checkcode.php';
            break;
            
        default:
            http_response_code(404);
            require __DIR__ . '/base.html';
            break;
    }
}