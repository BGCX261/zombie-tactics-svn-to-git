<?php

    // Carga del fichero de configuración
    if (file_exists("../includes/config.inc.php"))
		require_once("../includes/config.inc.php");
    else
		die("<html><head><title>Zombie Tactics</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de configuraci&oacute;n</body></html>");

    // Comprobamos que se ha pasado por login
    if (!isset($_POST["varSesion"])) {
		die("<html><head><title>".$_strAppTitle."</title></head><body><H1>Error en ".__FILE__."</H1>Acceso no Autorizado</body></html>");
    }

    // Inicio de sesión
    session_start();
	
	// Comprobamos si el id de sesión recibido por post coincide con el de la sesión actual
	if ( $_POST["varSesion"] != $_SESSION["id_sesion"] ) 
		die("<H1>Error en ".__FILE__."</H1>Violaci&oacute;n de seguridad.<br />La clave de acceso y la de sesi&oacute;n no coinciden.");
	
	// Carga del fichero de conexion en $_strExternalPath
	if (file_exists($_strExternalPath."mysqlConnectionUser.inc.php"))
		require_once($_strExternalPath."mysqlConnectionUser.inc.php");
	else
		die("<html><head><title>".$_strAppTitle."</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de conexi&oacute;n</body></html>");
	
	// Consultamos la información del mapa en la base de datos
	$consulta = "SELECT id_mapa, nombre, descripcion, json_mapa FROM mapa WHERE id_mapa = '".$_POST["varIdFase"]."'";
	
	$resultado = mysqli_query($mysqliUser, $consulta);
	$fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC); 
	mysqli_free_result($resultado); // liberamos resultado
	
	if ( isset($fila["id_mapa"]) && ($fila["id_mapa"]==$_POST["varIdFase"]) ){
		$faseBatalla = $fila; 
		
			// Preparamos y ejecutamos la consulta para los ZOMBIES existentes en la fase
			$consulta = "SELECT id_zombie, nombre, nivel, vida, fuerza, destreza, suerte, ataque_corto_alcance, ataque_largo_alcance, experiencia  FROM mapa_has_zombie JOIN zombie ON mapa_has_zombie.zombie_id_zombie = zombie.id_zombie WHERE mapa_has_zombie.mapa_id_mapa=".$_POST["varIdFase"];
			
			$resultado = mysqli_query($mysqliUser, $consulta);
			while( $fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC) ) { 
				$faseBatalla["zombiesEnFase"][] = $fila;
			}
			
			if ( isset($faseBatalla["zombiesEnFase"]) ) 
				echo json_encode($faseBatalla); // devolvemos el resultado como cadena codificada en JSON
			else 
				echo -2; // Problema en la consulta a la base de datos, con la consulta sobre zombies
	}
		
	else 
		echo -1; // Problema en la consulta a la base de datos, con la consulta sobre el mapa
	
	mysqli_free_result($resultado);


	
?>
