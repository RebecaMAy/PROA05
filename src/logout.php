<?php
file_put_contents("api/data/usuarioActivo.json", json_encode(["logeado" => false]));
header("Location: index.php");
exit;
