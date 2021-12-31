//Importando Módulos
import { ProcesandoDatosUsu } from './DB.js';

/*Seleccionando los campos de texto*/
const detalle = document.getElementById('uno') as HTMLInputElement;//Utilizando Aserción de tipo
const option = document.getElementById('dos') as HTMLSelectElement;
const valor = document.getElementById('tres') as HTMLInputElement;

/*Seleccionando la tabla de visualización de datos*/
const tablaGastosPersonales = document.querySelector('#get-table tbody') as HTMLTableElement;

/*Seleccionando la tabla de visualización del total de ingresos*/
const tablaTotalIngresos = document.querySelector('#get-table-2 tbody') as HTMLTableElement;

//Btn
const btn = document.getElementById('btn-submit') as HTMLButtonElement;

export class RecibirDatos {

    //Método que inicia el evento de captura de datos
    public startApp(): void {

        //Instanciando el obj de la clase ProcesandoDatosUsu
        const objExportDatosUsu = new ProcesandoDatosUsu();

        //Muestra los datos alamacenados al iniciar la app
        this.mostrarDatosUsu(objExportDatosUsu.traerDatos());

        //Muestra el total de ingresos y gastos
        this.totalIngresosNetos(objExportDatosUsu.obtenerValorIngreso, objExportDatosUsu.obtenerValorGasto);

        //Registrando el nuevo detalle, por medio del evento 'Click' del btn
        btn.addEventListener('click', this.recibiendoDatos);
    }

    //Método que recibe los datos ingresados por el usuario
    public recibiendoDatos(): void {

        //Eliminando los espacios del string Detalle
        let noEspacios = new RegExp(' ', 'g');//Hace uso de una expresión regular
        let detalleU: String = detalle.value.replace(noEspacios, '');

        //Instanciando el obj de la clase ProcesandoDatosUsu
        const objExportDatosUsu = new ProcesandoDatosUsu();

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
    public mostrarDatosUsu(datosRecibidos: string[]): void {

        //Limpia la tabla para mostrar los datos
        tablaGastosPersonales.innerHTML = '';

        //Se declara el atributo de la fila
        let filaTabla: any;

        //Controla las posiciones de las columnas, por cada fila creada
        let iteration: Number | any = 1;

        //N° de cada fila
        let numFila: number = 0;

        //Recorre el arreglo con los datos enviados del LocalStorage
        for (let i = 0; i < datosRecibidos.length; i++) {

            //Evalua si la fila ya tiene completas sus columnas para crear una nueva fila
            if (iteration == 1) {
                filaTabla = tablaGastosPersonales.insertRow();//crea una nueva fila

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
    public totalIngresosNetos(ingresosRecibidos: number[], gastosRecibidos: number[]): void {

        //Limpiando la tabla para mostrar los valores
        tablaTotalIngresos.innerHTML = '';

        //Creando la fila
        let filaEstatica = tablaTotalIngresos.insertRow(0);

        //creando las columnas
        let totalIngresos = filaEstatica.insertCell(0);
        let totalGastos = filaEstatica.insertCell(1);
        let totalIngresosNetos = filaEstatica.insertCell(2);

        //Acumuladores
        let sumaIngresos: number = 0;
        let sumaGastos: number = 0;
        let resultNeto: number = 0;

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

}

//Instanciando el obj de la clase
const objRecibirDatos = new RecibirDatos();

//Iniciando App
objRecibirDatos.startApp();