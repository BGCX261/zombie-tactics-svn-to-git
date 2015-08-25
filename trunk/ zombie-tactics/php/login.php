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
	
	// Comprobamos si el id de sesión recibido por post coincide con el de sesión
	if ( $_POST["varSesion"] != $_SESSION["id_sesion"] ) 
		die("<H1>Error en ".__FILE__."</H1>Violaci&oacute;n de seguridad.<br />La clave de acceso y la de sesi&oacute;n no coinciden.");
	
	// Carga del fichero de conexion en $_strExternalPath
	if (file_exists($_strExternalPath."mysqlConnectionUser.inc.php"))
		require_once($_strExternalPath."mysqlConnectionUser.inc.php");
	else
		die("<html><head><title>".$_strAppTitle."</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de conexi&oacute;n</body></html>");
	
	
	// Preparamos y ejecutamos la consulta
	$consulta = "SELECT nick FROM usuario WHERE nick = '".$_POST["varNick"]."' AND contrasenya = '".$_POST["varPass"]."' AND activado = '1'";
	if ($resultado = mysqli_query($mysqliUser, $consulta)){
		if ( mysqli_num_rows($resultado) == 1){
			echo $_SESSION["login"];
		}
		else{ // Si no hubo exactamente un resultado, no se permite el login
			echo $_SESSION["noLogin"];
		}
		mysqli_free_result($resultado); // Liberamos el conjunto de resultados
	}
	else{
		echo $_SESSION["noLogin"];
	}
	// Cerramos la conexión
	mysqli_close( $mysqliUser )
		
?>
