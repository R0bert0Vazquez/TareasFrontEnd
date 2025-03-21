import { Dado } from "./Dado"
export class Jugador {
    /**
     * @constructor Usa parámetros de constructor con modificadores de acceso,
     * Esta característica permite declarar y inicializar propiedades directamente 
     * en el constructor
     * @param nombre Guarda el nombre del jugador (Parámetro del constructor con modificador de acceso)
     * @param puntoGanado  Guarda los puntos del jugador (Parámetro del constructor con modificador de acceso)
     */
    constructor(public nombre: string, public puntoGanado: number = 0) {
        // no statements require
    }

    /** 
     *
     * @param dado1 Primer dado a lanzar
     * @param dado2 Segundo dado a lanzar
     * @return Devuelve la suma de los puntos obtenidos en ambos dados
     */
    lanzaDados(dado1: Dado, dado2: Dado): number {
        dado1.lanzar();
        dado2.lanzar();

        //retornar los puntos que cayeron el los dados
        return dado1.puntos + dado2.puntos;
    }
}