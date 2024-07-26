export const inicializar = function(){
    const mostrarProductos = function(){
        const appContext = window.location.pathname.split("/")[1];
        fetch(`/${appContext}/api/producto/getAll`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        })
        .then((data) => {
            desplegarProductos(data);
        });
    }
    const desplegarProductos = function(productos){
        const dropdown = document.getElementById('txtProductos');
        const precio = document.getElementById('txtPrecio');
        productos.forEach((producto) => {
            if(producto.estatus === true){
                dropdown.insertAdjacentHTML('beforeend', `<option value="${producto.idProducto}">${producto.nombreProducto} - ${producto.marca} - ${producto.descripcion}</option>`)
            }
        })
    }
    mostrarProductos();
}
export const agregarVenta = function(event){
    event.preventDefault();
    const idProducto = document.getElementById('txtProductos');
    const cantidadComprada = document.getElementById('txtCantidad');
    const precioUnitario = document.getElementById('txtPrecio');
    const txtCliente = document.getElementById('txtCliente');
    
    const appContext = window.location.pathname.split("/")[1];
    fetch(`/${appContext}/api/ventas/insert`,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            idProducto: idProducto.value,
            cantidadVendida: cantidadComprada.value,
            precio: precioUnitario.value,
            cliente: txtCliente.value
        })
    }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        }).then(data =>{
            if(data > 0) {
                Swal.fire({
                    title: 'Correcto',
                    text: 'Venta guardada correctamente',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Agregar una nueva'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = './ventas.html'
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        cm.limpiarFormulario();
                    }
                });
            } else {
                console.log('not ok')
            }
        })
}
export const limpiarFormulario = function(){
    document.getElementById('txtProductos').value = '';
    document.getElementById('txtCantidad').value = '';
    document.getElementById('txtPrecio').value = '';
    document.getElementById('txtCliente').value = '';
}
