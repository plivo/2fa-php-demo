<?php
require 'vendor/autoload.php';
use Plivo\Resources\PHLO\PhloRestClient;
use Plivo\Exceptions\PlivoRestException;
use Plivo\RestClient;

/**
 * Class CallInterface
 */
class Plivotwofactorauth
{
    /**
     * Plivotwofactorauth constructor.
     * @param PlivoClient $client
     * @param string $authId
     * @param string $authToken
     */
    public $app_number;
    public $dst_number;
    public $message;
    public $config;

    public function __construct()
    {
        $this->config = parse_ini_file('config.ini', true);
        $this->$client = new RestClient($this->config['auth_id'], $this->config['auth_token']);
    }
    /**
     * Send SMS with Verification Code
     * @param string $app_number
     * @param string $dst_number
     * @param string $message
     * @return Code
     */
    function send_verification_code_sms($dst_number, $message)
    {
        $code = random_int(100000, 999999);
        try{
            $this->$client->messages->create($this->config['app_number'], [$dst_number], str_replace("__code__", $code, $message));
            return $code;

        }
        catch (PlivoRestException $ex) {
            print_r($ex);
        }
        
    }

    function send_verification_code_call($dst_number)
    {
        $code = random_int(100000, 999999);
        try 
        {
            $this->$client->calls->create($this->config['app_number'], [$dst_number], 'https://twofa-answerurl.herokuapp.com/answer_url/'.$code,'POST');
            return $code;
        }
        catch (PlivoRestException $ex) {
            print_r($ex);
        }
    }

    function send_verification_code_phlo($dst_number,$mode)
    {
        $code = random_int(100000, 999999);
        $client = new PhloRestClient($this->config['auth_id'], $this->config['auth_token']);
        try {
            $phlo = $client->phlo->get($this->config['phlo_id']);
            $phlo->run(["from" => $this->config['app_number'], "to" => $dst_number, "mode"=>$mode, "otp"=>$code]); // These are the fields entered in the PHLO console
            return $code;
        } 
        catch (PlivoRestException $ex) {
            print_r($ex);
        }
    }
}
