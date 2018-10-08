<?php

$threadID =  mysqli_real_escape_string($conn, $_POST['threadID']);
$query = "SELECT * FROM `$threadID`";
$result = null;

$result = mysqli_query($conn, $query);

if (empty($result)) {
	$output['errors'][] = 'database error - replies';
} else {
	if (mysqli_num_rows($result) > 0 ) {
		$output['success'] = true;
        $output['data']=[];
        while( $row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        };
    } else {
        $output['errors'][] = 'no data - replies';
    };
};
?>