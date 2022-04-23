<?php
session_start();

if (isset($_SESSION["userid"]))
{
  echo "<h1>You're signed in!</h1>";
  echo $_SESSION["userid"];
  echo $_SESSION["userName"];
  echo "<a href='includes/signout-inc.php'>Sign Out</a>";
}
?>
<!doctype html>

<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="node_modules\bootstrap\dist\css\bootstrap.css">
        <link rel="stylesheet" href="css/style.css">
        <script src='node_modules\bootstrap\dist\js\bootstrap.bundle.js'></script>
        <title>Sign In</title>
    </head>

    <!-- <body>
        <nav class="navbar fixed-top navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Fixed top</a>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row border border-bottom bg-light">
                <div class="d-flex col-auto justify-content-center" id="navbarLogo">
                    <img src="Project Asset/logo.png" alt="" style="width: 20vh;">
                </div>
                <div class="d-flex col align-items-center">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                          <a class="nav-link active" aria-current="page" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link disabled">Disabled</a>
                        </li>
                      </ul>
                </div>
                <div class="d-flex col-1 align-items-center justify-content-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger">Action</button>
                        <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                          <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="#">Action</a></li>
                          <li><a class="dropdown-item" href="#">Another action</a></li>
                          <li><a class="dropdown-item" href="#">Something else here</a></li>
                          <li><hr class="dropdown-divider"></li>
                          <li><a class="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                      </div>
                </div>
            </div>
        </div>
    </body> -->
</html>
