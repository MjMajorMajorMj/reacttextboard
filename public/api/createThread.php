<?php

$threadTitle = $_POST['threadName'];
$threadName = substr($threadTitle, 0, 8);
$message = $_POST['threadComment'];

$createThreadQuery = "CREATE TABLE `$threadName` (
    `postNum` INT(11) NOT NULL AUTO_INCREMENT,
    `message` TEXT NULL,
    `userID` TINYTEXT NULL,
    `datePosted` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `Index 1` (`postNum`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1";
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
            include_once 'submitPost.php';
        } else {
            $output['errors'][] = 'Failed to insert thread';
        };
    };
};

?>