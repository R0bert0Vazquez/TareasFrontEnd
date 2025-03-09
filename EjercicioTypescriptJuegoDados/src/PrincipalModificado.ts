import { JuegoDados } from "./JuegoDados";

class PrincipalModificado {
    private juego: JuegoDados | null = null;

    constructor() {
        const iniciarJuegoBtn = document.getElementById("iniciarJuego") as HTMLButtonElement;
        iniciarJuegoBtn.addEventListener("click", () => this.iniciarJuego());

        // Agregar evento al botón de reiniciar
        const reiniciarBtn = document.getElementById("reiniciarJuego") as HTMLButtonElement;
        reiniciarBtn.addEventListener("click", () => this.reiniciarJuego());
    }

    private reiniciarJuego() {
        // Limpiar la tabla
        (document.getElementById("cuerpoTabla") as HTMLTableSectionElement).innerHTML = "";
        // Limpiar el resultado
        (document.getElementById("resultado") as HTMLParagraphElement).textContent = "";
        // Ocultar el botón de reiniciar
        (document.getElementById("reiniciarJuego") as HTMLButtonElement).style.display = "none";
        // Mostrar el formulario inicial
        (document.getElementById("formulario") as HTMLDivElement).style.display = "block";
        // Ocultar el área de juego
        (document.getElementById("juego") as HTMLDivElement).style.display = "none";
        // Limpiar los inputs
        (document.getElementById("jugador1") as HTMLInputElement).value = "";
        (document.getElementById("jugador2") as HTMLInputElement).value = "";
    }

    private iniciarJuego() {
        // Obtener los nombres de los jugadores
        const nombreJugador1 = (document.getElementById("jugador1") as HTMLInputElement).value || "Jugador 1";
        const nombreJugador2 = (document.getElementById("jugador2") as HTMLInputElement).value || "Jugador 2";

        // Crear una instancia del juego
        this.juego = new JuegoDados(nombreJugador1, nombreJugador2);

        // Ocultar el formulario y mostrar el área del juego
        (document.getElementById("formulario") as HTMLDivElement).style.display = "none";
        (document.getElementById("juego") as HTMLDivElement).style.display = "block";

        // Mostrar los nombres de los jugadores en la tabla
        (document.getElementById("nombreJugador1") as HTMLTableCellElement).textContent = nombreJugador1;
        (document.getElementById("nombreJugador2") as HTMLTableCellElement).textContent = nombreJugador2;

        // Iniciar el juego y actualizar la interfaz
        this.realizarTiradas();
    }

    private realizarTiradas() {
        if (!this.juego) return;

        const intervalo = setInterval(() => {
            // Incrementar jugada y realizar tirada
            this.juego!.cantidadJugadas++;
            this.juego!.iniciarJugada();

            // Mostrar los resultados en la tabla
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${this.juego!.cantidadJugadas}</td>
                <td>${this.juego!.marcadorJugador1}</td>
                <td>${this.juego!.marcadorJugador2}</td>
            `;
            (document.getElementById("cuerpoTabla") as HTMLTableSectionElement).appendChild(fila);

            // Verificar si hay un vencedor
            if (this.juego!.marcadorJugador1 === 5 || this.juego!.marcadorJugador2 === 5) {
                clearInterval(intervalo);
                const vencedor = this.juego!.determinarVencedor();
                const resultado = vencedor ? `El vencedor es: ${vencedor.nombre}` : "Empate. No hay un vencedor.";
                (document.getElementById("resultado") as HTMLParagraphElement).textContent = resultado;
                // Mostrar el botón de reiniciar
                (document.getElementById("reiniciarJuego") as HTMLButtonElement).style.display = "block";
            }
        }, 1000);
    }
}

// Iniciar la aplicación
new PrincipalModificado();