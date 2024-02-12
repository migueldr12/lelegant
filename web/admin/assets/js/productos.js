export const inicializar = function(){
    document.getElementById('btnRegistroProducto').addEventListener('click', function(){
        // Extraemos los elementos del formulario
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
        
        console.log(txtIdProducto.value);
        
        const limpiarFormulario = function(){
            txtIdProducto.value = 0;
            txtNombre.value = '';
            txtDescripcion.value = '';
            txtAnioLanzamiento.value = '';
            txtMarca.value = '';
            txtPresentacion.value = '';
            txtGenero.value = '';
            txtDepartamento.value = '';
            txtPrecioInventario.value = '';
            txtCantidad.value = '';
            txtPrecioSugerido.value = '';
            txtFoto.value = '';
            txtCodigoBarras.value = '';
        }
        
        const appContext = window.location.pathname.split('/')[1];
        fetch(`/${appContext}/api/producto/insert`,{
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
                precioInventario: txtPrecioInventario.value,
                cantidad: txtCantidad.value,
                precioSugerido: txtPrecioSugerido.value,
                foto: txtFoto.value,
                codigoBarras: txtCodigoBarras.value,
              }),
        }).then(response =>{
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    }).then(data => {
        if(data > 0){
            Swal.fire({
                title: 'Correcto',
                text: 'Producto guardado correctamente',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Agregar uno nuevo'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = './productos.html'
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    limpiarFormulario();
                }
            });
        } else {
            console.log('not ok')
        }
        })
    });
}
export const editarElementos = function (elemento){
        document.getElementById("txtIdProducto").value = elemento.idProducto;
        document.getElementById("txtNombre").value = elemento.nombreProducto;
        document.getElementById("txtDescripcion").value = elemento.descripcion;
        document.getElementById("txtAnioLanzamiento").value = elemento.anioLanzamiento;
        document.getElementById("txtMarca").value = elemento.marca;
        document.getElementById("txtGenero").value = elemento.genero;
        document.getElementById("txtDepartamento").value = elemento.departamento;
        document.getElementById("txtPrecioInventario").value = elemento.precioInventario;
        document.getElementById("txtCantidad").value = elemento.cantidad;
        document.getElementById("txtPrecioSugerido").value = elemento.precioSugerido;
        document.getElementById("txtCodigoBarras").value = elemento.codigoBarras; 
    }

