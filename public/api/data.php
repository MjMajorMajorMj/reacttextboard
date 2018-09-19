<?php
define('fromData',true);
if(empty($_POST['action'])){
	exit('no action specified');
};
require('mysql_connect.php');
$output = [
	'success'=> false,
	'errors'=>[]
];
switch($_POST['action']){
	case 'readAll':
		include 'dataApi/read.php';
		break;
	case 'insertReply':
		include 'getReplies.php';
		break;
};
$outputJSON = json_encode($output);
print($outputJSON);
?>