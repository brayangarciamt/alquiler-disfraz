/***
 * Funciones para el formulario disfraz
 */

// let BASE_URL_COSTUME = 'http://localhost:8080/api/Costume'; // pruebas con local host
// let BASE_URL_CATEGORY = 'http://localhost:8080/api/Category'; // pruebas con local host

let BASE_URL_COSTUME = 'http://168.138.130.41:8080/api/Costume'; // Pruebas con server
let BASE_URL_CATEGORY = 'http://168.138.130.41:8080/api/Category'; // pruebas con local h

window.onload = listaSelectCategoria();

/**
 * Funcion encarga de obtener los datos de la tabla Costume
 * se imprimen los resultados en el formulario Crear disfraz
 */
function getDisfraz(){

    /**
     * peticion AJAX GET para traer todos los datos de la tabla costume
     */
    $.ajax (
                {
                    url          :  BASE_URL_COSTUME+'/all',
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){
                                        createTableDisfraz(json);
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
 * funcion encarga de colocar en el formulario "datos del disfraz"
 * el detalle del disfraz seleccionado
 * @param {*} id 
 */
function getIdDisfraz(id){

    /**
     * peticion AJAX GET para traer registro especifico de tabla costume
     */
    $.ajax (
                {
                    url          : BASE_URL_COSTUME+'/'+id,
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
 * Funcion encargada de enviar los datos del formulario a la BD
 */
function saveDisfraz(){
    
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
                    url          :  BASE_URL_COSTUME+'/save',
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
                                        limpiarFormularioDisfraz()
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
function updateDisfraz() {

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

                    url          : BASE_URL_COSTUME+'/update',
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
                                        limpiarFormularioDisfraz()
                                    }
                }
    );
}

/**
 * Funcion encargada de realizar peticion para borrar disfraz de BD
 */
function deleteDisfraz() {

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

                    url          : BASE_URL_COSTUME+'/'+JSON.parse(capturarDatosDisfraz()).id,
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
                                        limpiarFormularioDisfraz()
                                    }
            }
    );
}

/**
 * Funcion encargada de recargar tabla despues de realizar algun cambio
 */
function createTableDisfraz(items){
    
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
                                +"<td><a class='linkBody' href=Javascript:getIdDisfraz("+idDisfraz+")>" + i.id + "</a></td>"                                                            
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
    $("#modeloDisfraz").val(items.year);
    $("#categoriaDisfraz").val(items.category.id);
    $("#nombreDisfraz").val(items.name);
    $("#descripcionDisfraz").val(items.description)

    document.getElementById("botonActualizarDisfraz").hidden = false;
    document.getElementById("botonBorrarDisfraz").hidden = false;
    document.getElementById("botonCrearDisfraz").hidden = true;
    document.getElementById("categoriaDisfraz").disabled = true;
}

/**
 * Limpia las entradas del formulario "datos del disfraz",
 * cuando se ejecutan las funciones de crear, actualizar y borrar
 * 
 */
function limpiarFormularioDisfraz(){
    document.getElementById("formDisfraz").reset();
    document.getElementById("botonActualizarDisfraz").hidden = true;
    document.getElementById("botonBorrarDisfraz").hidden = true;
    document.getElementById("botonCrearDisfraz").hidden = false;
    document.getElementById("categoriaDisfraz").disabled = false;
}


/**
 * capturar el id de la categoria seleccionada
 */
function capturarCategoriaDisfraz(elementoSelect){

    let select = document.getElementById(elementoSelect);
    let selectedOption = select.options[select.selectedIndex];
    let retornoCategoria = {id:selectedOption.value};

    return retornoCategoria;
    
}

/**
 * Se obtienen los datos de los input de formulario HTML
 * para crear la estructura JSON de las peticiones
 * @returns 
 */
function capturarDatosDisfraz(){

    let disfrazCapturado = {id:$("#idDisfraz").val(),
                    brand:$("#marcaDisfraz").val(), 
                    year:$("#modeloDisfraz").val(),  
                    name:$("#nombreDisfraz").val(),
                    description:$("#descripcionDisfraz").val(),
                    category:capturarCategoriaDisfraz("categoriaDisfraz"),
                };
    return JSON.stringify(disfrazCapturado);
}


/**
 * Funcion que trae los registros de categoria 
 * almacenados en la BD, para mostrarlos en el
 * select de categoria disfraz
 * 
 */
function listaSelectCategoria(){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosDisfraz()
                    };
    
    let peticion = new Request(BASE_URL_CATEGORY+'/all', opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            createSelectCategoria(items);
            console.log("--- Lista Select categoria ---");
            console.log(items)
        });
    
    }

/**
 * funcion encargada de mostrar la lista de categorias
 * en el elemento select. Las categorias existentes
 * son las que se encuentra en la base de datos
 * 
 * @param {} items 
 */
function createSelectCategoria(items){

    /**
     * se vacia la lista de 
     * categorias que se encuentra en 
     * el elemento select
     */
    $("#categoriaDisfraz").empty();
    let listaCategoria = "<option value=''>seleccionar</option>"; //para almacenar etiquetas option

    for(let i of items){
        let idCategoria = i.id; //se guarda valor en caso de crear disfraz
        let nombreCategoria = i.name; // para mostrar en la lista
        listaCategoria += "<option value='"+idCategoria+"'>"+nombreCategoria+"</option>"; //etiqueta option para añadir a select
        
    }
    $("#categoriaDisfraz").html(listaCategoria); //se añaden las etiquetas guardas al select en index-disfraz.html

}