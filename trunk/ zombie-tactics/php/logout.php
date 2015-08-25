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
	
	$_var = session_destroy(); // bool session_destroy ( void )
    echo $_var;
	
	/* 
	session_destroy() destruye toda la información asociada con la sesión actual. No destruye ninguna de las variables globales asociadas con la sesión, ni destruye la cookie de sesión. Para volver a utilizar las variables de sesión se debe llamar a session_start().

	Para destruir la sesión completamente, como desconectar al usuario, el id de sesión también debe ser destruido. Si se usa una cookie para propagar el id de sesión (comportamiento por defecto), entonces la cookie de sesión se debe borrar. setcookie() se puede usar para eso.
	Report a bug
	reject note Valores devueltos

	Devuelve TRUE en caso de éxito o FALSE en caso de error.
	*/
	
?>
