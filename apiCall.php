
<?php
extract($_POST);
extract($_GET);

$params = explode(",", $argv[1]);



$first_name = str_replace("¤", " ", $params[0]); 
$last_name = str_replace("¤", " ",$params[1]); 
$address = str_replace("¤", " ",$params[2]); 
$num_orden = $params[3]; 
$country = str_replace("¤", " ",$params[4]); 
$state = str_replace("¤", " ",$params[5]); 
$city = str_replace("¤", " ",$params[6]); 
$zip = $params[7]; 
$ip_address = $params[8]; 
$email = $params[9]; 
$phone_no = (int)$params[10]; 
$card_type = (int)$params[11]; 
$amount = number_format($params[12],2);
$card_no = (int)$params[13]; 
$ccExpiryMonth = (int)$params[14]; 
$ccExpiryYear = (int)$params[15]; 
$cvvNumber = (int)$params[16]; 



// You can call our API following curl post example
$url = "https://ipaytotal.solutions/api/transaction";
$key = "1562wczbh0eTwzeNj6QN6LmUDZjjpeoEEaPd0qCt5nzGCkhUqZQWimcCBVtSvGIWYM2W";
// Fill with real customer info

$data = [
    'api_key' => $key,
    'first_name' => $first_name, //primer nombre. SI
    'last_name' => $last_name, //apellido SI 
    'address' => $address, //direccion
    'sulte_apt_no' => $num_orden, //numero de orden
    'country' => $country, //pais MX,US,GB
    'state' => $state, // if your country US then use only 2 letter state code.
    'city' => $city, //ciudad
    'zip' => $zip, // codigo postal 
    'ip_address' => $ip_address, //ip address
    'email' => $email, // correo
    'phone_no' => $phone_no, //numero telefonico
    'card_type' => $card_type, // See your card type in list
    'amount' => $amount, //monto
    'currency' => 'USD', //siempre seran dolares
    'card_no' => $card_no, //numero de tarjeta
    'ccExpiryMonth' => $ccExpiryMonth, // numero de expiracion
    'ccExpiryYear' => $ccExpiryYear, //año de expiracion
    'cvvNumber' => $cvvNumber, // cvv
];

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER,[
    'Content-Type: application/json'
]);
$response = curl_exec($curl);
curl_close($curl);



$responseData = json_decode($response);

$status = $responseData -> status;

if ($status == "success") {
    $id_pago = $responseData -> order_id;
    $response = $status.'~'.$id_pago;
}else{
    $message = $responseData -> message;
    $response = $status.'~'.$message;
}


echo($response);

?>