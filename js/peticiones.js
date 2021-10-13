/**
 * Funcion encarga de traer la informacion de todos los mensajes almacenados en la tabla
 */
function verListaMensajes(){
        $.ajax (
                {
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){
                                    $("#respuestaMensaje").empty();
                                    $("#respuestaMensaje").append("<table>");
                                    for(i=0 ; i < json.items.length; i++){
                                        $("#respuestaMensaje").append("<tr><td><a href='https://www.google.com'>"
                                                                    +json.items[i].id+"</a></td><td>"
                                                                    +json.items[i].messagetext + "</td></tr>")
                                    }
                                    $("#respuestaMensaje").append("</table>");
                                    console.log(json)
                                    },
                    error        :  function(xhr,status){
                                    console.log(xhr)
                                    }
                }
    );
}

// Funcion encargada de almacenar el mensaje en la BD - tabla MENSAJE
function enviarMensaje(){
    
    var idMensaje     = $("#labelIdMensaje").val();
    var cuerpoMensaje = $("#labelMensaje").val();
    var mensaje;
    mensaje           = { id:idMensaje, messagetext:cuerpoMensaje};

    $.ajax (
                {
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
                    type         : 'POST',
                    data         :  mensaje,

                    success      :  function(response){ 
                                        console.log("respuesta --> ",response);
                                    },
                    error       :   function(xhr,status){
                                        console.log(xhr);
                                        alert("Algo salio mal ",status);
                                    },
                    complete    :   function(xhr, status) {
                                        alert("Peticion realizada");
                                    }
                }
    );
}


/***
 * Funciones para el formulario disfraz
 */


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
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){
                                        actualizarListaDisfraz(json.items);
                                        console.log(json)
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error")
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada")
                                    }
                }
);
}

/**
 * Funcion encargada de enviar los datos del formulario a la BD
 */
function crearDisfraz(){
    
    /**
     * se crea un diccionario para ser enviado como parametro
     * en la peticion POST
     */
    let disfrazPost = { id:$("#labelIdDisfraz").val(), 
                    brand:$("#labelBrand").val(), 
                    model:$("#labelModeloDisfraz").val(), 
                    category_id:$("#labelIdCategoria").val(), 
                    name:$("#labelNombreDisfraz").val()
                };

    let datosEnvioPost  = JSON.stringify(disfrazPost);  

    /**
     * peticion AJAX POST para agregar registro a la tabla costume
     */
    $.ajax (
                {
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
                    type         : 'POST',
                    data         :  datosEnvioPost,
                    contentType  : 'application/json',
                    success      :  function(response){ 
                                        console.log("respuesta --> ",response);
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error")
                                    },
                    complete     :  function(xhr,status){
                                        verListaDisfraz();
                                        console.log("Peticion realizada")
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
    document.getElementById("labelIdDisfraz").disabled = true;

    /**
     * peticion AJAX GET para traer registro especifico de tabla costume
     */
    $.ajax (
                {
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume/'+id,
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){                           
                                        console.log(json);
                                        detalleDisfraz(json.items)
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error")
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion realizada")
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
     * Diccionario con elementos necesarios para la
     * peticion PUT
     */
    let disfraz = { id:$("#labelIdDisfraz").val(), 
                    brand:$("#labelBrand").val(), 
                    model:$("#labelModeloDisfraz").val(), 
                    category_id:$("#labelIdCategoria").val(), 
                    name:$("#labelNombreDisfraz").val()
                };

    let datosEnvio  = JSON.stringify(disfraz);

    /**
     * peticion AJAX PUT actualizar registro de la tabla costume
     */
    $.ajax (
                {

                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',
                    success      :  function(response){
                                        console.log(response); 
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error")
                                    },
                    complete     :  function(xhr,status){
                                        verListaDisfraz();
                                        console.log("Peticion realizada")
                                    }
                }
    );
}

/**
 * Funcion encargada de realizar peticion para borrar disfraz de BD
 */
function borrarDisfraz() {

    /**
     * Variables usadas para especificar el disfraz
     * que se requiere borrar
     * 
     */
    let disfraz = {id : $("#labelIdDisfraz").val()};
    let datosEnvio = JSON.stringify(disfraz);
    /**
     * peticion AJAX DELETE para borrar registro de la tabla costume
     */
    $.ajax (
                {

                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
                    type         : 'DELETE',
                    data         :  datosEnvio,
                    contentType  : 'application/json',
                    success      :  function(response){
                                        console.log(response);
                                        verListaDisfraz()
                                    },
                    error       :   function(xhr,status){
                                        console.log(xhr);
                                        console.log("Peticion realizada")
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
    let tablaListadoDisfraces = "<table id='tablaListado'>"; //etiqueta para crear tabla 
    tablaListadoDisfraces+="<tr>"; // se crea fila para añadir cabeceras
    tablaListadoDisfraces+="<th>ID</th>"; //titulo columna ID
    tablaListadoDisfraces+="<th>Nombre</th>"; // titulo columan nombre
    tablaListadoDisfraces+="</tr>"; //cierre de fila
    /* ciclo encargado de recorrer los items y colocar los elementos
    * en la tabla creada
    */
    for(i=0 ; i < items.length; i++){
        let idDisfraz = items[i].id;
        tablaListadoDisfraces+="<tr>";
        tablaListadoDisfraces+="<td><a href=Javascript:verDetalleDisfraz("+idDisfraz+")>" + items[i].id + "</a></td>";                                                            
        tablaListadoDisfraces+="<td>" + items[i].name + "</td>";                                                              
        tablaListadoDisfraces+="</tr>";
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
     * se debe colocar item[0] porque la respuesta es un diccionario
     */
    $("#labelIdDisfraz").val(items[0].id);
    $("#labelBrand").val(items[0].brand);
    $("#labelModeloDisfraz").val(items[0].model);
    $("#labelIdCategoria").val(items[0].category_id);
    $("#labelNombreDisfraz").val(items[0].name)
}

/**
 * Limpia las entradas del formulario "datos del disfraz"
 */
function limpiarInputFormularioDisfraz(){
    $("#labelIdDisfraz").val("");
    $("#labelBrand").val("");
    $("#labelModeloDisfraz").val("");
    $("#labelIdCategoria").val("");
    $("#labelNombreDisfraz").val("")
}