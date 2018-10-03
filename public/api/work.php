<?php

require '../../app/common.php';

//get task id
$taskId = intval($_GET['taskId'] ?? 0);

if ($taskId < 1) {
  throw new Exception('Invalid Task ID')
}

//1. fetch all the work for that task id
$workArr = Work::findByTaskId($taskId);

//2. convert to json and print
$json = json_encode($workArr, JSON_PRETTY_PRINT);

//3. print
header('Content-type: application/json');
echo $json;
