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
	if ( $_POST["varSesion"] != $_SESSION["id_sesion"] ) {
		die("<H1>Error en ".__FILE__."</H1>Violaci&oacute;n de seguridad.<br />La clave de acceso y la de sesi&oacute;n no coinciden.");
	}
	
	// Carga del fichero de conexion en $_strExternalPath
	if (file_exists($_strExternalPath."mysqlConnectionUser.inc.php"))
		require_once($_strExternalPath."mysqlConnectionUser.inc.php");
	else
		die("<html><head><title>".$_strAppTitle."</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de conexi&oacute;n</body></html>");
	
	// Recuperamos la id de usuario mediante el nick de usuario (único para cada usuario)
	$consulta = "SELECT id_usuario FROM usuario WHERE nick = '".$_POST["varNick"]."'";
	$resultado = mysqli_query($mysqliUser, $consulta);
	$fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC); // $fila = $resultado->fetch_assoc();
	$idUsuario = $fila["id_usuario"];
	mysqli_free_result($resultado); // liberamos resultado
	
	// Preparamos y ejecutamos la consulta para los datos del usuario jugador
	$consulta = "SELECT id_usuario, nick, email FROM usuario WHERE id_usuario = $idUsuario"; 
	$resultado = mysqli_query($mysqliUser, $consulta);
	$usuario = mysqli_fetch_array($resultado, MYSQLI_ASSOC); // Guardamos la consulta como un array asociativo en "$usuario"
	mysqli_free_result($resultado); // liberamos resultado
	
	// Preparamos y ejecutamos la consulta para los datos de los PERSONAJES del usuario jugador
	$consulta = "SELECT * FROM personaje WHERE usuario_id_usuario = $idUsuario"; 
	$resultado = mysqli_query($mysqliUser, $consulta);
	while( $fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC) ) { // Mientras haya filas en $resultado... 
		$usuario["personajes"][] = $fila; // ...las cargamos en el array de personajes dentro de $usuario["personajes"]
	}
	mysqli_free_result($resultado); 
	
	
	// Preparamos y ejecutamos la consulta para los datos de las ARMAS DE LOS PERSONAJES del usuario jugador
	$numElementos = count($usuario["personajes"]);
	for ($i = 0; $i < $numElementos; $i++) {
	
		$consulta = "SELECT * FROM item WHERE id_item = ".($usuario["personajes"][$i]["arma_corto_alcance"]); // afinar
		$resultado = mysqli_query($mysqliUser, $consulta);
		$fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC); 
		$usuario["personajes"][$i]["arma_corto_alcance"] = $fila;
		mysqli_free_result($resultado); 
		
		$consulta = "SELECT * FROM item WHERE id_item = ".($usuario["personajes"][$i]["arma_largo_alcance"]); // afinar
		$resultado = mysqli_query($mysqliUser, $consulta);
		$fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC); 
		$usuario["personajes"][$i]["arma_largo_alcance"] = $fila;
		mysqli_free_result($resultado); 
	}

	// Preparamos y ejecutamos la consulta para el EQUIPO del jugador
	$consulta = "SELECT usuario_id_usuario, item_id_item, nombre, efecto, cantidad FROM usuario_tiene_item JOIN item ON usuario_tiene_item.item_id_item = item.id_item WHERE usuario_id_usuario = $idUsuario";
	
	$resultado = mysqli_query($mysqliUser, $consulta);
	while( $fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC) ) { 
		$usuario["equipo"][] = $fila;
	}
	mysqli_free_result($resultado); 

	// Preparamos y ejecutamos la consulta para las FASES superadas por el jugador [{"usuario_id_usuario":"43","mapa_id_mapa":"1","fecha":"2013-02-20 20:41:37"}]
	$consulta = "SELECT mapa_id_mapa, fecha FROM usuario_supera_mapa WHERE usuario_id_usuario = $idUsuario";  // esto hay que arreglarlo
	$resultado = mysqli_query($mysqliUser, $consulta);
	while( $fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC) ) { 
		$usuario["fases_superadas"][] = $fila; 
	}
	mysqli_free_result($resultado); 
	
	// Preparamos y ejecutamos la consulta para el record con el número y los diferentes tipos de zombie eliminados por el usuario
	$consulta = "SELECT * FROM usuario_mata_zombie WHERE usuario_id_usuario = $idUsuario";  
	$resultado = mysqli_query($mysqliUser, $consulta);
	while( $fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC) ) { 
		$usuario["zombies_eliminados"][] = $fila;
	}
	mysqli_free_result($resultado); 

	// Cerramos la conexión
	mysqli_close( $mysqliUser );
	
	// Guardamos en la sesión la información necesaria para cargar partida
	$_SESSION["partidaUsuario"] = $usuario;
	
	if (isset ($_SESSION["partidaUsuario"]) )
		echo 1;
	else
		echo -1;
	
?>
	
