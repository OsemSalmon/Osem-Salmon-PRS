<?php

if (isset($_POST["submitRegister"]))
{
    $userFullName = $_POST["userFullName"];
    $userEmail = $_POST["userEmail"];
    $userName = $_POST["userName"];
    $userPassword = $_POST["userPassword"];
    $userPasswordR = $_POST["userPasswordR"];

    require_once 'db-handler.php';
    require_once 'functions-inc.php';

    //check if form is empty
    if (emptyInputRegister($userFullName, $userEmail, $userName, $userPassword, $userPasswordR) !== false)
    {
        header("location: ../register.html?error=emptyinput");
        exit();
    }
    //check if username is correct
    if (invalidUserName($userName) !== false)
    {
        header("location: ../register.html?error=invalidusername");
        exit();
    }
    //check if email is correct
    if (invalidUserEmail($userEmail) !== false)
    {
        header("location: ../register.html?error=invalidemail");
        exit();
    }
    //check if passwords match
    if (passwordMatch($userPassword, $userPasswordR) !== false)
    {
        header("location: ../register.html?error=passwordmismatch");
        exit();
    }
    //check if username exist in db
    if (userNameExist($dbConnect, $userName) !== false)
    {
        header("location: ../register.html?error=usernotexist");
        exit();
    }

    registerUser($dbConnect, $userFullName, $userEmail, $userName, $userPassword);
}

else
{
    header("location: ../register.html");
    exit();
}