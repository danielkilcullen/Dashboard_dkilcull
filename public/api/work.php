<?php
require '../../app/common.php';

//get task id
$taskId = intval($_GET['taskId'] ?? 0);

//fetch all the work for that task id
$work = work::findByTaskId($taskId);

//convert to json and print
header('Content-type: application/json');
echo json_encode($work);
