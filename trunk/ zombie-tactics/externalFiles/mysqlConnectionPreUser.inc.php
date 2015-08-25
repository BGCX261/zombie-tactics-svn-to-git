<?php

	// Datos conexión a BBDD con permisos de sólo lectura
	$servidorBBDD = '127.0.0.1'; // no se debe usar "localhost"
	$nombreUsuarioBBDD = 'zt_readonly';
	$passUsuarioBBDD = 'passSL';
	$nombreBBDD = 'zombietactics';
	
	// Establecemos la conexión
	$mysqli = new mysqli($servidorBBDD, $nombreUsuarioBBDD, $passUsuarioBBDD, $nombreBBDD);
	

?>
