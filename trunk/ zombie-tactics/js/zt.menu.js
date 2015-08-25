function cerrarMenu(idMenu){
  $(idMenu).fadeOut(100, function () {$(idMenu).remove();} );
}

function creaMenu (posX, posY, idPadre, nombre, id, bDrag, ancho, alto, arrOpc, alCerrar){
	
  var idFix = "#"+id;

  if (!$(idFix).length) { //si el menu no existe en el DOM, lo creamos

    // Ajustamos la medida del menu en caso de necesitarlo
    var medidas="";
    if ( !isNaN(ancho) )
      medidas = "width: "+ancho+"px; ";
    if ( !isNaN(alto) )
      medidas += "height: "+alto+"px; ";

    // Comprobamos si nos dicen el lugar en que se crea el menu o lo establecemos de forma automática
    var posicionX = posX+"px";
    if ( posX == "auto"){
      posicionX = $("#"+idPadre).css("width").replace("px", ""); //devuelve la anchura, ej: 96px  //alert(anchoMenu);
      posicionX = (parseInt(posicionX) + 5)+"px";
    }

    // ahora procesamos las opciones del array de opciones (nombre, funcion)
    var numOpc = arrOpc.length;
    var opcionesProcesadas = "";
    for (var i=0; i<numOpc; i++){
      opcionesProcesadas += "<input id=\"" + id+"_opc_"+i +"\" type=\"button\" class=\"opcionesMenu\""
                           +"\"  value=\""+ arrOpc[i][0]+"\" />";
      if (i<(numOpc-1))
        opcionesProcesadas += "<br />";
    }
    //Añadimos los botones del array de opciones recién procesados
    var txtAppend = "<div id=\"" + id + "\"  class=\"menusGenerados\" \n\
                        style=\"position: absolute; left: "+posicionX+"; top: "+posY+"px; " +
                        medidas+" display: none;  \">"+

                        // CABECERA
                        "<div id=\""+id+"_cabecera\" class=\"cabeceramenu\" >" +
                          "<div>"+nombre+"</div>&nbsp;"
                          +"<span id=\""+id+"_x\">x</span>" // +"<span id=\""+id+"_m\">_</span>"
                        +"</div>"+

                        // CUERPO
                        "<div id=\""+id+"_cuerpo\" class=\"cuerpomenu\" >" +
                          "<form id=\""+id+"_opciones\">"+opcionesProcesadas+"</form>"
                        +"</div>"
                        +"<span class=\"fondotransparentemenu\"></span>"//esto es para el color de fondo azul
                      
                        //PIE
                        +"<div id=\""+id+"_pie\" class=\"piemenu\" >&nbsp;</div>"+ //En este div irá el Texto de ayuda

                     "</div>";

    //Hacemos desplazable el menu si se requiere
    var idPadreFix = "#"+idPadre;
    $(idPadreFix).append(txtAppend);
    if (bDrag){
      $(idFix).draggable();
    }

    //Mostramos el menu
    $(idFix).show("blind", {direction: "vertical"}, 100);

    //Añadimos las funciones del cierre al pulsar en la X
    var idCerrar = "#"+id+"_x";
    $(idCerrar).click(alCerrar);

    //añadimos funcionalidad a los botones
    for (i=0; i<numOpc; i++){
      $("#"+id+"_opc_"+i).click(
        arrOpc[i][1]
      );
    }

    //var anchoMenu = $(idFix).css("width"); //devuelve la anchura, ej: 96px  //alert(anchoMenu);
    
  }//if idFix existe
  
}//creamenu

