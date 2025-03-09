export class Dado {
    /**
     * @constructor Usa parámetros de constructor con modificadores de acceso,
     * Esta característica permite declarar y inicializar propiedades directamente 
     * en el constructor
     * @param puntos Guarda los puntos del dado que salen aleatoriamente 
     * (Parámetro del constructor con modificador de acceso)
     */
    constructor(public puntos: number) {
        // no statements required
    }

    /**
     * @method lanzar método simula el lanzamiento de un dado, mediante la función random
     * y asignando el valor al atributo puntos
     */
    lanzar() {
        //Simular el lanzamiento
        this.puntos = Math.floor(Math.random() * 6) + 1;
    }
}