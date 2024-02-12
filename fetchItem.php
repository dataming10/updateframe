<?php
session_start();
$db = new MysqliApp();

$results = $db->query("SELECT * FROM computer_parts WHERE status = 1")->fetchAll();

echo json_encode(["data" => $results]);
?>
