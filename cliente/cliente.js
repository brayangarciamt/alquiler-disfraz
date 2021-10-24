/***
 * Funciones para el formulario cliente
 */

let BASE_URL = 'http://localhost:8080/api/Client';

/**
 * Funcion para captura datos de las cajas de
 * entrada en formulario, es para evitar codigo repetido
 * @returns 
 */

function capturarDatosCliente(){

    let clienteCapturado = {idClient:$("#idCliente").val(), 
                            name:$("#nombreCliente").val(),
                            age:$("#edadCliente").val(),
                            email:$("#correoCliente").val(),
                            password:$("#claveCliente").val()
                        };

    return JSON.stringify(clienteCapturado);
}

/**
 * Funcion encarga de obtener los datos de la tabla cliente
 * se imprimen los resultados en #listadoClientes
 */
function verListaClientes(){

    /**
     * peticion AJAX GET para traer todos los datos de la tabla cliente
     */
    $.ajax (
                {
                    url          : BASE_URL+'/all',
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){
                                        actualizarListaClientes(json);
                                        console.log(json)
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error --> ",status)
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada -->",status)
                                    }
                }
);
}

/**
 * Funcion encargada de enviar los datos del formulario a la BD
 */
function registrarCliente(){
    
    /**
     * se capturan datos actuales de input
     */

    let datosEnvioPost  = capturarDatosCliente(); 

    /**
     * peticion AJAX POST para agregar registro a la tabla costume
     */
    $.ajax (
                {
                    url          :  BASE_URL+'/save',
                    type         : 'POST',
                    data         :  datosEnvioPost,
                    contentType  : 'application/json',
                    success      :  function(response){ 
                                        console.log("respuesta --> ",response)
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error --> ",status)
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada -->",status);
                                        limpiarInputFormularioCliente()
                                    }
                }
    );
}

/**
 * Funcion encargada de enviar peticion con los datos del 
 * disfraz que se quiere actualizar.
 * 
 * Cuando se intente ejecutar esta funcion, el input ID estara deshabilitado
 */
function actualizarCliente() {

    /**
     * se capturan datos actuales de input
     */
    let datosEnvioPut  = capturarDatosCliente();

    /**
     * peticion AJAX PUT actualizar registro de la tabla costume
     */
    $.ajax (
                {

                    url          : BASE_URL+'/update',
                    type         : 'PUT',
                    data         :  datosEnvioPut,
                    contentType  : 'application/json',
                    success      :  function(response){
                                        console.log(response) 
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error --> ",status)
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada -->",status);
                                        limpiarInputFormularioCliente()
                                    }
                }
    );
}

/**
 * Funcion encargada de realizar peticion para borrar cliente de BD
 * por el momento se encuentra deshabilitada
 */
function borrarCliente() {

    /**
     * Se lanza funcion que obtiene los datos
     * actuales en el formulario de disfraz
     */
    let datosEnvio  = capturarDatosCliente();
    /**
     * peticion AJAX DELETE para borrar registro de la tabla costume
     */
    $.ajax (
                {

                    url          :  BASE_URL+'/'+JSON.parse(capturarDatosCliente()).idClient,
                    type         : 'DELETE',
                    data         :  datosEnvio,
                    contentType  : 'application/json',
                    success      :  function(response){
                                        console.log(response)
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error --> ",status)
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada -->",status);
                                        limpiarInputFormularioCliente()
                                    }
            }
    );
}

/**
 * funcion encarga de colocar en el formulario "datos del cliente"
 * el detalle del cliente seleccionado
 * @param {*} id 
 */
function verDetalleCliente(id){

    /**
     * Se deshabilita el input ID al momento de acceder
     * al detalle del cliente
     */
    document.getElementById("idCliente").disabled = true;

    /**
     * peticion AJAX GET para traer registro especifico de tabla costume
     */
    $.ajax (
                {
                    url          :  BASE_URL+'/'+id,
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){                           
                                        console.log(json);
                                        detalleCliente(json)
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error --> ",status)
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada -->",status)
                                    }
                }
    );
}

/**
 * Funcion encargada de recargar tabla despues de realizar algun cambio
 */
function actualizarListaClientes(items){
    
    $("#listadoClientes").empty();
    $("#listadoClientes").append("<h3>Listado clientes</h3>"); //titulo de la tabla
    $("#listadoClientes").append("<p>Dar click sobre el ID del cliente que quiere detallar</p>"); //mensaje para el usuario
    let tablaListadoClientes = "<table id='tablaListado'>" //etiqueta para crear tabla 
                                    +"<tr>" // se crea fila para añadir cabeceras
                                        +"<th>ID</th>" //titulo columna ID
                                        +"<th>Nombre</th>" // titulo columan nombre
                                    +"</tr>"; //cierre de fila
    /* ciclo encargado de recorrer los items y colocar los elementos
    * en la tabla creada
    */
    for(let i of items){
        let idCliente = i.idClient;
        tablaListadoClientes+="<tr>"
                                +"<td><a href=Javascript:verDetalleCliente("+idCliente+")>" + i.idClient + "</a></td>"
                                +"<td>" + i.name + "</td>"
                            +"</tr>";
    }
    tablaListadoClientes+="</table>"; //etiqueta para crear tabla
    $("#listadoClientes").append(tablaListadoClientes)
}

/**
 * Funcion encargada de mostrar datos del cliente seleccionado
 */
function detalleCliente(items){
    /**
     * El formulario se rellena con los valores de respuesta del cliente seleccionado
     * se debe colocar item[0] porque la respuesta es un diccionario
     */
    $("#idCliente").val(items.idClient);
    $("#nombreCliente").val(items.name);
    $("#edadCliente").val(items.age);
    $("#correoCliente").val(items.email);
    $("#claveCliente").val(items.password)
}

/**
 * Limpia las entradas del formulario "datos del disfraz"
 */
function limpiarInputFormularioCliente(){
    document.getElementById("idCliente").disabled = false;
    $("#idCliente").val("");
    $("#nombreCliente").val("");
    $("#edadCliente").val("");
    $("#correoCliente").val("");
    $("#claveCliente").val("")
}