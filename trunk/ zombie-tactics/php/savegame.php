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

	// Datos que recibimos por post: { varPartidaUsuario : partidaUsuario , varProcedencia : procedencia , varSesion:globalSID } 
	// Valores de varProcedencia posibles: "victoria" "derrota" "pantalla_status" 
	
	$idUsuario = $_POST["varPartidaUsuario"]["id_usuario"]; 
	$arrPer = $_POST["varPartidaUsuario"]["personajes"]; 
	if ( isset($_POST["varPartidaUsuario"]["equipo"]) ) $arrEqu = $_POST["varPartidaUsuario"]["equipo"];
	if ( isset($_POST["varPartidaUsuario"]["fases_superadas"]) ) $arrFas = $_POST["varPartidaUsuario"]["fases_superadas"]; 
	if ( isset($_POST["varPartidaUsuario"]["zombies_eliminados"]) ) $arrZom = $_POST["varPartidaUsuario"]["zombies_eliminados"]; 
	
	
	if ($_POST["varProcedencia"]=="victoria"){ //************************* VICTORIA *******************************
		// Actualizamos personajes
		for ($i=0; $i<count($arrPer); $i++){
			$id = $arrPer[$i]["id_personaje"];
			$niv = $arrPer[$i]["nivel"];
			$exp = $arrPer[$i]["experiencia"];
			$pts = $arrPer[$i]["puntos_habilidad"];
			$aca = $arrPer[$i]["arma_corto_alcance"]["id_item"];
			$ala = $arrPer[$i]["arma_largo_alcance"]["id_item"];
			$consulta = "UPDATE personaje SET nivel = $niv , experiencia = $exp , puntos_habilidad = $pts , arma_corto_alcance = $aca , arma_largo_alcance = $ala WHERE id_personaje = $id";
			mysqli_query($mysqliUser, $consulta);
		}
		// Actualizamos equipo
		
		
		$consulta = "DELETE FROM usuario_tiene_item WHERE usuario_id_usuario = $idUsuario"; 
		mysqli_query($mysqliUser, $consulta);
		
		if ( isset($arrEqu) ){ 
			
			for ($i=0; $i<count($arrEqu); $i++){
				if ( isset ($arrEqu[$i]["id"])) $idIt = $arrEqu[$i]["id"];
				else if ( isset ($arrEqu[$i]["item_id_item"])) $idIt = $arrEqu[$i]["item_id_item"];
				else echo json_encode($arrEqu[$i]);
				
				$cant = $arrEqu[$i]["cantidad"];
				$consulta = "INSERT INTO usuario_tiene_item (usuario_id_usuario, item_id_item, cantidad) VALUES ($idUsuario , $idIt , $cant)";
				mysqli_query($mysqliUser, $consulta);
			}
		}
		// Actualizamos la fase superada si la ha superado por primera vez
		if ( isset($arrFas) ){
			for ($i=0; $i<count($arrFas); $i++){
				if ( !isset ( $arrFas[$i]["fecha"] ) ){
					$idMapa = $arrFas[$i]["mapa_id_mapa"];
					$consulta = "INSERT INTO usuario_supera_mapa (usuario_id_usuario, mapa_id_mapa) VALUES ($idUsuario , $idMapa)"; 
					mysqli_query($mysqliUser, $consulta);
				}
			}
		}
		// Actualizamos número de zombies eliminados
		if ( isset($arrZom) ) {
			for ($i=0; $i<count($arrZom); $i++){
				$idZombie = $arrZom[$i]["id"];
				$nuevosZombies = $arrZom[$i]["cantidad"];
				$consulta = "SELECT numero FROM usuario_mata_zombie WHERE usuario_id_usuario = $idUsuario AND zombie_id_zombie = $idZombie";
				$resultado = mysqli_query($mysqliUser, $consulta);
				$fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC);
				$zombiesAntiguos = $fila["numero"];
				mysqli_free_result($resultado);
				if ($zombiesAntiguos > 0){
					$totalZombiesEliminados = $zombiesAntiguos + $nuevosZombies;
					$consulta = "UPDATE usuario_mata_zombie SET numero = $totalZombiesEliminados WHERE usuario_id_usuario = $idUsuario AND zombie_id_zombie = $idZombie";
				}
				else{
					$consulta = "INSERT INTO usuario_mata_zombie (zombie_id_zombie, usuario_id_usuario, numero) VALUES ($idZombie, $idUsuario , $nuevosZombies)";
				}
				mysqli_query($mysqliUser, $consulta);
			}
		}
		
	}
	else if ($_POST["varProcedencia"]=="derrota"){ //************************* DERROTA *******************************
		// Actualizamos equipo
		if ( isset($arrEqu) ){
			$consulta = "DELETE FROM usuario_tiene_item WHERE usuario_id_usuario = $idUsuario";
			if (!mysqli_query($mysqliUser, $consulta)) echo "error ejecutando $consulta";
			for ($i=0; $i<count($arrEqu); $i++){
				$idIt = $arrEqu[$i]["item_id_item"];
				$cant = $arrEqu[$i]["cantidad"];
				$consulta = "INSERT INTO usuario_tiene_item (usuario_id_usuario, item_id_item, cantidad) VALUES ($idUsuario , $idIt , $cant)";
				mysqli_query($mysqliUser, $consulta);
			}
		}
	}
	else if ($_POST["varProcedencia"]=="pantalla_status"){ //************************* PANTALLA_STATUS *******************************
		// Actualizamos los puntos de habilidad y las habilidades de los personajes
		for ($i=0;  $i<count($arrPer); $i++){ 
			$id = $arrPer[$i]["id_personaje"];
			$pHab = $arrPer[$i]["puntos_habilidad"];
			$vid = $arrPer[$i]["vida"];
			$fue = $arrPer[$i]["fuerza"];
			$des = $arrPer[$i]["destreza"];
			$sue = $arrPer[$i]["suerte"];
			$consulta = "UPDATE personaje SET puntos_habilidad = $pHab , vida = $vid , fuerza = $fue , destreza = $des , suerte = $sue WHERE id_personaje = $id";
			mysqli_query($mysqliUser, $consulta);
		}
	}
	else { //************************* ERROR *******************************
		echo "Error en la procedencia de actualización indicada.";
	}
	
	// Cerramos la conexión
	mysqli_close( $mysqliUser );
	
	// Si todo va bien devolvemos 1. Cualquier otra devolución se considerará un error 
	echo 1; 
	
?>
