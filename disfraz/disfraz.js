/***
 * Funciones para el formulario disfraz
 */

let BASE_URL = 'http://localhost:8080/api/Costume';

function capturarDatosDisfraz(){

    let disfrazCapturado = {id:$("#idDisfraz").val(), 
                    brand:$("#marcaDisfraz").val(), 
                    year:$("#modeloDisfraz").val(), 
                    category:$("#categoriaDisfraz").val(), 
                    name:$("#nombreDisfraz").val(),
                    description:$("#descripcionDisfraz").val(),

                };

    return JSON.stringify(disfrazCapturado);
}

/**
 * Funcion encarga de obtener los datos de la tabla Costume
 * se imprimen los resultados en el formulario Crear disfraz
 */
function verListaDisfraz(){

    /**
     * peticion AJAX GET para traer todos los datos de la tabla costume
     */
    $.ajax (
                {
                    url          :  BASE_URL+'/all',
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){
                                        actualizarListaDisfraz(json);
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
function crearDisfraz(){
    
    /**
     * Se lanza funcion que obtiene los datos
     * actuales en el formulario de disfraz
     */
    let datosEnvioPost  = capturarDatosDisfraz();  
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
                                        limpiarInputFormularioDisfraz()
                                    }
                }
    );
}

/**
 * funcion encarga de colocar en el formulario "datos del disfraz"
 * el detalle del disfraz seleccionado
 * @param {*} id 
 */
function verDetalleDisfraz(id){

    /**
     * Se deshabilita el input ID al momento de acceder
     * al detalle del disfraz
     */
    document.getElementById("idDisfraz").disabled = true;

    /**
     * peticion AJAX GET para traer registro especifico de tabla costume
     */
    $.ajax (
                {
                    url          : BASE_URL+'/'+id,
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){                           
                                        console.log(json);
                                        detalleDisfraz(json)
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
 * Funcion encargada de enviar peticion con los datos del 
 * disfraz que se quiere actualizar.
 * 
 * Cuando se intente ejecutar esta funcion, el input ID estara deshabilitado
 */
function actualizarDisfraz() {

    /**
     * Se lanza funcion que obtiene los datos
     * actuales en el formulario de disfraz
     */
    let datosEnvioPut  = capturarDatosDisfraz();

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
                                        limpiarInputFormularioDisfraz()
                                    }
                }
    );
}

/**
 * Funcion encargada de realizar peticion para borrar disfraz de BD
 */
function borrarDisfraz() {

    /**
     * Se lanza funcion que obtiene los datos
     * actuales en el formulario de disfraz
     */
    let datosEnvioDelete = capturarDatosDisfraz();
    /**
     * peticion AJAX DELETE para borrar registro de la tabla costume
     */
    $.ajax (
                {

                    url          : BASE_URL+'/'+JSON.parse(capturarDatosDisfraz()).id,
                    type         : 'DELETE',
                    data         :  datosEnvioDelete,
                    contentType  : 'application/json',
                    success      :  function(response){
                                        console.log(response)
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error --> ",status)
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada -->",status);
                                        limpiarInputFormularioDisfraz()
                                    }
            }
    );
}

/**
 * Funcion encargada de recargar tabla despues de realizar algun cambio
 */
function actualizarListaDisfraz(items){
    
    $("#listadoDisfraz").empty();
    $("#listadoDisfraz").append("<h3>Listado disfraces</h3>"); //titulo de la tabla
    $("#listadoDisfraz").append("<p>Dar click sobre el ID del disfraz que quiere detallar</p>"); //mensaje para el usuario
    let tablaListadoDisfraces = "<table id='tablaListado'>" //etiqueta para crear tabla 
                            +"<tr>" // se crea fila para añadir cabeceras
                            +"<th>ID</th>" //titulo columna ID
                            +"<th>Nombre</th>" // titulo columan nombre
                            +"</tr>" //cierre de fila
    /* ciclo encargado de recorrer los items y colocar los elementos
    * en la tabla creada
    */
    for(let i of items){
        let idDisfraz = i.id;
        tablaListadoDisfraces+="<tr>"
                                +"<td><a href=Javascript:verDetalleDisfraz("+idDisfraz+")>" + i.id + "</a></td>"                                                            
                                +"<td>" + i.name + "</td>"                                                              
                            +"</tr>";
    }
    tablaListadoDisfraces+="</table>"; //etiqueta para crear tabla
    $("#listadoDisfraz").append(tablaListadoDisfraces)
}

/**
 * Funcion encargada de mostrar datos del disfraz seleccionado
 */
function detalleDisfraz(items){
    /**
     * El formulario se rellena con los valores de respuesta del disfraz seleccionado
     * se debe colocar item porque la respuesta es una lista
     */
    $("#idDisfraz").val(items.id);
    $("#marcaDisfraz").val(items.brand);
    $("#modeloDisfraz").val(items.model);
    $("#categoriaDisfraz").val(items.category);
    $("#nombreDisfraz").val(items.name);
    $("#descripcionDisfraz").val(items.description)
}

/**
 * Limpia las entradas del formulario "datos del disfraz"
 * 
 * se reemplaza por etiqueta de tipo reset
 * 
 */
// function limpiarInputFormularioDisfraz(){
//     document.getElementById("idDisfraz").disabled = false;
//     $("#idDisfraz").val("");
//     $("#marcaDisfraz").val("");
//     $("#modeloDisfraz").val("");
//     $("#categoriaDisfraz").val("");
//     $("#nombreDisfraz").val("")
// }