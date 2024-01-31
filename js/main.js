// Array de Productos
const productos = [
    { id_producto: 1, nombre: 'Pedigree Adulto x 21 Kg', precio: 12550, id_cat: 1, id_marca: 1, img: "img/prod1.jpg" },
    { id_producto: 2, nombre: 'Bolso de Viaje para Mascotas', precio: 8990, id_cat: 2, id_marca: 2, img: "img/prod5.jpg" },
    { id_producto: 3, nombre: 'Collar Be Dog', precio: 3186, id_cat: 2, id_marca: 3, img: "img/prod6.jpg" },
    { id_producto: 4, nombre: 'Cat Chow Adultos', precio: 4578, id_cat: 1, id_marca: 4, img: "img/prod7.jpg" },
];
// Array de Inventario


const inventario = [
    { id_producto: 1, stock: 10 },
    { id_producto: 2, stock: 0 },
    { id_producto: 3, stock: 10 },
    { id_producto: 4, stock: 10 },
];

// // Array de Categorias
const categorias = [
    { id_cat: 1, nombre: 'Alimentos' },
    { id_cat: 2, nombre: 'Accesorios' },
];

// // Array de Carrito
function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) ?? [];
}

let carrito = recuperarCarrito();

const columna = document.querySelector(".columnaProductos")
function retornarProducto(producto) {
    return `   <div class="producto" id="producto-${producto.id_producto}">
        <a href="#" class="text-decoration-none">
        <img src="img/sinstock.png" style="width: 50px;" class="oculto">
            <img src="${producto.img}" class="w-100 foto" fetchpriority="high">
                <h6 class="font-cormorant mt-3 mb-0">${producto.nombre}</h6>
                <p class="price mt-2 mb-2">$${producto.precio}</p>
        </a>
        <a href="#" id="${producto.id_producto}" class="btn text-white py-2 px-4 mt-0">COMPRAR</a>
    </div>`

}
function calcularCantidadCarrito() {
    if (carrito.length > 0) {
        cantidadCarrito.forEach((elemento) => {
            if (elemento) {
                elemento.textContent = carrito.length;
            }
            const totalCarrito = document.querySelector("#totalCarrito");
            if (totalCarrito) {  // Verifica si el elemento no es nulo antes de intentar acceder a 'textContent'
                totalCarrito.textContent = "$ " + parseInt(calcularTotalCarrito());
            }
        });
    } else {
        //carrito vacio
    }
}
//Funcion consultar el inventario de los productos del shop
function consultarInventario(id) {
    const inventarioProducto = inventario.find(item => item.id_producto === id);
    return inventarioProducto.stock;
}

function cargarProducto(array) {
    if (array.length > 0) {
        columna.innerHTML = ""
        array.forEach((producto) => {
            columna.innerHTML += retornarProducto(producto);
        });

        // Agrega el event listener después de cargar los productos
        columna.addEventListener("click", (event) => {
            const botonComprar = event.target.closest("a.btn.text-white.py-2.px-4.mt-0");
            if (botonComprar) {
                const productoSeleccionado = array.find((producto) => producto.id_producto === parseInt(botonComprar.id));

                if (productoSeleccionado) {
                    let stock = consultarInventario(productoSeleccionado.id_producto)
                    if (stock > 0) {
                        carrito.push(productoSeleccionado);
                        localStorage.setItem("miCarrito", JSON.stringify(carrito))
                        calcularCantidadCarrito();
                    }
                    else {
                        const productoOculto = document.querySelector(`#producto-${productoSeleccionado.id_producto} .oculto`);
                        if (productoOculto) {
                            productoOculto.classList.remove('oculto');
                        }
                    }
                } else {

                }
            }
        });
    } else {
        // Manejar el caso cuando no hay productos
    }
}
cargarProducto(productos);
function calcularTotalCarrito() {
    let total = carrito.reduce((subtotal, carrito) => subtotal + carrito.precio, 0)
    return total
}
const imagenesCarrito = document.querySelectorAll("button.btn.cart");
imagenesCarrito.forEach((imagenCarrito) => {
    imagenCarrito.addEventListener("mousemove", () => {
        carrito.length > 0 ? imagenCarrito.title = carrito.length + " productos en carrito" : imagenCarrito.title = "Carrito Vacío";
    });
    imagenCarrito.addEventListener("click", () => {

        carrito.length > 0 ? window.location.href = "carrito.html" : imagenCarrito.title = "Carrito Vacío"
    });
});
const filtroCatAlimentos = document.querySelector("#cat_alimentos");
const filtroCatAccesorios = document.querySelector("#cat_accesorios");
filtroCatAlimentos.addEventListener("click", () => {
    productos.length > 0 ? (
        columna.innerHTML = '',
        productos.forEach((producto) => {
            producto.id_cat === 1 ? columna.innerHTML += retornarProducto(producto) : null;
        })
    ) : null;
});
filtroCatAccesorios.addEventListener("click", () => {
    productos.length > 0 ? (
        columna.innerHTML = '',
        productos.forEach((producto) => {
            producto.id_cat === 2 ? columna.innerHTML += retornarProducto(producto) : null;
        })
    ) : null;
});
const cantidadCarrito = document.querySelectorAll(".countItem")
const botonesComprar = document.querySelectorAll("a.btn.text-white.py-2.px-4.mt-0");
const claseListaProductos = document.querySelector("#lista-lista");
const listarProductos = document.querySelector("#idClassProductos");

claseListaProductos.addEventListener("click", () => {
    event.preventDefault();
    listarProductos.classList.toggle("lista");
});
function ordenarProductosPorPrecioMenor() {
    const productosOrdenados = productos.slice();
    productosOrdenados.sort((a, b) => a.precio - b.precio);
    return productosOrdenados
}
function ordenarProductosPorPrecioMayor() {
    const productosOrdenados = productos.slice()
    productosOrdenados.sort((a, b) => b.precio - a.precio);
    return productosOrdenados
}
const selectorOrden = document.querySelector("#selectorOrden")
selectorOrden.addEventListener("click", () => {
    const ordenSeleccionado = selectorOrden.value
    if (ordenSeleccionado === '1') {
        const arrayordenado = ordenarProductosPorPrecioMenor()
        columna.innerHTML = ''
        arrayordenado.length > 0 ?
            arrayordenado.forEach((producto) => {
                columna.innerHTML += retornarProducto(producto);
            }) :
            console.log("ERROR");
    }
    else {
        console.log("ERROR")
    }
});
const inputBuscar = document.querySelector("#campoABuscar")
inputBuscar.addEventListener("input", (e) => {
    console.clear()
    const resultado = productos.filter((producto) => producto.nombre.toUpperCase().includes(inputBuscar.value.trim().toUpperCase()))
    const productosACargar = inputBuscar.value.trim() !== "" ? resultado : productos;
    cargarProducto(productosACargar);
})
function limpiarCarrito() {
    localStorage.removeItem("miCarrito");
    carrito = []
    calcularCantidadCarrito()
    location.reload(true);
}
const borradoCarrito = document.querySelector("#borrarCarrito")
borradoCarrito.addEventListener("click", (e) => {
    limpiarCarrito()

})
calcularCantidadCarrito()


