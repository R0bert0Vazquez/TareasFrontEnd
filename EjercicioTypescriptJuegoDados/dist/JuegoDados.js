import { Dado } from "./Dado.js";
import { Jugador } from "./Jugador.js";
import { Jugada } from "./Jugada.js";
export class JuegoDados {
    /**
     * Constructor de la clase JuegoDados.
     * @param nombreJugador1 Nombre del Jugador 1
     * @param nombreJugador2 Nombre del Jugador 2
     */
    constructor(nombreJugador1, nombreJugador2) {
        this.cantidadJugadas = 0;
        this.marcadorJugador1 = 0;
        this.marcadorJugador2 = 0;
        this.vencedor = null; // Vencedor del juego, inicializado en null
        this.bandJugador = false; // Bandera para el turno del jugador (true = Jugador1, false = Jugador2)
        this.jugador1 = new Jugador(nombreJugador1);
        this.jugador2 = new Jugador(nombreJugador2);
        this.dado1 = new Dado(0);
        this.dado2 = new Dado(0);
    }
    /**
     * Método para elegir aleatoriamente al primer jugador que lanzará los dados.
     */
    elegirPrimerLanzador() {
        // Generar un número aleatorio entre 0 y 1
        if (Math.floor(Math.random() * 2) === 0) {
            this.bandJugador = true;
        }
        else {
            this.bandJugador = false;
        }
    }
    /**
     * Método para iniciar una jugada.
     * Llama al método iniciarJugada de la clase Jugada y actualiza los puntajes.
     */
    iniciarJugada() {
        let jugadaActual = new Jugada();
        if (this.bandJugador) {
            jugadaActual.iniciarJugada(this.jugador1, this.jugador2, this.dado1, this.dado2); // Jugador 1 comienza
        }
        else {
            jugadaActual.iniciarJugada(this.jugador2, this.jugador1, this.dado1, this.dado2); // Jugador 2 comienza
        }
        this.marcadorJugador1 += this.jugador1.puntoGanado;
        this.marcadorJugador2 += this.jugador2.puntoGanado;
    }
    iniciarJuego() {
        // Crear
        this.dado1 = new Dado(0);
        this.dado2 = new Dado(0);
        this.cantidadJugadas = 0;
        this.marcadorJugador1 = 0;
        this.marcadorJugador2 = 0;
        this.elegirPrimerLanzador();
        // Ciclo infinito de juego
        do {
            this.iniciarJugada();
            this.cantidadJugadas++;
            console.log("Num. jugada: " + this.cantidadJugadas
                + " puntaje jugador 1 = " + this.marcadorJugador1
                + " puntaje jugador 2 = " + this.marcadorJugador2);
        } while (this.marcadorJugador1 !== 5 && this.marcadorJugador2 !== 5); // Continuar hasta que un jugador alcance 5 puntos
        // Determinar el vencedor
        this.vencedor = this.determinarVencedor();
    }
    /**
     * @method determinarVencedor Método para determinar el vencedor del juego.
     * @returns El jugador que ganó o null en caso de empate.
     */
    determinarVencedor() {
        // Caso empate
        if (this.marcadorJugador1 === 5 && this.marcadorJugador2 === 5) {
            return null;
        }
        // Ganó el Jugador 1
        if (this.marcadorJugador1 === 5) {
            return this.jugador1;
        }
        // Ganó el Jugador 2
        else if (this.marcadorJugador2 === 5) {
            return this.jugador2;
        }
        return null;
    }
}
