let mensajes = [];
let BASE_URL = 'http://localhost:8080/api/Message';

$(document).ready(function () {
    if($("#editSection").length) $("#editSection").hide();
    getMensajes()
});

function getMensajes() {
    $.ajax({
        url: BASE_URL+'/all',
        type: 'GET',
        dataType: 'JSON',
        success: function(result){
            mensajes = result;
            renderTable()
        },
        error: function(error){
            console.log("Something went wrong " + error.status + " " + error.statusText)
        }
    });
}

function saveMensaje() {
    let nuevoMensaje = {
        idMessage: parseInt($("#id").val()),
        messageText: $("#messagetext").val(),
    }
    let dataSend = JSON.stringify(nuevoMensaje)
    $.ajax({
        url: BASE_URL+'/save',
        type: 'POST',
        dataType: 'JSON',
        data: dataSend,
        contentType: 'application/json',
        success: function(result){
            alert("Mensaje creado correctamente");
            getMensajes()
        },
        error: function(error){
            alert("Mensaje creado correctamente: " + error.status + " " + error.statusText)
        }
    });
}

function deleteMensaje(id) {
    let data = {
        idMessage: id
    }
    let dataSend = JSON.stringify(data)
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
    let nuevoMensaje = {
        idMessage: parseInt($("#idUpdate").val()),
        messageText: $("#messagetextUpdate").val(),
    }
    let dataSend = JSON.stringify(nuevoMensaje)
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
            alert("Mensaje editado correctamente " + error.status + " " + error.statusText)
            window.location.reload()
        }
    });
}

function showMensaje(id) {
    $.ajax({
        url: BASE_URL + '/' + id,
        type: 'GET',
        dataType: 'JSON',
        success: function(result){
            $("#editSection").show();
            $("#idUpdate").val(result.items[0].id);
            $("#messagetextUpdate").val(result.items[0].messagetext)
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