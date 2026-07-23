const botonesSiguiente = document.querySelectorAll(
    "[data-carrusel-siguiente]"
);

const botonesAnterior = document.querySelectorAll(
    "[data-carrusel-anterior]"
);


function obtenerDistanciaCarrusel(carrusel) {

    const tarjeta = carrusel.querySelector(
        ".inicio-card"
    );

    if (!tarjeta) {
        return 300;
    }

    const estilosCarrusel = window.getComputedStyle(
        carrusel
    );

    const espacio = parseFloat(
        estilosCarrusel.columnGap
    ) || 0;

    return tarjeta.offsetWidth + espacio;

}


botonesSiguiente.forEach(boton => {

    boton.addEventListener("click", () => {

        const idCarrusel =
            boton.dataset.carruselSiguiente;

        const carrusel =
            document.getElementById(idCarrusel);

        if (!carrusel) {
            return;
        }

        carrusel.scrollBy({
            left: obtenerDistanciaCarrusel(carrusel),
            behavior: "smooth"
        });

    });

});


botonesAnterior.forEach(boton => {

    boton.addEventListener("click", () => {

        const idCarrusel =
            boton.dataset.carruselAnterior;

        const carrusel =
            document.getElementById(idCarrusel);

        if (!carrusel) {
            return;
        }

        carrusel.scrollBy({
            left: -obtenerDistanciaCarrusel(carrusel),
            behavior: "smooth"
        });

    });

});