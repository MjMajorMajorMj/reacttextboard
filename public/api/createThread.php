<?php

$threadTitleUnescape = $_POST['threadName'];
$threadTitle =  mysqli_real_escape_string($conn, $threadTitleUnescape);
$threadTrim = str_replace(" ", "", $threadTitle);
$threadLowerCase = strtolower($threadTrim);
$threadName = substr($threadLowerCase, 0, 10);

$createThreadQuery = "CREATE TABLE `$threadName` (
    `postNum` INT(11) NOT NULL AUTO_INCREMENT,
    `message` TEXT NULL,
    `userID` TINYTEXT NULL,
    `datePosted` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `Index 1` (`postNum`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=0";
$insertThreadResult = mysqli_query($conn, $createThreadQuery);
if (empty($insertThreadResult)) {
    $output['errors'][] = 'database error - AddUserToDB';
} else {
    if ($insertThreadResult > 0 ) {
        updateThreadsTable($threadTitle, $threadName, $conn);
    } else {
        $output['errors'][] = 'Failed to create thread';
    };
};

function updateThreadsTable($threadTitle, $threadName, $conn) {
    global $output;
    $updateThreadsTableQuery = "INSERT INTO `reacttextboard`.`threads` (`threadName`, `threadTitle`) VALUES ('$threadName', '$threadTitle')";
    $updateThreadsResult = mysqli_query($conn, $updateThreadsTableQuery);
    if (empty($updateThreadsResult)) {
        $output['errors'][] = 'database error - updateThreads';
    } else {
        if ($updateThreadsResult > 0 ) {
            $threadNumID = mysqli_insert_id($conn);
            updateInsertedThread($threadName, $threadNumID, $conn);
        } else {
            $output['errors'][] = 'Failed to insert thread';
        };
    };
};

function updateInsertedThread($threadName, $threadNumID, $conn) {
    global $output;
    $newThreadName = $threadName.$threadNumID;
    $updateInsertedThreadQuery = "UPDATE `threads` SET `threadName` = '$newThreadName' WHERE `threadID` = $threadNumID";
    $updateInsertedResult = mysqli_query($conn, $updateInsertedThreadQuery);
    if (empty($updateInsertedResult)) {
        $output['errors'][] = 'database error - updateInsertThread';
    } else {
        if ($updateInsertedResult > 0 ) {
            $updateInsertedThreadTable = "ALTER TABLE `$threadName` RENAME `$newThreadName`";
            $updateInsertedTTResult = mysqli_query($conn, $updateInsertedThreadTable);
            if (empty($updateInsertedTTResult)) {
                $output['errors'][] = 'database error - updateInsertedTable';
            } else {
                if ($updateInsertedTTResult > 0 ) {
                    $_POST['threadID'] = $newThreadName;
                    $_POST['replyMsg'] =  mysqli_real_escape_string($conn, $_POST['threadComment']);
                    include_once 'submitPost.php';
                } else {
                    $output['errors'][] = 'no data';
                };
            };
        } else {
            $output['errors'][] = 'no data';
        };
    };
};

?>