/**
 * funciones para pagina Calificaciones
 */

//  let BASE_URL_SCORE = 'http://localhost:8080/api/Score'; // pruebas con local host

 let BASE_URL_SCORE = 'http://168.138.130.41:9090/api/Score'; // Pruebas con server

window.onload = getCalificacion();

/**
 * Funcion que trae todos los registros de calificacion
 * almacenados en la BD
 * 
 */
function getCalificacion(){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosScore()
                    };
    
    let peticion = new Request(BASE_URL_SCORE+'/all', opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            createTableScore(items);
            console.log("--- Respuesta GET ---")
            console.log(items)});
    
}

/**
 * funcion para mostrar el detalle de 
 * la calificacion seleccionada
 * 
 */

function getIdCalificacion(id){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosScore()
                    };

    let peticion = new Request(BASE_URL_SCORE+'/'+id, opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        detalleCalificacion(items)});
}

/**
 * funcion para crear calificacion
 *  
 */

function saveCalificacion(){
    let opciones = {    method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosScore()
                    };

    let peticion = new Request(BASE_URL_SCORE+'/save', opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        console.log(items);
        limpiarFormularioScore()});

}

/**
 * funcion para actualiza calificacion
 *  
 */

function updateCalificacion(){
    let opciones = {    method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosScore()
                    };

    let peticion = new Request(BASE_URL_SCORE+'/update', opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        console.log(items);
        limpiarFormularioScore()});

}

/**
 * funcion para borrar calificacion
 *  
 */

function deleteCalificacion(){
    let opciones = {    method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosScore()
                    };

    let peticion = new Request(BASE_URL_SCORE+'/'+JSON.parse(capturarDatosScore()).id, opciones);

    fetch(peticion)
    // .then(response => response.json())
    .then(function(items) {
        console.log("--- Respuesta Delete ---");
        console.log(items.status,"-->",items.ok);
        limpiarFormularioScore()
    });

}


/**
 * Se obtienen los datos del formulario para crear calificacion
 * 
 * @returns 
 */
function capturarDatosScore(){

    let calificacionCapturada = {id:$("#idCalificacion").val(),
                                score:$("#calificacion").val(), 
                                scoreMessage:$("#mensajeCalificacion").val(),  
                                reservation:{idReservation:$("#idReservaCalificacion").val()}, 
                                };

    return JSON.stringify(calificacionCapturada);
}

/**
 * Funcion encargada de recargar tabla donde se muestra
 * la lista de todas las reservaciones
 */
function createTableScore(items){
    
    $("#listadoCalificacion").empty();
    $("#listadoCalificacion").append("<h3>Listado calificacion</h3>"); //titulo de la tabla
    $("#listadoCalificacion").append("<p>Dar click sobre el ID de la calificacion que quiere detallar</p>"); //mensaje para el usuario
    let tablaListadoScore = "<table id='tablaListadoScore'>" //etiqueta para crear tabla 
                            +"<tr>" // se crea fila para añadir cabeceras
                                +"<th>ID</th>" //titulo columna ID
                                +"<th>Calificacion</th>" // titulo columna score
                                +"<th>Nombre cliente</th>"
                                +"<th>Correo cliente</th>"
                                +"<th>Mensaje recibido</th>"
                            +"</tr>" //cierre de fila
    /* ciclo encargado de recorrer los items y colocar los elementos
    * en la tabla creada
    */
    for(let i of items){
        let idScore = i.id;
        tablaListadoScore+="<tr>"
                                +"<td><a class='linkBody' href=Javascript:getIdCalificacion("+idScore+")>" + idScore + "</td>"                                                            
                                +"<td>" + i.score + "</td>"
                                +"<td>" + i.reservation.client.name + "</td>"
                                +"<td>" + i.reservation.client.email + "</td>"
                                +"<td>" + i.scoreMessage + "</td>"                                                        
                            +"</tr>";
    }
    tablaListadoScore+="</table>"; //etiqueta para crear tabla
    $("#listadoCalificacion").append(tablaListadoScore)
}

/**
 * Funcion encargada de mostrar datos de la reservacion seleccionada
 */
function detalleCalificacion(items){

    console.log("--- Detalle calificacion ---");
    console.log(items);

    /**
     * El formulario se rellena con los valores respuesta de la calificacion seleccionada
     * se debe colocar item porque la respuesta es una lista
     */
    $("#idCalificacion").val(items.id);
    $("#calificacion").val(items.score);
    $("#mensajeCalificacion").val(items.scoreMessage);
    $("#idReservaCalificacion").val(items.reservation.idReservation);
    
    /**
     * para evitar el uso de Crear al momento de querer actualizar
     * o borrar
     */
    document.getElementById("botonActualizarCalificacion").hidden = false;
    document.getElementById("botonBorrarCalificacion").hidden = false;
    document.getElementById("botonCrearCalificacion").hidden = true;

    /**
     * para evitar actualizar datos de reservacion, 
     * 
     */
    document.getElementById("idReservaCalificacion").disabled = true;

    /**
     * Mostrar formulario para modificar datos
     */
    document.getElementById("conteCalificacion").hidden = false;
    
}


/**
 * Limpia las entradas del formulario "datos de la creservacions",
 * cuando se ejecutan las funciones de crear, actualizar y borrar
 * 
 */
function limpiarFormularioScore(){
    
    document.getElementById("formCalificacion").reset();
    /**
     * para evitar el uso de actualizar o borrar al momento de 
     * querer crear
     */
    document.getElementById("botonActualizarCalificacion").hidden = true;
    document.getElementById("botonBorrarCalificacion").hidden = true;
    document.getElementById("botonCrearCalificacion").hidden = false;

    /**
     * para habilitar ingreso de id reservacion
     */
    
    document.getElementById("idReservaCalificacion").disabled = false;

    /**
     * ocultar formulario para modificar, mostrar lista calificaciones,
     * mostrar barra de enlaces
     */
    document.getElementById("conteCalificacion").hidden = true;
    document.getElementById("listadoCalificacion").hidden = false;
    document.getElementById("enlaceCal").hidden = false;
    
    getCalificacion();
}

/**
 *
 * 
 */
var modificarScore = function(items) {

    /**
     * Mostrar formulario para modificar datos, ocultar lista de calificaciones
     */
    document.getElementById("conteCalificacion").hidden = false;
    document.getElementById("listadoCalificacion").hidden = true;

    /**
     * El formulario se rellena con los valores respuesta de la calificacion seleccionada
     * se debe colocar item porque la respuesta es una lista
     */
    $("#idCalificacion").val(items.score.id);
    $("#calificacion").val(items.score.score);
    $("#mensajeCalificacion").val(items.score.scoreMessage);
    $("#idReservaCalificacion").val(items.idReservation);

    /**
     * Mostrar los botones necesarios para actualizar score,
     * se deshabilita crear y borrar
     */
    document.getElementById("botonActualizarCalificacion").hidden = false;
    document.getElementById("botonBorrarCalificacion").hidden = true;
    document.getElementById("botonCrearCalificacion").hidden = true;
    /**
     * Para ocultar boton que muestra tabla con reservaciones y
     * el boton que ejecuta la funcion para mostrar tabla.
     * 
     * se oculta enlace para ir a pagina principal
     */
    // document.getElementById("botonListaCalificacion").hidden = true;
    document.getElementById("listadoCalificacion").hidden = true;
    document.getElementById("enlaceCal").hidden = true;

}

/**
 * 
 */
var sinCalificarScore = function(idReservation){

    /**
     * Mostrar formulario para modificar datos,
     * ocultar lista de calificaciones
     */
    document.getElementById("conteCalificacion").hidden = false;
    document.getElementById("listadoCalificacion").hidden = true;

    /**
     * establecer el cuadro de IdReservation con el parametro que se
     * envia desde la ventana donde se listan las reservaciones.
     * 
     */
    $("#idReservaCalificacion").val(idReservation); 
    document.getElementById("idReservaCalificacion").disabled = true;

    /**
     * Mostrar los botones necesarios para calificar,
     * se deshabilita actualizar y borrar
     */
    document.getElementById("botonActualizarCalificacion").hidden = true;
    document.getElementById("botonBorrarCalificacion").hidden = true;
    document.getElementById("botonCrearCalificacion").hidden = false; 

    /**
     * Para ocultar boton que muestra tabla con reservaciones y
     * el boton que ejecuta la funcion para mostrar tabla
     */
    // document.getElementById("botonListaCalificacion").hidden = true;
    document.getElementById("listadoCalificacion").hidden = true;
    document.getElementById("enlaceCal").hidden = true;

}

/**
 * Cierra ventana calificacion cuando es abierta desde
 * la ventana reservacion.
 * 
 * Cuando se limpia formulario, se genera evento OnReset que ejecuta
 * esta funcion.
 * 
 */
function cerrarPagina(){
        window.close();
}
