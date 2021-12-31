//Importando Módulos
import { RecibirDatos } from './recibirDatos.js';

export class ProcesandoDatosUsu {
    //Atributos
    private detalleUsu: String | any;
    private optionUsu: string | any;
    private valorUsu: number | any;
    private valorIngresoUsu: number[] | any = [];//Atributos tipo array que almacenan los valores como tipo number
    private valorGastoUsu: number[] | any = [];

    //Constructor
    constructor(detalleP?: string, optionP?: string, valorP?: number) {
        this.detalleUsu = detalleP;
        this.optionUsu = optionP;
        this.valorUsu = valorP;
    }

    //Métodos Get y Set
    public get obtenerDetalle(): string {
        return this.detalleUsu;
    }

    public set enviarDetalle(detalleP: string) {
        this.detalleUsu = detalleP;
    }

    public get obtenerOption(): string {
        return this.optionUsu;
    }

    public set enviarOption(optionP: string) {
        this.optionUsu = optionP;
    }

    public get obtenerValor(): number {
        return this.valorUsu;
    }

    public set enviarValor(valorP: number) {
        this.valorUsu = valorP;
    }

    //Métodos Set y Get de los valores(Ingresos ó Gastos)
    public get obtenerValorIngreso(): number[] {
        return this.valorIngresoUsu;
    }

    public set enviarValorIngreso(valorIngresoUsuP: number) {
        this.valorIngresoUsu.push(valorIngresoUsuP);
    }
    
    public get obtenerValorGasto(): number[] {
        return this.valorGastoUsu;
    }

    public set enviarValorGasto(valorGastoUsuP: number) {
        this.valorGastoUsu.push(valorGastoUsuP);
    }

    //Método que almacena los datos en LocalStorage
    public guardarDatos(): void {
        
        let datosUsu: string[] | any = [];//Se declara el arreglo datosUsu

        //Se almacenan los datos en el arreglo
        datosUsu.push(this.obtenerDetalle);

        //Evalua si es un Ingreso ó Gasto
        switch (this.obtenerOption) {
            case '1':
                datosUsu.push('Ingreso');        
                break;

            default:
                datosUsu.push('Gasto');
                break;
        }

        datosUsu.push(this.obtenerValor);

        //Guardando datos en localStorage
        localStorage.setItem(`datosUsu${this.obtenerDetalle}`, datosUsu);

        //Instancia del obj de la clase RecibiendoDatos
        let datosRecibidos = new RecibirDatos();

        //Enviando los datos del LocalStorage a la tabla # 1
        datosRecibidos.mostrarDatosUsu(this.traerDatos());

        //Enviando los arreglos de ingresos y gastos del LocalStorage a la tabla # 2
        datosRecibidos.totalIngresosNetos(this.obtenerValorIngreso, this.obtenerValorGasto);

    }

    //Método que trae los datos del LocalStorage
    public traerDatos(): string[] {
        
        let datosUsuLocalStorage: string[] = [];//Creando el array para separar los datos del LocalStorage

        let envioDatosUsu: string[] = [];//Creando el array que almacenará los datos separados del LocalStorage

        //Recorriendo el LocalStorage
        for (let i: number = 0; i < localStorage.length; i++) {

            //Trayendo datos del localStorage
            //Separando los datos por cada posición del LocalStorage
            datosUsuLocalStorage = JSON.stringify(localStorage.getItem(String(localStorage.key(i)))).split(',');

            //Agregando los datos separados al array envioDatosUsu
            envioDatosUsu.push(datosUsuLocalStorage[0]);
            envioDatosUsu.push(datosUsuLocalStorage[1]);
            envioDatosUsu.push(datosUsuLocalStorage[2]);

            //Agregando los valores al tipo de array correspondinete(Ingresos o Gastos)
            this.convirtiendoTipoDatoValor(datosUsuLocalStorage[1], parseInt(datosUsuLocalStorage[2]));

        }
        
        return envioDatosUsu;
        
    }

    //Método que convierte el tipo de dato del valor del LocalStorage
    public convirtiendoTipoDatoValor(positionUnoP: string, positionDosP: number): void {

        //Evalua si el tipo es Ingreso ó Gasto
        switch (positionUnoP) {
            case 'Ingreso':
                this.enviarValorIngreso = positionDosP;//Enviando ingresos por medio del método Set
                break;
        
            default:
                this.enviarValorGasto = positionDosP;//Enviando gastos por medio del método Set
                break;
        }
        
    }

}