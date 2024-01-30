let shopping = recuperarCarrito()
function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) ?? [];
}

class Compra { 
    constructor(carritoDeCompras) {
        this.carrito = carritoDeCompras
    }

}
const compra = new Compra(shopping);
const volver = document.querySelector("#volver");
volver.addEventListener("click", () => {    
    localStorage.removeItem("miCarrito")  
});
