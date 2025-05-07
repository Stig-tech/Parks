
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $park = strip_tags($_POST["park"]);
    $name = strip_tags($_POST["name"]);
    $phone = strip_tags($_POST["phone"]);
    $email = strip_tags($_POST["email"]);
    $cart = json_decode($_POST["cart"], true);

    $to = "tatumbrian03@gmail.com";
    $subject = "Employee Gear Order";
    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $message = "Order Details:\n\n";
    foreach ($cart as $item) {
        $message .= "Product: " . $item['title'] . "\n";
        $message .= "Product #: " . $item['productNumber'] . "\n";
        $message .= "Size: " . $item['size'] . "\n";
        $message .= "Color: " . $item['color'] . "\n";
        $message .= "Quantity: " . $item['quantity'] . "\n\n";
    }
    $message .= "Park Name: $park\n";
    $message .= "Your Name: $name\n";
    $message .= "Phone: $phone\n";
    $message .= "Email: $email\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Order request sent successfully.";
    } else {
        http_response_code(500);
        echo "Failed to send order request.";
    }
} else {
    http_response_code(403);
    echo "Forbidden request.";
}
?>