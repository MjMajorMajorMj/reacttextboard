<?php

$userIP = $_SERVER['REMOTE_ADDR'];

$findUserQuery = "SELECT * FROM `users` WHERE `ipAddress` = '$userIP'";
$findUserResult = mysqli_query($conn, $findUserQuery);

if (empty($findUserResult)) {
	$output['errors'][] = 'database error - FindUserResult';
} else {
	if (mysqli_num_rows($findUserResult) > 0 ) {
        $userIDfromDB = '';
        while($row = mysqli_fetch_assoc($findUserResult)){
            $userIDfromDB = $row['userID'];
        };
        $replyMsg = $_POST['replyMsg'];
		addReplyToThread($replyMsg, $userIDfromDB, $conn);
    } else {
        addUserToDB($userIP, $conn);
    };
};

function addUserToDB($userIP, $conn) {
    global $output;
    $ipToMD5 = md5($userIP);
    $MD5toUserID = substr($ipToMD5, 0, 6);
    $insertUserQuery = "INSERT INTO `users` (`userID`, `ipAddress`) VALUES ('$MD5toUserID', '$userIP')";
    $insertUserResult = mysqli_query($conn, $insertUserQuery);
    if (empty($insertUserResult)) {
        $output['errors'][] = 'database error - AddUserToDB';
    } else {
        if ($insertUserResult > 0 ) {
            $replyMsg = $_POST['replyMsg'];
            addReplyToThread($replyMsg, $MD5toUserID, $conn);
        } else {
            $output['errors'][] = 'Failed to add user to table';
        };
    };
}

function addReplyToThread($message, $userID, $conn) {
    global $output;
    $threadID = $_POST['threadID'];
    $insertReplyToThread = "INSERT INTO `$threadID` (`message`, `userID`) VALUES ('$message', '$userID')";
    $insertReplyResult = mysqli_query($conn, $insertReplyToThread);
    if (mysqli_errno($conn)){
        print(mysqli_error($conn));
    };
    if (empty($insertReplyResult)) {
        $output['errors'][] = 'database error - addReplytoThread';
    } else {
        if ($insertReplyResult > 0 ) {
            $insertID = mysqli_insert_id($conn);
            getInsertReply($insertID, $conn, $threadID);
        } else {
            $output['errors'][] = 'no data';
        };
    };
};

function getInsertReply($insertID, $conn, $threadID) {
    global $output;
    $retrieveReplyFromDBQuery = "SELECT * FROM `$threadID` WHERE `postNum` = '$insertID'";
    $retrievedReplyResult = mysqli_query($conn, $retrieveReplyFromDBQuery);
    if (empty($retrievedReplyResult)) {
        $output['errors'][] = 'database error - getInsertReply';
    } else {
        if (mysqli_num_rows($retrievedReplyResult) > 0 ) {
            $output['success'] = true;
            $output['data']=[];
            while( $row = mysqli_fetch_assoc($retrievedReplyResult)){
                $output['data'][] = $row;
                $output['replyFromServerMsg'] = "Reply success!";
            };
        } else {
            $output['errors'][] = 'no data';
        };
    };
}

?>