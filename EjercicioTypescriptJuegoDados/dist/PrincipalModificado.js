import { JuegoDados } from "./JuegoDados.js";
class PrincipalModificado {
    constructor() {
        this.juego = null;
        const iniciarJuegoBtn = document.getElementById("iniciarJuego");
        iniciarJuegoBtn.addEventListener("click", () => this.iniciarJuego());
        // Agregar evento al botón de reiniciar
        const reiniciarBtn = document.getElementById("reiniciarJuego");
        reiniciarBtn.addEventListener("click", () => this.reiniciarJuego());
    }
    reiniciarJuego() {
        // Limpiar la tabla
        document.getElementById("cuerpoTabla").innerHTML = "";
        // Limpiar el resultado
        document.getElementById("resultado").textContent = "";
        // Ocultar el botón de reiniciar
        document.getElementById("reiniciarJuego").style.display = "none";
        // Mostrar el formulario inicial
        document.getElementById("formulario").style.display = "block";
        // Ocultar el área de juego
        document.getElementById("juego").style.display = "none";
        // Limpiar los inputs
        document.getElementById("jugador1").value = "";
        document.getElementById("jugador2").value = "";
    }
    iniciarJuego() {
        // Obtener los nombres de los jugadores
        const nombreJugador1 = document.getElementById("jugador1").value || "Jugador 1";
        const nombreJugador2 = document.getElementById("jugador2").value || "Jugador 2";
        // Crear una instancia del juego
        this.juego = new JuegoDados(nombreJugador1, nombreJugador2);
        // Ocultar el formulario y mostrar el área del juego
        document.getElementById("formulario").style.display = "none";
        document.getElementById("juego").style.display = "block";
        // Mostrar los nombres de los jugadores en la tabla
        document.getElementById("nombreJugador1").textContent = nombreJugador1;
        document.getElementById("nombreJugador2").textContent = nombreJugador2;
        // Iniciar el juego y actualizar la interfaz
        this.realizarTiradas();
    }
    realizarTiradas() {
        if (!this.juego)
            return;
        const intervalo = setInterval(() => {
            // Incrementar jugada y realizar tirada
            this.juego.cantidadJugadas++;
            this.juego.iniciarJugada();
            // Mostrar los resultados en la tabla
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${this.juego.cantidadJugadas}</td>
                <td>${this.juego.marcadorJugador1}</td>
                <td>${this.juego.marcadorJugador2}</td>
            `;
            document.getElementById("cuerpoTabla").appendChild(fila);
            // Verificar si hay un vencedor
            if (this.juego.marcadorJugador1 === 5 || this.juego.marcadorJugador2 === 5) {
                clearInterval(intervalo);
                const vencedor = this.juego.determinarVencedor();
                const resultado = vencedor ? `El vencedor es: ${vencedor.nombre}` : "Empate. No hay un vencedor.";
                document.getElementById("resultado").textContent = resultado;
                // Mostrar el botón de reiniciar
                document.getElementById("reiniciarJuego").style.display = "block";
            }
        }, 1000);
    }
}
// Iniciar la aplicación
new PrincipalModificado();
