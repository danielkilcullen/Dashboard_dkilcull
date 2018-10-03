<?php

class Team {
  public $id;
  public $name;
  public $hourly_rate;

  public function __construct($data){
    $this->id = intval($data['id']);
    $this->name = $data['name'];
    $this->hourly_rate = floatval($data['hourly_rate'])

  }

  public static function fetchAll() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW)

    $sql = 'SELECT * FROM Teams';
    $statement = $db->prepare($sql);

    $success = $statement->execute();

    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theTeam = new Team($row);
      array_push($arr, $theTeam);
    }
    .return $arr;
  }


}
