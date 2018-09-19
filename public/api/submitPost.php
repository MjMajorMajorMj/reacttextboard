<?php
$result = null;

$cleanPOST = josn_decode($_POST);
$replyMsg = $_POST['replyMsg'];
$output['success'] = true;
$output['replyFromServerMsg'] = $replyMsg . "from the servah!"


?>