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
	
	// Mostramos la capa de condiciones de uso
	echo '
		<h2>Condiciones de uso</h2>

1) Este acuerdo fija los términos legales de su (en adelante JUGADOR) utilización del juego de estrategia Zombie Tactics (en adelante ZT). Estos términos podrán ser modificados por ZT, y tales modificaciones se harán efectivas al ser publicadas en el sitio web de ZT.

Al jugar ZT, usted certifica y garantiza que tiene el derecho, la autoridad y la capacidad para participar de este acuerdo, y acepta todos los términos y condiciones de este contrato.<br><br>

2) Violar cualquiera de estos términos, de acuerdo al criterio de ZT, traerá una o más de estas consecuencias:<br>

    penalización temporal<br>
    cancelación de cuenta<br>
    prohibición permanente<br>
    borrado o modificación de cualquier o de todos los contenidos del JUGADOR<br><br>

3) El JUGADOR no está autorizado a hacer, escribir o enviar a otros miembros cualquier información cuyo contenido sea ilegal.<br><br>

4) El JUGADOR no está autorizado a escribir o enviar a ningún miembro cualquier material que infringe o viola los derechos de un tercero (incluyendo, aunque no limitándose a derechos de propiedad intelectual y derechos de privacidad y publicidad).<br><br>

5) ZT se reserva el derecho, aunque no la obligación, de rechazar cuentas que considere inaceptables.<br><br>

6) El JUGADOR podrá borrar toda cuenta existente a su nombre en cualquier momento. Esto borrará la información de contacto, como ser la dirección de email, pero no borrará todos los datos de la cuenta.<br><br>

8) ZT ser reserva el derecho a cancelar la cuenta del JUGADOR en cualquier momento por cualquier razón sin notificación previa. Si fuera necesario, la razón será justificada, pese a lo cual ZT no tiene ninguna obligación de darla.<br><br>

9) ZT no otorga garantía alguna sobre la disponibilidad del servicio. Es provisto "como está" y podría ser discontinuado en cualquier momento sin notificación previa.<br><br>

10) Si la cuenta del JUGADOR es cerrada, éste no estará facultado para reclamar propiedad de contenido alguno ni de nada relacionado con su cuenta.<br><br>

11) El juego se verá continuamente actualizado, ajustado, extendido y modificado, con el objetivo de hacer más interesante el juego para el mayor número de jugadores a largo plazo. El JUGADOR no está habilitado para reclamar justificaciones relacionadas con cambios en la lógica del juego, su tecnología o funcionalidad.<br><br>

12) ZT se reserva el derecho de cesar la operación del juego en cualquier momento sin necesidad de dar justificaciones.<br><br>

13) El hecho de aceptar los términos del contrato para probar esta beta de ZT implica el aprobado del alumno que lo presentó como proyecto integrado (Jeje, esta cláusula es broma, pero lo cierto es que la gente no suele leerse las condiciones, ¿verdad?). <br><br>

14) Los JUGADORES no deben utilizar diferentes cuentas al mismo tiempo. El JUGADOR deberá saber que las conexiones podrán ser bloqueadas si se detecta que provienen de una cuenta múltiple. Aunque ZT haga sus mayores esfuerzos para detectar situaciones como éstas, los JUGADORES que utilicen la misma computadora o los recursos de una misma red podrían ser tomados como una sola persona aunque en la realidad no fuera así.<br><br>

15) El JUGADOR debe asegurarse de que la contraseña recibida para su acceso sea mantenida a salvo.<br><br>

16) El JUGADOR está autorizado a utilizar el juego sólo en navegadores web normales. El uso de cualquier tipo de programas adicionales, scripts y otras herramientas de soporte quedan expresamente prohibidas.<br><br>

17) Queda prohibido el uso de errores en la programación para tomar ventaja propia. No se deberán tomar medidas que puedan saturar los servidores o afectar masivamente la operación del juego para el resto de los participantes.<br><br>

18) El JUGADOR deberá asegurarse de que los emails enviados por ZT a la dirección provista por él al momento del registro, realmente le lleguen. Esto debe ser asegurado configurando adecuadamente los filtros anti spam y cualquier otra funcionalidad de su servicio de email.<br><br>

19) El JUGADOR está al tanto de que ZT –como cualquier software- no puede ser considerado absolutamente a prueba de errores. ZT despliega sus mayores esfuerzos para minimizar los problemas técnicos y lógicos, y llegado el caso podría (aunque no está obligado) compensar a los JUGADORES en casos de que ocurran problemas severos. Esta compensación será resolviendo el problema.<br><br>

20) El JUGADOR está al tanto de que ZT –al igual que todos los juegos- puede tener una lógica de la que el JUGADOR no está al tanto, o que funcione en dirección contraria a la suposición de el JUGADOR. También es posible que haya disponible información incorrecta o incompleta, pese a que ZT haga su mayor esfuerzo para que esto no suceda. El JUGADOR no está habilitado a reclamar compensaciones en estos casos.<br><br>

21) El JUGADOR es consciente de que ZT no está pensado para funcionar en navegadores diferentes a Firefox y Google Chrome. El JUGADOR debe jugar a ZT en esos navegadores debidamente actualizados.

22) El JUGADOR debe leer y aceptar todos los puntos del presente contrato. La no lectura de las cláusulas no exime de su cumplimiento, teniendo especialmente en cuenta el contenido de la cláusula 13.<br><br>

<h2>Protección de la información</h2>

22)  ZT no transferirá a terceros los datos almacenados sin la aprobación previa del JUGADOR. Al abrir su cuenta en este juego, El JUGADOR está de acuerdo con el almacenamiento electrónico y el procesamiento de los datos de registración.<br><br>

23) Además de la dirección de email provista durante la registración, ZT podrá archivar la dirección IP de visitas previas, el programa navegador utilizado y los datos brindados voluntariamente durante el juego.<br><br>

24) Si el JUGADOR autorizó expresamente esto, ZT podrá continuar informándole vía email acerca de su estatus en el juego o cualquier cambio. El JUGADOR podrá cancelar esto en cualquier momento y pedir ser borrado de la lista de distribución.<br><br>

25) Por razones técnicas, no es posible participar del juego sin el almacenamiento de datos del usuario. Si el JUGADOR pidiera el borrado completo de sus datos, esto automáticamente derivará en la cancelación de su cuenta. <br><br>
		';
?>
