<?php

	// Carga del fichero de configuración
	if (file_exists("../includes/config.inc.php"))
		require_once("../includes/config.inc.php");
	else
		die("<html><head><title>Zombie Tactics</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de configuraci&oacute;n</body></html>");
	
	// Comprobamos que se ha pasado por login
	if (!isset($_POST["varSesion"])) {
		echo "Acceso no Autorizado";
		die();  // no viene el identificador de sesion
	}
	
	// Inicio de sesión
	session_start();
	
	// Comprobamos si el id de sesión recibido por post coincide con el de la sesión actual
	if ( $_POST["varSesion"] != $_SESSION["id_sesion"] ) 
		die("<H1>Error en ".__FILE__."</H1>Violaci&oacute;n de seguridad.<br />La clave de acceso y la de sesi&oacute;n no coinciden.");
	
	// Carga del fichero de conexion en $_strExternalPath
	if (file_exists($_strExternalPath."mysqlConnectionPreUser.inc.php"))
		require_once($_strExternalPath."mysqlConnectionPreUser.inc.php");
	else
		die("<html><head><title>".$_strAppTitle."</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de conexi&oacute;n</body></html>");
	
	// Preparamos y ejecutamos la consulta
	$consulta = "SELECT nick FROM usuario WHERE nick = '".$_POST["varNick"]."'";
	if ($resultado = mysqli_query($mysqli, $consulta)) {
		echo mysqli_num_rows($resultado); // Devolvemos el número de filas encontradas
		mysqli_free_result($resultado); // Liberamos el conjunto de resultados
	}
	else
		echo "-1"; // Devolvemos -1 si hubo problemas al hacer la consulta
		
	// Cerramos la conexión
	mysqli_close( $mysqli )
		

?>