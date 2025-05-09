<?php
// Ensure the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize the form data.
    $name        = trim(strip_tags($_POST["name"]));
    $email       = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subjectInpt = trim($_POST["subject"]);
    $message     = trim($_POST["message"]);

    // Validate required fields.
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all required fields.";
        exit;
    }

    // Validate email format.
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email address.";
        exit;
    }

    // Set the recipient – change this to your own email.
    $recipient = "your_email@example.com";

    // Construct the email subject and content.
    $emailSubject = "New Message from $name" . (!empty($subjectInpt) ? " - $subjectInpt" : "");
    $emailContent = "Name: $name\n";
    $emailContent .= "Email: $email\n\n";
    $emailContent .= "Message:\n$message\n";

    // Set the email headers.
    $headers = "From: $name <$email>";

    // Attempt to send the email.
    if (mail($recipient, $emailSubject, $emailContent, $headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
    // Not a POST request.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
