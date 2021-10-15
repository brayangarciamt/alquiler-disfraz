let mensajes = [];
let BASE_URL = "https://gc894c361a55720-db202110031639.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message"

getMensajes()

$(document).ready(function () {
    if($("#editSection").length) $("#editSection").hide()
});

function getMensajes() {
    $.ajax({
        url: BASE_URL,
        type: "GET",
        dataType: "JSON",
        success: function(result){
            mensajes = result.items
            renderTable()
        },
        error: function(error){
            alert("Something went wrong " + error.status + " " + error.statusText)
        }
    });
}

function saveMensaje() {
    let nuevoMensaje = {
        id: parseInt($("#id").val()),
        messagetext: $("#messagetext").val(),
    }
    let dataSend = JSON.stringify(nuevoMensaje)
    $.ajax({
        url: BASE_URL,
        type: "POST",
        dataType: "JSON",
        data: dataSend,
        contentType: "application/json",
        success: function(result){
            alert("Mensaje creado correctamente")
            getMensajes()
        },
        error: function(error){
            alert("Mensaje creado correctamente: " + error.status + " " + error.statusText)
        }
    });
}

function deleteMensaje(id) {
    let data = {
        id: id
    }
    let dataSend = JSON.stringify(data)
    $.ajax({
        url: BASE_URL,
        type: "DELETE",
        dataType: "JSON",
        data: dataSend,
        contentType: "application/json",
        success: function(result){
            alert("Mensaje eliminado")
            window.location.reload()
        },
        error: function(error){
            alert("Something went wrong " + error.status + " " + error.statusText)
        }
    });
}

function updateMensaje() {
    let nuevoMensaje = {
        id: parseInt($("#idUpdate").val()),
        messagetext: $("#messagetextUpdate").val(),
    }
    let dataSend = JSON.stringify(nuevoMensaje)
    $.ajax({
        url: BASE_URL,
        type: "PUT",
        dataType: "JSON",
        data: dataSend,
        contentType: "application/json",
        success: function(result){
            alert("Mensaje editado correctamente")
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
        url: BASE_URL + "/" + id,
        type: "GET",
        dataType: "JSON",
        success: function(result){
            $("#editSection").show()
            $("#idUpdate").val(result.items[0].id)
            $("#messagetextUpdate").val(result.items[0].messagetext)
        },
        error: function(error){
            alert("Something went wrong " + error.status + " " + error.statusText)
        }
    });
}

function renderTable() {
    let bodyTable = `<tr>
        <th>ID</th>
        <th>Mensaje</th>
        <th>Detalle</th>
        <th>Eliminar</th>
    </tr>`;
    if (mensajes.length) {
        for (const iterator of mensajes) {
            bodyTable += "<tr>"
            bodyTable += "<td>" + iterator.id + "</td>"
            bodyTable += "<td>" + iterator.messagetext + "</td>"
            bodyTable += "<td><input type='button' value='detalle' onclick='showMensaje(" + iterator.id + ")'></td>"
            bodyTable += "<td><input type='button' value='eliminar' onclick='deleteMensaje(" + iterator.id + ")'></td>"
            bodyTable += "</tr>"
        }
    } else {
        bodyTable += "<tr>"
        bodyTable += "<td>No hay datos</td>"
        bodyTable += "</tr>"
    }
    $("#tableMensaje").html(bodyTable)
}