System.register(["./DB.js"], function (exports_1, context_1) {
    "use strict";
    var DB_js_1, detalle, option, valor, tablaGastosPersonales, tablaTotalIngresos, btn, RecibirDatos, objRecibirDatos;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DB_js_1_1) {
                DB_js_1 = DB_js_1_1;
            }
        ],
        execute: function () {
            /*Seleccionando los campos de texto*/
            detalle = document.getElementById('uno'); //Utilizando Aserción de tipo
            option = document.getElementById('dos');
            valor = document.getElementById('tres');
            /*Seleccionando la tabla de visualización de datos*/
            tablaGastosPersonales = document.querySelector('#get-table tbody');
            /*Seleccionando la tabla de visualización del total de ingresos*/
            tablaTotalIngresos = document.querySelector('#get-table-2 tbody');
            //Btn
            btn = document.getElementById('btn-submit');
            RecibirDatos = class RecibirDatos {
                //Método que inicia el evento de captura de datos
                startApp() {
                    //Instanciando el obj de la clase ProcesandoDatosUsu
                    const objExportDatosUsu = new DB_js_1.ProcesandoDatosUsu();
                    //Muestra los datos alamacenados al iniciar la app
                    this.mostrarDatosUsu(objExportDatosUsu.traerDatos());
                    //Muestra el total de ingresos y gastos
                    this.totalIngresosNetos(objExportDatosUsu.obtenerValorIngreso, objExportDatosUsu.obtenerValorGasto);
                    //Registrando el nuevo detalle, por medio del evento 'Click' del btn
                    btn.addEventListener('click', this.recibiendoDatos);
                }
                //Método que recibe los datos ingresados por el usuario
                recibiendoDatos() {
                    //Eliminando los espacios del string Detalle
                    let noEspacios = new RegExp(' ', 'g'); //Hace uso de una expresión regular
                    let detalleU = detalle.value.replace(noEspacios, '');
                    //Instanciando el obj de la clase ProcesandoDatosUsu
                    const objExportDatosUsu = new DB_js_1.ProcesandoDatosUsu();
                    //Enviando los datos por medio de los métodos set
                    objExportDatosUsu.enviarDetalle = String(detalleU);
                    objExportDatosUsu.enviarOption = option.value;
                    objExportDatosUsu.enviarValor = Number(valor.value);
                    //llamando al método guardar del obj ProcesandoDatosUsu
                    objExportDatosUsu.guardarDatos();
                    //Se limpian los campos de texto
                    detalle.value = '';
                    option.value = '';
                    valor.value = '';
                }
                //Método que muestra los datos enviados del LocalStorage
                mostrarDatosUsu(datosRecibidos) {
                    //Limpia la tabla para mostrar los datos
                    tablaGastosPersonales.innerHTML = '';
                    //Se declara el atributo de la fila
                    let filaTabla;
                    //Controla las posiciones de las columnas, por cada fila creada
                    let iteration = 1;
                    //N° de cada fila
                    let numFila = 0;
                    //Recorre el arreglo con los datos enviados del LocalStorage
                    for (let i = 0; i < datosRecibidos.length; i++) {
                        //Evalua si la fila ya tiene completas sus columnas para crear una nueva fila
                        if (iteration == 1) {
                            filaTabla = tablaGastosPersonales.insertRow(); //crea una nueva fila
                            //Agrega el N° idicativo a cada fila
                            let numFilaTabla = filaTabla.insertCell(0);
                            numFilaTabla.innerHTML = ++numFila;
                        }
                        //Agrega columnas a la fila de la tabla, de forma dinámica
                        switch (iteration) {
                            case 1:
                                let colDetalle = filaTabla.insertCell(1);
                                colDetalle.innerHTML = datosRecibidos[i];
                                break;
                            case 2:
                                let colTipo = filaTabla.insertCell(2);
                                colTipo.innerHTML = datosRecibidos[i];
                                break;
                            default:
                                let colValor = filaTabla.insertCell(3);
                                colValor.innerHTML = datosRecibidos[i];
                                iteration = 0;
                                break;
                        }
                        iteration++;
                    }
                }
                //Método que muestra los ingresos, gastos e ingresos netos
                totalIngresosNetos(ingresosRecibidos, gastosRecibidos) {
                    //Limpiando la tabla para mostrar los valores
                    tablaTotalIngresos.innerHTML = '';
                    //Creando la fila
                    let filaEstatica = tablaTotalIngresos.insertRow(0);
                    //creando las columnas
                    let totalIngresos = filaEstatica.insertCell(0);
                    let totalGastos = filaEstatica.insertCell(1);
                    let totalIngresosNetos = filaEstatica.insertCell(2);
                    //Acumuladores
                    let sumaIngresos = 0;
                    let sumaGastos = 0;
                    let resultNeto = 0;
                    //Recorriendo el array de los Ingresos
                    for (let i = 0; i < ingresosRecibidos.length; i++) {
                        //Sumando todos los ingresos
                        sumaIngresos += ingresosRecibidos[i];
                    }
                    //Recorriendo el array de los Gastos
                    for (let i = 0; i < gastosRecibidos.length; i++) {
                        //Sumando todos los gastos
                        sumaGastos += gastosRecibidos[i];
                    }
                    //Restando la suma de los gastos al de los ingresos
                    resultNeto = sumaIngresos - sumaGastos;
                    //Mostrando los resultados
                    totalIngresos.innerHTML = '$' + String(sumaIngresos);
                    totalGastos.innerHTML = "$" + String(sumaGastos);
                    totalIngresosNetos.innerHTML = `$ ${String(resultNeto)}`;
                }
            };
            exports_1("RecibirDatos", RecibirDatos);
            //Instanciando el obj de la clase
            objRecibirDatos = new RecibirDatos();
            //Iniciando App
            objRecibirDatos.startApp();
        }
    };
});
