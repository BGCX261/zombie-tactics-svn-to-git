
// VARIABLES GLOBALES NECESARIAS PARA EL MAPA DE BATALLA:

var anchoCelda = 75; var altoCelda = 47; var numColumnas = 0; var numFilas = 0; var ident = null;
var aC = new Array(); // Creamos un array de rutas Comprobadas (almacena las rutas) ->  ac[idCelda][pisable][ruta]
var arrPer = arrPerEliminados = new Array(); // Creamos dos arrays de personajes (humanos y zombies)
var tickActual; // Contador de tiempo
var maximoTicksNecesarios = 100; // Número de ticks necesarios para actuar si el personaje tuviera velocidad = 1 (Si tuviera velocidad 2 necesitaría sólo 50 ticks)
var personajeActivo = personajePasivo = null; // Variables necesarias para las interacciones entre personajes
var equipoActual, faseActual;
var funcionSiguienteAccionZombi, funcionSiguienteAccion; 



function generaTableroBatalla(){
	
	// Aquí ya tenemos todos los datos necesarios para cargar la fase:
	// faseBatalla.id_mapa
	// faseBatalla.nombre
	// faseBatalla.descripcion
	// faseBatalla.json_mapa
	// faseBatalla.zombiesEnFase
	// partidaUsuario.personajes 
	// partidaUsuario.equipo
	
	var nf = numFilas = faseBatalla.json_mapa.mapa_pisables.length;
	var nc = numColumnas = faseBatalla.json_mapa.mapa_pisables[0].length;
	var ancCel = anchoCelda, altCel = altoCelda; 
	
	var capNueva, imgNueva, numImg, nombreImagen; // Creamos nuevos nodos y ruta de la imagen
	var etiquetaPadre = document.getElementById("contenedor_tablero"); // etiqueta donde se insertarán
	
	if ( etiquetaPadre.hasChildNodes() ) // Borramos los nodos existentes en el contenedor
		while ( etiquetaPadre.childNodes.length >= 1 )
			etiquetaPadre.removeChild( etiquetaPadre.firstChild );

	// Ahora creamos un div por cada celda del mapa
	for (var y=0; y<nf; y++){
		for (var x=0; x<nc; x++){
			capNueva = document.createElement("div");
			capNueva.setAttribute( "id", (x+y*nc).toString() ); // La id esta en una dimension
			capNueva.setAttribute("class", "div_celdas_mapa"); // el z-index ==1
			capNueva.setAttribute( "style", "left:"+(ancCel*x)+"px; top:"+(altCel*y)+"px;" );
      
			imgNueva = document.createElement("img");// y le insertamos su imagen
			numImg = faseBatalla.json_mapa["mapa_tiles"][y][x];
			nombreImagen = "images/"+faseBatalla.json_mapa["lista_tiles"][numImg];
			imgNueva.setAttribute("src", nombreImagen);
			capNueva.appendChild(imgNueva);
			etiquetaPadre.appendChild(capNueva);

			// Mostramos los Sprites del escenario:
			if (faseBatalla.json_mapa.mapa_sprites_decorado[y][x]>0){ // hay sprite de decorado
				capNueva  = document.createElement("div");
				capNueva.setAttribute( "id", (x+y*nc).toString()+"sprite" );
				numImg = ( faseBatalla.json_mapa.mapa_sprites_decorado[y][x] ) -1;
				var varLeft = faseBatalla.json_mapa["lista_sprites_decorado"][numImg][1];
				var varTop = faseBatalla.json_mapa["lista_sprites_decorado"][numImg][2];
				var zIndex = Math.floor((x+y*nc)/nc)*10+4; // igual que items. los personajes tienen +3
				capNueva.setAttribute( "style", "left:"+(ancCel*x + varLeft)+"px; top:"+(altCel*y + varTop)+"px;"
									   +"position: absolute; z-index:"+zIndex+"; "
									 );
				imgNueva = document.createElement("img");
				nombreImagen = "images/"+faseBatalla.json_mapa["lista_sprites_decorado"][numImg][0];
				imgNueva.setAttribute("src", nombreImagen);
				capNueva.appendChild(imgNueva);
				etiquetaPadre.appendChild(capNueva);
			} 
		}
	}

	//Ahora le ponemos al contenedor el tamaño que debería tener (según el número de celdas)
	etiquetaPadre.setAttribute("style", ( // "border: 1px solid #F0F; "+ // Borde color fucsia para pruebas de visualización
                                        "position: absolute; " +
                                        "width: " + (ancCel*nc) + "px; "+
                                        "height: "+ (altCel*nf) + "px; "+
                                        "left: "  + (0)         + "px; "+
                                        "top: "   + (0)         +"px;"
                                      ).toString() );

} // function generaTableroBatalla()

function mostrarItems(){
	var nf = numFilas, nc = numColumnas, ancCel = anchoCelda, altCel = altoCelda;
	var capNueva, imgNueva;
	var etiquetaPadre = document.getElementById("contenedor_tablero"); //etiqueta donde se insertarán
	var id, pos, nom, img, x, y, zIndex, vTop, vLeft;

	for (var i in faseBatalla.json_mapa.lista_items ){
		id = faseBatalla.json_mapa.lista_items[i].id;
		pos = faseBatalla.json_mapa.lista_items[i].posicion;
		x = pos%numColumnas;
		y = Math.floor(pos/numColumnas);
		nom = faseBatalla.json_mapa.lista_items[i].nombre;

		img = "images/"+faseBatalla.json_mapa.lista_items[i].sprite[0];
		vLeft = faseBatalla.json_mapa.lista_items[i].sprite[1];
		vTop = faseBatalla.json_mapa.lista_items[i].sprite[2];

		capNueva = document.createElement("div");
		capNueva.setAttribute( "id", id.toString()+"item" );
		zIndex = Math.floor((x+y*numColumnas)/numColumnas)*10+5;// los sprites de personajes tienen +6 de z-index

		capNueva.setAttribute( "style", "left:"+( (ancCel*x)+vLeft )+"px; top:"+( (altCel*y)+vTop )+"px; z-index:"+zIndex+"; position: absolute;" );
		imgNueva = document.createElement("img");
		imgNueva.setAttribute("src", img);
		imgNueva.setAttribute("alt", nom);
		capNueva.appendChild(imgNueva);
		etiquetaPadre.appendChild(capNueva);
	}
} // mostrarItems()

function cargaPersonajesEnTablero(){

	arrPer = new Array(); // reiniciamos el array de personajes
	
	// Comprobamos si debe haber zombies en las casillas y en caso afirmativo los creamos
	for (var i=0; i<faseBatalla.json_mapa.mapa_zombies.length; i++){
		for (var j=0; j<faseBatalla.json_mapa.mapa_zombies[0].length; j++){
			if ( faseBatalla.json_mapa.mapa_zombies[i][j] > 0 ) { // Comprobamos si hay zombie en la casilla
				
				// Identificamos el tipo de zombie y lo cargamos en zombieEnCasilla
				var zombieEnCasilla;
				for (var k in faseBatalla.zombiesEnFase)
					if (faseBatalla.zombiesEnFase[k].id_zombie == faseBatalla.json_mapa.mapa_zombies[i][j] )
						 zombieEnCasilla = faseBatalla.zombiesEnFase[k];
				
				faseBatalla.json_mapa.mapa_zombies[i][j]
					arrPer[arrPer.length] = new Personaje(
						zombieEnCasilla.id_zombie+"_"+(j+i*numColumnas), // nombreObjeto, 
						zombieEnCasilla.id_zombie+"_"+(j+i*numColumnas), // id, 
						"zombie", 					// bando, 
						zombieEnCasilla.nombre, 	// nombre, 
						"graficos_zombie", 			// graficos, 
						zombieEnCasilla.nivel, 		// nivel, 
						zombieEnCasilla.experiencia,// experiencia, 
						0,							// Puntos de habilidad, esto es sólo aplicable a personajes humanos
						zombieEnCasilla.vida, 		// vida, 
						zombieEnCasilla.fuerza, 	// fuerza, 
						zombieEnCasilla.destreza, 	// destreza, 
						zombieEnCasilla.suerte, 	// suerte,
						JSON.parse(zombieEnCasilla.ataque_corto_alcance), // ataqueCD, 
						JSON.parse(zombieEnCasilla.ataque_largo_alcance), // ataqueLD, 
						(j+i*numColumnas), 			// posicion
						Math.floor(Math.random()*4)	// orientacion -> D U R L (0=Down; 1=Up; 2=Right; 3=Left)
					);
			}
		}
	}
	
	// Ahora creamos los personajes jugadores (humanos) y los añadimos a arrPer (array de Personajes + Zombies)
	var casillasDespliegue = faseBatalla.json_mapa.posiciones_despliegue; //[39, 42, 32];// Casillas para el despliegue de los personajes jugadores
	var arraySprites;
	
	for (var i = 0; i<partidaUsuario.personajes.length; i++){
		
		if (partidaUsuario.personajes[i].sexo=="hombre") arraySprites = "graficos_humano";
		else arraySprites = "graficos_humana";
		
		arrPer[arrPer.length] = new Personaje(
			partidaUsuario.personajes[i].id_personaje, // nombreObjetoPersonaje, 
			"h"+partidaUsuario.personajes[i].id_personaje, 
			"humano", // bando
			partidaUsuario.personajes[i].nombre, 
			arraySprites,
			partidaUsuario.personajes[i].nivel, 
			partidaUsuario.personajes[i].experiencia, 
			partidaUsuario.personajes[i].puntos_habilidad,
			partidaUsuario.personajes[i].vida, 
			partidaUsuario.personajes[i].fuerza, 
			partidaUsuario.personajes[i].destreza, 
			partidaUsuario.personajes[i].suerte, 
			partidaUsuario.personajes[i].arma_corto_alcance, //"ataqueCD",  ataqueCortaDistancia
			partidaUsuario.personajes[i].arma_largo_alcance, //"ataqueLD",  ataqueLargaDistancia
			casillasDespliegue[i] ,// id_casilla_personaje, 
			0 //orientacion
		);

	}
} // cargaPersonajesEnTablero()

function muestraPersonajes(){
	for(var i in arrPer) {
		// Mostramos el sprite correspondiente a cada personaje en el mapa de batalla
		arrPer[i].muestraSprite(); // TODO: Actualizar el sistema utilizado CSS para mostrar los sprites 
		

		// Si el personaje es humano, se muestra un resumen de sus datos en el submenú inferior
		if (arrPer[i].bando == "humano"){
			var textSubMenusInf = 
			'<div id="smi_personaje'+ arrPer[i].id +'" class="submenuInf" >' +
				'<div class="submenuInfImagen"><img src="' + 'images/' + arrPer[i].cargaGraficos()[28] + '" alt="' + arrPer[i].nombre + '" height="100px" width="100px"> </div>' +
				'<div class="submenuInfCuerpo">Exp: <span class="exp">' + arrPer[i].experiencia + '</span> - Next: <span class="nxt">' + arrPer[i].calcPtsParaSgteNiv() + '</span></div>' +
				'<div class="submenuInfCuerpo">Equipado: <span class="ar0">' + arrPer[i].ataqueCortaDistancia.nombre + '</span> / <span class="ar1">' + arrPer[i].ataqueLargaDistancia.nombre + '</span></div>' +
				'<div id="smi_personaje' + arrPer[i].id + '_cab" class="submenuInfCabecera">' + arrPer[i].nombre + ' HP <span class="vid">' + arrPer[i].vida + '</span>/<span class="vim">' + arrPer[i].vidaMax + '</span> LV<span class="niv">' + arrPer[i].nivel + '</span></div>' +
			'</div>';
		  $('#contenedor_inferior').append(textSubMenusInf);
		  preparaMenuInferior(arrPer[i].id);
		} 
	} 
}  // muestraPersonajes()

function preparaMenuInferior(idMenu){
  // Hacemos que al pulsar en la cabecera inferior se pliegue o despliegue el menu
  $('#smi_personaje'+idMenu+'_cab').click(function() {
    $('#smi_personaje'+idMenu+' div.submenuInfCuerpo').toggle('slow');
    $('#smi_personaje'+idMenu+' div.submenuInfImagen').toggle('slow');
  });
  // Hacemos que por defecto los menus aparezcan plegados
  $('#smi_personaje'+idMenu+' div.submenuInfCuerpo').hide();
  $('#smi_personaje'+idMenu+' div.submenuInfImagen').hide();
} // preparaMenuInferior(idMenu)

function comparaVelocidadPersonajes(a, b) { // BORRAR
  return a.velocidad - b.velocidad;
  /*
  //Ordenando Arrays (ejemplo)
  function comparaVelocidadPersonajes(a, b) { return a.velocidad - b.velocidad;  }
  var ordenando = [
    {'nombreObjeto':'zombie1','id':'z00007', 'velocidad':10},
    {'nombreObjeto':'zombie1','id':'z00007', 'velocidad':5},
    {'nombreObjeto':'zombie1','id':'z00007', 'velocidad':2},
    {'nombreObjeto':'zombie1','id':'z00007', 'velocidad':9}
  ];
  alert("Antes: "+objetoACadena(ordenando))
  ordenando.sort(comparaVelocidadPersonajes)
  alert("Despues: "+objetoACadena(ordenando));
  */
} // comparaVelocidadPersonajes(a, b)

function comparaSiguienteTurnoPersonajes(a, b) {
  return a.siguienteTurno - b.siguienteTurno;
} 

function estableceSiguienteTurno(personaje){
	var numTicksNec = Math.ceil( maximoTicksNecesarios / personaje.velocidad ); // Número de Ticks que necesita el personaje para actuar
	for ( var i = tickActual+1; i < (tickActual+maximoTicksNecesarios); i++){
		if ( i% numTicksNec == 0){
			personaje.siguienteTurno = i;
			return;
		}
	}
} // estableceSiguienteTurno(personaje)

function actualizarMenuOrdenTurnos(){
		
	var cadOrdenTurnos = "Tick actual: "+tickActual;
	var numMaxTurnosAMostrar = 20;
	
	for (var i = 0; i < numMaxTurnosAMostrar; i++){
		if ( i < arrPer.length ){
			cadOrdenTurnos += "<div class=\"Turno_"+arrPer[i].nombre+"\">"+arrPer[i].nombre+"("+arrPer[i].siguienteTurno+")</div>" ;
		}
	}
	if ( arrPer.length > numMaxTurnosAMostrar )
		cadOrdenTurnos += "<div class=\"Turno_no_mostrados\">...</div>" ;
	
	$("#sms_ord div.submenuSupCuerpo").html(cadOrdenTurnos); // Generamos o actualizamos menú
		
} // actualizarMenuOrdenTurnos()

function actualizarMenuObjetivos(){
	
	var cadObjetivos = "";
	var listaObjetivos = faseBatalla.json_mapa.lista_objetivos;
	
	for (var i=0; i<listaObjetivos.length; i++){
		
		if ( listaObjetivos[i].completado ){ 
			cadObjetivos += "<div style='text-decoration:line-through; color:#cccccc;'>"+listaObjetivos[i].nombre+"</div>";
		} 
		else{
			cadObjetivos += "<div>"+listaObjetivos[i].nombre+"</div>";
		}
	}
	alert
	$("#sms_obj div.submenuSupCuerpo").html(cadObjetivos); // Generamos o actualizamos menú
		
} // actualizarMenuObjetivos()

function iniciarTurnos(){
	
	arrPerEliminados = aC = new Array(); // reiniciamos los arrays de personajes y el array de rutas comprobadas
	ident = personajeActivo = personajePasivo = null; // reiniciamos la id de casilla y los personajes activo y pasivo
	mostrarAviso( faseBatalla.json_mapa.mensaje_introduccion, 1);
	comprobarTicks(); 
	
} // iniciarTurnos()

function comprobarTicks(){ // A partir del tick actual comprueba los N siguientes. Suficientes para que en esos ticks se ubique el turno de todos los personajes
	
	for ( var i = 0; i < maximoTicksNecesarios; i++){ 
		
		if ( compruebaTurnosEnTick() ) { // Comprobamos si le toca jugar a alguien en este tick
			
			var personajeTurnoActual = compruebaTurnosEnTick();
			estableceSiguienteTurno(personajeTurnoActual); // Calculamos al personaje cuándo será su siguiente turno
			arrPer.sort(comparaSiguienteTurnoPersonajes); // Ordenamos el array de personajes según los turnos
			actualizarMenuOrdenTurnos(); // Actualizamos el listado de turnos
			darIniciativaAPersonaje(personajeTurnoActual); // Le damos la iniciativa al personaje
			return true;
		}
		else { // Si no le toca a nadie, avanzamos un tick
			tickActual++; // Avanzamos un tick
		}
	}
	return false; // En teoría nunca deberíamos llegar a este return
	
} // comprobarTicks()

function compruebaTurnosEnTick(){
	for (var i in arrPer)
		if ( arrPer[i].siguienteTurno== tickActual )
			return arrPer[i]; 
	return false;
} // compruebaTurnosEnTick()

function darIniciativaAPersonaje (personaje){
	personajeActivo = personaje;
	personajeActivo.nombreObjeto="personajeActivo"; // Necesario para que funcionen las animaciones
	personajeActivo.movimientosPersonaje = 1;
	personajeActivo.accionesPersonaje = 1; 
	if ( personajeActivo.bando == "zombie" ){
		funcionSiguienteAccionZombi = null;
		jugarTurnoAutomatico();
	}
	else if ( personajeActivo.bando == "humano" ){
		funcionSiguienteAccionZombi = null;
		jugarTurnoManual();
	}
	else {
		alert("¡Debe haber algún error! ¡En este juego sólo hay humanos y zombies!")
	}
} // darIniciativaAPersonaje (personaje)

function jugarTurnoManual(){
	
    funcionSiguienteAccion = function() {
    var pixelesTop= Math.floor(personajeActivo.posicion/numColumnas)*altoCelda -70;
    var pixelesLeft= (personajeActivo.posicion%numColumnas)*anchoCelda+70;
	
      //CREAMOS EL MENÚ
      creaMenu( //MENU PRINCIPAL *********************************************************************************
        pixelesLeft, pixelesTop, "contenedor_tablero", "MEN&Uacute;", "id_menu", true, 85, "alto",
        [
          ["Mover", function() // Función ejecutada al pulsar en "Mover"
            {
              cerrarMenu("#id_menu_act");cerrarMenu("#id_menu_esp"); // Se cierran los otros menús
              $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
              // Marcamos las casillas donde puede mover el personajeActivo
              compruebaMovilidadEnTablero((personajeActivo.posicion%numColumnas), Math.floor(personajeActivo.posicion/numColumnas), (personajeActivo.pasosQuePuedeDar),'centro','0');
            }
          ],
          ["Actuar", function()
            {
              $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
              cerrarMenu("#id_menu_mov");cerrarMenu("#id_menu_esp");$("#id_menu_act").remove();

              creaMenu( //MENU ACTUAR ****************************************************************************
                "auto", -1, "id_menu", "ACTUAR", "id_menu_act", true, 100, "alto0",
                [
                  ["Atacar", function()
                    {
                      $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
                      cerrarMenu("#id_menu_act_acc");cerrarMenu("#id_menu_act_equ");
                      creaMenu( //MENU ELEGIR ATAQUE *************************************************************
                        "auto", -1, "id_menu_act", "ELEGIR ATAQUE", "id_menu_act_ata", true, 150, "alto10",
                        [
                          [personajeActivo.ataqueCortaDistancia.nombre, function()
                            {
                              $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
                              cerrarMenu("#id_menu_act_ata_ata");
                              var nCol_X=personajeActivo.posicion%numColumnas;
                              var nFil_Y=Math.floor(personajeActivo.posicion/numColumnas);
                              //Comprobamos y marcamos las zonas donde el ataque llegaría.
                              compruebaZonasAtaque(personajeActivo.ataqueCortaDistancia, nCol_X, nFil_Y, personajeActivo.ataqueCortaDistancia.alcance);
                            }
                          ],
                          [personajeActivo.ataqueLargaDistancia.nombre, function()
                            {
                              $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
                              cerrarMenu("#id_menu_act_ata_ata");
                              var nCol_X=personajeActivo.posicion%numColumnas;
                              var nFil_Y=Math.floor(personajeActivo.posicion/numColumnas);
                              compruebaZonasAtaque(personajeActivo.ataqueLargaDistancia, nCol_X, nFil_Y, personajeActivo.ataqueLargaDistancia.alcance);
                            }
                          ]
                        ],
                        function() {cerrarMenu("#id_menu_act_ata");} //fncMenActAtaCerrar //accion alCerrar
                      );
                    }
                  ],
                  ["Acci&oacute;n", function()
                    {
                      $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
                      cerrarMenu("#id_menu_act_ata");cerrarMenu("#id_menu_act_equ");

                      creaMenu( //MENU ELEGIR ACCION *************************************************************
                        "auto", -1, "id_menu_act", "ACCI&Oacute;N", "id_menu_act_acc", true, 240, "a10",
                        devuelveArrayMenuAcciones(), //arMenActAcc, //array del menu de acciones
                        function() {cerrarMenu("#id_menu_act_acc")}// fncMenActAccCerrar //accion alCerrar
                      );
                    }
                  ],
                  ["Equipo", function()
                    {
                      $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
                      cerrarMenu("#id_menu_act_ata");cerrarMenu("#id_menu_act_acc");
                      creaMenu( // MENU ELEGIR ITEM *************************************************************
                        "auto", -1, "id_menu_act", "EQUIPO", "id_menu_act_equ", true, 290, "a10",
                        devuelveArrayMenuItems(), //arMenActEqu, //array del menu de equipo
                        function() {cerrarMenu("#id_menu_act_equ");} //fncMenActEquCerrar //accion alCerrar
                      );
                    }
                  ]
                ],

                function() {cerrarMenu("#id_menu_act");} //accion alCerrar
              );
            }
          ],
          ["Esperar", function() {
                          cerrarMenu("#id_menu_mov");
                          cerrarMenu("#id_menu_act");
                          $(".celdaTransparente50").remove();
                          $(".celdasMarcadasAzul").remove();
                          eligeOrientacion(); //Mostramos las direcciones donde se puede fijar la orientación del personaje. Aquí acabará el turno
                        }
          ]
        ], //arMen
        function() {cerrarMenu("#id_menu");
                     $(".celdaTransparente50").remove(); // borramos casillas marcadas
                     $(".celdasMarcadasAzul").remove(); // quizás también utilice este tipo de marcado
                   } 
      ); //creaMenu()

      if( personajeActivo.movimientosPersonaje == 0 ){
        // Desactivar opción MOVER
        $("#id_menu_opc_0").attr("disabled", "true");
        $("#id_menu_opc_0").css("color", "grey");
        $("#id_menu_opc_0").css("border", "1px solid transparent");
        $("#id_menu_opc_0").css("text-shadow", "-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000");
      }

      if( personajeActivo.accionesPersonaje == 0 ){
        // Desactivar opción ACTUAR
        $("#id_menu_opc_1").attr("disabled", "true");
        $("#id_menu_opc_1").css("color", "grey");
        $("#id_menu_opc_1").css("border", "1px solid transparent");
        $("#id_menu_opc_1").css("text-shadow", "-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000");
      }
    }; //funcionSiguienteAccion
	
    funcionSiguienteAccion();
	
    $( "#"+personajeActivo.id).click(function(){ // Funciones ejecutadas al pulsar sobre el personaje
      funcionSiguienteAccion(); // Al pulsar sobre el personaje activo se abre el menú
    } ) 
}

function remarcarCasilla(idCasilla){ // Atencion, no confundir remarcar() con marcar()
  if ( !document.getElementById(idCasilla+"remarcada") )
  {
      var capNueva;
      var etiquetaPadre = document.getElementById("contenedor_tablero");
      var pixelesLeft= (idCasilla%numColumnas)*anchoCelda;
      var pixelesTop= Math.floor(idCasilla/numColumnas)*altoCelda;
      capNueva = document.createElement("div");
      capNueva.setAttribute( "id", idCasilla+"remarcada" );
      capNueva.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+pixelesTop+"px;" );
      capNueva.setAttribute("class", "celdasMarcadasAzul"); // está en combates.css, el z-index ==2
      etiquetaPadre.appendChild(capNueva);
  }
}

function eligeOrientacion(){
  var etiquetaPadre = document.getElementById("contenedor_tablero");
  var pixelesLeft= (personajeActivo.posicion%numColumnas)*anchoCelda;
  var pixelesTop= Math.floor(personajeActivo.posicion/numColumnas)*altoCelda;

  var confirmarOrientacion = function() {
    creaMenu(
      "auto", -1, "id_menu", "ESPERAR", "id_menu_esp", true, 110, "alto",
      [
        ["Aceptar", function() {
            $(".celdasMarcadasAzul").remove();
            $(".celdaTransparente50").remove();
            $("#id_menu").remove();
            $('#'+personajeActivo.id).unbind('click');
			finalizarTurno(); 
          }
        ],
        ["Cancelar", function() {cerrarMenu("#id_menu_esp");} ]
      ],
      function() {cerrarMenu("#id_menu_esp");}
    );
  }
  
  // Orientación actual (sea la que sea)
  confirmarOrientacion();
  // Arriba
  var capArr = document.createElement("div");
  capArr.setAttribute( "id", "arriba" );
  capArr.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+(pixelesTop-altoCelda)+"px; background-color:#ccccff" );
  capArr.setAttribute( "class", "celdaTransparente50" );
  etiquetaPadre.appendChild(capArr);
  $("#arriba").click( function(){
    $(".celdasMarcadasAzul").remove();
    var capNueva = document.createElement("div");
    capNueva.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+(pixelesTop-altoCelda)+"px; background-color:#ccccff" );
    capNueva.setAttribute( "class", "celdasMarcadasAzul" );
    etiquetaPadre.appendChild(capNueva);
    personajeActivo.cambiaSprite(1); //Aquí está incluido el cambio de orientación // D U R L (0=Down; 1=Up; 2=Right; 3=Left) 
    confirmarOrientacion();
  } );

  // Abajo
  var capAba = document.createElement("div");
  capAba.setAttribute( "id", "abajo" );
  capAba.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+(pixelesTop+altoCelda)+"px; background-color:#ccccff" );
  capAba.setAttribute( "class", "celdaTransparente50" );
  etiquetaPadre.appendChild(capAba);
  $("#abajo").click( function(){
    $(".celdasMarcadasAzul").remove();
    var capNueva = document.createElement("div");
    capNueva.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+(pixelesTop+altoCelda)+"px; background-color:#ccccff" );
    capNueva.setAttribute( "class", "celdasMarcadasAzul" );
    etiquetaPadre.appendChild(capNueva);
    personajeActivo.cambiaSprite(0);
    confirmarOrientacion();

  } );

  // Izquierda
  var capIzq = document.createElement("div");
  capIzq.setAttribute( "id", "izquierda" );
  capIzq.setAttribute( "style", "left:"+(pixelesLeft-anchoCelda)+"px; top:"+pixelesTop+"px; background-color:#ccccff" );
  capIzq.setAttribute( "class", "celdaTransparente50" );
  etiquetaPadre.appendChild(capIzq);
  $("#izquierda").click( function(){
    $(".celdasMarcadasAzul").remove();
    var capNueva = document.createElement("div");
    capNueva.setAttribute( "style", "left:"+(pixelesLeft-anchoCelda)+"px; top:"+pixelesTop+"px; background-color:#ccccff" );
    capNueva.setAttribute( "class", "celdasMarcadasAzul" );
    etiquetaPadre.appendChild(capNueva);
    personajeActivo.cambiaSprite(3);
    confirmarOrientacion();

  } );

  // Derecha
  var capDch = document.createElement("div");
  capDch.setAttribute( "id", "derecha" );
  capDch.setAttribute( "style", "left:"+(pixelesLeft+anchoCelda)+"px; top:"+pixelesTop+"px; background-color:#ccccff" );
  capDch.setAttribute( "class", "celdaTransparente50" );
  etiquetaPadre.appendChild(capDch);
  $("#derecha").click( function(){
    $(".celdasMarcadasAzul").remove();
    var capNueva = document.createElement("div");
    capNueva.setAttribute( "style", "left:"+(pixelesLeft+anchoCelda)+"px; top:"+pixelesTop+"px; background-color:#ccccff" );
    capNueva.setAttribute( "class", "celdasMarcadasAzul" );
    etiquetaPadre.appendChild(capNueva);
    personajeActivo.cambiaSprite(2);
    confirmarOrientacion();
  });
} // eligeOrientacion()

function compruebaZonasAtaque (ataque, posX, posY, pasosRestantes, atras){ //USO: compruebaZonasAtaque(x, y, alcanceArma, 'centro')
  var ident = (posY * numColumnas)+posX;
  
  if (posX<0 || posY<0 || posX>=numColumnas || posY>=numFilas) return; // Evitamos la salida de los limites de la matriz

  if ( hayPersonaje(ident) ) {//Si hay un personaje en la casilla...
    if (personajeActivo.bando != (hayPersonaje(ident)).bando )// ...y no es el personaje activo (ident!=personajeActivo.posicion) o alguien de su bando... 
      marcarCasillaAtacar(ident, "#ccccff", ataque); // ...marcamos de azul, como casilla objetivo
  }
  else marcarCasillaAtacar(ident, "#ffcccc"); // Si no hay nadie, marcamos de rojo

  if (atras != "arriba")
    if (pasosRestantes > 0)
      compruebaZonasAtaque (ataque, posX, posY-1, pasosRestantes-1, "abajo")
  if (atras != "derecha")
    if (pasosRestantes > 0)
      compruebaZonasAtaque (ataque, posX+1, posY, pasosRestantes-1, "izquierda")
  if (atras != "abajo")
    if (pasosRestantes > 0)
      compruebaZonasAtaque (ataque, posX, posY+1, pasosRestantes-1, "arriba")
  if (atras != "izquierda")
    if (pasosRestantes > 0)
      compruebaZonasAtaque (ataque, posX-1, posY, pasosRestantes-1, "derecha")
} // function compruebaZonasAtaque (ataque, posX, posY, pasosRestantes, atras)

function hayPersonaje(idCasilla){
  for (var i in arrPer){
    if (arrPer[i].posicion == idCasilla){
      return arrPer[i]; // devuelve el personaje hallado en la posición
    }
  }
  return false; // No devuelve personaje
}

function marcarCasillaAtacar(idCasilla, colorCasilla, ataqueM){ 
  if ( !document.getElementById(idCasilla+"marcada") )
  {
    var capNueva;
    var etiquetaPadre = document.getElementById("contenedor_tablero");
    var pixelesLeft= (idCasilla%numColumnas)*anchoCelda;
    var pixelesTop= Math.floor(idCasilla/numColumnas)*altoCelda;
    capNueva = document.createElement("div");
    capNueva.setAttribute( "id", idCasilla+"marcada" );
    capNueva.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+pixelesTop+"px; background-color: "+ colorCasilla );
    capNueva.setAttribute( "class", "celdaTransparente50" );
    etiquetaPadre.appendChild(capNueva);

    if (colorCasilla=="#ccccff"){ // azul = hayenemigo
      $("#"+idCasilla+"marcada").click(
        function() {
            for (var i in arrPer){ //Recorremos el array de personajes
              if (arrPer[i].posicion==idCasilla){ //El personaje que está sobre la casilla pulsada
                personajePasivo = arrPer[i]; //Se convierte en el personajePasivo
              }
            }
          $(".celdasMarcadasAzul").remove();remarcarCasilla(idCasilla);

          creaMenu(
            "auto", -1, "id_menu_act_ata", "ATACAR", "id_menu_act_ata_ata", true, 100, "alto10",
            [
              [ "Aceptar", function() {
                  realizarAtaque(ataqueM);
                  $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
                  //Más cosas
                }
              ],
              ["Cancelar", function() {cerrarMenu("#id_menu_act_ata_ata")} ]
            ],
            function() {cerrarMenu("#id_menu_act_ata_ata")} //accion alCerrar
          );
        }
      );
    } // casilla con enemigo
  }
}

// ------------------------------------------------------------------------------------- INICIO FUNCIONES ITEMS Y ACCIONES

String.prototype.lpad = function(padString, length) {//pads left
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

String.prototype.rpad = function(padString, length) {//pads right
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}

function devuelveArrayMenuItems(){

  if (equipoActual.length == 0){
    return [ ["- Vacío -       |        |", function(){}] ];
  }

  var arrayMenuItems = new Array();
  var funcion, texto;

  for (var i in equipoActual){
    texto = equipoActual[i].nombre.rpad(" ", 15) +" | " + equipoActual[i].efecto.rpad(" ", 7) +" | x"+ equipoActual[i].cantidad;
    funcion = (function (i){
      return function(){
        $(".celdaTransparente50").remove();$(".celdasMarcadasAzul").remove();
        compruebaTableroUsarItem(equipoActual[i]);
      }
    })(i);
    arrayMenuItems[arrayMenuItems.length] = [texto, funcion];
  }
  return arrayMenuItems;
}

function hayItem(posicion){

  for (var i in faseBatalla.json_mapa.lista_items ){
    if (faseBatalla.json_mapa.lista_items[i].posicion == posicion)
      return faseBatalla.json_mapa.lista_items[i]; //Devolvemos el item
  }

  return false;
}

function compruebaTableroItemsAlrededor(arrayAcciones){
  var posicion = personajeActivo.posicion;
  var fila = Math.floor(posicion / numColumnas);
  var columna = posicion % numFilas;
  var texto, funcion;
  var funcionCreaMenu = function(fun){
    $("#id_menu_act_acc_ok").remove();
    creaMenu(
      "auto", -1, "id_menu_act_acc", "&#191;OK?", "id_menu_act_acc_ok", true, 90, "alto",
      [
        ["Aceptar", fun],
        ["Cancelar", function() {cerrarMenu("#id_menu_act_acc_ok")} ]
      ], //vuelveArrayMenuAcciones(), //arMenActAcc, //array del menu de acciones
      function() {cerrarMenu("#id_menu_act_acc_ok")}// fncMenActAccCerrar //accion alCerrar
    );

  };
  if (hayItem(posicion)){  // Comprobar centro
    texto = "Coger " + ( hayItem(posicion).nombre );
    funcion = function () {funcionCreaMenu( function(){recogerItem( hayItem(posicion) );} );};
    arrayAcciones[arrayAcciones.length] = [texto, funcion];
  }
  if (columna > 0) { //comprobar izquierda
    if ( hayItem(posicion-1) ){
      texto = "Coger " + ( hayItem(posicion-1).nombre );
      funcion = function () {funcionCreaMenu( function(){recogerItem( hayItem(posicion-1) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  if (columna < numColumnas-1) { //comprobar derecha
    if ( hayItem(posicion+1) ){
      texto = "Coger " + ( hayItem(posicion+1).nombre );
      funcion = function () {funcionCreaMenu( function(){recogerItem( hayItem(posicion+1) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  if (fila > 0) { //comprobar arriba
    if ( hayItem(posicion-numColumnas) ){
      texto = "Coger " + ( hayItem(posicion-numColumnas).nombre );
      funcion = function () {funcionCreaMenu( function(){recogerItem( hayItem(posicion-numColumnas) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  if (fila < numFilas-1) { //comprobar abajo
    if ( hayItem(posicion+numColumnas) ){
      texto = "Coger " + ( hayItem(posicion+numColumnas).nombre );
      funcion = function () {funcionCreaMenu( function(){recogerItem( hayItem(posicion+numColumnas) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  return arrayAcciones;
} // compruebaTableroItemsAlrededor

function hayAccion(posicion){

  for (var i in faseBatalla.json_mapa.lista_acciones ){
    if (faseBatalla.json_mapa.lista_acciones[i].posicion == posicion)
      return faseBatalla.json_mapa.lista_acciones[i]; //Devolvemos la accion
  }
  return false;
}

function ejecutaAccion(accion){ // Según el la funcion y parámetros de la accion se hace una u otra cosa.
  mostrarAviso(accion.param1); // Hacer luego

  // Gastamos la accion y cerramos el menú
  personajeActivo.accionesPersonaje--;

  $("#id_menu_act").remove();
  if (personajeActivo.accionesPersonaje <1 ) { // Si no nos quedan má acciones deshabilitamos el botón
    $("#id_menu_opc_1").attr("disabled", "true");
    $("#id_menu_opc_1").css("color", "grey");
    $("#id_menu_opc_1").css("border", "1px solid transparent");
    $("#id_menu_opc_1").css("text-shadow", "-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000");
  }

}

function compruebaTableroAccionesAlrededor(arrayAcciones){
  var posicion = personajeActivo.posicion;
  var fila = Math.floor(posicion / numColumnas);
  var columna = posicion % numFilas;
  var texto, funcion;
  var funcionCreaMenu = function(fun){
    $("#id_menu_act_acc_ok").remove();
    creaMenu(
      "auto", -1, "id_menu_act_acc", "&#191;OK?", "id_menu_act_acc_ok", true, 90, "alto",
      [
        ["Aceptar", fun],
        ["Cancelar", function() {cerrarMenu("#id_menu_act_acc_ok")} ]
      ], // array del menu de acciones
      function() {cerrarMenu("#id_menu_act_acc_ok")}
    );
  };
  
  if (hayAccion(posicion)){ // Comprobar casilla donde está el personaje
    texto = hayAccion(posicion).nombre;
    funcion = function () {funcionCreaMenu( function(){ejecutaAccion( hayAccion(posicion) );} );};
    arrayAcciones[arrayAcciones.length] = [texto, funcion];
  }
  if (columna > 0) { //comprobar izquierda
    if ( hayAccion(posicion-1) ){
      texto = hayAccion(posicion-1).nombre;
      funcion = function () {funcionCreaMenu( function(){ejecutaAccion( hayAccion(posicion-1) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  if (columna < numColumnas-1) { //comprobar derecha
    if ( hayAccion(posicion+1) ){
      texto = hayAccion(posicion+1).nombre;
      funcion = function () {funcionCreaMenu( function(){ejecutaAccion( hayAccion(posicion+1) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  if (fila > 0) { //comprobar arriba
    if ( hayAccion(posicion-numColumnas) ){
      texto = hayAccion(posicion-numColumnas).nombre;
      funcion = function () {funcionCreaMenu( function(){ejecutaAccion( hayAccion(posicion-numColumnas) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  if (fila < numFilas-1) { //comprobar abajo
    if ( hayAccion(posicion+numColumnas) ){
      texto = hayAccion(posicion+numColumnas).nombre;
      funcion = function () {funcionCreaMenu( function(){ejecutaAccion( hayAccion(posicion+numColumnas) );} );};
      arrayAcciones[arrayAcciones.length] = [texto, funcion];
    }
  }
  return arrayAcciones;
} // compruebaTableroAccionesAlrededor

function devuelveArrayMenuAcciones(){
  var arrayMenuAcciones = new Array(); // Creamos un array para guardar -> [["texto", function(){ funcion() }]]
  arrayMenuAcciones = compruebaTableroItemsAlrededor(arrayMenuAcciones);
  arrayMenuAcciones = compruebaTableroAccionesAlrededor(arrayMenuAcciones);
  if (arrayMenuAcciones.length == 0){
    return [ ["No puedes hacer nada aqui", function(){}] ];
  }
  return arrayMenuAcciones;
}

function compruebaTableroUsarItem(item){
  var posicion = personajeActivo.posicion;
  var fila = Math.floor(posicion / numColumnas);
  var columna = posicion % numFilas;
  marcarCasillaUsarItem (posicion, item); // Marcamos el centro, siempre
  if (columna > 0) { //marcar izquierda
    if ( hayPersonaje(posicion-1) ) marcarCasillaUsarItem ( posicion-1, item); // Marcamos azul
    else marcarCasillaUsarItem(posicion-1); // marcamos de rojo
  }
  if (columna < numColumnas-1) { //marcar derecha
    if ( hayPersonaje(posicion+1) ) marcarCasillaUsarItem ( posicion+1, item);
    else marcarCasillaUsarItem(posicion+1);
  }
  if (fila > 0) { //marcar arriba
    if ( hayPersonaje(posicion-numColumnas) ) marcarCasillaUsarItem (posicion-numColumnas, item);
    else marcarCasillaUsarItem(posicion-numColumnas);
  }
  if (fila < numFilas-1) { //marcar abajo
    if ( hayPersonaje(posicion+numColumnas) ) marcarCasillaUsarItem (posicion+numColumnas, item);
    else marcarCasillaUsarItem(posicion+numColumnas);
  }
}

function recogerItem(itemRecogido){

  if (itemRecogido.clase == "weapon"){ // Si el item es un arma, equipamos al personaje
    if (itemRecogido.tipo == 0){
         personajeActivo.ataqueCortaDistancia = {"nombre": itemRecogido.nombre, "alcance": itemRecogido.alcance, "danyo": itemRecogido.danyo, "efecto": itemRecogido.efecto, "tipo": 0};
    }
    else if (itemRecogido.tipo == 1){
         personajeActivo.ataqueLargaDistancia = {"nombre": itemRecogido.nombre, "alcance": itemRecogido.alcance, "danyo": itemRecogido.danyo, "efecto": itemRecogido.efecto, "tipo": 1};
    }
  }

  else if (itemRecogido.clase == "item"){
    var itemEnEquipo = false;
    for (var i in equipoActual){
      if (equipoActual[i].id == itemRecogido.id){ // Si ya tenemos el item en el equipo sólo aumentamos la cantidad
        equipoActual[i].cantidad = equipoActual[i].cantidad + itemRecogido.cantidad;
        itemEnEquipo = true;
      }
    }

    // Si no teníamos el ítem en el equipo, lo añadimos al equipo
    if (!itemEnEquipo) equipoActual[equipoActual.length] = {"id":itemRecogido.id, "nombre":itemRecogido.nombre,  "efecto":itemRecogido.efecto, "cantidad":itemRecogido.cantidad};
  }

  // Eliminamos el item recogido del mapa "faseBatalla.json_mapa.lista_items"
  for (var j in faseBatalla.json_mapa.lista_items){
    if (faseBatalla.json_mapa.lista_items[j].id == itemRecogido.id)
      faseBatalla.json_mapa.lista_items.splice(j, 1); // Eliminamos el elemento del array
  }

  // Eliminamos el sprite del item
  mostrarAviso(personajeActivo.nombre + " coge "+ itemRecogido.nombre)
  var elementoABorrar=document.getElementById(itemRecogido.id + "item"); // La id del DIV que contiene su IMG coincide con la del personaje
  elementoABorrar.parentNode.removeChild(elementoABorrar);

  // Gastamos la accion y cerramos el menú
  personajeActivo.accionesPersonaje--;

  $("#id_menu_act").remove();
  if (personajeActivo.accionesPersonaje <1 ) { // Si no nos quedan má acciones deshabilitamos el botón
    $("#id_menu_opc_1").attr("disabled", "true");
    $("#id_menu_opc_1").css("color", "grey");
    $("#id_menu_opc_1").css("border", "1px solid transparent");
    $("#id_menu_opc_1").css("text-shadow", "-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000");
  }

} // recogerItem()

function gastarItem (itemGastado){

  for (var i in equipoActual){
    if (equipoActual[i].id == itemGastado.id){
      equipoActual[i].cantidad --;
      if (equipoActual[i].cantidad < 1) {equipoActual.splice(i, 1);} // Eliminamos el elemento del array
    }
  }
} //gastarItem

function marcarCasillaUsarItem (idCasilla, item){
  var capNueva;
  var etiquetaPadre = document.getElementById("contenedor_tablero");
  var pixelesLeft= (idCasilla%numColumnas)*anchoCelda;
  var pixelesTop= Math.floor(idCasilla/numColumnas)*altoCelda;
  capNueva = document.createElement("div");
  capNueva.setAttribute( "id", idCasilla+"marcada" );
  if (item)
    capNueva.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+pixelesTop+"px; background-color: "+ "#ccccff" );
  else
    capNueva.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+pixelesTop+"px; background-color: "+ "#ffcccc" );
  capNueva.setAttribute( "class", "celdaTransparente50" );
  etiquetaPadre.appendChild(capNueva);

  if (item){
    $("#"+idCasilla+"marcada").click( function(){

      $("#id_menu_act_equ_equ").remove();

      creaMenu(
        "auto", -1, "id_menu_act_equ", "USAR", "id_menu_act_equ_equ", true, 100, "alto",
        [
          ["Aceptar", function() {
              $(".celdasMarcadasAzul").remove();
              $(".celdaTransparente50").remove();
              personajePasivo = hayPersonaje(idCasilla); // El personaje pasivo puede ser el mismo personaje que el activo, p.e. si se cura a si mismo con un medikit
              mostrarTextoSobrePersonaje(personajePasivo.posicion, item.efecto, 1000);
              mostrarAviso(personajePasivo.nombre + " " + item.efecto);
              personajePasivo.recibeItem(item.efecto);
              gastarItem(item);

              // Gastamos la accion y cerramos el menú
              personajeActivo.accionesPersonaje--;

              $("#id_menu_act").remove();
              if (personajeActivo.accionesPersonaje <1 ) { // Si no nos quedan má acciones deshabilitamos el botón
                $("#id_menu_opc_1").attr("disabled", "true");
                $("#id_menu_opc_1").css("color", "grey");
                $("#id_menu_opc_1").css("border", "1px solid transparent");
                $("#id_menu_opc_1").css("text-shadow", "-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000");
              }
            }
          ],
          ["Cancelar", function() {cerrarMenu("#id_menu_act_equ_equ");} ]
        ],
        function() {cerrarMenu("#id_menu_act_equ_equ");}
      );

    } );
  } // if(item)
}// marcarCasillaUsarItem

// ------------------------------------------------------------------------------------- FIN FUNCIONES ITEMS Y ACCIONES

function jugarTurnoAutomatico(){ 

	personajeZombi = new Object();
	personajeZombi = personajeActivo;
	personajeZombi.nombreObjeto = "personajeZombi";	
	var colPA = personajeActivo.posicion%numColumnas;
	var filPA = Math.floor(personajeActivo.posicion/numColumnas);
	
	// El zombi mira hacia la zona donde está orientado
	var enemigoAvistado = verEnemigos(); // es un objeto Personaje
	if ( enemigoAvistado ){
		var colPE = enemigoAvistado.posicion%numColumnas;
		var filPE = Math.floor(enemigoAvistado.posicion/numColumnas);
		personajePasivo = enemigoAvistado;

		funcionSiguienteAccionZombi = function(){
			realizarAtaque(personajeZombi.ataqueCortaDistancia);
			setTimeout( "finalizarTurno()", 2600 );
		}

		compruebaMovilidadEnTablero (colPA, filPA, personajeZombi.pasosQuePuedeDar+1, 'centro', '0');
		$(".celdaTransparente50").remove();
		
		var rutaHaciaEnemigo = false;
		for (var i in aC){
			if (aC[i][0]==enemigoAvistado.posicion){
				rutaHaciaEnemigo=aC[i];
			}
		}// for (var i in aC)
		if (rutaHaciaEnemigo){
			var rutaAE = rutaHaciaEnemigo[2].toString(); // convertimos la ruta a cadena
			personajeZombi.recorreRuta(
				rutaAE.substring(1, rutaAE.length-1 ), //recorremos la ruta dando un paso menos
				"function(){ funcionSiguienteAccionZombi();  }"
			);
		}
		else{
			// TODO: Aqui debería hacer que el zombi intentara avanzar hacia al personaje que ha visto pero que está fuera de su alcance.
			mostrarAviso( personajeZombi.nombre+" no puede alcanzar su objetivo");
			finalizarTurno();
		}
	} // if ( verEnemigos() )
	else{
		mostrarAviso( personajeZombi.nombre+" no ve a ningún humano");
		//TODO: Aqui deberia poner un randomize para ver si se mueve aleatoriamente o no
		finalizarTurno();
	}
	mostrarTextoSobrePersonaje(personajeActivo.posicion, "Turno de "+personajeActivo.nombre, 1500); // TODO: borrar esto
	//finalizarTurno()
}

function verEnemigos(){ // Devuelve el primer personaje visto o false si no ve ninguno
	var distanciaVision = personajeActivo.pasosQuePuedeDar+1;
	var orientacion = personajeActivo.orientacion; // 0-ab 1-ar 2-de 3-iz
	var pRel, pA, pE; //posición relativa, personaje activo, personaje enemigo
	for (var i in arrPer){
		if (arrPer[i].bando != personajeActivo.bando){
			pA = personajeActivo;pE = arrPer[i];
			pRel = comprobacionPrecisaPosicionRelativa(pA, pE);

			//Resultado comprobacionPrecisaPosicionRelativa(pA, pE) siendo pA el personaje situado en X y pE el enemigo
			//  7 0 0 0 0 0 0 0 1
			//  6 7 0 0 0 0 0 1 2
			//  6 6 7 0 0 0 1 2 2
			//  6 6 6 7 0 1 2 2 2
			//  6 6 6 6 X 2 2 2 2
			//  6 6 6 5 4 3 2 2 2
			//  6 6 5 4 4 4 3 2 2
			//  6 5 4 4 4 4 4 3 2
			//  5 4 4 4 4 4 4 4 3
			
			switch (orientacion) {
				case 0: // mira hacia abajo
					if ( pRel == 3 || pRel == 4 || pRel == 5)
						if ( distanciaEntreDosCasillas(pA.posicion, pE.posicion) <= distanciaVision )
							return pE; // Si lo ve, devuelve el personaje visto
					break;
				case 1: // mira hacia arriba
					if ( pRel == 7 || pRel == 0 || pRel == 1)
						if ( distanciaEntreDosCasillas(pA.posicion, pE.posicion) <= distanciaVision )
							return pE;
					break;
				case 2: // mira hacia derecha
					if ( pRel == 1 || pRel == 2 || pRel == 3){ // Hay un personaje en su rango de vision
						if ( distanciaEntreDosCasillas(pA.posicion, pE.posicion) <= distanciaVision ){
							return pE;
						}
					}
					break;
				case 3: // mira hacia izquierda
					if ( pRel == 5 || pRel == 6 || pRel == 7)
						if ( distanciaEntreDosCasillas(pA.posicion, pE.posicion) <= distanciaVision )
							return pE;
					break;
				default:
					break;
			} // switch case
		} // if
	} // for
	return false; // esto es lo que devvuelve si no ve a ningun personaje enemigo
} // verEnemigos()

function comprobacionPrecisaPosicionRelativa(persCentral, persExterior){
	// Las zonas van a ser devueltas como enteros en el sentido de las agujas del reloj con
	// las siguientes equivalencias:

	//  7 0 0 0 0 0 0 0 1
	//  6 7 0 0 0 0 0 1 2
	//  6 6 7 0 0 0 1 2 2
	//  6 6 6 7 0 1 2 2 2
	//  6 6 6 6 X 2 2 2 2
	//  6 6 6 5 4 3 2 2 2
	//  6 6 5 4 4 4 3 2 2
	//  6 5 4 4 4 4 4 3 2
	//  5 4 4 4 4 4 4 4 3

	var filaPC = Math.floor(persCentral.posicion / numColumnas);
	var columnaPC = persCentral.posicion % numFilas;
	var filaPE = Math.floor(persExterior.posicion / numColumnas);
	var columnaPE = persExterior.posicion % numFilas;

	var difCol = columnaPE - columnaPC;

	var difFil = filaPE - filaPC;
	var posicionRelativa=-1;

	if (difCol>0 && difCol==difFil) posicionRelativa = 3; //Ok
	if (difCol<0 && difCol==difFil) posicionRelativa = 7; //Ok

	if (difCol>0 && difCol==-difFil) posicionRelativa = 1; //Ok
	if (difCol<0 && difCol==-difFil) posicionRelativa = 5; //Ok

	if (filaPE>filaPC && Math.abs(difFil)>Math.abs(difCol)) posicionRelativa = 4; //Ok
	if (filaPE<filaPC && Math.abs(difFil)>Math.abs(difCol)) posicionRelativa = 0; //Ok

	if (columnaPE>columnaPC && Math.abs(difCol)>Math.abs(difFil)) posicionRelativa = 2; // Ok
	if (columnaPE<columnaPC && Math.abs(difCol)>Math.abs(difFil)) posicionRelativa = 6; // Ok

	return posicionRelativa; //esto nos dice donde está el PP respecto al PA

} // comprobacionPrecisaPosicionRelativa(persCentral, persExterior)

function distanciaEntreDosCasillas(posA, posB){ //posA y posB deben ser dos números enteros
	var colA = posA%numColumnas;
	var filA = Math.floor(posA/numColumnas);
	var colB = posB%numColumnas;
	var filB = Math.floor(posB/numColumnas);
	var totalPasos = Math.abs(colA-colB)+Math.abs(filA-filB);
	return totalPasos;
} // distanciaEntreDosCasillas(posA, posB)

function compruebaMovilidadEnTablero (posX, posY, pasosRestantes, atras, ruta){ //USO: compruebaMovilidadEnTablero(x,y,pasos,'centro','0')

	if (ruta=="0")
		aC = new Array(); //reiniciamos el array de rutas comprobadas al entrar por 1ª vez

	var ident = (posY * numColumnas)+posX;
	var marcada = 0; //casilla con una ruta marcada

	// Ahora evitamos la salida de los limites de la matriz
	if (posX<0 || posY<0 || posX>=numColumnas || posY>=numFilas) return;

	if ( esPisable(ident) && ident!=personajeActivo.posicion ) marcarCasillaMover(ident, "#ccccff");  else marcarCasillaMover(ident, "#ffcccc");

	var tamanyoAC = aC.length; //Tamanyo arrayComprobados (aC, el que almacena las rutas)
	for (var i=0; i<tamanyoAC; i++){//comprobamos los elementos de la matriz "aC"
		if (aC[i][0] == ident){ //casilla marcada
			marcada = 1; //avisamos de que está marcada
			if (!esPisable(ident)){ //no es pisable
				pasosRestantes=0; //ponemos pasos a cero
				break;
			}//no pisable
			else {//es pisable
				if ((aC[i][2]).toString().length >= ruta.length){ //si la ruta guardada es mas larga
					aC[i][2] = ruta; //la sustituimos por la nueva
				}
				else { //si la ruta guardada es más corta
					pasosRestantes=0; //detenemos el paseo por esta ruta
				}
			} //pisable
		} //marcada
	} //for
	if (marcada==0){ //si no está marcada...
		if (!esPisable(ident)){ // ...y no es pisable
			aC[i]=[[ident],[false],[ruta.toString()]];
			pasosRestantes=0; // ponemos pasos restantes a cero para detener el movimiento
		}//no pisable
		if (esPisable(ident)){ // ...y es pisable
			aC[i]=[[ident],[true],[ruta.toString()]];
		}//pisable
	} //no marcada

	if (atras != "arriba")
		if (pasosRestantes > 0)
			compruebaMovilidadEnTablero (posX, posY-1, pasosRestantes-1, "abajo", ruta+"U")
	if (atras != "derecha")
		if (pasosRestantes > 0)
			compruebaMovilidadEnTablero (posX+1, posY, pasosRestantes-1, "izquierda", ruta+"R")
	if (atras != "abajo")
		if (pasosRestantes > 0)
			compruebaMovilidadEnTablero (posX, posY+1, pasosRestantes-1, "arriba", ruta+"D")
	if (atras != "izquierda")
		if (pasosRestantes > 0)
			compruebaMovilidadEnTablero (posX-1, posY, pasosRestantes-1, "derecha", ruta+"L")
} // compruebaMovilidadEnTablero (posX, posY, pasosRestantes, atras, ruta)

function esPisable (posicion){
	var pisabilidad = true;
	
	// Comprobamos que la casilla es pisable por naturaleza
	var fila = Math.floor(posicion / numColumnas);
	var columna = posicion % numFilas; 
	if ( (faseBatalla.json_mapa["mapa_pisables"][fila][columna]) == 0 )
		pisabilidad = false;
	
	var personajeEnPos = hayPersonaje(posicion); 
	if ( personajeEnPos && (personajeEnPos.id != personajeActivo.id) ){
		pisabilidad = false;
		if ( personajeActivo.bando=="zombie" && personajePasivo.id==personajeEnPos.id ){
			pisabilidad = true;
		}
	}
	
	
	return pisabilidad;
} // esPisable (posicion)

function marcarCasillaMover(idCasilla, colorCasilla){ //Ejemplo uso: marcarCasillaMover(posicionPersonaje, "blue")

	if ( !document.getElementById(idCasilla+"marcada") ) {

		var capNueva;
		var etiquetaPadre = document.getElementById("contenedor_tablero");
		var pixelesLeft= (idCasilla%numColumnas)*anchoCelda;
		var pixelesTop= Math.floor(idCasilla/numColumnas)*altoCelda;
		capNueva = document.createElement("div");
		capNueva.setAttribute( "id", idCasilla+"marcada" );

		capNueva.setAttribute( "style", "left:"+pixelesLeft+"px; top:"+pixelesTop+"px; background-color: "+ colorCasilla );
		capNueva.setAttribute( "class", "celdaTransparente50" );

		etiquetaPadre.appendChild(capNueva);
		if (colorCasilla=="#ccccff"){//azul
			$("#"+idCasilla+"marcada").click( function(){

				$(".celdasMarcadasAzul").remove(); //desremarcamos otras marcadas
				remarcarCasilla(idCasilla); //remarcamos casilla pulsada
				$("#id_menu_mov").remove();//Intentamos eliminar el menu antes de crearlo

				creaMenu( //MENU MOVER *****************************************************************************
				"auto", -1, "id_menu", "MOVER", "id_menu_mov", true, 90, "alto", // este es el bueno 2013
				[
					["Aceptar", function()
						{
							$(".celdasMarcadasAzul").remove();
							$(".celdaTransparente50").remove();
							personajeActivo.movimientosPersonaje --;

							if( personajeActivo.movimientosPersonaje == 0 ){
								// Desactivar opción MOVER
								$("#id_menu_opc_0").attr("disabled", "true");
								$("#id_menu_opc_0").css("color", "grey");
								$("#id_menu_opc_0").css("border", "1px solid transparent");
								$("#id_menu_opc_0").css("text-shadow", "-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000");
							}
							cerrarMenu("#id_menu"); 

							for (var i in aC){
								if (aC[i][0]==idCasilla){
									personajeActivo.recorreRuta(aC[i][2].toString().substring(1), "function(){funcionSiguienteAccion();  $( \"#\"+personajeActivo.id).click(function(){ funcionSiguienteAccion(); } ) }" ) 
								}
							}
							$('#'+personajeActivo.id).unbind('click');// Mientras se esté moviendo no se podrá abrir el menú pulsado en el personaje
						}
					],
					["Cancelar", function()
						{
							$(".celdasMarcadasAzul").remove();
							cerrarMenu("#id_menu_mov");
						}
					]
				],
				function()
					{
						$(".celdasMarcadasAzul").remove();
						cerrarMenu("#id_menu_mov");
					} 
				);//creaMenu MENU MOVER
			});
		}
		if (colorCasilla=="#ffcccc"){//rojo
			$("#"+idCasilla+"marcada").click( function(){
				mostrarAviso("La casilla no es pisable", 0); // mostrarAviso("La casilla "+idCasilla+" no es pisable", 0);
			});
		}
	}
}

function realizarAtaque(ataqueR){
	mostrarAviso(personajeActivo.nombre + " ataca con " + ataqueR.nombre);

	// Comprobamos donde está el enemigo y apuntamos hacia él (pRE = posición relativa enemigo)
	var pRE = comprobacionPrecisaPosicionRelativa(personajeActivo, personajePasivo);
	if (pRE==0) personajeActivo.orientacion = 1;
	if (pRE==1 || pRE==2 || pRE==3) personajeActivo.orientacion = 2;
	if (pRE==4) personajeActivo.orientacion = 0;
	if (pRE==5 || pRE==6 || pRE==7) personajeActivo.orientacion = 3;
	//orientacion -> D U R L (0=Down; 1=Up; 2=Right; 3=Left)
	
	if (ataqueR.tipo == 0)
		personajeActivo.cambiaSprite( 8 + personajeActivo.orientacion ); // corta distancia
	else if (ataqueR.tipo == 1)
		personajeActivo.cambiaSprite( 12 + personajeActivo.orientacion ); // larga distancia
	else
		alert("ERROR: Gráficos de ataque no encontrados")

	setTimeout( function(){personajeActivo.cambiaSprite( 0 + personajeActivo.orientacion );}, 2000);

	var atBas; // Ataque Base. Posibilidades base de atacar con éxito al objetivo (atBas) calculado en tanto por cien
	var atTotal; // Ataque Total. Posibilidad total de alcanzar el objetivo (en tanto por cien)
	var difNivel = personajeActivo.nivel-personajePasivo.nivel; // Diferencia de nivel
	var danyoBase = ataqueR.danyo;

	// Ajustamos el Ataque Base
	if ( difNivel < (-9) )
		atBas = 1;
	else if ( difNivel > 9 )
		atBas = 99;
	else
		atBas = (Math.sin( ( difNivel * (Math.PI/2) ) / 9 )* 49 + 50);

	// Modificadores de ataque
	var atFue = personajeActivo.fuerza;
	var atDes = personajeActivo.destreza;
	var atSue = personajeActivo.suerte;
	var atIte = 0;

	// Modificadores de defensa
	var dfFue = personajePasivo.fuerza;
	var dfDes = personajePasivo.destreza;
	var dfSue = personajePasivo.suerte;
	var dfIte = 0;

	// Diferenciales entre los atributos del atacante y el atacado.
	var atDifFue = atFue-dfFue;
	var atDifDes = atDes-dfDes;
	var atDifSue = atSue-dfSue;
	var atDifIte = atIte-dfIte;


	// Ajustamos el Ataque Total.
	if ( zonaDeImpacto() == "frente"){
		// La explicación de la siguiente fórmula es que la suerte interacciona con todo lo demás, la fuerza y la
		// destreza sólo interaccionan con el ataque base (diferencia de nivel entre personajes).
		atTotal = atBas * ( ( 100+atDifSue)/100 ) + (atDifFue*atBas/100) + (atDifDes*atBas/100) + ( (atDifIte*100/100) * ( ( 100+atDifSue)/100 ) );
	}
		else if ( zonaDeImpacto() == "flanco"){
		// En la siguiente formula se elimina la defensa de destreza del personaje pasivo (atDifDes pasa a ser atDes)
		atTotal = atBas * ( ( 100+atDifSue)/100 ) + (atDifFue*atBas/100) + (atDes*atBas/100) + ( (atDifIte*100/100) * ( ( 100+atDifSue)/100 ) );
	}
		else if ( zonaDeImpacto() == "espalda"){
		// Ahora se eliminan las defensas de destreza y fuerza del personaje pasivo (atDifDes->atDes y atDifFue->atFue)
		atTotal = atBas * ( ( 100+atDifSue)/100 ) + (atFue*atBas/100) + (atDes*atBas/100) + ( (atDifIte*100/100) * ( ( 100+atDifSue)/100 ) );
	}
	if (atTotal < 1 ) atTotal =1; // Esto es para que cualquiera pueda acertar un golpe, por mucho que lo tenga todo en contra
	if (atTotal > 99 ) atTotal =99; // Esto es para que cualquiera pueda fallar un golpe


	// Intento de alcanzar al objetivo
	var intento = Math.floor( Math.random()*101 );  //Número aleatorio entre 0 y 100 (incluidos)


	if ( atTotal > intento ){ //ataque realizado con éxito
		var intentoCritico = Math.floor( Math.random()*101 ); //Número aleatorio entre 0 y 100 (incluidos)
		var danyoTotal = danyoBase;
		if (intento==0 || (intentoCritico<=(atSue)) ) {
		danyoTotal = danyoBase*2;
		}
		
		//Nuevamente comprobamos el tipo de ataque, pues uno es instantáneo (pistola) y el otro no (bate)
		if (ataqueR.tipo == 0) { // Bate
			setTimeout( function(){
				personajePasivo.recibeDanyo(danyoTotal);
				mostrarTextoSobrePersonaje(personajePasivo.posicion, danyoTotal.toString(), 1000);
				// TODO: if (ataqueR.efecto) personajePasivo.recibeEfecto(efecto); // Si existe algún efecto en el ataque, se aplica.
			}, 500);
		}
		else if (ataqueR.tipo == 1) { // Pistola
			personajePasivo.recibeDanyo(danyoTotal);
			mostrarTextoSobrePersonaje(personajePasivo.posicion, danyoTotal.toString(), 1000);
			// TODO: Que exista la posibilidad de que el personaje pasivo cambie su orientacion al recibir el daño
			// TODO: if (ataqueR.efecto) personajePasivo.recibeEfecto(efecto); // Si existe algún efecto en el ataque, se aplica.
		}
	}
	else { //ataque fallido
		if (ataqueR.tipo == 0)
			setTimeout( function(){
				mostrarTextoSobrePersonaje(personajePasivo.posicion, "Fallo", 1000);
			}, 500 );
		else
			mostrarTextoSobrePersonaje(personajePasivo.posicion, "Fallo", 1000);
	}

	// Gastamos la accion y cerramos el menú
	personajeActivo.accionesPersonaje--;
	$("#id_menu_act").remove();
	if (personajeActivo.accionesPersonaje <1 ) { // Si no nos quedan más acciones deshabilitamos el botón
		$("#id_menu_opc_1").attr("disabled", "true");
		$("#id_menu_opc_1").css("color", "grey");
		$("#id_menu_opc_1").css("border", "1px solid transparent");
		$("#id_menu_opc_1").css("text-shadow", "-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000");
	}
	comprobacionPrecisaPosicionRelativa(personajeActivo, personajePasivo)
}// realizarAtaque()

function zonaDeImpacto(){

	// TODO: Aquí deberían ir los cálculos correspondientes para comprobar si se ataca en la espalda, lateral o frente del enemigo
	var dadoDe3 = Math.floor( Math.random()*3)+1 // Por ahora generaremos un Número aleatorio entre 1 y 3 (incluidos)
	switch (dadoDe3) {
		case 1:
		return "espalda"
		break;
	case 2:
		return "flanco"
		break;
	case 3:
		return "frente"
		break;
	default:
		alert("No debería haber más valores que 1, 2 ó 3");
		return "error"
		break;
	}//switch case
} // zonaDeImpacto()

function finalizarTurno(){
	comprobarObjetivos()
	var partidaDecidida = comprobarVictoriaDerrota();
	if (  partidaDecidida !== false ){
		finalizarBatalla( partidaDecidida ); // Finalizamos batalla, el parámetro es 0 si hay derrota y 1 si hay victoria
	}
	else{
		personajeActivo.nombreObjeto = personajeActivo.id;
		comprobarTicks();
	}
} // finalizarTurno()

function finalizarBatalla(victoria){
	
	if (victoria == 1){
	    alert( "¡Enhorabuena, Has superado la fase de batalla! :D\n¡Conservarás los objetos y la experiencia adquirida!" )
		salvarPartida("victoria") // salvarPartida(1) salva todos los datos
		
	}
	else if (victoria == 0){
		alert( "Lo siento, has perdido :(\nPerderás la experiencia conseguida en la batalla." )
		salvarPartida("derrota") // salvarPartida(0) ¿carga? los puntos de experiencia previos y salva todos los datos
		preparaMapa();
	}
	else
		alert("Resultado de partida no esperado")
} // finalizarBatalla(victoria)

function comprobarObjetivos(){
	var listaObjetivos = faseBatalla.json_mapa.lista_objetivos;
	for (var i in listaObjetivos){
		if ( personajeActivo.bando == "humano"){ 
			// Objetivos que sólo pueden ser efectuados si el que acaba de jugar es humano
			if ( listaObjetivos[i].id == "mover" ){ // Mover a una posición
				if (listaObjetivos[i].posicion == personajeActivo.posicion )
					listaObjetivos[i].completado = true; 
			}
			if ( listaObjetivos[i].id == "matar_zombies" ){ // Eliminar una cantidad de zombies
				var contador = 0;
				for (var perElim = 0; perElim < arrPerEliminados.length; perElim++){
					if (arrPerEliminados[perElim].bando == "zombie")
						contador++;
				}
				if (contador >= listaObjetivos[i].cantidad)
					listaObjetivos[i].completado = true; 
			}
		}
		// Objetivos que pueden ser efectuados sin importar si el que acaba de jugar es humano
		if ( listaObjetivos[i].id == "resistir" ){ // Resistir a los zombies durante un tiempo
			if (listaObjetivos[i].tiempo <= tickActual)
				listaObjetivos[i].completado = true; 
		}
	}
	actualizarMenuObjetivos();
	
} // comprobarObjetivos()

function comprobarVictoriaDerrota(){ // Devuelve 1 en caso de victoria, 0 en caso de derrota y false si no se alcanza ninguna de ellas
	
	var listaObjetivos = faseBatalla.json_mapa.lista_objetivos;
	var condVictoria = faseBatalla.json_mapa.condiciones_victoria;
	var condDerrota = faseBatalla.json_mapa.condiciones_derrota;
	
	// Comprobamos si se cumple alguna de las condiciones de victoria
	for (var i in condVictoria){
		
		if (condVictoria[i] != "todos_objetivos"){ // Condición: Cualquier condición que no sea "todos_objetivos"
			for (var j in listaObjetivos){
				if ( condVictoria[i] == listaObjetivos[j].id){
					if (listaObjetivos[j].completado===true){
						return 1;
					}
				}
			}
		}
		
		else if (condVictoria[i] == "todos_objetivos"){ // Condición: Todos los objetivos se han completado
			var todosObjetivosCompletados = true;
			for (var j in listaObjetivos){
				if ( !listaObjetivos[j].completado ) 
					todosObjetivosCompletados = false;
			}
			if (todosObjetivosCompletados){
				return 1;
			}
		}
	}
	
	// Si no se cumple ninguna condición de vidcrtoria, comprobamos si se cumple alguna de las condiciones de derrota
	for (var i in condDerrota){
		if (condDerrota[i] == "muere_un_personaje"){
			for (var j in arrPerEliminados){
				if (arrPerEliminados[j].bando == "humano"){ // Si alguno de los personajes eliminados es humano -> derrota
					return 0;
				}
			}
		}
		if (condDerrota[i] == "mueren_todos_personajes"){
			var humanoVivo = false;
			for (var j in arrPer){
				if (arrPer[j].bando == "humano") 
					humanoVivo = true;
			}
			if (!humanoVivo) // Si no queda vivo ningún humano -> derrota
				return 0;
		}
	}
	
	return false;
	
} //comprobarVictoriaDerrota()

function mostrarAviso(texto, guardar){ // Si "guardar" se omite o vale cero o false, el aviso sólo permanecerá hasta que se muestre el siguiente
	$('#sms_avi div.submenuSupCuerpo').show();
	$('#aviso_borrable').remove();
	if (!guardar || guardar==0){
		$('#sms_avi').append('<div class="submenuSupCuerpo" id="aviso_borrable">&nbsp;&nbsp;&nbsp;&nbsp;'+texto+'</div>');
	}
	else{
		var numAviso = $('#sms_avi div').length; // no hay que sumarle uno porque ya existe el div de la cabecera "sms_avi_cab""
		$('#sms_avi').append('<div class="submenuSupCuerpo">'+numAviso+' - '+texto+'</div>');
	}
} // mostrarAviso(texto, guardar)

function mostrarTextoSobrePersonaje(idCasilla, texto, tiempo, anchoLetra, retroLlamada, colorTexto, colorBordeTexto){ // "idCasilla" y "texto" son obligatorios
	
	// Ejemplos de uso:
	// mostrarTextoSobrePersonaje(64, "texto"); //Llamada básica
	// mostrarTextoSobrePersonaje(40, "10", 1000, 0, function(){mostrarTextoSobrePersonaje(40, "envenenado", 1000) }); //Llamada en cadena

	if ( document.getElementById(idCasilla+"textoSobrePersonaje") ){
		$("#"+idCasilla+"textoSobrePersonaje").remove();
	}

	var capNueva;
	var etiquetaPadre = document.getElementById("contenedor_tablero");
	var pixelesLeft= (idCasilla%numColumnas)*anchoCelda;
	var pixelesTop= Math.floor(idCasilla/numColumnas)*altoCelda;

	//Establecemos los valores por defecto
	if ( !colorTexto || colorTexto.substr(0, 1)!="#" || colorTexto.length!=7 )
		colorTexto = "#FFFFFF"; //El color debe ponerse en formato hexadecimal de 6 dígitos #000000
	if ( !colorTexto || colorTexto.substr(0, 1)!="#" || colorTexto.length!=7 )
		colorBordeTexto = "#000000"; //El color debe ponerse en formato hexadecimal de 6 dígitos #000000
	if ( !anchoLetra || anchoLetra==0 ) anchoLetra=12;
	if ( !retroLlamada )
		retroLlamada=function(){};

	var estiloTexto = "color:"+colorTexto+"; text-shadow: -1px 0 "+colorBordeTexto+", 0 1px "+colorBordeTexto+", 1px 0 "+colorBordeTexto+", 0 -1px "+colorBordeTexto+";";
	capNueva = document.createElement("div");
	capNueva.setAttribute( "id", idCasilla+"textoSobrePersonaje" );

	if ( (typeof texto) != "string") texto = texto.toString();
	
	var posAjustada = pixelesLeft + Math.floor(anchoCelda/2)- Math.floor(((anchoLetra)*texto.length)/2 *91/156 ) ;//45; //Math.floor(((anchoLetra)*texto.length)/2); //sobra

	capNueva.setAttribute(
		"style", "font-family: monospace; font-weight: bold; font-size: "+anchoLetra
		+"px ; position:absolute; z-index: 999; left:"+posAjustada+"px; top:"+(pixelesTop-72)+"px; "+estiloTexto);
	capNueva.appendChild( document.createTextNode(texto) ); //añade texto
	etiquetaPadre.appendChild(capNueva);

	if (tiempo>0){ // Si no se pone tiempo el mensaje se queda fijo sobre el personaje
		$("#"+idCasilla+"textoSobrePersonaje").effect("bounce", 150 ).delay(tiempo).fadeOut(500, function(){$("#"+idCasilla+"textoSobrePersonaje").remove();retroLlamada();})
	}
	else{ //Si se pone tiempo de permanencia del texto, lo habitual es usar 1000 milisegundos
		$("#"+idCasilla+"textoSobrePersonaje").effect("bounce", 150 );
		$("#"+idCasilla+"textoSobrePersonaje").click( function(){$("#"+idCasilla+"textoSobrePersonaje").remove();} );
	}
} // mostrarTextoSobrePersonaje(idCasilla, texto, tiempo, anchoLetra, retroLlamada, colorTexto, colorBordeTexto)


function numerarCasillas(){ // Funcion para ayudar al testeo y corrección de errores

	var nf = numFilas, nc = numColumnas, ancCel = anchoCelda, altCel = altoCelda;
	var capNueva;
	var etiquetaPadre = document.getElementById("contenedor_tablero"); //etiqueta donde se insertarán

	// Creamos un div por cada celda del mapa
	for (var y=0; y<nf; y++){
		for (var x=0; x<nc; x++){
			capNueva = document.createElement("div");
			capNueva.setAttribute( "id", (x+y*nc).toString()+"numerillos" ); //La id esta en una dimension

			capNueva.setAttribute( "style", "left:"+(ancCel*x)+"px; top:"+(altCel*y)+"px; z-index:2; color:white; position: absolute;" );
			if (faseBatalla.json_mapa.mapa_pisables[y][x] == 0)
				capNueva.setAttribute( "style", "left:"+(ancCel*x)+"px; top:"+(altCel*y)+"px; z-index:2; color:red; position: absolute;" );
			etiquetaPadre.appendChild(capNueva);
			capNueva.appendChild( document.createTextNode( (x+y*nc).toString() ) ); // Escribe la id (testeo)
		}
	}
} // numerarCasillas()
