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
    $code = $app->send_verification_code_call($number);
} else {
    $code = $app->send_verification_code_phlo($number, 'call');
}
$client->setex('number:' . $number . ':code', 60, $code);
echo '{"status": "success", "message": "verification initiated"}';
?>