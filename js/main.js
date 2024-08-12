document.addEventListener('DOMContentLoaded', () => {
    fetchBebidas();
});

let carrito = [];

function fetchBebidas() {
    fetch('data/bebidas.json') // Ruta al archivo JSON
        .then(response => response.json())
        .then(data => mostrarBebidas(data))
        .catch(error => console.error('Error cargando los datos:', error));
}

function mostrarBebidas(bebidas) {
    const bebidasList = document.getElementById('bebidas-list');
    bebidasList.innerHTML = ''; // Limpiar el contenido previo

    bebidas.forEach(bebida => {
        const bebidaCard = document.createElement('div');
        bebidaCard.className = 'col-md-4';

        bebidaCard.innerHTML = `
            <div class="card">
                <img src="${bebida.imagen}" class="card-img-top" alt="${bebida.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${bebida.nombre}</h5>
                    <p class="card-text">${bebida.descripcion}</p>
                    <p class="card-text"><strong>Precio: $${bebida.precio}</strong></p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${bebida.id}, '${bebida.nombre}', ${bebida.precio})">Agregar al carrito</button>
                </div>
            </div>
        `;

        bebidasList.appendChild(bebidaCard);
    });
}

function agregarAlCarrito(id, nombre, precio) {
    // Agregar producto al carrito
    carrito.push({ id, nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    listaCarrito.innerHTML = ''; // Limpiar lista

    // Actualizar lista de productos en el carrito
    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
    });

    // Calcular y mostrar el total
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalCarrito.textContent = total;
}

function eliminarDelCarrito(index) {
    // Eliminar producto del carrito
    carrito.splice(index, 1);
    actualizarCarrito();
}