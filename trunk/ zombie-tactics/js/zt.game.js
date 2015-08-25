var arrPerStatus; // Variable global para utilizar el menu de status


$(document).ready( function(){

	// Hacemos que el texto de los menús no se pueda seleccionar
	$("#contenedor_superior").disableSelection();
	$("#contenedor_central").disableSelection();
	$("#contenedor_inferior").disableSelection();
	
	preparaMapa(); // preparamos

});


function salvarPartida(procedencia){
	
	if (procedencia == "victoria"){ // Se actualizan los P.experiencia y los niveles. También los zombies matados y el equipo.
		
		// Actualizamos nivel, experiencia y armas adquiridas durante la fase
		for (var i in arrPer){ // los del arrPerEliminados no consiguen experiencia
			if (arrPer[i].bando=="humano"){
				for (var j in partidaUsuario.personajes){
					// alert ( parseInt(((arrPer[i].id).substring(1))) + " " + partidaUsuario.personajes[j].id_personaje )
					if ( parseInt(((arrPer[i].id).substring(1))) == partidaUsuario.personajes[j].id_personaje){
						partidaUsuario.personajes[j].nivel = arrPer[i].nivel;
						partidaUsuario.personajes[j].experiencia = arrPer[i].experiencia;
						partidaUsuario.personajes[j].puntos_habilidad = arrPer[i].puntos_habilidad;
						partidaUsuario.personajes[j].arma_corto_alcance = arrPer[i].ataqueCortaDistancia;
						partidaUsuario.personajes[j].arma_largo_alcance = arrPer[i].ataqueLargaDistancia;
					}
				}
			}
		}
		
		// Actualizamos equipo compartido por todos los personajes (items curación)
		partidaUsuario.equipo = equipoActual; 
		
		// Actualizamos la fase superada si la ha superado por primera vez
		var faseSuperadaPorPrimeraVez = true;
		for (var i in partidaUsuario.fases_superadas){
			if ( partidaUsuario.fases_superadas[i].mapa_id_mapa == faseActual )
				faseSuperadaPorPrimeraVez = false;
		}
		if (faseSuperadaPorPrimeraVez){
			if (faseActual == 8){
				alert("Enhorabuena, has completado la beta del juego.\n¡Gracias por jugar a Zombie Tactics!")
			}
			if (typeof partidaUsuario.fases_superadas == "undefined"){
				partidaUsuario.fases_superadas = [{"mapa_id_mapa":faseActual}]; // Nuevo array con la primera fase
			}
			else
				partidaUsuario.fases_superadas[partidaUsuario.fases_superadas.length] = {"mapa_id_mapa":faseActual}; // Al faltarle la "fecha", la insertaremos desde php
				
		}
		
		// Actualizamos zombies eliminados
		var zombiesEliminados = new Array();
		for (var i in arrPerEliminados){
			if (arrPerEliminados[i].bando=="zombie"){
				var idZombie = (arrPerEliminados[i].id).substring( 0, ((arrPerEliminados[i].id).indexOf("_")) );
				alert("Un Zombie '"+ idZombie + "' eliminado");
				var idZombiFound = false;
				for (var j=0; j<zombiesEliminados.length; j++){
					if (zombiesEliminados[j].id == idZombie){
						zombiesEliminados[j].cantidad ++;
						idZombiFound = true;
					}
				}
				if (!idZombiFound){
					zombiesEliminados[zombiesEliminados.length] = {"id":idZombie, "cantidad":1};
				}
			}
		}
		partidaUsuario.zombies_eliminados = zombiesEliminados;
	}
	
	if (procedencia == "derrota"){ partidaUsuario.equipo = equipoActual; } // Se actualizan sólo el equipo. (Se pierden la experiencia y los zombies eliminados)
	
	if (procedencia == "pantalla_status"){
		
		// todo se actualiza sólo
	}
	
	var request = $.ajax({ url: globalURLPHP+"savegame.php", type: "POST", 
		data:{ varPartidaUsuario : partidaUsuario , varProcedencia : procedencia , varSesion:globalSID } 
	});
	request.done(function (response, textStatus, jqXHR){ // controlador de callback que se llamará en caso de éxito
		if (response == 1){
			alert ("Datos actualizados. Partida Guardada con éxito.");
			
			if (procedencia=="victoria")
				preparaMapa();
		}
		else{
			alert ( "Error: \n" + response );
		}
	});
	request.fail(function (jqXHR, textStatus, errorThrown){ alert("Ha sucedido un error: "+	textStatus, errorThrown	); });
} // salvarPartida(procedencia)



// Cargar la fase de batalla indicada
function cargaFaseBatalla(idMapa){
	
	// Cargamos el HTML necesario para el menú de las fases de batalla en las capas contenedoras 
	var txtHtmlContSup = "";
	txtHtmlContSup += "<div id='sms_ord' class='submenuSup'> <!-- Menu orden de turno -->";
	txtHtmlContSup += 	"<div id='sms_ord_cab' class='submenuSupCabecera'>ORDEN TURNOS</div>";
	txtHtmlContSup += 	"<div class='submenuSupCuerpo'> El contenido se genera automáticamente </div>";
	txtHtmlContSup += "</div>";
	txtHtmlContSup += "<div id='sms_obj' class='submenuSup'> <!-- Menu objetivos -->";
	txtHtmlContSup += 	"<div id='sms_obj_cab' class='submenuSupCabecera'>OBJETIVOS</div>";
	txtHtmlContSup += 	"<div class='submenuSupCuerpo'> El contenido se genera automáticamente </div>";
	txtHtmlContSup += "</div>";
	txtHtmlContSup += 	"<div id='sms_avi' class='submenuSup'> <!-- Menu de avisos -->";
	txtHtmlContSup += 	"<div id='sms_avi_cab' class='submenuSupCabecera'>AVISOS</div>";
	txtHtmlContSup += "</div>";
	$("#contenedor_superior").html(txtHtmlContSup);
	
	// Hacemos que los menús generados dinámicamente se expandan y se contraigan al hacer click en sus cabeceras
	$('#sms_ord_cab').click(function() {
	  $('#sms_ord div.submenuSupCuerpo').toggle('slow'); } );
	$('#sms_obj_cab').click(function() {
	  $('#sms_obj div.submenuSupCuerpo').toggle('slow'); } );
	$('#sms_avi_cab').click(function() {
	  $('#sms_avi div.submenuSupCuerpo').toggle('slow'); } );
	
	// Petición AJAX para los datos de la fase
	var request = $.ajax({ url: globalURLPHP+"loadbattle.php", type: "POST", data: { varIdFase : idMapa, varSesion : globalSID } });
	request.done(function (response, textStatus, jqXHR){ // controlador de callback que se llamará en caso de éxito
		
		if (response == -1 || response == -2 ){ alert("Problema en la consulta a la base de datos al cargar el mapa ("+response+")" ); }
		else{
			faseBatalla = null;
			faseBatalla = JSON.parse(response); // id_mapa, nombre, descripcion, json_mapa, zombiesEnFase
			faseBatalla.json_mapa = JSON.parse( faseBatalla.json_mapa ); 
			// Ya tenemos todos los datos necesarios para cargar la fase. "faseBatalla" (todo lo relativo al mapa) y "partidaUsuario" (personajes y equipo)

			generaTableroBatalla();
			mostrarItems();
			cargaPersonajesEnTablero();
			muestraPersonajes();
			faseActual = idMapa; // Ajustamos la id Del mapa actual según el que acabamos de cargar
			
			// Si el usuario no tiene equipo, le asignamos un array vacío
			if (typeof partidaUsuario.equipo == "undefined"){
				equipoActual = new Array(); 
			}
			else{
				equipoActual = partidaUsuario.equipo; 
			}	
			tickActual = 0; // Iniciamos el contador de tiempo en esta fase. No lo iniciamos en "iniciarTurnos()" porque hay que establecer lso turnos antes
			
			// Establecemos en qué "tick" será el siguiente turno de cada personaje. 
			for (var i in arrPer){
				estableceSiguienteTurno(arrPer[i]); // zt.batalla.js
			}
			arrPer.sort(comparaSiguienteTurnoPersonajes); // Ordenamos el array de personajes según los turnos
			actualizarMenuOrdenTurnos(); 
			$('#sms_ord div.submenuSupCuerpo').hide(); // Cerramos el menu orden tras generarlo.  ( .toggle() .show() )
			
			actualizarMenuObjetivos();
			$('#sms_obj div.submenuSupCuerpo').hide();
						
			// Iniciamos el juego. 
			iniciarTurnos(); 
		} 
	});
	request.fail(function (jqXHR, textStatus, errorThrown){ alert("Ha sucedido un error: "+	textStatus, errorThrown	); });
}



// Mostrar un mensaje de confirmación al pulsar sobre una fase para jugar en ella
function mostrarMensajeMapa(idMapa){ 
	
	$(".mensajeMapaFlotante").remove(); // si ya hay un mensaje, lo eliminamos
	
	var ajL = 60; var ajT = 5; // ajustes de posición para que el mensaje se muestre un poco desplazado
	var posicion = $("#skull0"+idMapa).position();	 // alert (posicion.left +" - "+ posicion.top);
	
	var textHtml = ""
	textHtml += "<div id='mensajeMapa"+idMapa+"' class='mensajeMapaFlotante'>"; //  style='left:"+posicion.left+"px top:"+posicion.top+"px' >";
	textHtml += "¿Seguro que quieres <br>jugar la fase "+idMapa+"?<hr>";	
	textHtml += "<input id='aceptar"+idMapa+"' type='button' value='aceptar'> ";
	textHtml += "<input id='cancelar"+idMapa+"' type='button' value='cancelar'>";
	textHtml += "</div>";
	$('#capaTexto').append( textHtml );
	$( "#mensajeMapa"+idMapa ).draggable();
	$( "#mensajeMapa"+idMapa ).css({'top': (posicion.top + ajT)+'px', 'left': (posicion.left + ajL)+'px'});
	// alert(posicion.top+'px');
	
	$("#cancelar"+idMapa).bind('click', function() { $(".mensajeMapaFlotante").remove() });
	
	$("#aceptar"+idMapa).bind('click', function() { 
		$(".mensajeMapaFlotante").remove();
		
		
		
		cargaFaseBatalla(idMapa)
	}); // $("#aceptar"+idMapa).bind('click', function() { 
} // mostrarMensajeMapa


function preparaMapa(){ // Preparamos el mapa para que las fases del mapa sean jugables
	
	var txtHtmlContInf = "<div class='submenuInfFake'></div>";
	$("#contenedor_inferior").html(txtHtmlContInf);
	
	var txtHtmlContSup = "";
	txtHtmlContSup += "<div id='sms_log' class='submenuSup'>";
	txtHtmlContSup += 	"<div id='sms_log_cab' class='submenuSupCabecera'>SESIÓN</div>";
	txtHtmlContSup += 	"<div id='sms_log_log' class='submenuSupCuerpo'> Cerrar sesión </div>";
	txtHtmlContSup += "</div>";
	txtHtmlContSup += "<div id='sms_sta' class='submenuSup'>";
	txtHtmlContSup += 	"<div id='sms_sta_cab' class='submenuSupCabecera'>VENTANA DE ESTADO</div>";
	txtHtmlContSup += 	"<div class='submenuSupCuerpo'> El contenido se genera automáticamente </div>";
	txtHtmlContSup += "</div>";
	$("#contenedor_superior").html(txtHtmlContSup);
	
	// Hacemos que los menús generados se expandan y se contraigan al hacer click en sus cabeceras
	$('#sms_log_cab').click(function() {
	  $('#sms_log div.submenuSupCuerpo').toggle('fast'); } );
	$('#sms_sta_cab').click(function() {
		cargarDatosPantallaEstado(); // Cargamos datos de personajes actualizados en pantalla de estado
		$('#sms_sta div.submenuSupCuerpo').toggle('slow'); } );
	// Hacemos que por defecto los menus aparezcan plegados
	$('#sms_log div.submenuSupCuerpo').hide();
	$('#sms_sta div.submenuSupCuerpo').hide();
	
	$('#sms_log_log').click(function() { cerrarSesion(); }); // Cerramos sesión
	
	var txtHtmlMap = "";
	
	txtHtmlMap += "<svg width='1400' height='1050' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>";
	txtHtmlMap += "<g>";
	txtHtmlMap += "<image xlink:href='images/map_empty.jpg' id='svg_1' height='1050' width='1400' y='0' x='0'/>";
	txtHtmlMap += "<line id='ruta01' y2='287' x2='363' y1='568' x1='300' class='rutaBloqueada'/>";
	txtHtmlMap += "<line id='ruta02' y2='285' x2='362' y1='512' x1='461' class='rutaBloqueada'/>";
	txtHtmlMap += "<line id='ruta03' y2='513' x2='460' y1='369' x1='822' class='rutaBloqueada'/>";
	txtHtmlMap += "<line id='ruta04' y2='368' x2='824' y1='533' x1='722' class='rutaBloqueada'/>";
	txtHtmlMap += "<line id='ruta05' y2='531' x2='727' y1='737' x1='421' class='rutaBloqueada'/>";
	txtHtmlMap += "<line id='ruta06' y2='367' x2='825' y1='301' x1='1025' class='rutaBloqueada'/>";
	txtHtmlMap += "<line id='ruta07' y2='300' x2='1028' y1='599' x1='1115' class='rutaBloqueada'/>";
	txtHtmlMap += "</g>";
	txtHtmlMap += "</svg>";
	txtHtmlMap += "<div class='skullEnabled' id='skull01' title='Fase 01' src='images/transparent.png' style='position:absolute;top:548;left:267'></div>";
	txtHtmlMap += "<div class='skullDisabled' id='skull02' title='Fase 02' src='images/transparent.png' style='position:absolute;top:255;left:326'></div>";
	txtHtmlMap += "<div class='skullDisabled' id='skull03' title='Fase 03' src='images/transparent.png' style='position:absolute;top:477;left:423'></div>";
	txtHtmlMap += "<div class='skullDisabled' id='skull04' title='Fase 04' src='images/transparent.png' style='position:absolute;top:333;left:783'></div>";
	txtHtmlMap += "<div class='skullDisabled' id='skull05' title='Fase 05' src='images/transparent.png' style='position:absolute;top:500;left:688'></div>";
	txtHtmlMap += "<div class='skullDisabled' id='skull06' title='Fase 06' src='images/transparent.png' style='position:absolute;top:702;left:386'></div>";
	txtHtmlMap += "<div class='skullDisabled' id='skull07' title='Fase 07' src='images/img_trans.gif' style='position:absolute;top:264;left:988'></div>";
	txtHtmlMap += "<div class='skullDisabled' id='skull08' title='Fase 08' src='images/img_trans.gif' style='position:absolute;top:561;left:1080'></div>";
	$("#contenedor_tablero").html(txtHtmlMap);
	
		
	$("#skull01").bind('click', function(){ mostrarMensajeMapa(1); }); // La primera fase fase siempre está desbloqueada
	
	if (typeof(partidaUsuario["fases_superadas"]) == "undefined") { // El usuario aún no ha superado ninguna fase
		// TODO: Mostrar "tutorial"
	}
	else{ // El usuario ha superado ya alguna fase
		for ( var i = 0; i < partidaUsuario["fases_superadas"].length; i++){
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 1){
				$("#skull01").removeClass().addClass("skullFinished"); // Mostramos que el punto del mapa está superado
				$("#ruta01").attr("class", "rutaDesbloqueada" ); // Mostramos que la ruta a la siguiente fase está disponible
				$("#skull02").removeClass().addClass("skullEnabled"); // Mostramos que la siguiente fase está disponible para jugar
				$("#skull02").bind('click', function(){ mostrarMensajeMapa(2); });
			}
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 2){
				$("#skull02").removeClass().addClass("skullFinished");
				$("#ruta02").attr("class", "rutaDesbloqueada" ); 
				$("#skull03").removeClass().addClass("skullEnabled"); 
				$("#skull03").bind('click', function(){ mostrarMensajeMapa(3); });
			}
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 3){
				$("#skull03").removeClass().addClass("skullFinished");
				$("#ruta03").attr("class", "rutaDesbloqueada" ); 
				$("#skull04").removeClass().addClass("skullEnabled"); 
				$("#skull04").bind('click', function(){ mostrarMensajeMapa(4); });
			}
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 4){
				$("#skull04").removeClass().addClass("skullFinished");
				$("#ruta04").attr("class", "rutaDesbloqueada" ); 
				$("#ruta06").attr("class", "rutaDesbloqueada" ); 
				$("#skull05").removeClass().addClass("skullEnabled"); 
				$("#skull07").removeClass().addClass("skullEnabled"); 
				$("#skull05").bind('click', function(){ mostrarMensajeMapa(5); });
				$("#skull07").bind('click', function(){ mostrarMensajeMapa(7); });
			}
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 5){
				$("#skull05").removeClass().addClass("skullFinished");
				$("#ruta05").attr("class", "rutaDesbloqueada" ); 
				$("#skull06").removeClass().addClass("skullEnabled"); 
				$("#skull06").bind('click', function(){ mostrarMensajeMapa(6); });
			}
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 6){
				$("#skull06").removeClass().addClass("skullFinished");
			}
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 7){
				$("#skull07").removeClass().addClass("skullFinished");
				$("#ruta07").attr("class", "rutaDesbloqueada" ); 
				$("#skull08").removeClass().addClass("skullEnabled"); 
				$("#skull08").bind('click', function(){ mostrarMensajeMapa(8); });
			}
			if ( partidaUsuario["fases_superadas"][i].mapa_id_mapa == 8){
				$("#skull08").removeClass().addClass("skullFinished");
			}
		}
	}
}// preparaMapa()


function cargarDatosPantallaEstado(){
	
	// Reiniciamos el html del menú "ventana de estado"
	$('#sms_sta div.submenuSupCuerpo').html("");
	
	// Reiniciamos el array y actualizamos los puntos de habilidad & habilidades de los personajes
	arrPerStatus = new Array();
	for (var i=0; i<(partidaUsuario.personajes).length; i++){ 
		
		// Valores actuales
		arrPerStatus[i] = {"puntos_habilidad" : partidaUsuario.personajes[i].puntos_habilidad };
		arrPerStatus[i].vida = partidaUsuario.personajes[i].vida;
		arrPerStatus[i].fuerza = partidaUsuario.personajes[i].fuerza;
		arrPerStatus[i].destreza = partidaUsuario.personajes[i].destreza;
		arrPerStatus[i].suerte = partidaUsuario.personajes[i].suerte;
		arrPerStatus[i].id_personaje = partidaUsuario.personajes[i].id_personaje;
		arrPerStatus[i].nombre = partidaUsuario.personajes[i].nombre;
		
		// Valores que se convertirán en los nuevos
		arrPerStatus[i].nueva = {"puntos_habilidad" : partidaUsuario.personajes[i].puntos_habilidad };
		arrPerStatus[i].nueva.vida = partidaUsuario.personajes[i].vida;
		arrPerStatus[i].nueva.fuerza = partidaUsuario.personajes[i].fuerza;
		arrPerStatus[i].nueva.destreza = partidaUsuario.personajes[i].destreza;
		arrPerStatus[i].nueva.suerte = partidaUsuario.personajes[i].suerte;
		
		var imagenPortrait;
		if ( partidaUsuario.personajes[i].sexo == "hombre")	imagenPortrait = "images/S_M_Portrait_mini.png";
		else imagenPortrait = "images/S_F_Portrait_mini.png";
		
		// Creamos tabla
		var idPer = arrPerStatus[i].id_personaje;
		var strTabla = "";
		strTabla += '<form id ="'+ idPer +'_status" class="submenuStatus"> <fieldset>';
		strTabla += '<legend>'+ arrPerStatus[i].nombre + '</legend>'
		strTabla += '<img src="'+imagenPortrait+'" alt="'+ arrPerStatus[i].nombre + '" height="100px" width="100px">';
		strTabla += '<hr>';
		strTabla += 'PUNTOS HABILIDAD = '
		strTabla += '<span id ="'+ idPer +'_spa_pun_hab"></span>';
		strTabla += '<br/>';
		strTabla += '<table>';
		strTabla += '<tr>';
		strTabla += 	'<td> Vida: </td>';
		strTabla += 	'<td>';
		strTabla += 		'<input type="button" value="-" id ="'+ idPer +'_btn_vid_res"/>';
		strTabla += 		'<span id ="'+ idPer +'_spa_vid"></span>';
		strTabla += 		'<input type="button" value="+" id ="'+ idPer +'_btn_vid_sum"/>';
		strTabla += 	'</td>';
		strTabla += '</tr>';
		strTabla += '<tr>';
		strTabla += 	'<td> Fuerza: </td>';
		strTabla += 	'<td>';
		strTabla += 		'<input type="button" value="-" id ="'+ idPer +'_btn_fue_res"/>';
		strTabla += 		'<span id ="'+ idPer +'_spa_fue"></span>';
		strTabla += 		'<input type="button" value="+" id ="'+ idPer +'_btn_fue_sum"/>';
		strTabla += 	'</td>';
		strTabla += '</tr>';
		strTabla += '<tr>';
		strTabla += 	'<td> Destreza: </td>';
		strTabla += 	'<td>';
		strTabla += 		'<input type="button" value="-" id ="'+ idPer +'_btn_des_res"/>';
		strTabla += 		'<span id ="'+ idPer +'_spa_des"></span>';
		strTabla += 		'<input type="button" value="+" id ="'+ idPer +'_btn_des_sum"/>';
		strTabla += 	'</td>';
		strTabla += '</tr>';
		strTabla += '<tr>';
		strTabla += 	'<td> Suerte: </td>';
		strTabla += 	'<td>';
		strTabla += 		'<input type="button" value="-" id ="'+ idPer +'_btn_sue_res"/>';
		strTabla += 		'<span id ="'+ idPer +'_spa_sue"></span>';
		strTabla += 		'<input type="button" value="+" id ="'+ idPer +'_btn_sue_sum"/>';
		strTabla += 	'</td>';
		strTabla += '</tr>';
		strTabla += '</table>';
		strTabla += '<hr>';
		strTabla += 	'<span id ="'+ idPer +'_spa_alert">&nbsp;<br>&nbsp;</span>';
		strTabla += '</fieldset> </form>';
		$('#sms_sta div.submenuSupCuerpo').append(strTabla); // Añadimos la tabla-formulario al contenido de la capa correspondiente
		
		actualizarAtributos( arrPerStatus[i] ); // Actualizamos los valores de las habilidades
		
		$("#"+idPer +"_status #"+idPer+"_btn_vid_res").click(
			function(objeto){
				return function(){
					modificarAtributos("vida", "-", objeto)
				};
			}(idPer) // closure 
		);
		$("#"+idPer +"_status #"+idPer+"_btn_vid_sum").click(
			function(objeto){
				return function(){
					modificarAtributos("vida", "+", objeto)
				};
			}(idPer) // closure 
		);
		$("#"+idPer +"_status #"+idPer+"_btn_fue_res").click(
			function(objeto){
				return function(){
					modificarAtributos("fuerza", "-", objeto)
				};
			}(idPer) // closure 
		);
		$("#"+idPer +"_status #"+idPer+"_btn_fue_sum").click(
			function(objeto){
				return function(){
					modificarAtributos("fuerza", "+", objeto)
				};
			}(idPer) // closure 
		);
		$("#"+idPer +"_status #"+idPer+"_btn_des_res").click(
			function(objeto){
				return function(){
					modificarAtributos("destreza", "-", objeto)
				};
			}(idPer) // closure 
		);
		$("#"+idPer +"_status #"+idPer+"_btn_des_sum").click(
			function(objeto){
				return function(){
					modificarAtributos("destreza", "+", objeto)
				};
			}(idPer) // closure 
		);
		$("#"+idPer +"_status #"+idPer+"_btn_sue_res").click(
			function(objeto){
				return function(){
					modificarAtributos("suerte", "-", objeto)
				};
			}(idPer) // closure 
		);
		$("#"+idPer +"_status #"+idPer+"_btn_sue_sum").click(
			function(objeto){
				return function(){
					modificarAtributos("suerte", "+", objeto)
				};
			}(idPer) // closure 
		);
	}// for (var i=0; i<(partidaUsuario.personajes).length; i++) 
	
	// Añadimos los botones de aceptar / cancelar y les damos funcionalidad
	var strBotones = '<hr>';
	strBotones += '<form style="clear: left;"><fieldset>';
	strBotones += '<input type="button" value="Aceptar y guardar" id ="btn_aceptar" style="width:100%; border:1px solid white; margin:1px; color:#55ff55; cursor:pointer;"/><br>';
	strBotones += '<input type="button" value="Cancelar edición" id ="btn_cancelar" style="width:100%; border:1px solid white; margin:1px; color:#ff5555; cursor:pointer;"/>';
	strBotones += '</fieldset></form>';
	$('#sms_sta div.submenuSupCuerpo').append(strBotones);
	
	$("#btn_aceptar").click(function(){
		// Cargamos los nuevos valores en la variable partidaUsuario y salvamos la partida
		for (var i=0; i<(partidaUsuario.personajes).length; i++){ 
			partidaUsuario.personajes[i].puntos_habilidad = arrPerStatus[i].nueva.puntos_habilidad;
			partidaUsuario.personajes[i].vida = arrPerStatus[i].nueva.vida;
			partidaUsuario.personajes[i].fuerza = arrPerStatus[i].nueva.fuerza;
			partidaUsuario.personajes[i].destreza = arrPerStatus[i].nueva.destreza;
			partidaUsuario.personajes[i].suerte = arrPerStatus[i].nueva.suerte;
		}
		salvarPartida("pantalla_status");
		$('#sms_sta div.submenuSupCuerpo').hide();
	});
	
	$("#btn_cancelar").click(function(){
		$('#sms_sta div.submenuSupCuerpo').hide('slow');
	});
	
	function actualizarAtributos(objPersonaje){
		var arrHabSrt = ["vida", "fuerza", "destreza", "suerte"];
		for (var j=0; j<arrHabSrt.length; j++){
			var atributo = arrHabSrt[j];
			var valor = objPersonaje.nueva[atributo];
			$("#"+(objPersonaje.id_personaje)+"_spa_"+(atributo.substr(0,3)) ).html(valor);
		}
		$("#"+ objPersonaje.id_personaje +"_spa_pun_hab").html( objPersonaje.nueva.puntos_habilidad );
	}

	function modificarAtributos(atributoAModificar, tipoOperacion, idPersonaje){
		var objPersonaje;
		for (var i=0; i<arrPerStatus.length; i++){
			if (arrPerStatus[i].id_personaje == idPersonaje){
				objPersonaje = arrPerStatus[i];
			}
		}
		if (tipoOperacion == "-"){
			// Comprobamos que los puntos de esa habilidad no sean menores que los que tenía el personaje antes de repartir puntos de habilidad.
			if (objPersonaje[atributoAModificar] == objPersonaje.nueva[atributoAModificar] ){
				$("#"+ idPersonaje +"_spa_alert").html("No puedes disminuir <br>m&aacute;s la "+atributoAModificar+".");
			}
			else {
				objPersonaje.nueva[atributoAModificar]--;
				objPersonaje.nueva.puntos_habilidad++;
				$("#"+ idPersonaje +"_spa_alert").html("&nbsp;<br>&nbsp;");
			}
		}
		else if (tipoOperacion == "+"){
			// Comprobamos que aún queden puntos de habilidad para repartir.
			if ( objPersonaje.nueva.puntos_habilidad < 1 ){
				$("#"+ idPersonaje +"_spa_alert").html("No te quedan m&aacute;s <br>puntos de habilidad.");
			}
			else {
				objPersonaje.nueva[atributoAModificar]++;
				objPersonaje.nueva.puntos_habilidad--;
				$("#"+ idPersonaje +"_spa_alert").html("&nbsp;<br>&nbsp;");
			}
		}
		// Actualizamos los puntos de habilidad que quedan para repartir y los del atributo modificado.
		$("#"+ idPersonaje +"_spa_pun_hab").html( objPersonaje.nueva.puntos_habilidad );
		$("#"+idPersonaje+"_spa_"+(atributoAModificar.substr(0,3)) ).html( objPersonaje.nueva[atributoAModificar] );
	} //  modAtr(atributoAModificar, tipoOperacion){
	
} // cargarDatosPantallaEstado()


function cerrarSesion(){ 
	
	var request = $.ajax({ url: globalURLPHP+"logout.php", type: "POST", 
		data:{ varSesion:globalSID } 
	});
	request.done(function (response, textStatus, jqXHR){ // controlador de callback que se llamará en caso de éxito
		if (response == 1){
			// Sesión cerrada
			var htmlSesCerr = "";
			htmlSesCerr += "<div id='sesionCerrada'><br>";
			htmlSesCerr += "Tu sesión ha sido cerrada con éxito. <br><br>"
			htmlSesCerr += "Gracias por jugar a Zombie Tactics.<br>"
			htmlSesCerr += "¡Hasta pronto!<br><br>"
			htmlSesCerr += "</div>";
			$('BODY').html(htmlSesCerr);
			$("#sesionCerrada").css({"color":"blue", "background-color":"#CCC", "margin-top":"25%", "text-align":"center", "font-weight":"bold"})
			
		}
		else{
			alert ( "Error: \n" + response );
		}
	});
	request.fail(function (jqXHR, textStatus, errorThrown){ alert("Ha sucedido un error: "+	textStatus, errorThrown	); });
}