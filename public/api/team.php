<?php

  require '../../app/common.php';

  $teams = Team::fetchAll();
  $json = json_encode($teams, JSON_PRETTY_PRINT);
  header('Content Type: applicaion/json');
  echo $json;
