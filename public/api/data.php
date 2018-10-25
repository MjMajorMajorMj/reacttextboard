<?php
ini_set('display_errors', 1);
define('fromData',true);
if(empty($_POST['action'])){
	exit('no action specified');
};

require('../../src/mysql_connect.php');
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
	case 'readThreads':
		include 'readThreads.php';
		break;
	case 'createThread':
		include 'createThread.php';
		break;
};
$outputJSON = json_encode($output);
print($outputJSON);
?>