export const inicializar = function(){
    document.getElementById('btnRegistroEmpleado').addEventListener('click', function(){
        // Extraer elementos del formulario de registro de empleados
        const txtNombre = document.getElementById("txtNombre");
        const txtApellidoPaterno = document.getElementById("txtApellidoPaterno");
        const txtApellidoMaterno = document.getElementById("txtApellidoMaterno");
        const txtGenero = document.getElementById("txtGenero");
        const txtFechaNacimiento = document.getElementById("txtFechaNacimiento");
        const txtRFC = document.getElementById("txtRFC");
        const txtCURP = document.getElementById("txtCURP");
        const txtFoto = document.getElementById("txtFoto");
        const txtCalle = document.getElementById("txtCalle");
        const txtNumero = document.getElementById("txtNumero");
        const txtColonia = document.getElementById("txtColonia");
        const txtCiudad = document.getElementById("txtCiudad");
        const txtEstado = document.getElementById("txtEstado");
        const txtCodigoPostal = document.getElementById("txtCodigoPostal");
        const txtTelefono = document.getElementById("txtTelefono");

        console.log(txtNombre.value);

        const limpiarFormulario = function(){
            // Limpiar los campos del formulario de registro de empleados
            txtNombre.value = '';
            txtApellidoPaterno.value = '';
            txtApellidoMaterno.value = '';
            txtGenero.value = '';
            txtFechaNacimiento.value = '';
            txtRFC.value = '';
            txtCURP.value = '';
            txtFoto.value = '';
            txtCalle.value = '';
            txtNumero.value = '';
            txtColonia.value = '';
            txtCiudad.value = '';
            txtEstado.value = '';
            txtCodigoPostal.value = '';
            txtTelefono.value = '';
        }

        const appContext = window.location.pathname.split('/')[1];
        fetch(`/${appContext}/api/empleado/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: txtNombre.value,
                apellidoPaterno: txtApellidoPaterno.value,
                apellidoMaterno: txtApellidoMaterno.value,
                genero: txtGenero.value,
                fechaDeNacimiento: txtFechaNacimiento.value,
                RFC: txtRFC.value,
                CURP: txtCURP.value,
                foto: txtFoto.value,
                calle: txtCalle.value,
                numero: txtNumero.value,
                colonia: txtColonia.value,
                ciudad: txtCiudad.value,
                estado: txtEstado.value,
                codigoPostal: txtCodigoPostal.value,
                telefono: txtTelefono.value,
            }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        }).then(data => {
            if(data > 0){
                // Mostrar mensaje de éxito y limpiar formulario
                Swal.fire({
                    title: 'Correcto',
                    text: 'Empleado registrado correctamente',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Agregar uno nuevo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirigir a la página de empleados
                        location.href = './empleados.html'
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Limpiar formulario para agregar uno nuevo
                        limpiarFormulario();
                    }
                });
            } else {
                console.log('not ok');
            }
        });
    });
}
export const editarElementos = function (elemento){
    // Rellenar los campos del formulario con los datos del empleado a editar
    document.getElementById("txtNombre").value = elemento.nombre;
    document.getElementById("txtApellidoPaterno").value = elemento.apellidoPaterno;
    document.getElementById("txtApellidoMaterno").value = elemento.apellidoMaterno;
    document.getElementById("txtGenero").value = elemento.genero;
    document.getElementById("txtFechaNacimiento").value = elemento.fechaDeNacimiento;
    document.getElementById("txtRFC").value = elemento.RFC;
    document.getElementById("txtCURP").value = elemento.CURP;
    document.getElementById("txtFoto").value = elemento.foto;
    document.getElementById("txtCalle").value = elemento.calle;
    document.getElementById("txtNumero").value = elemento.numero;
    document.getElementById("txtColonia").value = elemento.colonia;
    document.getElementById("txtCiudad").value = elemento.ciudad;
    document.getElementById("txtEstado").value = elemento.estado;
    document.getElementById("txtCodigoPostal").value = elemento.codigoPostal;
    document.getElementById("txtTelefono").value = elemento.telefono;
}
