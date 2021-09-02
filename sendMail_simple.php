<?php
require '../config.php';
$to = $username; // from config

$subject = "Новая заявка с сайта";

$message = 'Пришла новая заявка с сайта<br><br>';
$message .= "Имя: " . $_POST['name'] . "<br>";
$message .= "Контакт: " . $_POST['email'] . "<br>";
$message .= "Комментарий: " . $_POST['comment'] . "<br>";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: Horecoff <' . $username . '>' . "\r\n";
// $headers .= 'Cc: ' . 'web@ostkost.ru' . "\r\n";

// Mail it
if(mail($to,$subject,$message,$headers)){
  echo "Mail Success";
} else {
  echo "Error sending mail";
}
?>