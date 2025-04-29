<?php

// Ruta al archivo JSON
$ruta = __DIR__ . '/data/usuarios.json';

// Recibir los datos en JSON
$inputJSON = file_get_contents('php://input');
$nuevoUsuario = json_decode($inputJSON, true);

if (!$nuevoUsuario || !isset($nuevoUsuario['nombre'], $nuevoUsuario['apellidos'], $nuevoUsuario['correo'], $nuevoUsuario['clave'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'mensaje' => 'Datos incompletos']);
    exit;
}

// Leer el contenido actual
$usuarios = json_decode(file_get_contents($ruta), true);

// Añadir el nuevo usuario
$usuarios[] = $nuevoUsuario;

// Guardar de nuevo
file_put_contents($ruta, json_encode($usuarios, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Respuesta de éxito
echo json_encode(['ok' => true, 'mensaje' => 'Usuario guardado']);
