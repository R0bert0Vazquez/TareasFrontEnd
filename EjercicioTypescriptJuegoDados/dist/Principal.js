import { JuegoDados } from "./JuegoDados";
export class Principal {
    static main() {
        // Pedir los nombres de los jugadores 
        const nombreJugador1 = prompt("Ingresa el nombre del Jugador 1:") || "Jugador 1";
        const nombreJugador2 = prompt("Ingresa el nombre del Jugador 2:") || "Jugador 2";
        // Crear una instancia del juego con los nombres de los jugadores
        let juego = new JuegoDados(nombreJugador1, nombreJugador2);
        // Iniciar el juego
        juego.iniciarJuego();
        // Determinar el vencedor
        if (juego.vencedor === null) {
            console.log("Empate. No hay un vencedor.");
        }
        else {
            console.log("El vencedor es: " + juego.vencedor.nombre);
        }
    }
}
// Llamar al método main para iniciar el juego
Principal.main();
