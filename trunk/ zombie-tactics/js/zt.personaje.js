
/// VARIABLES GLOBALES UTILIZADAS - INICIO

var arraySpritesZombie = [
	["S_Z_standing_abajo.gif", 18, -55],
	["S_Z_standing_arriba.gif", 18, -59],
	["S_Z_standing_derecha.gif", 18, -57],
	["S_Z_standing_izquierda.gif", 18, -57],

	["S_Z_walking_abajo.gif", 17, -57],
	["S_Z_walking_arriba.gif", 17, -57],
	["S_Z_walking_derecha.gif", 15, -57],
	["S_Z_walking_izquierda.gif", 13, -57],

	["S_Z_attack_bite_abajo.gif", 15, -57],
	["S_Z_attack_bite_arriba.gif", 19, -60],
	["S_Z_attack_bite_derecha.gif", 16, -56],
	["S_Z_attack_bite_izquierda.gif", -4, -56],

	["S_Z_attack_bite_abajo.gif", 15, -57],
	["S_Z_attack_bite_arriba.gif", 19, -60],
	["S_Z_attack_bite_derecha.gif", 16, -56],
	["S_Z_attack_bite_izquierda.gif", -4, -56],

	["S_Z_gethit_abajo.gif", 15, -55],
	["S_Z_gethit_arriba.gif", 14, -59],
	["S_Z_gethit_derecha.gif", 18, -57],
	["S_Z_gethit_izquierda.gif", 18, -57],

	["S_Z_death_abajo.gif", -19, -109],
	["S_Z_death_arriba.gif", -19, -109],
	["S_Z_death_derecha.gif", -30, -110],
	["S_Z_death_izquierda.gif", -16, -110],

	["S_Z_death_abajo.gif", -19, -109],
	["S_Z_death_arriba.gif", -19, -109],
	["S_Z_death_derecha.gif", -30, -110],
	["S_Z_death_izquierda.gif", -16, -110]
];

var arraySpritesPersonajeMasculino = [
	["S_M_StandingAbajo.gif", 13, -61], //0
	["S_M_StandingArriba.gif", 14, -61],
	["S_M_StandingDerecha.gif", 14, -61],
	["S_M_StandingIzquierda.gif", 14, -61],

	["S_M_WalkingAbajo.gif", 14, -61], //4
	["S_M_WalkingArriba.gif", 14, -61],
	["S_M_WalkingDerecha.gif", 14, -61],
	["S_M_WalkingIzquierda.gif", 14, -61],

	["S_M_BeatingBaseballAbajo.gif", -15, -81], //8
	["S_M_BeatingBaseballArriba.gif", -13, -81],
	["S_M_BeatingBaseballDerecha.gif", -14, -81],
	["S_M_BeatingBaseballIzquierda.gif", -12, -81],

	["S_M_ShootingAbajo.gif", 14, -61], //12
	["S_M_ShootingArriba.gif", 14, -61],
	["S_M_ShootingDerecha.gif", 16, -60],
	["S_M_ShootingIzquierda.gif", -14, -60],

	["S_M_BeatedAbajo.gif", 14, -61], //16
	["S_M_BeatedArriba.gif", 12, -61],
	["S_M_BeatedDerecha.gif", 14, -61],
	["S_M_BeatedIzquierda.gif", 14, -61],

	["S_M_DeathDerecha.gif", 0, -10], //20
	["S_M_DeathIzquierda.gif", 0, -10],
	["S_M_DeathDerecha.gif", 0, -10],
	["S_M_DeathIzquierda.gif", 0, -10],

	["S_M_LevelUpAbajo.gif", 7, -81], //24
	["S_M_LevelUpArriba.gif", 7, -82],
	["S_M_LevelUpDerecha.gif", 10, -80],
	["S_M_LevelUpIzquierda.gif", 5, -80],

	["S_M_Portrait_mini.png"] //28
];

var arraySpritesPersonajeFemenino = [
	["S_F_StandingAbajo.gif", 13, -60],
	["S_F_StandingArriba.gif", 14, -62],
	["S_F_StandingDerecha.gif", 14, -61],
	["S_F_StandingIzquierda.gif", 14, -61],

	["S_F_WalkingAbajo.gif", 14, -61],
	["S_F_WalkingArriba.gif", 14, -61],
	["S_F_WalkingDerecha.gif", 14, -61],
	["S_F_WalkingIzquierda.gif", 14, -61],

	["S_F_BeatingBaseballAbajo.gif", -15, -79],
	["S_F_BeatingBaseballArriba.gif", -13, -81],
	["S_F_BeatingBaseballDerecha.gif", -14, -81],
	["S_F_BeatingBaseballIzquierda.gif", -12, -81],

	["S_F_ShootingAbajo.gif", 13, -60],
	["S_F_ShootingArriba.gif", 14, -82],
	["S_F_ShootingDerecha.gif", 16, -58],
	["S_F_ShootingIzquierda.gif", -35, -58], //eran -14, ahora hay que restar 30 pixels. Total=-44

	["S_F_BeatedAbajo.gif", 14, -61],
	["S_F_BeatedArriba.gif", 12, -61],
	["S_F_BeatedDerecha.gif", 14, -61],
	["S_F_BeatedIzquierda.gif", 14, -61],

	["S_F_DeathDerecha.gif", 0, -10],
	["S_F_DeathIzquierda.gif", 0, -10],
	["S_F_DeathDerecha.gif", 0, -10],
	["S_F_DeathIzquierda.gif", 0, -10],

	["S_F_LevelUpAbajo.gif", 7, -81],
	["S_F_LevelUpArriba.gif", 7, -82],
	["S_F_LevelUpDerecha.gif", 10, -80],
	["S_F_LevelUpIzquierda.gif", 5, -80],

	["S_F_Portrait_mini.png"]
];

var retardoAnimacion = 10; // cuanto más próxima a 0 más rápido se mueve el personaje

/// VARIABLES GLOBALES UTILIZADAS - FIN


// Clase Personaje
function Personaje(nombreObjeto, id, bando, nombre, graficos, nivel, experiencia, puntos_habilidad, vida, fuerza, destreza, suerte, ataqueCD, ataqueLD, posicion, orientacion){ 
    this.nombreObjeto=nombreObjeto; // nombre de la variable que usamos para identificar al objeto
    this.id = id;
    this.nivel=nivel;this.experiencia=experiencia; this.puntos_habilidad=puntos_habilidad;
    this.siguienteTurno = 0; // se calcula antes de iniciar cada turno, mirando la velocidad
    this.alerta = false; // determina si el personaje está en alerta (sólo sirve si está en )
    this.objetivo = 0; // objetivo actual de futuros ataques
    this.accionesPersonaje = 0; //numero de acciones restante del personaje en el turno
    this.movimientosPersonaje = 0; //numero de movimientos restante del personaje en el turno
    this.bando = bando;//zombie - humano
    this.nombre = nombre;
    this.graficos = graficos; // array con las animaciones (ahora mismo sólo es un array de rutas de imágenes
    this.fuerza = fuerza;this.destreza = destreza;this.suerte = suerte;
	this.velocidad = this.nivel*2 + Math.floor(this.destreza/2); 
	if (this.velocidad > 100) this.velocidad = 100; // Limitamos la velocidad máxima. Si el personaje tiene 100 actuará 1 vez por cada "tick"
    this.vida = vida; this.vidaMax = vida; 
    this.ataqueLargaDistancia = ataqueLD;this.ataqueCortaDistancia = ataqueCD;
	this.posicion = posicion;this.orientacion = orientacion; //orientacion -> D U R L (0=Down; 1=Up; 2=Right; 3=Left)
	this.sprite = orientacion; // sprite actual, coincide con la orientacion al crear el personaje
    this.pasosQuePuedeDar = 7 + Math.floor(this.nivel/10+this.destreza/10); // 3 + Math.floor(this.nivel/10+this.destreza/10);
    if (this.id == "zombie") {this.pasosQuePuedeDar = Math.floor(this.pasosQuePuedeDar/2);}
}//Personaje

Personaje.prototype.cargaGraficos = function cargaGraficos(){
  if (this.graficos == "graficos_humana"){
    return arraySpritesPersonajeFemenino;
  }
  else if (this.graficos == "graficos_humano"){
    return arraySpritesPersonajeMasculino;
  }
  else if (this.graficos == "graficos_zombie"){
    return arraySpritesZombie;
  }
  else
    alert("error en los graficos, solamente existen humano, humana y zombie.")
  return false;
}

Personaje.prototype.muestraSprite = function muestraSprite(numSprite){
  if ( !document.getElementById(this.id+"img") ){
      if (!numSprite && numSprite!=0){
		  numSprite=this.sprite;
      }
      var arraySprites = this.cargaGraficos();
      var imgNueva = document.createElement("IMG");// crear imagen para insertar luego al div
      var nombreImagen = "images/"+arraySprites[numSprite][0]; //+"?t='"+(new Date().getTime()); //El timestamp añadido es para evitar un problema de refresco en los gifs no ciclicos al usar Google Chrome
      if (numSprite > 7) // los sprites de 0 a 7 son animaciones ciclicas y no necesitan esto
        nombreImagen = nombreImagen + "?t='"+(new Date().getTime());

      imgNueva.setAttribute("src", nombreImagen);
      var capaSprites = document.getElementById("contenedor_tablero");//idCasilla);
      imgNueva.setAttribute( "style", ( "position: relative; left: "+arraySprites[numSprite][1]+"px; "
                                       +"top: "+arraySprites[numSprite][2]+"px; "

                                      ).toString()
                           );
      imgNueva.setAttribute( "id", this.id+"img" );
      var divNuevo = document.createElement("DIV"); //crear div que insertaremos al "div-celda""
      var pixelesTop= Math.floor(this.posicion/numColumnas)*altoCelda;
      var pixelesLeft= (this.posicion%numColumnas)*anchoCelda;
      var zIndex = Math.floor(this.posicion/numColumnas)*10+6;
      divNuevo.setAttribute("style", "position:relative; left:"+pixelesLeft+"px; top:"+pixelesTop+"px; height:0px; width:0px; z-index: "+zIndex+"; " )
      divNuevo.setAttribute( "id", this.id );
      divNuevo.appendChild(imgNueva)
      capaSprites.appendChild(divNuevo);
      this.sprite=numSprite; // actualizamos el valor del sprite del personaje
      this.orientacion = numSprite % 4; // Actualizamos la orientación del personaje
  }
  else
      alert(this.id+"img Ya existe!! ")
}

Personaje.prototype.borraSprite = function borraSprite(){
        var elementoABorrar=document.getElementById(this.id+"img"); // La id de su IMG coincide con la del personaje + la cadena "img"
    elementoABorrar.parentNode.removeChild(elementoABorrar)
}

Personaje.prototype.borraContenedorSprite = function borraContenedorSprite(){
    var elementoABorrar=document.getElementById(this.id); // La id del DIV que contiene su IMG coincide con la del personaje
    elementoABorrar.parentNode.removeChild(elementoABorrar)
}

Personaje.prototype.cambiaSprite = function cambiaSprite(numSprite){
    var elementoACambiar=document.getElementById(this.id+"img"); //1º, cambiamos la imagen
    var arraySprites = this.cargaGraficos();
    var nombreImagen = "images/"+arraySprites[numSprite][0];
    if (numSprite > 7) // los de 0 a 7 son animaciones ciclicas y no necesitan el timestamp para reiniciar la animación
        nombreImagen = nombreImagen + "?t='"+(new Date().getTime());
    elementoACambiar.setAttribute("src", nombreImagen);  //El timestamp añadido es para evitar un problema de refresco en los gifs no ciclicos al usar Google Chrome
    elementoACambiar.setAttribute( "style", ( "position: relative; left: "+arraySprites[numSprite][1]+"px;"
                                       +" top: "+(arraySprites[numSprite][2])+"px"
                                      ).toString()
                           );

    var capaACambiar = $("#"+this.id) ; // 2º, actualizamos el z-index del div
    var zIndex = Math.floor(this.posicion/numColumnas)*10+6;
    capaACambiar.css("z-index", zIndex.toString() );

    this.sprite=numSprite; // actualizamos el valor del sprite del personaje
    this.orientacion = numSprite % 4; // Actualizamos la orientación del personaje ->  D U R L (0=Down; 1=Up; 2=Right; 3=Left)
}

Personaje.prototype.recibeDanyo = function recibeDanyo(danyo){
  if (this.vida > danyo){ //sigue vivo
    this.vida -= danyo;
    // El grupo de animaciones 16-19 es de recibir golpe, la orientacion es un valor numérico que decide la animación concreta
    this.cambiaSprite( 16 + this.orientacion );
    setTimeout(function(){personajePasivo.cambiaSprite(personajePasivo.orientacion)}, 2000);
  }
  else{
    this.vida = 0;
    this.cambiaSprite( 20 + this.orientacion );
    this.esEliminado();
  }
  if (this.bando == "humano"){
    this.actualizaMenuInf();
  }
}

Personaje.prototype.esEliminado = function esEliminado(){
  if (personajeActivo.bando == "humano" && personajeActivo.vida>0){
    var experienciaDada = parseInt(this.experiencia);
    personajeActivo.recibeExperiencia(experienciaDada);
    mostrarTextoSobrePersonaje(personajeActivo.posicion, experienciaDada+" exp", 1000);
  }
  
  mostrarAviso("Muere "+this.nombre, 1);
  // Eliminamos el personaje del array de personajes
  for (var i in arrPer){
    if (arrPer[i].id == personajePasivo.id){
      $(".Turno_"+personajePasivo.nombre).css({'text-decoration': 'line-through', 'color': 'red'});//"text-decoration", "line-through")
      $(".Turno_"+personajePasivo.nombre).delay(2000).fadeOut("slow", function(){$(".Turno_"+personajePasivo.nombre).remove()} )
      
	  if (arrPer[i].bando == "humano"){
		arrPer[i].actualizaMenuInf();
	  }
	  arrPerEliminados[arrPerEliminados.length] = (arrPer.splice(i, 1))[0]; // Movemos el personaje en la posición i al array de personajes eliminados
		
    }
  }
  setTimeout(
    function(){
      personajePasivo.borraContenedorSprite(); // Eliminamos sprite completamente del tablero
    },
    2000
  );
   
}

Personaje.prototype.recibeItem = function recibeItem(efectoItem){
  var arrEfectoYCantidad = efectoItem.split("+");
  if (arrEfectoYCantidad[0]=="HP"){ // Por ahora sólo pondré items que curen salud, así que incluso sobraría esta comprobación
    if ( this.vida + parseInt(arrEfectoYCantidad[1]) <= this.vidaMax)
      this.vida += parseInt(arrEfectoYCantidad[1]);
    else
      this.vida = this.vidaMax;
  }
  this.actualizaMenuInf();
}

Personaje.prototype.actualizaMenuInf = function actualizaMenuInf(){
  $('#smi_personaje'+this.id +" .exp").html( this.experiencia );
  $('#smi_personaje'+this.id +" .nxt").html( this.calcPtsParaSgteNiv() );
  $('#smi_personaje'+this.id +" .ar0").html( this.ataqueCortaDistancia.nombre );
  $('#smi_personaje'+this.id +" .ar1").html( this.ataqueLargaDistancia.nombre );
  $('#smi_personaje'+this.id +" .vid").html( this.vida );
  $('#smi_personaje'+this.id +" .vim").html( this.vidaMax );
  $('#smi_personaje'+this.id +" .niv").html( this.nivel );
  if (this.vida<1){ // Si el personaje es eliminado, lo mostramos debilitando su imagen y poniendo sus puntos de vida en rojo
	$('#smi_personaje'+this.id +" .vid").css( "color", "#FF0000" );
	$('#smi_personaje'+this.id +" img").css( "opacity", "0.5" );
  }
}

Personaje.prototype.recibeExperiencia = function recibeExperiencia (expRecibida){
  var expOld = parseInt(this.experiencia);
  var expNew = parseInt(this.experiencia) + parseInt(expRecibida);
  if (this.calculaNivel(expNew) > this.calculaNivel(expOld)){
    this.subeNivel( this.calculaNivel(expNew) - this.calculaNivel(expOld) ); // Por si sube más de un novel de golpe, decimos cuantos niveles sube
  }
  this.experiencia = expNew; // actualizamos experiencia
  this.actualizaMenuInf();
}

Personaje.prototype.calculaNivel = function calculaNivel(experiencia){
	var nivel = parseInt(experiencia/100); // Para subir de nivel se necesitan 100 puntos de experiencia
	return nivel; 
}

Personaje.prototype.calcPtsParaSgteNiv = function calcPtsParaSgteNiv (){
	var puntosParaSgteNivel = parseInt(100-(this.experiencia % 100))
	return puntosParaSgteNivel;
}

Personaje.prototype.subeNivel = function subeNivel(numNiveles){
	this.nivel = parseInt(this.nivel) + parseInt(numNiveles);
	this.puntos_habilidad = parseInt(this.puntos_habilidad) + parseInt(numNiveles)*10; // Por cada nivel conseguimos 10 puntos de habilidad
	mostrarAviso(this.nombre+" sube a nivel "+this.nivel, 1)
	this.cambiaSprite( 24 + this.orientacion );
}

Personaje.prototype.moverArriba = function moverArriba(retroLlamada, posActual, posFinal){ // Movimiento (de una celda) de los personajes
    if (!posActual && posActual!=0){ // Inicio de movimiento. Se llama una sóla vez
        this.cambiaSprite(5); // Sprite de andar arriba
        posActual = document.getElementById(this.id).style.top; // obtenemos el valor de "top" (en px)
        posActual = posActual.substr(0, posActual.length-2) //quitamos la letras "px"
        posActual = parseInt(posActual, 10);
        posFinal = posActual - altoCelda;
    }
    if (posActual > posFinal){ // Durante el movimiento
        posActual = posActual - 1;
        document.getElementById(this.id).style.top = posActual +"px";
        setTimeout(this.nombreObjeto+".moverArriba("+retroLlamada+", "+posActual+", "+posFinal+")", retardoAnimacion);
    }
    else{ // Final del movimiento
        this.posicion -= numColumnas; // Actualizamos la posición a una "celda" más arriba
        this.cambiaSprite(1);// Sprite de "standing" mirando arriba
        if (retroLlamada && typeof retroLlamada == 'function')
            retroLlamada.call();
    }
}
Personaje.prototype.moverAbajo = function moverAbajo(retroLlamada, posActual, posFinal){
    if (!posActual && posActual!=0){ // Se llama al inicio,una sóla vez
        this.cambiaSprite(4); // Sprite de andar arriba
        posActual = document.getElementById(this.id).style.top; // obtenemos el valor de "left" (en px)
        posActual = posActual.substr(0, posActual.length-2) //quitamos la letras "px"
        posActual = parseInt(posActual, 10);
        posFinal = posActual + altoCelda;
    }
    if (posActual < posFinal){
        posActual = posActual + 1;
        document.getElementById(this.id).style.top = posActual +"px";
        setTimeout(this.nombreObjeto+".moverAbajo("+retroLlamada+", "+posActual+", "+posFinal+")", retardoAnimacion);
    }
    else{
        this.posicion +=numColumnas; // Actualizamos la posición a una "celda" más abajo
        this.cambiaSprite(0);// Sprite de "standing" mirando abajo
        if (retroLlamada && typeof retroLlamada == 'function')
            retroLlamada.call();
    }
}
Personaje.prototype.moverIzquierda = function moverIzquierda(retroLlamada, posActual, posFinal){
    if (!posActual && posActual!=0){ // Se llama al inicio,una sóla vez
        this.cambiaSprite(7); // Sprite de andar a la izquierda
        posActual = document.getElementById(this.id).style.left; // obtenemos el valor de "left" (en px)
        posActual = posActual.substr(0, posActual.length-2) //quitamos la letras "px"
        posActual = parseInt(posActual, 10);
        posFinal = posActual - anchoCelda;
    }
    if (posActual > posFinal){ // Iteraciones recursivas para desplazar div+imagen
        posActual = posActual - 1;
        document.getElementById(this.id).style.left = posActual +"px";
        setTimeout(this.nombreObjeto+".moverIzquierda("+retroLlamada+", "+posActual+", "+posFinal+")", retardoAnimacion);
    }
    else{ // Fin de iteraciones
        this.posicion -= 1; // Actualizamos la posición a una "celda" más a la izquierda
        this.cambiaSprite(3);// Sprite de "standing" mirando a la izquierda
        if (retroLlamada && typeof retroLlamada == 'function')
            retroLlamada.call();
    }
}
Personaje.prototype.moverDerecha = function moverDerecha(retroLlamada, posActual, posFinal){
    if (!posActual && posActual!=0){ // Se llama al inicio,una sóla vez
        this.cambiaSprite(6); // Sprite de andar a la derecha
        posActual = document.getElementById(this.id).style.left; // obtenemos el valor de "left" (en px)
        posActual = posActual.substr(0, posActual.length-2) //quitamos la letras "px"
        posActual = parseInt(posActual, 10);
        posFinal = posActual + anchoCelda;
    }
    if (posActual < posFinal){ // Iteraciones recursivas para desplazar div+imagen
        posActual = posActual + 1;
        document.getElementById(this.id).style.left = posActual +"px";
        setTimeout(this.nombreObjeto+".moverDerecha("+retroLlamada+", "+posActual+", "+posFinal+")", retardoAnimacion);
    }
    else{ // Fin de iteraciones
        this.posicion +=1; // Actualizamos la posición a una "celda" más a la derecha
        this.cambiaSprite(2);// Sprite de "standing" mirando a la derecha
        if (retroLlamada && typeof retroLlamada == 'function')
            retroLlamada.call();
    }
}

Personaje.prototype.recorreRuta = function recorreRuta(cadenaRuta, cadRetLlamFinal, cadenaFuncion){
	
	// USO DE LA FUNCION: 
	// var ruta = "RD"; //U=up, D=down, etc
	// var callBackEnCadena = "function(){alert('Me ejecuto al terminar de recorrer la ruta')}"
	// personaje.recorreRuta(ruta, callBackEnCadena);
	
    if (!cadenaFuncion) cadenaFuncion="#"; //inicializamos la cadena de funciones

    var dirActual = cadenaRuta.substr(0, 1); // cogemos la dirección actual de la ruta
    cadenaRuta = cadenaRuta.substr(1); // eliminamos la dirección actual de la ruta

    if (dirActual == "U"){
        cadenaFuncion = cadenaFuncion.replace("#",  "function(){"+this.nombreObjeto+".moverArriba(#)}" )
        this.recorreRuta(cadenaRuta, cadRetLlamFinal, cadenaFuncion);
    }
    else if (dirActual == "D"){
        cadenaFuncion = cadenaFuncion.replace("#",  "function(){"+this.nombreObjeto+".moverAbajo(#)}" )
        this.recorreRuta(cadenaRuta, cadRetLlamFinal, cadenaFuncion);
    }
    else if (dirActual == "L"){
        cadenaFuncion = cadenaFuncion.replace("#",  "function(){"+this.nombreObjeto+".moverIzquierda(#)}" )
        this.recorreRuta(cadenaRuta, cadRetLlamFinal, cadenaFuncion);
    }
    else if (dirActual == "R"){
        cadenaFuncion = cadenaFuncion.replace("#",  "function(){"+this.nombreObjeto+".moverDerecha(#)}" )
        this.recorreRuta(cadenaRuta, cadRetLlamFinal, cadenaFuncion);
    }
    else{
        cadenaFuncion = cadenaFuncion.replace("#", cadRetLlamFinal)
        cadenaFuncion = cadenaFuncion.substr(11)
        cadenaFuncion = cadenaFuncion.substr(0, cadenaFuncion.length-1)
        eval(cadenaFuncion); // En la última recursión ejecutamos la función de retrollamada
    }
}













