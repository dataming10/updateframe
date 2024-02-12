<?php
session_start();
$db = new MysqliApp();

$id = isset($_POST['id']) ? $_POST['id'] : null; // Check if id is set
if ($id) {
    $update = "UPDATE computer_parts SET status = 0 WHERE ID = '$id'";
    $db->query($update);
    header("Location: ../../view/deactivated_items.php"); // Redirect to deactivated_items.php after deactivating
    exit(); // Ensure no further code execution after redirect
} else {
    echo "Error: 'id' parameter not found in POST request.";
}
?>
