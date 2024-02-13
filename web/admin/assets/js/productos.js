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
        
        const campos = [txtNombre, txtDescripcion, txtAnioLanzamiento, txtMarca, txtPresentacion, txtGenero, txtDepartamento, txtPrecioInventario, txtCantidad, txtPrecioSugerido, txtFoto, txtCodigoBarras];
        
        campos.forEach(campo => campo.classList.remove('is-invalid'));
        
        // Validacion campos vacios
        const mostrarAlertaVacios = function (elementos) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                didOpen: toast => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: 'error',
                title: 'Llene todos los campos',
            });

            elementos.forEach(elemento => elemento.classList.add('is-invalid'));
        };

        const camposVacios = campos.filter((campo) => campo.value.trim() === '');

        if (camposVacios.length > 0) {
            mostrarAlertaVacios(camposVacios);
            return;
        }
        
        // Validacion campos numericos
        
        const mostrarAlertaNumericos = function (elementos) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                didOpen: toast => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: 'error',
                title: 'Los campos deben ser numeros',
            });

            elementos.forEach(elemento => elemento.classList.add('is-invalid'));
        };
        
        const camposNumericos = [txtAnioLanzamiento, txtPrecioInventario, txtCantidad, txtPrecioSugerido];
        const camposInvalidos = camposNumericos.filter(campo => isNaN(campo.value.trim()));

        if (camposInvalidos.length > 0) {
            mostrarAlertaNumericos(camposInvalidos);
            return;
        }
        

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
        
        const limpiarFormulario = function (){
            document.getElementById("txtIdProducto").value = 0;
            document.getElementById("txtNombre").value = '';
            document.getElementById("txtDescripcion").value = '';
            document.getElementById("txtAnioLanzamiento").value = '';
            document.getElementById("txtMarca").value = '';
            document.getElementById("txtGenero").value = '';
            document.getElementById("txtDepartamento").value = '';
            document.getElementById("txtPrecioInventario").value = '';
            document.getElementById("txtCantidad").value = '';
            document.getElementById("txtPrecioSugerido").value = '';
            document.getElementById("txtCodigoBarras").value = '';
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