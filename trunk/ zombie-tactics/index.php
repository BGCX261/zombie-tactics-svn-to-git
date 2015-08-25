<?php
    
    // Carga del fichero de configuración
    if (file_exists("./includes/config.inc.php"))
        require_once("./includes/config.inc.php");
    else
        die("<html><head><title>Zombie Tactics</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de configuraci&oacute;n</body></html>");
    
    // Carga del fichero de configuración mysqlConnectionUser.inc.php
	
    if (file_exists($_strExternalPath."/mysqlConnectionPreUser.inc.php"))
        require_once($_strExternalPath."/mysqlConnectionPreUser.inc.php");
    else
        die("<html><head><title>".$_strAppTitle."</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de mysqlConnection.inc.php</body></html>");
	
	
    // Inicio de sesión
    session_start();
    
    // Generamos los parametros de la sesion
    $_SID = session_id();
    $_SI = md5(chr(mt_rand(48, 122))."YAY".time().chr(mt_rand(48, 122)) );
    $_NO = md5(chr(mt_rand(48, 122))."OUCH".time().chr(mt_rand(48, 122)) );
    
    // Guardamos los parametros en la sesion
    $_SESSION["id_sesion"] = $_SID; 
    $_SESSION["login"] = $_SI; 
    $_SESSION["noLogin"] = $_NO;

    // echo " <br /> \$_SID=".$_SID." <br />\$_SI=".$_SI." <br />\$_NO=".$_NO."<br />\$_SESSION=".implode(' + ', $_SESSION)."<br />";
?>

<html>

<head>

	<title><?php echo $_strAppTitle;?></title>
	
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta name="author" lang="es" content="Juan Jesus Ligero"/>
	<meta name="copyright" content="&copy; 2013, Juan Jesus Ligero"/>
	<meta name="robots" content="noindex, nofollow"/>
	
	<!-- Favicon -->
	<link rel="icon" href="images/favicon.ico"> 
	<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon"> 
	
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="css/index.css" media="screen" />
	
	<!-- JavaScript, librerías -->
	<script src="js/jquery-1.9.1.min.js" lang="javascript" type="text/javascript"></script>
	<script src="js/sha1.js" lang="javascript" type="text/javascript"></script>
	
	<!-- JavaScript, variables globales -->
	<script type="text/javascript">
	/* Si este proyecto no tuviera una finalidad académica, no usaríamos estas variables globales y ofuscaríamos el código para una mayor seguridad. 
	 La intención del código presentado es que prime la claridad del mismo. */
	var globalURLPHP = "<?php echo $_strPHPURL;?>";
	var globalSI = "<?php echo $_SI;?>"; var globalNO = "<?php echo $_NO;?>"; var globalSID = "<?php echo $_SID;?>";
	</script>			
	
	<!-- JavaScript, librerías aplicación -->        
	<script src="js/index.js" lang="javascript" type="text/javascript"></script>
   
</head>



<!-- BODY ================================================================= -->
<body>
		
	<noscript>
		<H1>Su navegador no soporta JavaScript o bien lo tiene desactivado.</H1>
		<H2>
			Esta p&aacute;gina necesita Javascript.	Por favor, active JavaScript en su navegador actual o instale uno de los siguientes:<br>
			Mozilla Firefox ?.? o posterior <a href="http://www.mozilla.org/firefox/">http://www.mozilla.org/firefox/</a><br>
			Google Chrome ?.? o posterior <a href="http://www.google.com/chrome/">http://www.google.com/chrome/</a>
		</H2>
	</noscript>
		
	<div id="capaOculta"> <!-- Capa para mostrar la creación de personaje -->
		 
	</div> 

	<div id="contenedor">
		
		<div class="tabs">
			<!-- PESTAÑA INICIO ================================================================= -->   		
			<div class="tab"><input id="tab-1" name="tab-group-1" checked="" type="radio"><br>
				<label for="tab-1">Inicio</label><br>
				<div class="content">
					<div><img id="logo_big" src="./images/decoration_logo_big.jpg"> Zombie Tactics es un juego de estrategia por turnos ambientado en un mundo postapocal&iacute;ptico en el que la humanidad acaba de ser pr&aacute;cticamente barrida de la faz de la tierra por una pandemia de muertos vivientes. &iexcl;Escapa de las hordas de monstruos, busca un refugio y ayuda e intenta acabar con la amenaza! &iquest;Ser&aacute;s capaz de sobrevivir?  </div>
					<!-- <div class="centrar"> <img src="./images/decoration_logo_big.jpg"></div> -->
				</div>
			</div>
			
			<!-- PESTAÑA RECORDS ================================================================= -->   
			<div class="tab">
				<input id="tab-2" name="tab-group-1" type="radio"><br>
				<label for="tab-2">Records</label><br>
				<div class="content">
				
				<?php				
					// Preparamos y ejecutamos la consulta para los datos de los PERSONAJES del usuario jugador
					$consulta = "SELECT nick, numero FROM usuario_mata_zombie JOIN usuario ON usuario_mata_zombie.usuario_id_usuario = usuario.id_usuario ORDER BY numero DESC LIMIT 0, 10;"; 
					// $filas;
					$resultado = mysqli_query($mysqli, $consulta);
					
					echo "<table class='marcador_zombies'>";
					echo "<tr><th>¡Los mejores caza-zombies!</th><th>Zombies eliminados</th></tr>";
					while( $fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC) ) { // Mientras haya filas en $resultado... 
						//filas[] = $fila; // ...las cargamos en el array de personajes dentro de filas
						echo "<tr><td>".$fila["nick"]."</td><td>".$fila["numero"]."</td></tr>";
					}
					mysqli_free_result($resultado); 
					echo "</table>";
				?>
					
				</div>
			</div> <!-- Fin pestaña records -->   
		
		
			
			<!-- PESTAÑA REGISTRO ================================================================= -->   
			<div class="tab"><input id="tab-3" name="tab-group-1" type="radio"><br>
				<label for="tab-3">Registro</label><br>
				<div class="content">
					<form id ="registro" action="" method="post">
					  <fieldset>
						<legend>Datos de registro</legend>
						<label for="nombre">Nombre de usuario</label><br/>
						<input type="text" name="reg_nick" id="reg_nick" size="40" maxlength="40"
							   onclick="compruebaCampo('nick', this);"
							   onkeyup="compruebaCampo('nick', this);"
							   onblur="compruebaCampo('nick', this);"
							   />
						<span id="alert_reg_nick">Debe rellenar este campo.</span>
						<br/>
						<input id="reg_btn_disponible" type="button"
							   value="Comprobar disponibilidad de nombre"
							   onclick="nickDisponible(0);"
							   />
						<br/><hr>
						<label for="email">E-mail</label><br />
						<input type="text" name="reg_email" id="reg_email" size="40" maxlength="320"
							   onclick="compruebaCampo('email', this);"
							   onkeyup="compruebaCampo('email', this);"
							   onblur="compruebaCampo('email', this);"
							   />
						<span id="alert_reg_email">Debe rellenar este campo.</span>
						<br/><hr>
						<label for="pass1">Contrase&ntilde;a</label><br/>
						<input type="password" name="reg_pass1" id="reg_pass1" size="40" maxlength="40"
							   onclick="compruebaCampo('pass', this);"
							   onkeyup="compruebaCampo('pass', this);"
							   onblur="compruebaCampo('pass', this);"
							   />
						<span id="alert_reg_pass1">Debe rellenar este campo.</span>
						<br/><hr>
						<label for="pass2">Repetir contrase&ntilde;a</label><br/>
						<input type="password" name="reg_pass2" id="reg_pass2" size="40" maxlength="40"
							   onclick="compruebaCampo('pass', this);"
							   onkeyup="compruebaCampo('pass', this);"
							   onblur="compruebaCampo('pass', this);"
							   />
						<span id="alert_reg_pass2">Debe rellenar este campo.</span>
						<br/><hr>
						<legend>Aceptacion de condiciones</legend>
						<input id="reg_chkbx_acuerdo" name="acuerdo" type="checkbox" value="acuerdo"
							   onclick="compruebaCampo('checkBox', this);" /> He le&iacute;do y acepto las <span title="Leer condiciones de uso" id="condiciones_uso" onclick="muestraCondiciones()">condiciones de uso</span>. 
						<span id="alert_reg_chkbx_acuerdo">Debe aceptar las condiciones.</span>
						<br/><hr>
						<input id="reg_btn_enviar" type="button" value="Registrar nombre de usuario"
							   onclick="enviarDatosRegistro();" />
					  </fieldset>
					</form>
				</div>
			</div>
			
			<!-- PESTAÑA LOGIN ================================================================= -->   
			<div class="tab">
				<input id="tab-4" name="tab-group-1" type="radio"><br>
				<label for="tab-4">Entrar</label><br>
				<div class="content">
				<form id ="login" action="" method="post">
				  <fieldset>
					<legend>Inserte nombre de usuario y contrase&ntilde;a</legend>
					<label for="log_nick">Nombre de usuario</label><br/>
					<input type="text" name="log_nick" id="log_nick" size="30" maxlength="30"			value=""
						   onkeypress="validar(event)"
						   />
					<span id="alert_nick2"></span>
					<br/><hr>
					<label for="log_pass">Contrase&ntilde;a</label><br/>
					<input type="password" name="log_pass" id="log_pass" size="30" maxlength="30" 	value=""
						   onkeypress="validar(event)"
						   />
					<span id="alert_log_pass"></span>
					<br/><hr>
					<input id="log_btn_enviar" type="button" value="Entrar a jugar"
						   onclick="enviarLogin();" />
				  </fieldset>
				</form>
				</div>
			</div> <!-- Fin pestaña login -->   
		</div>
		
	</div> <!-- Fin contenedor -->   	
	
	
</body>
</html>
