/**
 * Funciones para traer los registro de reservas en ciertos intervalos,
 * cantidad de reservas completadas vs  canceladas,
 * top de cliente que han realizado reservas
 */


/**
 * enlaces para solicitar recursos al Backend
 */
let BASE_URL_REPORTDATES = 'http://localhost:8080/api/Reservation/report-dates';
let BASE_URL_REPORTSTATUS = 'http://localhost:8080/api/Reservation/report-status';
let BASE_URL_REPORTCLIENTS = 'http://localhost:8080/api/Reservation/report-clients';


/**
 * Hacer peticion GET para saber la cantidad de reservaciones
 *  en las fechas indicadas
 */
function getReporteFechas(){

    /**
    * datos de los input fecha inicia y fin
    */
    // let fechaInicio = $('#fechaInicioI').val();
    // let fechaFin = $('#fechaFinI').val();
    let fechaInicio = document.getElementById("fechaInicioI").value;
    let fechaFin = document.getElementById("fechaFinI").value;

    let fechaInicioSub = fechaInicio.substr(0,10);
    let fechaFinSub = fechaFin.substr(0,10);

    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                    };
    
    let peticion = new Request(BASE_URL_REPORTDATES+'/'+fechaInicioSub+'/'+fechaFinSub, opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            creaReportDates(items,fechaInicioSub,fechaFinSub);
            console.log("--- Respuesta GET ---")
            console.log(items)});
}

/**
 * Se crea una tabla con un reporte basico de reservaciones
 * @param {*} items 
 * @param {*} fecha1 
 * @param {*} fecha2 
 */
function creaReportDates(items,fecha1,fecha2){
    
    document.getElementById("tablaReservasIntervalo").innerHTML = "";
    let tablaReporte = "<table id='reportDates'>" //etiqueta para crear tabla 
                            +"<tr>" // se crea fila para añadir cabeceras
                                +"<th>Tabla</th>" 
                                +"<th>Fecha inicio</th>" 
                                +"<th>Fecha fin</th>"
                                +"<th>Total</th>"
                            +"</tr>" //cierre de fila
                            +"<tr>"
                                +"<td>Reservaciones</td>"                                                            
                                +"<td>"+fecha1+"</td>"
                                +"<td>" + fecha2 + "</td>"
                                +"<td>" + items.length + "</td>"                                                        
                            +"</tr>";
                        +"</table>"; //etiqueta para crear tabla
    document.getElementById("tablaReservasIntervalo").innerHTML = tablaReporte;
}


/**
 * Hacer peticion GET para saber la cantidad de reservaciones
 *  comparativo completadas vs canceladas
 */
function getReporteComparativo(){

    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                    };
    
    let peticion = new Request(BASE_URL_REPORTSTATUS, opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            creaReportStatus(items);
            console.log("--- Respuesta GET ---")
            console.log(items)});
}

/**
 * se crea tabla con los resultados de GET comparativo
 */
function creaReportStatus(items){
    console.log(items);
    document.getElementById("tablaReservasComparativo").innerHTML = "";
    let tablaReporte = "<table id='reportStatus'>" //etiqueta para crear tabla 
                            +"<tr>" // se crea fila para añadir cabeceras
                                +"<th>Completadas</th>" 
                                +"<th>Canceladas</th>" 
                            +"</tr>" //cierre de fila
                            +"<tr>"                                                        
                                +"<td>" + items.completed + "</td>"
                                +"<td>" + items.cancelled + "</td>"                                                   
                            +"</tr>";
                        +"</table>"; //etiqueta para crear tabla
    document.getElementById("tablaReservasComparativo").innerHTML = tablaReporte;

}

/**
 * Hacer peticion GET para saber los clientes que
 * tienen mas reservas completadas
 */
function getReporteClientes(){

    let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                    };
    
    let peticion = new Request(BASE_URL_REPORTCLIENTS, opciones);
    
    fetch(peticion)
        .then(response => response.json())
        .then(function(items) {
            creaReportClient(items);
            console.log("--- Respuesta GET ---")
            console.log(items)});
}

/**
 * se crea tabla con los resultados de GET top clientes
 */
function creaReportClient(items){

    document.getElementById("tablaTopClientes").innerHTML = "";
    let tablaReporte = "<table id='reportClient'>" //etiqueta para crear tabla 
                            +"<tr>" // se crea fila para añadir cabeceras
                                +"<th>Nombre cliente</th>" 
                                +"<th>Cantidad de reservaciones</th>" 
                            +"</tr>"; //cierre de fila
    for(let i of items){
        if(i.total!=0){
            for(let j of i.client.reservations){
                if(j.status == "completed"){
                    tablaReporte += "<tr>"                                                        
                                +"<td>" + i.client.name + "</td>"
                                +"<td>" + i.total + "</td>"                                                   
                            +"</tr>";
                }
            }  
        }                        
    }
    tablaReporte += "</table>"; //etiqueta para crear tabla
    document.getElementById("tablaTopClientes").innerHTML = tablaReporte;

}

/**
 * Se ejecutan las funciones al cargar pagina
 */
window.onload = function(){

    getReporteComparativo();
    getReporteClientes();

}