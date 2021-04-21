<?php
/**
 * Initiate Validation process
 * @param $param[2] route param(Phone number) from index.php
 * @param $param[3] route param(OTP entered by user) from index.php
 */
$number = $param[2];
$code   = $param[3];

$original_code = $client->get('number:' . $number . ':code');

if ($original_code == $code) {
    $client->del('number:' . $number . ':code');
    echo '{"status": "success", "message": "codes match! number verified"}';
} elseif ($original_code != $code) {
    echo '{"status": "failure", "message": "codes do not match! number not verified"}';
} else {
    echo '{"status": "failure", "message": "number not found!"}';
}
?>