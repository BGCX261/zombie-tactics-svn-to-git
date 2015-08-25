-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-03-2013 a las 09:12:20
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `zombietactics`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE IF NOT EXISTS `item` (
  `id_item` int(8) NOT NULL AUTO_INCREMENT,
  `clase` varchar(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(80) NOT NULL,
  `imagen` varchar(20) DEFAULT NULL,
  `efecto` varchar(10) DEFAULT NULL,
  `alcance` int(2) DEFAULT NULL,
  `danyo` int(6) DEFAULT NULL,
  `tipo` int(1) DEFAULT NULL,
  PRIMARY KEY (`id_item`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id_item`, `clase`, `nombre`, `descripcion`, `imagen`, `efecto`, `alcance`, `danyo`, `tipo`) VALUES
(1, 'Arma CC', 'Bate', 'Bate de baseball. Manejable y contundente.', 'S_I_W_bat.gif', NULL, 1, 12, 0),
(2, 'Arma LA', 'Pistola', 'Pistola básica (munición infinita)', 'S_I_W_pistol.gif', NULL, 7, 6, 1),
(3, 'Item', 'Medikit', 'Kit de primeros auxilios. Es increíble lo que pueden hacer estos kits.', 'S_I_medikit.gif', 'HP+10', NULL, NULL, NULL),
(4, 'Item', 'Stimpack', 'Kit de primeros auxilios pequeño.', 'S_I_stimpack.gif', 'HP+5', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapa`
--

CREATE TABLE IF NOT EXISTS `mapa` (
  `id_mapa` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `json_mapa` text NOT NULL,
  PRIMARY KEY (`id_mapa`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `mapa`
--

INSERT INTO `mapa` (`id_mapa`, `nombre`, `descripcion`, `json_mapa`) VALUES
(1, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}'),
(2, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}'),
(3, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}'),
(4, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}'),
(5, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}'),
(6, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}'),
(7, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}'),
(8, 'Fase Beta 1', 'Mapa de prueba para la beta', '{ \n	"mapa_tiles": \n	[ \n		[7, 1, 0, 0, 0, 0, 0, 0, 8], \n		[6, 1, 0, 0, 0, 0, 0, 0, 8], \n		[5, 2, 0, 0, 0, 0, 0, 0, 8], \n		[4, 3, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8], \n		[0, 0, 0, 0, 0, 0, 0, 0, 8] \n	], \n	"lista_tiles": \n	[ \n		"T_F1_Suelo1.png", "T_F1_AceraDerecha1.png", \n		"T_F1_AceraEsquinaAbajoDerecha.png", \n		"T_F1_SueloRayaEsquinaArribaDerecha.png", \n		"T_F1_SueloRayaHorizontalArriba.png", \n		"T_F1_AceraAbajo1.png", \n		"T_F1_ParedSueloEsquinaDerecha.png", \n		"T_F1_ParedEsquinaDerecha.png", \n		"T_F1_AceraIzquierda1.png" \n	], \n	"mapa_sprites_decorado": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 5],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[5, 0, 1, 0, 0, 0, 0, 1, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[3, 0, 0, 0, 0, 2, 0, 0, 0],\n		[0, 0, 0, 0, 0, 4, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 0],\n		[0, 0, 0, 0, 0, 0, 0, 0, 5]\n	], \n	"lista_sprites_decorado": \n	[ \n		["E_F1_Alcantarilla.png", 15, 7],\n		["E_F1_Burning.gif", 10, -32], \n		["E_F1_CocheHorizontal.png", 3, -20], \n		["E_F1_CocheVertical.png", 12, -20], \n		["E_F0_Maceta.png", 5, -60] \n	], \n	"mapa_pisables": \n	[ \n		[0, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[1, 1, 1, 1, 1, 1, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 1, 1, 1], \n		[0, 0, 0, 1, 1, 0, 0, 1, 1],\n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1], \n		[1, 1, 1, 1, 1, 0, 0, 1, 1] \n	], \n	"mapa_zombies": \n	[ \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 1, 1, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0], \n		[0, 0, 0, 0, 0, 0, 0, 0, 0] \n	], \n	"mensaje_introduccion":"Para superar esta fase debes ir <br>a la alcantarilla de la izquierda",\n	"posiciones_despliegue":[39, 42, 32],\n	"lista_items": \n	[	{"clase":"item",   "id":3, "posicion":40, "cantidad":1, "nombre":"Medikit", "efecto":"HP+10",\n		  "sprite":["S_I_medikit.gif", 25, 3]}\n	], \n	"lista_acciones": \n	[ \n		{"id":1, "nombre":"Examinar", "posicion":32, "funcion":"texto", "param1":"Al examinar, ves... un mono de tres cabezas!"}\n	], \n	"condiciones_derrota":["mueren_todos_personajes"],\n	"condiciones_victoria":["mover"],\n	"lista_objetivos": \n	[ \n		{"nombre":"Mover personaje a la alcantarilla", "id":"mover" , "posicion":20 }, \n		{"nombre":"Matar un zombie", "id":"matar_zombies", "cantidad":1 }, \n		{"nombre":"Resistir hasta el tick 37", "id":"resistir", "tiempo":37 } \n	] \n}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapa_has_zombie`
--

CREATE TABLE IF NOT EXISTS `mapa_has_zombie` (
  `mapa_id_mapa` int(10) NOT NULL,
  `zombie_id_zombie` int(2) NOT NULL,
  PRIMARY KEY (`mapa_id_mapa`,`zombie_id_zombie`),
  KEY `fk_mapa_has_zombie_zombie1_idx` (`zombie_id_zombie`),
  KEY `fk_mapa_has_zombie_mapa1_idx` (`mapa_id_mapa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mapa_has_zombie`
--

INSERT INTO `mapa_has_zombie` (`mapa_id_mapa`, `zombie_id_zombie`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personaje`
--

CREATE TABLE IF NOT EXISTS `personaje` (
  `id_personaje` int(24) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `nivel` tinyint(4) NOT NULL DEFAULT '1',
  `experiencia` int(11) NOT NULL DEFAULT '0',
  `sexo` varchar(6) NOT NULL,
  `puntos_habilidad` int(11) NOT NULL,
  `vida` int(11) NOT NULL,
  `fuerza` int(11) NOT NULL,
  `destreza` int(11) NOT NULL,
  `suerte` int(11) NOT NULL,
  `arma_corto_alcance` int(8) DEFAULT '1',
  `arma_largo_alcance` int(8) DEFAULT '2',
  `usuario_id_usuario` int(8) NOT NULL,
  PRIMARY KEY (`id_personaje`,`usuario_id_usuario`),
  UNIQUE KEY `id_personaje_UNIQUE` (`id_personaje`),
  KEY `fk_personaje_usuario_idx` (`usuario_id_usuario`),
  KEY `fk_personaje_item1_idx` (`arma_corto_alcance`),
  KEY `fk_personaje_item2_idx` (`arma_largo_alcance`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Volcado de datos para la tabla `personaje`
--

INSERT INTO `personaje` (`id_personaje`, `nombre`, `nivel`, `experiencia`, `sexo`, `puntos_habilidad`, `vida`, `fuerza`, `destreza`, `suerte`, `arma_corto_alcance`, `arma_largo_alcance`, `usuario_id_usuario`) VALUES
(10, 'Sheila', 2, 290, 'mujer', 10, 10, 10, 10, 20, 1, 2, 43),
(40, 'JJ_1362714117261', 0, 0, 'hombre', 10, 10, 10, 10, 0, 1, 2, 73),
(41, 'JJ_13', 0, 0, 'mujer', 2, 12, 12, 12, 2, 1, 2, 74),
(42, 'juan_jesus', 1, 100, 'hombre', 14, 12, 11, 11, 2, 1, 2, 75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(8) NOT NULL AUTO_INCREMENT,
  `nick` varchar(30) NOT NULL,
  `email` varchar(256) NOT NULL,
  `contrasenya` varchar(60) NOT NULL,
  `activado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `unique_nick` (`nick`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=76 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nick`, `email`, `contrasenya`, `activado`) VALUES
(3, '123sha1', '123sha1@123sha1.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1),
(4, '123', '123@123.com', '123', 1),
(43, 'JJ_prueba', 'a@b.cc', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1),
(73, 'JJ_1362714117261', 'a@b.cc', '969d4f200d45d90bb2c123b28eafb5d8fd28bae2', 1),
(74, 'JJ_13', 'a@b.cc', 'fe22f0034d5444fd80f0f62065d9dc24e206e857', 1),
(75, 'juan_jesus', 'juan.jesus.ligero@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_mata_zombie`
--

CREATE TABLE IF NOT EXISTS `usuario_mata_zombie` (
  `usuario_id_usuario` int(8) NOT NULL,
  `zombie_id_zombie` int(2) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  PRIMARY KEY (`usuario_id_usuario`,`zombie_id_zombie`),
  KEY `fk_usuario_has_zombie_zombie1_idx` (`zombie_id_zombie`),
  KEY `fk_usuario_has_zombie_usuario1_idx` (`usuario_id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_mata_zombie`
--

INSERT INTO `usuario_mata_zombie` (`usuario_id_usuario`, `zombie_id_zombie`, `numero`) VALUES
(3, 1, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_supera_mapa`
--

CREATE TABLE IF NOT EXISTS `usuario_supera_mapa` (
  `usuario_id_usuario` int(8) NOT NULL,
  `mapa_id_mapa` int(10) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id_usuario`,`mapa_id_mapa`),
  KEY `fk_usuario_has_mapa_mapa1_idx` (`mapa_id_mapa`),
  KEY `fk_usuario_has_mapa_usuario1_idx` (`usuario_id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_supera_mapa`
--

INSERT INTO `usuario_supera_mapa` (`usuario_id_usuario`, `mapa_id_mapa`, `fecha`) VALUES
(43, 1, '2013-02-20 19:41:37'),
(43, 2, '2013-02-23 23:00:00'),
(43, 3, '2013-03-06 09:26:28'),
(75, 1, '2013-03-08 05:41:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_tiene_item`
--

CREATE TABLE IF NOT EXISTS `usuario_tiene_item` (
  `usuario_id_usuario` int(8) NOT NULL,
  `item_id_item` int(8) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`usuario_id_usuario`,`item_id_item`),
  KEY `fk_usuario_has_item_item1_idx` (`item_id_item`),
  KEY `fk_usuario_has_item_usuario1_idx` (`usuario_id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_tiene_item`
--

INSERT INTO `usuario_tiene_item` (`usuario_id_usuario`, `item_id_item`, `cantidad`) VALUES
(3, 4, 3),
(43, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zombie`
--

CREATE TABLE IF NOT EXISTS `zombie` (
  `id_zombie` int(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `nivel` tinyint(4) DEFAULT NULL,
  `vida` int(11) DEFAULT NULL,
  `fuerza` int(11) DEFAULT NULL,
  `destreza` int(11) DEFAULT NULL,
  `suerte` int(11) DEFAULT NULL,
  `ataque_corto_alcance` text,
  `ataque_largo_alcance` text,
  `experiencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_zombie`),
  UNIQUE KEY `id_personaje_UNIQUE` (`id_zombie`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `zombie`
--

INSERT INTO `zombie` (`id_zombie`, `nombre`, `nivel`, `vida`, `fuerza`, `destreza`, `suerte`, `ataque_corto_alcance`, `ataque_largo_alcance`, `experiencia`) VALUES
(1, 'Zombie putrefacto', 1, 1, 1, 1, 0, '{"nombre": "Mordisco", "alcance": 1, "danyo": 1, "efecto": null, "tipo": 0}', NULL, 10),
(2, 'Zombie débil', 2, 2, 1, 1, 1, '{"nombre": "Mordisco", "alcance": 1, "danyo": 1, "efecto": null, "tipo": 0}', NULL, 20),
(3, 'Zombie aullador', 3, 5, 1, 1, 1, '{"nombre": "Mordisco", "alcance": 1, "danyo": 1, "efecto": null, "tipo": 0}', '{"nombre": "Grito",    "alcance": 7, "danyo": 1, "efecto": null, "tipo": 1}', 50);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mapa_has_zombie`
--
ALTER TABLE `mapa_has_zombie`
  ADD CONSTRAINT `fk_mapa_has_zombie_mapa1` FOREIGN KEY (`mapa_id_mapa`) REFERENCES `mapa` (`id_mapa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mapa_has_zombie_zombie1` FOREIGN KEY (`zombie_id_zombie`) REFERENCES `zombie` (`id_zombie`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `personaje`
--
ALTER TABLE `personaje`
  ADD CONSTRAINT `fk_personaje_item1` FOREIGN KEY (`arma_corto_alcance`) REFERENCES `item` (`id_item`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_personaje_item2` FOREIGN KEY (`arma_largo_alcance`) REFERENCES `item` (`id_item`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_personaje_usuario` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_mata_zombie`
--
ALTER TABLE `usuario_mata_zombie`
  ADD CONSTRAINT `fk_usuario_has_zombie_usuario1` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_has_zombie_zombie1` FOREIGN KEY (`zombie_id_zombie`) REFERENCES `zombie` (`id_zombie`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_supera_mapa`
--
ALTER TABLE `usuario_supera_mapa`
  ADD CONSTRAINT `fk_usuario_has_mapa_mapa1` FOREIGN KEY (`mapa_id_mapa`) REFERENCES `mapa` (`id_mapa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_has_mapa_usuario1` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_tiene_item`
--
ALTER TABLE `usuario_tiene_item`
  ADD CONSTRAINT `fk_usuario_has_item_item1` FOREIGN KEY (`item_id_item`) REFERENCES `item` (`id_item`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_has_item_usuario1` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
