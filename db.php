<?php
$conn = new mysqli("localhost", "root", "", "quantdash");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>