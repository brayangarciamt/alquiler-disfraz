function verListaMensajes(){
    alert("Funciona");
}

//<!-- Inicio porción funciones CLIENTE -->

function consultarCliente() {

    $.ajax (
               {
                url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
                type         : 'GET',
                dataType     : 'json',
                success      :  function(json){
                    $("#idDivCliente").empty();
                    $("#idDivCliente").append("<table>");
                        $("#idDivCliente").append("<caption> Tabla de CLIENTES </caption>");
                        $("#idDivCliente").append("<tr><th>ID </th><th>NAME </th><th>EMAIL </th><th>AGE </th></tr>");
                        for (i=0; i < json.items.length; i++){
                            $("#idDivCliente").append("<tr>");
                                $("#idDivCliente").append("<td>" + json.items[i].id + "</td>");
                                $("#idDivCliente").append("<td>" + json.items[i].name + "</td>");
                                $("#idDivCliente").append("<td>" + json.items[i].email + "</td>");
                                $("#idDivCliente").append("<td>" + json.items[i].age + "</td>");
                            $("#idDivCliente").append("</tr>");
                        }
                    $("#idDivCliente").append("</table>");
                    console.log(json)
                                },
                error        :   function(xhr,status){
                    console.log(xhr)
                                }
               }
           );
}

function insertarCliente() {
    let tempCliente;
    tempCliente = {id:53, name:'Lorena Juan', email:'ljuan@mintic.com', age:33};
    // let datosEnvio = JSON.stringify(tempCliente);
    $.ajax (
               {
                url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
                type         : 'POST',
                data         : tempCliente,
                // contentType  : 'application/json',
                success      :  function(response){
                                    console.log(response)
                                },
                error        :   function(xhr, status){
                                    console.log(xhr)
                                }
               }
           );
}

function borrarCliente() {
    let tempCliente, datosEnvio;
    tempCliente = {ID:52};
    datosEnvio = JSON.stringify(tempCliente);
    $.ajax (
               {
                url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
                type         : 'DELETE',
                data         : datosEnvio,
                contentType  : 'application/json',
                success      :  function(response){
                                    console.log(response)
                                },
                error        :   function(xhr, status){
                                    console.log(xhr)
                                }
               }
           );
}

function actualizarCliente() {
    let tempCliente, datosEnvio;
    tempCliente = {id:53, name:'Hans Grüber', email:'hgruber@usedu.co', age:45};
    datosEnvio = JSON.stringify(tempCliente);
    $.ajax (
               {
                url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
                type         : 'PUT',
                data         : datosEnvio,
                contentType  : 'application/json',
                success      :  function(response){
                                    console.log(response)
                                },
                error        :   function(xhr, status){
                                    console.log(xhr)
                                }
               }
           );
}

function consultarIdCliente() {
    let ID = $("#idCliente").val();

    $.ajax (
               {
                url          : 'https://g7c696f5e7eec44-alquiladisfraz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/' + ID,
                type         : 'GET',
                dataType     : 'json',
                success      :  function(json){
                                    $("#idDivCliente").empty();
                                    for (i=0 ; i < json.items.length; i++){
                                        $("#idDivCliente").append(json.items[i].id + json.items[i].name + json.items[i].email + json.items[i].age + " ");
                                    }
                                    console.log(json)
                                },
                error        :   function(xhr,status){
                                    console.log(xhr)
                                }
               }
           );
}

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

//<!-- Final porción funciones CLIENTE -->