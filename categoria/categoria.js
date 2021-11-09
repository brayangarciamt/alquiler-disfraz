/**
 * Funciones AJAX para conectar index-categoria con Backend
 * 
 */

// let BASE_URL_CATEGORY = 'http://localhost:8080/api/Category'; // pruebas con local host

let BASE_URL_CATEGORY = 'http://168.138.130.41:8080/api/Category'; // Pruebas con server

/**
 * Funcion que trae todos los registros de categoria 
 * almacenados en la BD
 * 
 */
function getCategoria(){
let opciones = {    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    // body: capturarDatosCategoria()
                };

let peticion = new Request(BASE_URL_CATEGORY+'/all', opciones);

fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        createTableCategoria(items);
        console.log(items)
    });

}

/**
 * funcion para mostrar el detalle de 
 * la categoria seleccionada
 * 
 */

function getIdCategoria(id){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosCategoria()
                    };

    let peticion = new Request(BASE_URL_CATEGORY+'/'+id, opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        detalleCategoria(items);
        console.log(items)});

}


/**
 * funcion para mostrar crear categoria
 *  
 */

function saveCategoria(){
    let opciones = {    method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosCategoria()
                    };

    let peticion = new Request(BASE_URL_CATEGORY+'/save', opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        console.log(items)
        limpiarFormularioCategoria()});

}

/**
 * funcion para actualizar categoria
 *  
 */

function updateCategoria(){
    let opciones = {    method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosCategoria()
                    };

    let peticion = new Request(BASE_URL_CATEGORY+'/update', opciones);

    fetch(peticion)
    .then(response => response.json())
    .then(function(items) {
        console.log(items);
        limpiarFormularioCategoria()});

}

/**
 * funcion para borrar categoria
 *  
 */

function deleteCategoria(){
    let opciones = {    method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: capturarDatosCategoria()
                    };

    let peticion = new Request(BASE_URL_CATEGORY+'/'+JSON.parse(capturarDatosCategoria()).id, opciones);

    fetch(peticion)
    // .then(response => response.json())
    .then(function(items) {
        console.log("--- Respuesta Delete ---");
        console.log(items.status,"-->",items.ok);
        limpiarFormularioCategoria()});

}

/**
 * Esta funcion retorna los datos del formulario,
 * en formato JSON
 * 
 * @returns 
 */
function capturarDatosCategoria(){

    let categoriaCapturada = {id:$("#idCategoria").val(),
                    name:$("#nombreCategoria").val(),
                    description:$("#descripcionCategoria").val(),
                };

    return JSON.stringify(categoriaCapturada);
}

/**
 * Funcion encargada de recargar tabla despues de realizar algun cambio
 */
function createTableCategoria(items){
    
    $("#listadoCategoria").empty();
    $("#listadoCategoria").append("<h3>Listado categoria</h3>"); //titulo de la tabla
    $("#listadoCategoria").append("<p>Dar click sobre el ID de la categoria que quiere detallar</p>"); //mensaje para el usuario
    let tablaListadoCategoria = "<table id='tablaListadoCategoria'>" //etiqueta para crear tabla 
                            +"<tr>" // se crea fila para añadir cabeceras
                                +"<th>ID</th>" //titulo columna ID
                                +"<th>Nombre</th>" // titulo columan nombre
                            +"</tr>" //cierre de fila
    /* ciclo encargado de recorrer los items y colocar los elementos
    * en la tabla creada
    */
    for(let i of items){
        let idCategoria = i.id;
        tablaListadoCategoria+="<tr>"
                                +"<td><a class='linkBody' href=Javascript:getIdCategoria("+idCategoria+")>" + i.id + "</a></td>"                                                            
                                +"<td>" + i.name + "</td>"                                                              
                            +"</tr>";
    }
    tablaListadoCategoria+="</table>"; //etiqueta para crear tabla
    $("#listadoCategoria").append(tablaListadoCategoria)
}

/**
 * Funcion encargada de mostrar datos del disfraz seleccionado
 */
function detalleCategoria(items){
    /**
     * El formulario se rellena con los valores de respuesta de la categoria seleccionada
     * se debe colocar item porque la respuesta es una lista
     */
    $("#idCategoria").val(items.id);
    $("#nombreCategoria").val(items.name);
    $("#descripcionCategoria").val(items.description);

    document.getElementById("botonActualizarCategoria").hidden = false;
    document.getElementById("botonBorrarCategoria").hidden = false;
    document.getElementById("botonCrearCategoria").hidden = true
}

/**
 * Limpia las entradas del formulario "datos de la categoria",
 * cuando se ejecutan las funciones de crear, actualizar y borrar
 * 
 */
function limpiarFormularioCategoria(){
    
    document.getElementById("formCategoria").reset();
    document.getElementById("botonActualizarCategoria").hidden = true;
    document.getElementById("botonBorrarCategoria").hidden = true;
    document.getElementById("botonCrearCategoria").hidden = false
    document.getElementById("idCategoria").disabled = true;
}