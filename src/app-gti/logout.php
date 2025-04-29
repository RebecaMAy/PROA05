<?php // PROVISIONAL SIN EL LOGIN
file_put_contents("../api/data/usuarioActivo.json", json_encode(["logeado" => false], JSON_PRETTY_PRINT));
$rutaRedireccion = "../index.php";
header("Location: $rutaRedireccion");
exit;
