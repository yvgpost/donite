<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $surname = htmlspecialchars($_POST["surname"]);
    $companyName = htmlspecialchars($_POST["companyName"]);
    $icNumber = htmlspecialchars($_POST["icNumber"]);
    $dicNumber = htmlspecialchars($_POST["dicNumber"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $deliveryAddress = htmlspecialchars($_POST["deliveryAddress"]);
    $orderDetails = htmlspecialchars($_POST["orderDetails"]);

    $to = "info@donite.cz"; // Replace with your email
    $subject = "Nová objednávka od $name $surname";
    $message = "
        <html>
        <head>
        <title>Nová objednávka</title>
        </head>
        <body>
        <h1>Nová objednávka</h1>
        <p><strong>Jméno:</strong> $name</p>
        <p><strong>Příjmení:</strong> $surname</p>
        <p><strong>Název společnosti:</strong> $companyName</p>
        <p><strong>IČ:</strong> $icNumber</p>
        <p><strong>DIČ:</strong> $dicNumber</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Telefon:</strong> $phone</p>
        <p><strong>Dodací adresa:</strong> $deliveryAddress</p>
        <h2>Detaily objednávky:</h2>
        <pre>$orderDetails</pre>
        </body>
        </html>
    ";

    // Headers for email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: <$email>" . "\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200); // Success
        echo "Objednávka byla úspěšně odeslána!";
    } else {
        http_response_code(500); // Internal Server Error
        echo "Došlo k chybě při odesílání objednávky.";
    }
} else {
    http_response_code(400); // Bad Request
    echo "Neplatný požadavek.";
}
?>