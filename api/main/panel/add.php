<!DOCTYPE html>

<html lang="en">

<head>
    <title>Generate Token</title>
    <meta content="width=device-width,initial-scale=1,shrink-to-fit=no" name=viewport>
    <link rel="stylesheet" type="text/css" href="https://cdn.lucacastelnuovo.nl/css/vanilla/test.css">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Montserrat|Open+Sans:400,700">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"></head>
<body>
    <div class="wrapper">
    <?php if (!isset($_GET['client_token'])) { ?>
        <form class="login" method="post">
            <p class="title">Generate Token</p>
            <div class="input-field">
                <label for="username">Client Username</label>
                <input type="text" name="client_id" class="text validate" id="username" autocomplete="off" autofocus>
            </div>
            <div class="input-field">
                <label for="password">Client Password</label>
                <input type="password" name="client_password" class="text validate" id="password" autocomplete="off">
            </div>
            <div class="input-field">
                <label for="client_ip">Server IP</label>
                <input type="text" name="token_ip" class="text validate" id="client_ip" autocomplete="off">
            </div>
            <button id="submit"><i class="spinner"></i> <span class="state">Generate Token</span></button>
        </form>
        <?php } else {
        require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';
        echo '<form action="index.php" class="login">
        <p class="title">Client Token:</p><textarea rows="9" readonly>' . clean_data($_GET['client_token']) . '</textarea><button type="submit"><span class="state">Back</span></button></form>';
        } ?>
    </div>
    <script src="https://cdn.lucacastelnuovo.nl/js/vanilla/randomBackground.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
    <script src= 'main.js'></script></body>
</html>
