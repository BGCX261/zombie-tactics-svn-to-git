
var personajeNuevo = {
	nombre: "",
	nivel : 0,
	experiencia : 0,
	sexo : "hombre",
	puntos_habilidad : 10,
	vida : 10,
	fuerza : 10,
	destreza : 10,
	suerte : 0,
	id_jugador: 1
}

var puntosHabilidadNuevos = {
	vida : 10,
	fuerza : 10,
	destreza : 10,
	suerte : 0,
}

function modificaAtributo(elemento){

	elemento.disabled = true;
	var atributoAModificar = elemento.parentNode.id; // el elemento que contiene los botones y el marcador de cada atributo tiene como id el nombre de ese atributo.
	var elementoAModificar = elemento.parentNode.getElementsByClassName("atributo");
	var tipoOperacion = elemento.value; // + ó -
	
	if (tipoOperacion == "-"){
		// Comprobamos que los puntos de esa habilidad no sean menores que los que tenía el personaje antes de repartir puntos de habilidad.
		if (personajeNuevo[atributoAModificar] == puntosHabilidadNuevos [atributoAModificar] ){
			$("#alert_crear_personaje").html("No puedes disminuir m&aacute;s la "+atributoAModificar+".");
		}
		else {
			puntosHabilidadNuevos[atributoAModificar]--;
			personajeNuevo.puntos_habilidad++;
			$("#alert_crear_personaje").html("&nbsp;");
		}
	}
	else if (tipoOperacion == "+"){
		// Comprobamos que aún queden puntos de habilidad para repartir.
		if ( personajeNuevo.puntos_habilidad < 1 ){
			$("#alert_crear_personaje").html("No te quedan m&aacute;s puntos de habilidad.");
			
		}
		else {
			puntosHabilidadNuevos[atributoAModificar]++;
			personajeNuevo.puntos_habilidad--;
			$("#alert_crear_personaje").html("&nbsp;");
		}
	}
	// Actualizamos los puntos de habilidad que quedan para repartir y los del atributo modificado.
	$("#alert_puntos_habilidad").html( personajeNuevo.puntos_habilidad );
	$("#input_"+atributoAModificar).val( puntosHabilidadNuevos[atributoAModificar] );
	
	elemento.disabled = false;
}

function cambiaSexo(){
    var i
    for (i=0;i<document.fdatosp.sexo.length;i++){
       if (document.fdatosp.sexo[i].checked)
          break;
    }
    personajeNuevo.sexo = document.fdatosp.sexo[i].value
    if (personajeNuevo.sexo == "hombre"){
        $("#img_personaje").attr('src', './images/S_M_Portrait.png');
    }
    else if (personajeNuevo.sexo == "mujer"){
        $("#img_personaje").attr('src', './images/S_F_Portrait.png');
    }
}

function cambiaNombre(){
	var elemNombPer = document.getElementById("input_nombre_personaje");
	var botCreaPer = document.getElementById("btn_crear_personaje");
	if ( compruebaCampo('nick', elemNombPer) ){
		personajeNuevo.nombre = elemNombPer.value;
		botCreaPer.disabled = false;
	}
	else {
		botCreaPer.disabled = true;
	}
}

function crearPersonaje(){ 
		$.ajax({
		type: "POST",
		url: globalURLPHP+"createchar.php",
		data: { varSesion : globalSID },
		success: function (result, textStatus, jqXHR) {
			// Cargamos el html de creación de personaje en la "capaOculta"
			$("#capaOculta").html(result);
			
			personajeNuevo.nombre = document.getElementById("reg_nick").value; // Asignamos nombre de personaje por defecto basándonos en el de usuario
			$("#input_nombre_personaje").val(personajeNuevo.nombre);
			$("#alert_nivel").html(personajeNuevo.nivel);
			$("#alert_experiencia").html(personajeNuevo.experiencia);
			$("#alert_puntos_habilidad").html(personajeNuevo.puntos_habilidad);
			$("#input_vida").val(personajeNuevo.vida);
			$("#input_fuerza").val(personajeNuevo.fuerza);
			$("#input_destreza").val(personajeNuevo.destreza);
			$("#input_suerte").val(personajeNuevo.suerte);
			
			$("#btn_crear_personaje").bind("click", function() {
				registraUsuario();
			})
			
			// Hacemos visible la capa con toda la información.
			document.getElementById("capaOculta").style.visibility = "visible";
		},
		error: function (jqXHR, textStatus, errorThrown) { 
			alert("Ha sucedido un error: "+	textStatus, errorThrown	);
		},
	});
}

function loadGame(){ // Carga el juego 

	var nick = document.getElementById("log_nick");
	var request = $.ajax({
		url: globalURLPHP+"loadgame.php",
		type: "POST",
		data: { varNick : nick.value, varSesion : globalSID }
	});
	// controlador de callback que se llamará en caso de éxito
	request.done(function (response, textStatus, jqXHR){
		if (response == 1){
			postwith('game.php',{ varSesion: globalSID });
		}
		else 
			alert ("Error al cargar la partida salvada "+response);
	});
	// controlador de callback que se llamará en caso de fallo
	request.fail(function (jqXHR, textStatus, errorThrown){
		// mostramos error
		alert("Ha sucedido un error: "+	textStatus, errorThrown	);
	});
}

// Envía el nombre y el password para iniciar sesión en el juego
function enviarLogin(){

	var nick = document.getElementById("log_nick");
	var pass = document.getElementById("log_pass");	
	// desactivamos el botón de envío
	document.getElementById("log_btn_enviar").disabled = true;
	nick.disabled = true;
	pass.disabled = true;

	if (nick.value.length <1){
		document.getElementById("log_btn_enviar").disabled = false;
		nick.focus();
		return;
	}
	if ( pass.value.length <1 ){
		document.getElementById("log_btn_enviar").disabled = false;
		pass.focus();
		return;
	}
	else{
			
		// Lanzamos la petición ajax a login.php
		var request = $.ajax({
			url: globalURLPHP+"login.php",
			type: "POST",
			data: { varNick : nick.value, varPass : SHA1(pass.value), varSesion : globalSID }
		});

		// controlador de callback que se llamará en caso de éxito
		request.done(function (response, textStatus, jqXHR){
		
			if (response == globalSI){ // Login OK
				console.log("devuelto SI");// TODO: limpiar y refrescar ventana modal
				loadGame();
			}
			else { // Login incorrecto
				
				alert("Login incorrecto, pruebe de nuevo por favor.\n\nTenga en cuenta que el sistema distingue \nmayúsculas y minúsculas en las contraseñas.\n\nSi acaba de registrarse hace poco, \nes posible que el administrador aún no haya \nvalidado su cuenta");
				console.log("(devuelto NO) " + response);
				
				// reactivamos el botón de envío y los inputs de texto y password
				document.getElementById("log_btn_enviar").disabled = false;
				nick.disabled = false;
				pass.disabled = false;
			}
		});
		request.fail(function (jqXHR, textStatus, errorThrown){
			alert("Ha sucedido un error: "+	textStatus, errorThrown	);
		});
    }
}// enviarLogin()

// Ejecuta la función enviarLogin si se pulsa la tecla enter desde el campo de usuario o desde el de contraseña del formulario de Login
function validar(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==13) {
		enviarLogin();
	}
} // validar(e)

// Comprueba todos los campos del formulario de registro, si son correctos se envía la consulta para el registro a la base de datos.
function enviarDatosRegistro(){
	
	document.getElementById("reg_btn_enviar").disabled = true;
	var todosCamposOk = true; 
	var nick = document.getElementById("reg_nick");
	var email = document.getElementById("reg_email");
	var pass1 = document.getElementById("reg_pass1");
	var pass2 = document.getElementById("reg_pass2");
	var acuerdo = document.getElementById("reg_chkbx_acuerdo");
	
	if ( !compruebaCampo("email", email) ){ 
		todosCamposOk = false;
	}
	if ( !compruebaCampo("pass", pass1) ){ 
		todosCamposOk = false;
	}
	if ( !compruebaCampo("pass", pass2) ){ 
		todosCamposOk = false;
	}
	if ( !compruebaCampo("checkBox", acuerdo) ){ 
		todosCamposOk = false;
	}
	if ( compruebaCampo("nick", nick) ){ // El nick lo comprobamos al final. Si es correcto, está disponible y el resto de campos están OK, enviamos la petición.
	
		if (todosCamposOk){
			nickDisponible(1);
		}
		else{
			alert("falla algún campo");
			document.getElementById("reg_btn_enviar").disabled = false;
		}
	}
	else{
		document.getElementById("reg_btn_enviar").disabled = false;
	}
} // enviarDatosRegistro()


// Inserta usuario y personaje principal en la BBDD
function registraUsuario(){
	
	var nickARegistrar = document.getElementById("reg_nick").value;
	var passARegistrar = SHA1(document.getElementById("reg_pass1").value); // Encriptamos la clave con el algoritmo SHA1
	var emailARegistrar = document.getElementById("reg_email").value;
	
	personajeNuevo.vida = puntosHabilidadNuevos.vida;
	personajeNuevo.fuerza = puntosHabilidadNuevos.fuerza;
	personajeNuevo.destreza = puntosHabilidadNuevos.destreza;
	personajeNuevo.suerte = puntosHabilidadNuevos.suerte;
	
	// Lanzamos la petición ajax a "register.php"
	var request = $.ajax({
		url: globalURLPHP+"register.php",
		type: "POST",
		data: { varPersonaje:personajeNuevo, varNick:nickARegistrar, varPass:passARegistrar, varEmail:emailARegistrar, varSesion:globalSID }
	});

	// controlador de callback que se llamará en caso de éxito
	request.done(function (response, textStatus, jqXHR){
		if (response == 1){
			var htmlUsuReg = "";
			htmlUsuReg += "<div id='usuarioRegistrado'><br>";
			htmlUsuReg += "El usuario '"+nickARegistrar+"' fue registrado con éxito. <br>"
			htmlUsuReg += "En breve el administrador validará su cuenta de usuario. <br>"
			htmlUsuReg += "Por favor, espere pacientemente hasta entonces.<br><br>"
			htmlUsuReg += "<img id='imagenRegistrado' src='./images/decoration_logo_big.jpg'><br>"
			htmlUsuReg += "</div>";
			
			$("#capaOculta").html(htmlUsuReg)
			$("#usuarioRegistrado").css({"color":"yellow", "background-color":"#CCC", "margin-top":"100px", "font-weight":"bold", "text-shadow":"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"});
			$("#imagenRegistrado").css({ opacity: 0.5 });
			$("#contenedor").hide();
		}
		else{
			alert ("problema durante el registro de usuario.\n"+response);
			document.getElementById("reg_btn_enviar").disabled = false;
		}
	});
	request.fail(function (jqXHR, textStatus, errorThrown){// controlador de callback que se llamará en caso de fallo
		alert(
			"Ha sucedido un error: "+
			textStatus, errorThrown
		);
	});
} // registraUsuario()

function nickDisponible(enviaRegistro){ // Si "enviaRegistro" == 1, ejecutamos "registraUsuario()"
	
	var campoNick = document.getElementById("reg_nick");
	
	if ( !compruebaCampo('nick', campoNick) ){
		campoNick.focus();
		return false;
	}
	
	// desactivamos el botón de envío
	document.getElementById("reg_btn_disponible").disabled = true;
	var nombreAComprobar = campoNick.value;
	
	// Lanzamos la petición ajax a "checknickavailibility.php"
	var request = $.ajax({
		url: globalURLPHP+"checknickavailibility.php",
		type: "POST",
		data: { varNick : nombreAComprobar, varSesion : globalSID }
	});

	// controlador de callback que se llamará en caso de éxito
	request.done(function (response, textStatus, jqXHR){
		if (response == 0){
			$("#alert_reg_nick").html("El nick est&aacute; disponible");
			if ( enviaRegistro == 1 ){ // Si enviaRegistro==1, es que estamos comprobando todos los datos para registrar finalmente al usuario
				crearPersonaje(); // Antes de registrar definitivamente al usuario, debemos crear el personaje
			}
			return true;
		}
		else if (response == 1){
			$("#alert_reg_nick").html("El nick no est&aacute; disponible");
			campoNick.focus();
			return false;
		}
		else {
			$("#alert_reg_nick").html("Experimentamos problemas t&eacute;cnicos, por favor int&eacute;ntelo m&aacute;s tarde.");
			return false;
		}
	});
	request.fail(function (jqXHR, textStatus, errorThrown){
		alert(
			"Ha sucedido un error: "+
			textStatus, errorThrown
		);
		return false;
	});

	// controlador de callback que se llamará sin importar éxito o fallo
	request.always(function () {
		// reactivamos el botón de envío
		document.getElementById("reg_btn_disponible").disabled = false;
	});		
} // nickDisponible(boton)

// Comprueba cualquier campo específico del formulario de registro según las normas para cada tipo de campo
function compruebaCampo(tipo, elemento){ // requiere JQuery

	var caracteresValidosPass = caracteresValidosNick  = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_. ";
	var minCaracteresNick = minCaracteresPass = 3;			// var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
	
	if (tipo == "nick"){ // tipo nick
		
		if (elemento.value.length < minCaracteresNick){
			$("#alert_"+elemento.id).html("El nombre debe constar de al menos "+minCaracteresNick+" caracteres.");
			return false;
		}
		else{
			for (var i = 0; i < elemento.value.length; i++) {
				if (caracteresValidosNick.indexOf(elemento.value.charAt(i)) == -1) {
					$("#alert_"+elemento.id).html("S&oacute;lo se admiten caracteres alfanum&eacute;ricos [a-z][0-9], puntos, guiones y guiones bajos.");
					return false;
				}
			}
			$("#alert_"+elemento.id).html("Nombre correcto.");
			return true;
		}		
	}
	
	else if (tipo == "checkBox"){ // tipo checkBox
		if(document.getElementById(elemento.id).checked){
			$("#alert_"+elemento.id).html("Condiciones aceptadas.");
			return true;
		}
		else{
			$("#alert_"+elemento.id).html("Debe aceptar las condiciones.");
			return false;
		}
	} 
	
	else if (tipo == "email"){ // tipo email
		if (elemento.value.length < 1){
			$("#alert_"+elemento.id).html("Debe introducir un e-mail.");
			return false;
		}
		else{
			var expReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(expReg.test(elemento.value) == false) {
				$("#alert_"+elemento.id).html("E-mail no v&aacute;lido.");
				return false;
			}
			else{
				$("#alert_"+elemento.id).html("E-mail v&aacute;lido.");
				return true;
			}
		}
	} 
	
	else if (tipo == "pass"){ // tipo pass
	
		var p1 = document.getElementById("reg_pass1"); 
		var p2 = document.getElementById("reg_pass2"); 
		if ( p1.value != p2.value ){
			$("#alert_reg_pass1").html("Las contrase&ntilde;as no coinciden.");
			$("#alert_reg_pass2").html("Las contrase&ntilde;as no coinciden.");
		}
		else{
			$("#alert_reg_pass1").html("Las contrase&ntilde;as coinciden.");
			$("#alert_reg_pass2").html("Las contrase&ntilde;as coinciden.");
		}
	
		if (elemento.value.length < minCaracteresPass){
			$("#alert_"+elemento.id).html("La contrase&ntilde;a debe constar de al menos "+minCaracteresPass+" caracteres.");
			return false;
		}
		else{
			for (var i = 0; i < elemento.value.length; i++) {
				if (caracteresValidosPass.indexOf(elemento.value.charAt(i)) == -1) {
					$("#alert_"+elemento.id).html("S&oacute;lo se admiten caracteres alfanum&eacute;ricos [a-z][0-9], puntos, guiones y guiones bajos.");
					return false;
				}
			}
			if ( p1.value != p2.value )
				return false;
			
			$("#alert_reg_pass1").html("Contrase&ntilde;a con caracteres v&aacute;lidos. Las contraseñas coinciden.");
			$("#alert_reg_pass2").html("Contrase&ntilde;a con caracteres v&aacute;lidos. Las contraseñas coinciden.");
			return true;
		}
	} 
	else{ // tipo desconocido o erróneo
		alert("Tipo de campo a comprobar desconocido = " + tipo);
		return false;	
	}
} // compruebaCampo(tipo, elemento)

// Esta función nos sirve para enviar datos por POST sin necesidad de crear un formulario
// Ejemplo: postwith('paginaObjetivo.php',{nombre:'minombre', email:'miemail@etc.com'});
function postwith (to,p) {
  var myForm = document.createElement("form");
  myForm.method="post" ;
  myForm.action = to ;
  for (var k in p) {
    var myInput = document.createElement("input") ;
    myInput.setAttribute("name", k) ;
    myInput.setAttribute("value", p[k]);
    myForm.appendChild(myInput) ;
  }
  document.body.appendChild(myForm) ;
  myForm.submit() ;
  document.body.removeChild(myForm) ;
}

function muestraCondiciones(){
	$.ajax({
		type: "POST",
		url: globalURLPHP+"termsandconditions.php",
		data: { varSesion : globalSID },
		success: function (result, textStatus, jqXHR) {
			// Cargamos el html de términos y condiciones en la "capaOculta"
			$("#capaOculta").html("<div id='pulsarparacerrar'></div>")
			$("#pulsarparacerrar").html(result);
			
			$("#pulsarparacerrar").click( function(){
				$("#pulsarparacerrar").remove();
				document.getElementById("capaOculta").style.visibility = "hidden";
			});

			// Hacemos visible la capa con toda la información.
			document.getElementById("capaOculta").style.visibility = "visible";
		},
		error: function (jqXHR, textStatus, errorThrown) { 
			alert("Ha sucedido un error: "+	textStatus, errorThrown	);
		},
	});
}