/***
 * Funciones para el formulario cliente
 */


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
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){
                                        actualizarListaClientes(json.items);
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
     * se crea un diccionario para ser enviado como parametro
     * en la peticion POST
     */
    let cliente = { id:$("#labelId").val(), 
                    name:$("#labelNombre").val(),
                    email:$("#labelCorreoRegistro").val(),
                    age:$("#labelEdad").val()
                };

    let datosEnvio  = JSON.stringify(cliente);  

    /**
     * peticion AJAX POST para agregar registro a la tabla costume
     */
    $.ajax (
                {
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
                    type         : 'POST',
                    data         :  datosEnvio,
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
 * funcion encarga de colocar en el formulario "datos del cliente"
 * el detalle del cliente seleccionado
 * @param {*} id 
 */
function verDetalleCliente(id){

    /**
     * Se deshabilita el input ID al momento de acceder
     * al detalle del cliente
     */
    document.getElementById("labelId").disabled = true;

    /**
     * peticion AJAX GET para traer registro especifico de tabla costume
     */
    $.ajax (
                {
                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/'+id,
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){                           
                                        console.log(json);
                                        detalleCliente(json.items)
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
function actualizarCliente() {

    /**
     * Diccionario con elementos necesarios para la
     * peticion PUT
     */
    let cliente = { id:$("#labelId").val(), 
                    name:$("#labelNombre").val(),
                    email:$("#labelCorreoRegistro").val(),
                    age:$("#labelEdad").val()
                };

    let datosEnvio  = JSON.stringify(cliente);

    /**
     * peticion AJAX PUT actualizar registro de la tabla costume
     */
    $.ajax (
                {

                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
                    type         : 'PUT',
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
 * Funcion encargada de realizar peticion para borrar cliente de BD
 * por el momento se encuentra deshabilitada
 */
function borrarCliente() {

    /**
     * Variables usadas para especificar el cliente
     * que se requiere borrar
     * 
     */
    let cliente = { id:$("#labelId").val()};
    let datosEnvio  = JSON.stringify(cliente);
    /**
     * peticion AJAX DELETE para borrar registro de la tabla costume
     */
    $.ajax (
                {

                    url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
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
 * Funcion encargada de recargar tabla despues de realizar algun cambio
 */
function actualizarListaClientes(items){
    
    $("#listadoClientes").empty();
    $("#listadoClientes").append("<h3>Listado clientes</h3>"); //titulo de la tabla
    $("#listadoClientes").append("<p>Dar click sobre el ID del cliente que quiere detallar</p>"); //mensaje para el usuario
    let tablaListadoClientes = "<table id='tablaListado'>"+ //etiqueta para crear tabla 
                                    "<tr>"+ // se crea fila para añadir cabeceras
                                        "<th>ID</th>"+ //titulo columna ID
                                        "<th>Nombre</th>"+ // titulo columan nombre
                                    "</tr>"; //cierre de fila
    /* ciclo encargado de recorrer los items y colocar los elementos
    * en la tabla creada
    */
    for(let i of items){
        let idCliente = i.id;
        tablaListadoClientes+="<tr>";
        tablaListadoClientes+="<td><a href=Javascript:verDetalleCliente("+idCliente+")>" + i.id + "</a></td>";                                                            
        tablaListadoClientes+="<td>" + i.name + "</td>";                                                              
        tablaListadoClientes+="</tr>";
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
    $("#labelId").val(items[0].id);
    $("#labelNombre").val(items[0].name);
    $("#labelEdad").val(items[0].age);
    $("#labelCorreoRegistro").val(items[0].email);
    $("#labelClaveRegistro").val("#####")
}

/**
 * Limpia las entradas del formulario "datos del disfraz"
 */
function limpiarInputFormularioCliente(){
    document.getElementById("labelId").disabled = false;
    $("#labelId").val("");
    $("#labelNombre").val("");
    $("#labelEdad").val("");
    $("#labelCorreoRegistro").val("");
    $("#labelClaveRegistro").val("")
}