<?php

if (isset($_POST["submitSignin"]))
{
    $userName = $_POST["userName"];
    $userPassword = $_POST["userPassword"];

    require_once 'db-handler.php';
    require_once 'functions-inc.php';

    if (emptyInputSignIn($userName, $userPassword) !== false)
    {
        header("location: ../index.html?error=emptyinput");
        exit();
    }

    signInUser ($dbConnect, $userName, $userPassword);
}

else
{
    header("location: ../index.html");
    exit();
}