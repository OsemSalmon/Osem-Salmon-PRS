<?php

$hostName = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "osemsalmonprs";

$dbConnect = mysqli_connect($hostName, $dbUsername, $dbPassword, $dbName);

if (!$dbConnect)
{
    die ("Connection to database failed: " . mysqli_connect_error());
}