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
        
        // Remover clases de error de todos los campos
        const campos = [txtNombre, txtDescripcion, txtAnioLanzamiento, txtMarca, txtPresentacion, txtGenero, txtDepartamento, txtPrecioInventario, txtCantidad, txtPrecioSugerido, txtFoto, txtCodigoBarras];
        campos.forEach(function(campo) {
            campo.classList.remove('input-error');
        });

        // Validaciones
        if (
            !txtNombre.value.trim() ||
            !txtDescripcion.value.trim() ||
            !txtAnioLanzamiento.value.trim() ||
            !txtMarca.value.trim() ||
            !txtPresentacion.value.trim() ||
            !txtGenero.value.trim() ||
            !txtDepartamento.value.trim() ||
            !txtPrecioInventario.value.trim() ||
            !txtCantidad.value.trim() ||
            !txtPrecioSugerido.value.trim() ||
            !txtFoto.value.trim() ||
            !txtCodigoBarras.value.trim()
        ) {
            alert('Por favor complete todos los campos.');
            resaltarCamposVacios(campos);
            return;
        }

        if (isNaN(txtAnioLanzamiento.value.trim())) {
            alert('El año de lanzamiento debe ser un número válido.');
            txtAnioLanzamiento.classList.add('input-error');
            return;
        }

        if (
            isNaN(txtPrecioInventario.value.trim()) ||
            isNaN(txtCantidad.value.trim()) ||
            isNaN(txtPrecioSugerido.value.trim())
        ) {
            alert('El precio de inventario, cantidad y precio sugerido deben ser números válidos.');
            resaltarCamposInvalidos([txtPrecioInventario, txtCantidad, txtPrecioSugerido]);
            return;
        }
        
        // Si pasa la validación, continuar con el envío de los datos
        const appContext = window.location.pathname.split('/')[1];
        fetch(`/${appContext}/api/producto/insert`, {
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
        }).catch(error => {
            alert('Error en la solicitud: ' + error.message);
            console.error(error);
        });
    });
}

// Función para resaltar campos vacíos
function resaltarCamposVacios(campos) {
    campos.forEach(function(campo) {
        if (!campo.value.trim()) {
            campo.classList.add('input-error');
        }
    });
}

// Función para resaltar campos con valores inválidos
function resaltarCamposInvalidos(campos) {
    campos.forEach(function(campo) {
        if (isNaN(campo.value.trim())) {
            campo.classList.add('input-error');
        }
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
