export const inicializar = function(){
    Swal.fire({
        title: "Agregar compra",
        customClass: {
            confirmButton: "btn m-2 btn-success",
            cancelButton: "btn btn-warning"
        },
        icon: "question",
        text: "¿Que tipo de producto quieres agregar?",
        buttonsStyling: false,
        confirmButtonText: "Nuevo",
        cancelButtonText: "Existente",
        showCancelButton: true
    }).then((result) =>{
        if(result.isConfirmed){
           fetch("./modules/agregarCompraNP.html")
            .then((respuesta) => {
              return respuesta.text();
            })
            .then((datos) => {
              document.getElementById("contenedorPrincipal").innerHTML = datos;
              document.querySelector("footer").classList.remove("fixed-bottom");
              
            }); 
        } else {
            fetch("./modules/agregarCompraEP.html")
            .then((respuesta) => {
              return respuesta.text();
            })
            .then((datos) => {
              document.getElementById("contenedorPrincipal").innerHTML = datos;
              document.querySelector("footer").classList.remove("fixed-bottom");
              mostrarProductos();
            });  
        }
    })
    
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
        
        productos.forEach((producto) => {
            if(producto.estatus === true){
                dropdown.insertAdjacentHTML('beforeend', `<option value="${producto.idProducto}">${producto.nombreProducto} - ${producto.marca} - ${producto.descripcion}</option>`)
            }
        })
    }
}
export const agregarCompraEP = function(event){
    event.preventDefault();
    const idProducto = document.getElementById('txtProductos');
    const cantidadComprada = document.getElementById('txtCantidadComprada');
    const precioUnitario = document.getElementById('txtPrecioUnitario');
    const user = JSON.parse(localStorage.getItem("usuario"));
    const now = new Date();
    console.log(user, idProducto.value, cantidadComprada.value, precioUnitario.value);
    const appContext = window.location.pathname.split("/")[1];
    fetch(`/${appContext}/api/compras/insert`,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            idProducto: idProducto.value,
            fechaCompra: obtenerFechaActual(),
            cantidadComprada: cantidadComprada.value,
            precioUnitarioCompra: precioUnitario.value,
            usuario: user
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
                    text: 'Compra guardada correctamente',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Agregar una nueva'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = './compras.html'
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        cm.limpiarFormulario();
                    }
                });
            } else {
                console.log('not ok')
            }
        })
}
export const agregarCompraNP = function(event){
        event.preventDefault();
    
        const txtIdProducto = document.getElementById("txtIdProducto");
        const txtNombre = document.getElementById("txtNombre");
        const txtDescripcion = document.getElementById("txtDescripcion");
        const txtAnioLanzamiento = document.getElementById("txtAnioLanzamiento");
        const txtMarca = document.getElementById("txtMarca");
        const txtPresentacion = document.getElementById("txtPresentacion");
        const txtGenero = document.getElementById("txtGenero");
        const txtDepartamento = document.getElementById("txtDepartamento");
        const txtPrecioInventario = document.getElementById("txtPrecioInventario");
        const txtCantidad = document.getElementById("txtCantidad");
        const txtPrecioSugerido = document.getElementById("txtPrecioSugerido");
        const txtFoto = document.getElementById("txtFoto");
        const txtCodigoBarras = document.getElementById("txtCodigoBarras");
        const user = JSON.parse(localStorage.getItem("usuario"));
        
        const appContext = window.location.pathname.split('/')[1];
        fetch(`/${appContext}/api/compras/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idProducto: txtIdProducto.value,
                nombreProducto: txtNombre.value,
                descripcion: txtDescripcion.value,
                anioLanzamiento: txtAnioLanzamiento.value,
                marca: txtMarca.value,
                presentacion: txtPresentacion.value,
                genero: txtGenero.value,
                departamento: txtDepartamento.value,
                precioUnitarioCompra: txtPrecioInventario.value,
                cantidadComprada: txtCantidad.value,
                precioSugerido: txtPrecioSugerido.value,
                foto: txtFoto.value,
                codigoBarras: txtCodigoBarras.value,
                fechaCompra: obtenerFechaActual(),
                usuario: user
            }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        }).then(data => {
            if(data > 0) {
                Swal.fire({
                    title: 'Correcto',
                    text: 'Compra guardada correctamente',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Agregar una nueva'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = './compras.html'
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        limpiarFormulario();
                    }
                });
            } else {
                console.log('not ok')
            }
        }).catch(error => {
            alert('Error en la solicitud: ' + error.message);
            console.error(error);
        });
}
export const limpiarFormulario = function(){
    document.getElementById('txtProductos').value = '';
    document.getElementById('txtCantidadComprada').value = '';
    document.getElementById('txtPrecioUnitario').value = '';
}
const obtenerFechaActual = function() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();

    // Agregar un cero al mes y día si son menores a 10
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
}



