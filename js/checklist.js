

const listaCarrito = document.querySelector(".productoCarrito");
const totalPrecio = document.querySelector("#totalCarritonav");
const totalPrecio2 = document.querySelector("#totalCarrito");
const subtotalPrecio = document.querySelector("#subtotalCarrito");
const cantidadCarrito = document.querySelector("#cantidadCarrido")

function calcularTotalCarrito() {
    let total = carrito.reduce((subtotal, carrito) => subtotal + carrito.precio, 0)
    return total
}
function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) ?? [];
}

let carrito = recuperarCarrito();

function armarCarritoHTML(producto) {
    return `
      <div class="productoCarrito">
        <img src="${producto.img}" class="w-100 foto">
        <div class="nombre">
          <h6 class="font-cormorant mb-0">${producto.nombre}</h6>
        </div>
        <p class="price d-none d-md-block">$${producto.precio}</p>
        <button data-id="${producto.id_producto}" class="btnErase">X</button>
      </div>
    `;
}
function eliminarDelCarrito(prodAEliminar) {
    let productoAEliminar = prodAEliminar;
    const indice = carrito.findIndex((producto) => producto.id_producto === parseInt(productoAEliminar));
    indice != -1 ? (
        carrito.splice(indice, 1),
        localStorage.setItem("miCarrito", JSON.stringify(carrito))
    ) : null;
    renderizarCarrito();
}


function renderizarCarrito() {
    listaCarrito.innerHTML = ""
    carrito.forEach((producto) => {
        listaCarrito.innerHTML += armarCarritoHTML(producto);
    });

    totalPrecio.textContent = calcularTotalCarrito();
    subtotalPrecio.textContent = calcularTotalCarrito();
    totalPrecio2.textContent = "$ " + parseInt(calcularTotalCarrito()); 
    cantidadCarrito.textContent = carrito.length
}

document.addEventListener("click", (event) => {

    event.target.classList.contains("btnErase") ? eliminarDelCarrito(event.target.getAttribute("data-id")) : null;

});

// Renderiza el carrito al cargar la página
renderizarCarrito();

function calcularCantidadCarrito() {
    if (carrito.length > 0) {
        cantidadCarrito.forEach((elemento) => {
            if (elemento) { 
                elemento.textContent = carrito.length;
            }
            const totalCarrito = document.querySelector("#totalCarrito");
            totalCarrito ? totalPrecio2.textContent = "$ " + parseInt(calcularTotalCarrito()) : null;

        });
    } else {
       //carrito vacio
    }
}

const finalizarCompra = document.querySelector("#finalizarCompra");
finalizarCompra.addEventListener("click", () => {
    
    carrito.length > 0 ? window.location.href = "compra.html" : null;
});

