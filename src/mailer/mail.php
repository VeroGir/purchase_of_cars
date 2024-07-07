<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../mailer/PHPMailer/Exception.php';
require '../mailer/PHPMailer/SMTP.php';
require '../mailer/PHPMailer/PHPMailer.php';

//Create an instance; passing `true` enables exceptions

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer/language/');



$name = $_POST['name'];
$phone = $_POST['phone'];
$stamp = $_POST['stamp'];
$model = $_POST['model'];
$release = $_POST['release'];
$city = $_POST['city'];
$region = $_POST['region'];

try {
    //Server settings

    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.yandex.ru';
    $mail->SMTPAuth   = true;
    $mail->Username   = '*************@yandex.ru';                     //SMTP username
    $mail->Password   = '*************';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;

    //Recipients
    $mail->setFrom('***************@yandex.ru', 'Сайт АвтоВыкупа');
    $mail->addAddress('**************@mail.ru');

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'Заявка c сайта АвтоВыкупа от ' . ' ' . $name;
    $mail->Body    = 'Имя:' . ' ' . $name . '<br>' .
                     'Номер телефона:' . ' ' . $phone . '<br>' .
                     'Марка автомобиля:' . ' ' . $stamp . '<br>' .
                     'Модель автомобиля:' . ' ' . $model . '<br>' .
                     'Год выпуска:' . ' ' . $release . '<br>' .
                     'Регион:' . ' ' . $region . '<br>' .
                     'Город:' . ' ' . $city;


    $mail->send();


} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

