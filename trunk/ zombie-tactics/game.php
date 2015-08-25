<?php
    
    // Carga del fichero de configuración
    if (file_exists("./includes/config.inc.php"))
        require_once("./includes/config.inc.php");
    else
        die("<html><head><title>Zombie Tactics</title></head><body><H1>Error en ".__FILE__."</H1>Falta el fichero de configuraci&oacute;n</body></html>");
    
    // Comprobamos que se ha pasado por login
    if (!isset($_POST["varSesion"])) { //
		die("<html><head><title>".$_strAppTitle."</title></head><body><H1>Error en ".__FILE__."</H1>Acceso no Autorizado</body></html>");
    }
	
    // Inicio de sesión
    session_start();
	
	// Comprobamos si el id de sesión recibido por post coincide con el de la sesión actual
	if ( $_POST["varSesion"] != $_SESSION["id_sesion"] ) 
		die("<H1>Error en ".__FILE__."</H1>Violaci&oacute;n de seguridad.<br />La clave de acceso y la de sesi&oacute;n no coinciden.");
	
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
	<link type='text/css' rel='stylesheet' href='css/combates.css' media='screen'/>
	<link type='text/css' rel='stylesheet' href='css/game.css'/>
	<link type='text/css' rel='stylesheet' href='css/menus.css'/> 
	
	<!-- JavaScript, librerías externas -->
	<script lang="javascript" type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
	<script lang="javascript" type="text/javascript" src="js/jquery-ui-1.10.1.custom.min.js"></script>
	<script lang="javascript" type="text/javascript" src="js/sha1.js"></script>
	
	<!-- JavaScript integrado, variable global con los datos de la partida y ajuste dinámico de tamaño de capa -->
	<script lang="javascript" type='text/javascript'>
		var partidaUsuario = JSON.parse('<?php echo json_encode( $_SESSION["partidaUsuario"] ); ?>');
		var globalSID = "<?=$_SESSION['id_sesion']?>"; // re-creamos la variable global para esta nueva ventana
		var globalURLPHP = "<?=$_strPHPURL;?>";
		// var faseBatalla; // Esta variable se usará cuando carguemos una fase de batalla desde el mapa eliminar, es faseActual en zt.batalla.js
		// alert(JSON.stringify(partidaUsuario) )
		
		// Función para que la capa que muestra el contenido del juego ajuste su tamaño respecto al tamaño del navegador
		function ajustarCapaCentral() {
			var altura_navegador = $(document).height(); // con $(window).height no parece funcionar si la página no es cargada directamente
			// imprime( altura_navegador+' ' );
			$('#contenedor_central').css('height',(altura_navegador-60) );
		}
		// Ajustamos la altura del contenedor del mapa al cargar página y al cambiar el tamaño navegador
		jQuery.event.add(window, 'load', ajustarCapaCentral);
		jQuery.event.add(window, 'resize', ajustarCapaCentral);
		

		// Función que utilizamos luego para que el texto de los menús no se pueda seleccionar
		$.fn.extend({
			disableSelection: function() {
				this.each(function() {
					if (typeof this.onselectstart != 'undefined') {
						this.onselectstart = function() { return false; };
					} else if (typeof this.style.MozUserSelect != 'undefined') {
						this.style.MozUserSelect = 'none';
					} else {
						this.onmousedown = function() { return false; };
					}
				});
			}
		});
		
		
	</script>	
	
	<!-- JavaScript, librerías de la aplicación -->
	<script lang="javascript" type="text/javascript" src="js/zt.menu.js"></script>
	<script lang="javascript" type="text/javascript" src="js/zt.personaje.js"></script>
	<script lang="javascript" type="text/javascript" src="js/zt.batalla.js"></script>
	<script lang="javascript" type="text/javascript" src="js/zt.game.js"></script>
	
</head>

<body>
	<div id='capaTexto' style='position:absolute; color:white'></div> <!-- nos sirve para mostrar los mensajes del mapa -->
		<div id='contenedor_juego'>
			<div id='contenedor_superior' >
				<!-- El contenido de este div se cargará dinámicamente -->
			</div>
			<div id='contenedor_central' >
				<div id='contenedor_tablero' >
					<!-- El contenido de este div se cargará dinámicamente -->
				</div> 
			</div>
			<div id="contenedor_inferior">
				<div class="submenuInfFake"></div> <!-- Necesario para conservar altura al minimizar todos los submenus inferiores-->
				<!-- El resto del contenido de este div se cargará dinámicamente -->
			</div> 
		</div> <!-- fin contenedor juego -->
</body>
</html>