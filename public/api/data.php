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
	case 'readReplies':
		include 'readReplies.php';
		break;
	case 'insertReply':
		include 'submitPost.php';
		break;
};
$outputJSON = json_encode($output);
print($outputJSON);
?>