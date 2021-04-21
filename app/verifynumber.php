<?php
require_once('twofactor.php');


/**
 * Initiate Verification process
 * @param $param[2] route param(Phone number) from index.php
 */


$config = parse_ini_file('config.ini', true);
$number = $param[2];
$app    = new Plivotwofactorauth();
if ($config['phlo_id'] == null) {
    $code = $app->send_verification_code_sms($number, 'Your verification code is : __code__. Code will expire in 1 minute.');
} else {
    $code = $app->send_verification_code_phlo($number, 'sms');
}
$client->setex('number:' . $number . ':code', 60, $code);
echo '{"status": "success", "message": "verification initiated"}';
?>