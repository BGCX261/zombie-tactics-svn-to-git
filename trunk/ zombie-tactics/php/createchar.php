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
	
	// Mostramos la capa de creación de personaje
	echo '
		<div>
		
          <form id ="formdatospers" name="fdatosp" action="" method="post">
          <fieldset>
            <legend>Sólo un paso más. Antes de completar el registro debes crear tu personaje principal</legend>
			<img id="img_personaje" alt="personaje" src="images/S_M_Portrait.png" height="776 px" width="360 px"></img>
			<br/>
			<fieldset>
            <legend>Datos de personaje</legend>
            <label for="nombre">Nombre del personaje:</label><br/>
            <input type="text" name="nombrepersonaje" id="input_nombre_personaje" size="30" maxlength="30"
                   onclick="cambiaNombre();"
                   onkeyup="cambiaNombre();"
                   onblur="cambiaNombre();"
                   />
			<br/>
            <span id="alert_input_nombre_personaje">(Puedes cambiar el nombre si quieres)</span>
            
            <br/>
            <br/>

            <label for="sexo">Sexo:</label><br/>
            <input type="radio" name="sexo" value="hombre" checked="checked" onclick="cambiaSexo();" /> Hombre
            <input type="radio" name="sexo" value="mujer" onclick="cambiaSexo();" /> Mujer
            <br/>

            <br/>
            
            Nivel actual: <span id="alert_nivel">0</span>

            <br/>
            <br/>

            Puntos de Experiencia:  <span id="alert_experiencia">0</span>

            <br/>
            <br/>


            Puntos de Habilidad a repartir: <span id="alert_puntos_habilidad">10</span>
            <br/>
			<br/>
            <table>
			<tr>
				<td> <label for="Vida">Vida: </label> </td>
				<td id="vida">
					<input type="button" value="-" onclick="modificaAtributo(this);" />
					<input type="text" value="0" id="input_vida" class="atributo" size="3" maxlength="3" readonly="true"/>
					<input type="button" value="+" onclick="modificaAtributo(this);" />
				</td>
				
			</tr>
			<tr>
				<td> <label for="Fuerza">Fuerza: </label> </td>
				<td id="fuerza">
					<input type="button" value="-" onclick="modificaAtributo(this);" />
					<input type="text" value="0" id="input_fuerza" class="atributo" size="3" maxlength="3" readonly="true"/>
					<input type="button" value="+" onclick="modificaAtributo(this);" />
				</td>
				
			</tr>
			<tr>
				<td> <label for="Destreza">Destreza: </label> </td>
				<td id="destreza">
					<input type="button" value="-" onclick="modificaAtributo(this);" />
					<input type="text" value="0" id="input_destreza" class="atributo" size="3" maxlength="3" readonly="true"/>
					<input type="button" value="+" onclick="modificaAtributo(this);" />
				</td>
				
			</tr>
			<tr>
				<td> <label for="Suerte">Suerte: </label> </td>
				<td id="suerte">
					<input type="button" value="-" onclick="modificaAtributo(this);" />
					<input type="text" value="0" id="input_suerte" class="atributo" size="3" maxlength="3" readonly="true"/>
					<input type="button" value="+" onclick="modificaAtributo(this);" />
				</td>
				
			</tr>
			</table> 
			<br/>
			<div id="alert_crear_personaje">&nbsp;</div>
			
			</fieldset>
			<br/>
            <br/>
			<fieldset>
			<legend>Creación del personaje</legend>
			
			<br/>
			Tus puntos de habilidad puedes repartirlos ahora o reservarlos para más tarde. Se acumularán y podrás repartirlos la próxima vez que subas de nivel.
			<br/>
			<br/>
			<input id="btn_crear_personaje" type="button" value="Crear Personaje" />
            </fieldset>
        </fieldset>
		
        </form>

		</div>
		';
?>
