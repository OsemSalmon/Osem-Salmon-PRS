<?php
session_start();
session_unset();
session_destroy();

echo "signed out";
//header("location: ../index.html");
exit();