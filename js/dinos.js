document.addEventListener("DOMContentLoaded", () => {

    const secciones = document.querySelectorAll(".seccion-dinosaurios");
    const cantidadPorBloque = 9;

    secciones.forEach((seccion) => {

        const tarjetas = seccion.querySelectorAll(".dino-card");
        const botonVerMas = seccion.querySelector(".boton-ver-mas");
        const contenedorBoton = seccion.querySelector(".ver-mas-contenedor");

        let cantidadVisible = cantidadPorBloque;

        function actualizarTarjetas() {

            tarjetas.forEach((tarjeta, indice) => {

                if (indice < cantidadVisible) {
                    tarjeta.style.display = "";
                } else {
                    tarjeta.style.display = "none";
                }

            });

            if (cantidadVisible >= tarjetas.length) {

                if (contenedorBoton) {
                    contenedorBoton.style.display = "none";
                }

            } else {

                if (contenedorBoton) {
                    contenedorBoton.style.display = "flex";
                }

            }

            if (typeof AOS !== "undefined") {
                AOS.refreshHard();
            }
        }

        if (botonVerMas) {

            botonVerMas.addEventListener("click", () => {

                cantidadVisible += cantidadPorBloque;

                actualizarTarjetas();

            });

        }

        actualizarTarjetas();

    });

});