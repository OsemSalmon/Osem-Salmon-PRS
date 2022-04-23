<?php

function emptyInputRegister($userFullName, $userEmail, $userName, $userPassword, $userPasswordR)
{
    $result = NULL;

    if (empty($userFullName) || empty($userEmail) || empty($userName) || empty($userPassword) || empty($userPasswordR))
    {
        $result = true;
    }

    else
    {
        $result = false;
    }

    return $result;
}

function invalidUserName($userName)
{
    $result = NULL;

    if (!preg_match("/^[a-zA-Z0-9]*$/", $userName))
    {
        $result = true;
    }

    else
    {
        $result = false;
    }

    return false;
}

function invalidUserEmail($userEmail)
{
    $result = NULL;

    if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL))
    {
        $result = true;
    }

    else
    {
        $result = false;
    }

    return false;
}

function passwordMatch($userPassword, $userPasswordR)
{
    $result = NULL;

    if ($userPassword !== $userPasswordR)
    {
        $result = true;
    }

    else
    {
        $result = false;
    }

    return false;
}

function userNameExist($dbConnect, $userName)
{
    $sql = "SELECT * FROM tableusers WHERE userName = ?;";
    $stmt = mysqli_stmt_init($dbConnect);

    if (!mysqli_stmt_prepare($stmt, $sql))
    {
        header("location: ../register.html?error=stmtfailed");
    }

    mysqli_stmt_bind_param($stmt, "s", $userName);
    mysqli_stmt_execute($stmt);
    
    $resultDatabase = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultDatabase))
    {
        return $row;
    }

    else
    {
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);
}

function createUser($dbConnect, $userFullName, $userEmail, $userName, $userPassword)
{
    $sql = "INSERT INTO tableusers (userFullName, userEmail, userName, userPassword) VALUES (?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($dbConnect);

    if (!mysqli_stmt_prepare($stmt, $sql))
    {
        header("location: ../register.html?error=stmtfailed");
    }

    $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "ssss", $userFullName, $userEmail, $userName, $hashedPassword);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    header("location: ../index.html?error=registernone");
    exit();
}

//login functions
function emptyInputSignIn( $userName, $userPassword)
{
    $result = NULL;

    if (empty($userName) || empty($userPassword))
    {
        $result = true;
    }

    else
    {
        $result = false;
    }

    return $result;
}

function signInUser ($dbConnect, $userName, $userPassword)
{
    $userNameExist = userNameExist($dbConnect, $userName);

    if ($userNameExist === false)
    {
        header("location: ../index.html?error=wronglogin");
        exit();
    }

    $comparePassword = $userNameExist["userPassword"];
    $checkPassword = password_verify($userPassword, $comparePassword);

    if ($checkPassword === false)
    {
        header("location: ../index.html?error=wronglogin");
        exit();
    }

    elseif ($checkPassword === true)
    {
        session_start();
        $_SESSION["userid"] = $userNameExist["userid"];
        $_SESSION["userName"] = $userNameExist["userName"];
        header("location: ../dashboard.php");
        exit();
    }
}