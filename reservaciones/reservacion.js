/**
 * funciones para pagina reservaciones
 */

//  let BASE_URL_RESERVATION = 'http://localhost:8080/api/Reservation'; // pruebas con local host
//  let BASE_URL_COSTUME = 'http://localhost:8080/api/Costume'; // pruebas con local host

let URL_CALIFICAR = './../calificacion/index-calificacion.html'

let BASE_URL_RESERVATION = 'http://168.138.130.41:9090/api/Reservation'; // Pruebas con server
let BASE_URL_COSTUME = 'http://168.138.130.41:9090/api/Costume' 

window.onload = listaSelectDisfraz();

/**
 * Funcion que trae todos los registros de reservacion
 * almacenados en la BD
 * 
 */
function getReservacion(){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosDisfraz()
                    };
    
    let peticion = new Request(BASE_URL_RESERVATION+'/all', opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            console.log("--- Respuesta GET ---");
            console.log(items);
            createTableReserva(items)});
    
}

/**
 * funcion para mostrar el detalle de 
 * la reservacion seleccionada
 * 
 */

function getIdReserva(id){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosDisfraz()
                    };

    let peticion = new Request(BASE_URL_RESERVATION+'/'+id, opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        detalleReserva(items)});
}

/**
 * Funcion que trae los registros de disfraz 
 * almacenados en la BD, para mostrarlos en el
 * select de reservacion disfraz
 * 
 */
function listaSelectDisfraz(){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosDisfraz()
                    };
    
    let peticion = new Request(BASE_URL_COSTUME+'/all', opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            createSelectDisfraz(items)});
    
    }


/**
 * funcion para crear reservacion
 *  
 */

function saveReservacion(){
    let opciones = {    method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosReservacion()
                    };

    let peticion = new Request(BASE_URL_RESERVATION+'/save', opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        console.log(items);
        limpiarFormularioReserva()});
}

/**
 * funcion para actualizar categoria
 *  
 */

function updateReservacion(){
    let opciones = {    method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosReservacion()
                    };

    let peticion = new Request(BASE_URL_RESERVATION+'/update', opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        console.log(items)
        limpiarFormularioReserva()});

}

/**
 * funcion para borrar reservacion
 *  
 */

function deleteReservacion(){
    let opciones = {    method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosReservacion()
                    };

    let peticion = new Request(BASE_URL_RESERVATION+'/'+JSON.parse(capturarDatosReservacion()).idReservation, opciones);

    fetch(peticion)
    // .then(response => response.json())
    .then(function(items) {
        console.log("--- Respuesta Delete ---");
        console.log(items.status,"-->",items.ok);
        limpiarFormularioReserva()});

}


/**
 * Se obtienen los datos del formulario para crear reservacion
 * 
 * @returns 
 */
function capturarDatosReservacion(){

    let reservacionCapturada = {idReservation:$("#idReservacion").val(),
                                startDate:$("#fechaInicio").val(), 
                                devolutionDate:$("#fechaEntrega").val(),  
                                client:{idClient:$("#idClienteReservacion").val()},
                                costume:capturarDisfrazReserva("disfrazReservacion"),
                                status:$("#status").val(),
                                };

    return JSON.stringify(reservacionCapturada );
}

/**
 * capturar el id del disfraz seleccionado
 */
function capturarDisfrazReserva(elementoSelect){

    let select = document.getElementById(elementoSelect);
    let selectedOption = select.options[select.selectedIndex];

    return {id:selectedOption.value};
    
}

/**
 * funcion encargada de mostrar la lista de disfraz
 * en el elemento select. Lps disfraces existentes
 * son los que se encuentran en la base de datos
 * 
 * @param {} items 
 */
    function createSelectDisfraz(items){

        console.log("--- Lista Select Disfraz ---");
        console.log(items);
        /**
         * se vacia la lista de 
         * disfraces que se encuentra en 
         * el elemento select
         */
        $("#disfrazReservacion").empty();
        let listaDisfraz = "<option value=''>seleccionar</option>"; //para almacenar etiquetas option
    
        for(let i of items){
            let idDisfraz = i.id; //se guarda valor en caso de crear disfraz
            let nombreDisfraz = i.name; // para mostrar en la lista
            listaDisfraz += "<option value='"+idDisfraz+"'>"+nombreDisfraz+"</option>"; //etiqueta option para añadir a select
            
        }
        $("#disfrazReservacion").html(listaDisfraz); //se añaden las etiquetas guardas al select en index-reservaciones.html
    
    }

/**
 * Funcion encargada de recargar tabla despues de realizar algun cambio
 */
function createTableReserva(items){
    
    $("#listadoReservacion").empty();
    $("#listadoReservacion").append("<h3>Listado reservacion</h3>"); //titulo de la tabla
    $("#listadoReservacion").append("<p>Dar click sobre el ID de la reservacion que quiere detallar</p>"); //mensaje para el usuario
    let tablaListadoReserva = "<table id='tablaListadoReserva'>" //etiqueta para crear tabla 
                            +"<tr>" // se crea fila para añadir cabeceras
                                +"<th>ID</th>" //titulo columna ID
                                +"<th>Disfraz</th>" // titulo columna disfraz
                                +"<th>ID Cliente</th>"
                                +"<th>Nombre</th>"
                                +"<th>Correo</th>"
                                +"<th>Calificacion</th>"
                            +"</tr>" //cierre de fila
    /* ciclo encargado de recorrer los items y colocar los elementos
    * en la tabla creada
    */
    for(let i of items){
        let idReservation = i.idReservation;
        tablaListadoReserva+="<tr>"
                                +"<td><a class='linkBody' href=Javascript:getIdReserva("+idReservation+")>" + i.idReservation + "</a></td>"                                                            
                                +"<td>" + i.costume.name + "</td>"
                                +"<td>" + i.client.idClient + "</td>"
                                +"<td>" + i.client.name + "</td>"
                                +"<td>" + i.client.email + "</td>";
        if(i.score){
            let itemsJson = JSON.stringify(i);
            tablaListadoReserva+="<td><b>" + i.score.score + "</b>&nbsp>>>&nbsp<button type='button' class='botonCalificar' onclick='modificar("+itemsJson+")'>modificar</button></td>";
        }else{
            tablaListadoReserva+="<td><b>Sin calificar</b>&nbsp>>>&nbsp<button type='button'class='botonCalificar' onclick='sinCalificar("+idReservation+")'>calificar</button></td>";
        }                                                           
        tablaListadoReserva+="</tr>";
    }
    tablaListadoReserva+="</table>"; //etiqueta para crear tabla
    $("#listadoReservacion").append(tablaListadoReserva)
}

/**
 * Funcion encargada de mostrar datos de la reservacion seleccionada
 */
function detalleReserva(items){

    console.log("--- Detalle reservacion ---");
    console.log(items);

    /**
     * Se utiliza para omitir la parte que se encuentra
     * despues de el simbolo . al final de la fecha retornada
     */
    let fechaInicio = items.startDate.substr(0,19);
    let fechaEntrega = items.devolutionDate.substr(0,19);

    /**
     * El formulario se rellena con los valores de respuesta de la reservacion seleccionada
     * se debe colocar item porque la respuesta es una lista
     */
    $("#idClienteReservacion").val(items.client.idClient);
    $("#disfrazReservacion").val(items.costume.id);
    $("#idReservacion").val(items.idReservation);
    $("#fechaInicio").val(fechaInicio);
    $("#fechaEntrega").val(fechaEntrega);  
    $("#status").val(items.status);
    
    /**
     * para evitar el uso de Crear al momento de querer actualizar
     * o borrar
     */
    document.getElementById("botonActualizarReservacion").hidden = false;
    document.getElementById("botonBorrarReservacion").hidden = false;
    document.getElementById("botonCrearReservacion").hidden = true;

    /**
     * para evitar actualizar datos de cliente y disfraz, 
     * se habilita la opcion de cambiar estado
     */
    document.getElementById("disfrazReservacion").disabled = true;
    document.getElementById("idClienteReservacion").disabled = true;
    document.getElementById("status").disabled = false;
}


/**
 * Limpia las entradas del formulario "datos de la creservacions",
 * cuando se ejecutan las funciones de crear, actualizar y borrar
 * 
 */
function limpiarFormularioReserva(){
    
    document.getElementById("formReservacion").reset();
    /**
     * para evitar el uso de actualizar o borrar al momento de 
     * querer crear
     */
    document.getElementById("botonActualizarReservacion").hidden = true;
    document.getElementById("botonBorrarReservacion").hidden = true;
    document.getElementById("botonCrearReservacion").hidden = false;

    /**
     * para habilitar input de cliente y disfraz,
     * se deshabilita cambiar estado.
     */
    
    document.getElementById("disfrazReservacion").disabled = false;
    document.getElementById("idClienteReservacion").disabled = false;
    document.getElementById("status").disabled = true
    
}

/**
 * Permite ingresar a la pagina para modificar calificacion,
 * pulsando el boton que se encuentra en calificacion
 * 
 */
function modificar(items){

    let opcionTarget = "_blank";
    var ventanaM = window.open(URL_CALIFICAR,opcionTarget,'width=500,height=500');
    ventanaM.addEventListener("DOMContentLoaded",function(){
        console.log("--- Ventana calificar abierta ---!");
        ventanaM.modificarScore(items);
    });


}

/**
 * Permite ingresar a la pagina para crear calificacion,
 * pulsando boton que se encuentra en calificacion
 */
function sinCalificar(idReservation){

    let opcionTarget = "_blank";
    var ventanaC = window.open(URL_CALIFICAR,opcionTarget,'width=500,height=500');
    ventanaC.addEventListener("DOMContentLoaded",function(){
        console.log("--- Ventana calificar abierta ---!");
        ventanaC.sinCalificarScore(idReservation);
    });


}