//Funcion encarga de traer la informacion de todos los mensajes 
// almacenados en la tabla
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
    
    var idMensaje = $("#labelIdMensaje").val();
    var cuerpoMensaje = $("#labelMensaje").val();
    var mensaje;
    mensaje = { id:idMensaje, messagetext:cuerpoMensaje};

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