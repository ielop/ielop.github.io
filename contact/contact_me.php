<?php
// check if fields passed are empty
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// create email body and send it	
$to = 'guilherme.si2012@gmail.com'; // ----->>> put your email to receive mails
$email_subject = "Mensagem enviado(a) por:  $name";
$email_body = "O IoDroid recebeu uma nova mensagem: \n\n".
				  "Veja os detalhes:\n \nName: $name \n ".
				  "Email: $email_address\n Messagem: \n $message";
$headers = "From: IoDroid@yoursite.com\n";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>
