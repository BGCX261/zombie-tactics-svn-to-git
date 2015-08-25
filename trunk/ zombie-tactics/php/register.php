<?php
	// data: { varPersonaje:personajeNuevo, varNick:nickARegistrar, varPass:passARegistrar, varEmail:emailARegistrar, varSesion:globalSID }

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
	
	// Preparamos y ejecutamos la consulta
	// $consulta = "SELECT nick FROM usuario WHERE nick = '".$_POST["varNick"]."'";

	
	$consulta = "INSERT INTO usuario (nick, email, contrasenya, activado) VALUES ('".$_POST["varNick"]."', '".$_POST["varEmail"]."', '".$_POST["varPass"]."', '0')";
	
	if ( mysqli_query($mysqliUser, $consulta) ) { // Comprobamos si la consulta inserta el registro satisfactoriamente
		
		$idNuevoUsuario = mysqli_insert_id( $mysqliUser ); // Averiguamos la ID del nuevo usuario (generada por AutoIncrement)
		
		$pNU = $_POST["varPersonaje"]; // Asignamos el objeto personaje a una variable con un nombre corto y manejable
		
		// Preparamos la consulta para el insert en la tabla personaje
		$consulta = "INSERT INTO personaje (nombre , nivel, experiencia, sexo, puntos_habilidad, vida, fuerza, destreza, suerte, usuario_id_usuario) VALUES ('".$pNU["nombre"]."' , '".$pNU["nivel"]."' , '".$pNU["experiencia"]."' , '".$pNU["sexo"]."' , '".$pNU["puntos_habilidad"]."' , '".$pNU["vida"]."' , '".$pNU["fuerza"]."' , '".$pNU["destreza"]."' , '".$pNU["suerte"]."' , '".$idNuevoUsuario."' )";
		
		// echo $consulta;
		
		if ( mysqli_query($mysqliUser, $consulta) ){
			echo "1"; // Devolvemos 1 Si ambas consultas han ido bien
		}
		else{
			
			echo $consulta;
			
			// Si no se creó el personaje, intentamos borrar el usuario, para que se pueda repetir el procedimiento completo
			$consulta = "DELETE FROM usuario WHERE usuario_id_usuario = ".$idNuevoUsuario."'";
			mysqli_query($mysqliUser, $consulta); 
			echo "-2"; // Devolvemos -2 si hubo problemas al hacer la segunda consulta
		}
	}
	else
		echo "-1"; // Devolvemos -1 si hubo problemas al hacer la primera consulta
		
	// Cerramos la conexión
	mysqli_close( $mysqliUser )
		
	
	
	
	
	
	/*Building inserts can be annoying. This helper function inserts an array into a table, using the key names as column names:

	<?php
		private function store_array (&$data, $table, $mysqli){
			$cols = implode(',', array_keys($data));
			foreach (array_values($data) as $value){
				isset($vals) ? $vals .= ',' : $vals = '';
				$vals .= '\''.$this->mysql->real_escape_string($value).'\'';
			}
			$mysqli->real_query('INSERT INTO '.$table.' ('.$cols.') VALUES ('.$vals.')');
		}
	?>
	*/
	
	// POST data: { varNick : nickARegistrar, varPass : passARegistrar, varEmail : emailARegistrar, varSesion : globalSID }
	
	
?>

