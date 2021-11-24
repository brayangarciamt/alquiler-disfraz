let mensajes = [];

// let BASE_URL = 'http://localhost:8080/api/Message' // pruebas con local host
// let BASE_URL_COSTUME = 'http://localhost:8080/api/Costume' //pruebas con local host


let BASE_URL = 'http://168.138.130.41:9090/api/Message'; //pruebas con server
let BASE_URL_COSTUME = 'http://168.138.130.41:9090/api/Costume' //pruebas con server

window.onload = listaSelectDisfraces();

$(document).ready(function () {
    if($("#editSection").length) $("#editSection").hide();
    getMensajes()
});


/**
 * capturar el id del disfraz seleccionado
 */
function capturarDisfrazMensaje(elementoSelect){

    let select = document.getElementById(elementoSelect);
    let selectedOption = select.options[select.selectedIndex];
    let retornoDisfraz = {id:selectedOption.value};

    return retornoDisfraz;
}

function getMensajes() {
    $.ajax({
        url: BASE_URL+'/all',
        type: 'GET',
        dataType: 'JSON',
        success: function(result){
            mensajes = result;
            console.log(mensajes);
            renderTable()
        },
        error: function(error){
            console.log("Something went wrong " + error.status + " " + error.statusText)
        },
        
    });
}

function saveMensaje() {

    /**
     * JSON con los datos del mensaje a crear
     */
    let nuevoMensaje = {    messageText: $("#messagetext").val(),
                            costume:capturarDisfrazMensaje("disfrazMensaje")
                        }

    let dataSend = JSON.stringify(nuevoMensaje);

    $.ajax({
        url: BASE_URL+'/save',
        type: 'POST',
        dataType: 'JSON',
        data: dataSend,
        contentType: 'application/json',
        success: function(result){
            alert("Mensaje creado correctamente");
            window.location="index-mensaje.html"
            getMensajes()
        },
        error: function(error){
            alert("Error al enviar mensaje: " + error.status + " " + error.statusText)
        }
    });
}

function deleteMensaje(id) {

    /**
     * JSON con los datos del mensaje a crear
     */
    let nuevoMensaje = {    idMessage:$("#idUpdate").val(),
                            messageText: $("#messagetextUpdate").val(),
                        }

    let dataSend = JSON.stringify(nuevoMensaje);
    
    $.ajax({
        url: BASE_URL+'/'+id,
        type: 'DELETE',
        dataType: 'JSON',
        data: dataSend,
        contentType: 'application/json',
        success: function(result){
            alert("Mensaje eliminado");
            window.location.reload()
        },
        error: function(error){
            alert("Something went wrong " + error.status + " " + error.statusText)
        }
    });
}

function updateMensaje() {
    
    /**
     * JSON con los datos del mensaje a crear
     */
    let nuevoMensaje = {    idMessage:$("#idUpdate").val(),
                            messageText: $("#messagetextUpdate").val(),
                        }

    let dataSend = JSON.stringify(nuevoMensaje);

    $.ajax({
        url: BASE_URL+'/update',
        type: 'PUT',
        dataType: 'JSON',
        data: dataSend,
        contentType: 'application/json',
        success: function(result){
            alert("Mensaje editado correctamente");
            getMensajes()
        },
        error: function(error){
            alert("Problemas con el mensaje --> codigo: " + error.status + " | " + error.statusText)
            // window.location.reload()
        }
    });
}

function showMensaje(id) {
    $.ajax({
        url: BASE_URL + '/' + id,
        type: 'GET',
        dataType: 'JSON',
        success: function(items){
            console.log(items)
            $("#editSection").show();
            $("#idUpdate").val(items.idMessage);
            $("#messagetextUpdate").val(items.messageText);
            $("#disfrazMensajeUpdate").val(items.costume.name)
        },
        error: function(error){
            alert("Something went wrong " + error.status + " " + error.statusText)
        }
    });
}

function renderTable() {
    let bodyTable = "<tr>"
                        +"<th>ID</th>"
                        +"<th>Mensaje</th>"
                        +"<th>Detalle</th>"
                        +"<th>Eliminar</th>"
                    +"</tr>";
    if (mensajes.length) {
        for (const iterator of mensajes) {
            bodyTable += "<tr>"
            bodyTable += "<td>" + iterator.idMessage + "</td>"
            bodyTable += "<td>" + iterator.messageText + "</td>"
            bodyTable += "<td><input type='button' value='detalle' onclick='showMensaje(" + iterator.idMessage + ")'></td>"
            bodyTable += "<td><input type='button' value='eliminar' onclick='deleteMensaje(" + iterator.idMessage + ")'></td>"
            bodyTable += "</tr>"
        }
    } else {
        bodyTable += "<tr>"
        bodyTable += "<td>No hay datos</td>"
        bodyTable += "</tr>"
    }
    $("#tableMensaje").html(bodyTable)
}


/**
 * funcion encargada de listar los disfraces que 
 * se encuentra disponibles en la base de datos
 * 
 * la lista es mostrada en el elemento select IdDisfrazMensaje
 */
function listaSelectDisfraces(){
    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        // body: capturarDatosDisfraz()
                    };
    
    let peticion = new Request(BASE_URL_COSTUME+'/all', opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            actualizarSelectDisfraz(items);
            console.log("--- Respuesta Lista Disfraz ---")
            console.log(items)
        });
    
    }

/**
 * funcion encargada de actualizar la lista del 
 * elemento select con las categorias existentes, 
 * en la base de datos
 * 
 * @param {} items 
 */
function actualizarSelectDisfraz(items){

    /**
     * se vacia la lista de 
     * categorias que se encuentra en 
     * el elemento select
     */
    $("#disfrazMensaje").empty();
    let listaDisfraz = "<option value=''>seleccionar</option>"; //para almacenar etiquetas option

    for(let i of items){
        let idDisfraz = i.id; //se guarda valor en caso de crear disfraz
        let nombreDisfraz = i.name; // para mostrar en la lista
        listaDisfraz  += "<option value='"+idDisfraz+"'>"+nombreDisfraz+"</option>"; //etiqueta option para añadir a select
        
    }
    $("#disfrazMensaje").html(listaDisfraz ); //se añaden las etiquetas guardas al select en index-disfraz.html

}