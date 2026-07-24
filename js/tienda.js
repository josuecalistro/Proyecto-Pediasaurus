const carrito = [];

const botonesAgregar = document.querySelectorAll(
    ".producto-card__boton"
);

const carritoProductos = document.getElementById(
    "carrito-productos"
);

const contadorCarrito = document.getElementById(
    "contador-carrito"
);

const cantidadProductos = document.getElementById(
    "cantidad-productos"
);

const carritoTotal = document.getElementById(
    "carrito-total"
);

const botonVaciar = document.getElementById(
    "vaciar-carrito"
);

const botonFinalizar = document.getElementById(
    "finalizar-compra"
);


function formatearPrecio(precio) {

    return new Intl.NumberFormat(
        "es-AR",
        {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0
        }
    ).format(precio);

}


function agregarProducto(evento) {

    const tarjeta = evento.target.closest(
        ".producto-card"
    );

    const id = tarjeta.dataset.id;

    const nombre = tarjeta.dataset.nombre;

    const precio = Number(
        tarjeta.dataset.precio
    );

    const productoExistente = carrito.find(
        producto => producto.id === id
    );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push(
            {
                id: id,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            }
        );

    }

    actualizarCarrito();

}


function aumentarCantidad(id) {

    const producto = carrito.find(
        producto => producto.id === id
    );

    if (producto) {

        producto.cantidad++;

    }

    actualizarCarrito();

}


function disminuirCantidad(id) {

    const producto = carrito.find(
        producto => producto.id === id
    );

    if (!producto) {

        return;

    }

    producto.cantidad--;


    if (producto.cantidad <= 0) {

        eliminarProducto(id);

        return;

    }

    actualizarCarrito();

}


function eliminarProducto(id) {

    const posicion = carrito.findIndex(
        producto => producto.id === id
    );

    if (posicion !== -1) {

        carrito.splice(posicion, 1);

    }

    actualizarCarrito();

}


function actualizarCarrito() {

    carritoProductos.innerHTML = "";


    if (carrito.length === 0) {

        carritoProductos.innerHTML = `
            <p class="carrito__vacio">
                El carrito está vacío.
            </p>
        `;

    } else {

        carrito.forEach(producto => {

            const elemento = document.createElement(
                "article"
            );

            elemento.classList.add(
                "carrito-producto"
            );

            elemento.innerHTML = `
                <div class="carrito-producto__info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <span>
                        ${formatearPrecio(producto.precio)}
                    </span>

                </div>

                <div class="carrito-producto__acciones">

                    <button
                        type="button"
                        aria-label="Disminuir cantidad"
                        data-accion="disminuir"
                        data-id="${producto.id}"
                    >
                        −
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        type="button"
                        aria-label="Aumentar cantidad"
                        data-accion="aumentar"
                        data-id="${producto.id}"
                    >
                        +
                    </button>

                    <button
                        class="carrito-producto__eliminar"
                        type="button"
                        data-accion="eliminar"
                        data-id="${producto.id}"
                    >
                        Eliminar
                    </button>

                </div>
            `;

            carritoProductos.appendChild(
                elemento
            );

        });

    }


    const cantidadTotal = carrito.reduce(
        (total, producto) => {
            return total + producto.cantidad;
        },
        0
    );


    const precioTotal = carrito.reduce(
        (total, producto) => {
            return total
                + producto.precio
                * producto.cantidad;
        },
        0
    );


    contadorCarrito.textContent =
        cantidadTotal;

    cantidadProductos.textContent =
        cantidadTotal;

    carritoTotal.textContent =
        formatearPrecio(precioTotal);

}


botonesAgregar.forEach(boton => {

    boton.addEventListener(
        "click",
        agregarProducto
    );

});


carritoProductos.addEventListener(
    "click",
    evento => {

        const boton = evento.target.closest(
            "button"
        );

        if (!boton) {

            return;

        }

        const id = boton.dataset.id;

        const accion = boton.dataset.accion;


        if (accion === "aumentar") {

            aumentarCantidad(id);

        }


        if (accion === "disminuir") {

            disminuirCantidad(id);

        }


        if (accion === "eliminar") {

            eliminarProducto(id);

        }

    }
);


botonVaciar.addEventListener("click", () => {

    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }

    carrito.length = 0;
    actualizarCarrito();

    const alerta = document.getElementById("alerta-vaciado");

    alerta.classList.remove("d-none");

    setTimeout(() => {
        alerta.classList.add("show");
    }, 10);

    setTimeout(() => {

        alerta.classList.remove("show");

        setTimeout(() => {
            alerta.classList.add("d-none");
        }, 150);

    }, 3000);

});

botonFinalizar.addEventListener("click", () => {

    if (carrito.length === 0) {
        alert("Primero agregá productos al carrito.");
        return;
    }

    const alertaCompra = document.getElementById("alerta-compra");

    alertaCompra.classList.remove("d-none");

    setTimeout(() => {
        alertaCompra.classList.add("show");
    }, 10);

    carrito.length = 0;
    actualizarCarrito();

    setTimeout(() => {
        alertaCompra.classList.remove("show");

        setTimeout(() => {
            alertaCompra.classList.add("d-none");
        }, 150);

    }, 3000);

});