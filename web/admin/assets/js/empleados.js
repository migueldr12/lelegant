export const inicializar = function(){
    document.getElementById('btnRegistroEmpleado').addEventListener('click', function(){
        // Extraer elementos del formulario de registro de empleados
        const txtIdEmpleado = document.getElementById("txtIdEmpleado");
        const txtNombre = document.getElementById("txtNombre");
        const txtApellidoPaterno = document.getElementById("txtApellidoPaterno");
        const txtApellidoMaterno = document.getElementById("txtApellidoMaterno");
        const txtGenero = document.getElementById("txtGenero");
        const txtFechaNacimiento = document.getElementById("txtFechaNacimiento");
        const txtRFC = document.getElementById("txtRFC");
        const txtCURP = document.getElementById("txtCURP");
        const txtEmail = document.getElementById("txtEmail");
        const txtPassword = document.getElementById("txtPassword");
        const txtFoto = document.getElementById("txtFoto");
        const txtCalle = document.getElementById("txtCalle");
        const txtNumero = document.getElementById("txtNumero");
        const txtColonia = document.getElementById("txtColonia");
        const txtCiudad = document.getElementById("txtCiudad");
        const txtEstado = document.getElementById("txtEstado");
        const txtCodigoPostal = document.getElementById("txtCodigoPostal");
        const txtTelefono = document.getElementById("txtTelefono");
        const txtPermiso = document.getElementById("txtPermiso");
        const txtFechaIngreso = document.getElementById("txtFechaIngreso");
        const txtPuesto = document.getElementById("txtPuesto");

        const campos = [txtIdEmpleado, txtNombre,
                        txtApellidoPaterno, txtApellidoMaterno,
                        txtGenero, txtFechaNacimiento,
                        txtRFC, txtCURP,
                        txtEmail, txtPassword,
                        txtFoto, txtCalle,
                        txtNumero, txtColonia,
                        txtCiudad, txtEstado,
                        txtCodigoPostal, txtTelefono,
                        txtPermiso, txtFechaIngreso];
                    
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
        
        // Validacion de length de campos
        const mostrarAlertaLargos = function (elemento, largo, esMinimo) {
            const nombreElemento = elemento.id.replace('txt', ''); // Quita el prefijo "txt" del ID para obtener el nombre del elemento

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

            const mensaje = esMinimo ? `El ${nombreElemento} debe tener al menos ${largo} caracteres` : `El ${nombreElemento} no debe tener más de ${largo} caracteres`;

            Toast.fire({
                icon: 'error',
                title: mensaje,
            });

            elemento.classList.add('is-invalid');
        };

        // Validar longitud de RFC
        if (txtRFC.value.length !== 10) {
            mostrarAlertaLargos(txtRFC, 10, 1);
            return;
        } 

        // Validar longitud de CURP
        if (txtCURP.value.length !== 18) {
            mostrarAlertaLargos(txtCURP, 18, 1);
            return;
        } 

        // Validar longitud de Código Postal
        if (txtCodigoPostal.value.length !== 5) {
            mostrarAlertaLargos(txtCodigoPostal, 5, 1);
            return;
        } 

        // Validar longitud de Teléfono
        if (txtTelefono.value.length !== 10) {
            mostrarAlertaLargos(txtTelefono, 10, 1);
            return;
        }
        // Validacion de correo electronico
        const validarCorreo = function (email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (!validarCorreo(txtEmail.value)) {
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
                title: 'Correo electrónico inválido',
            });
            txtEmail.classList.add('is-invalid');
            return;
        }
        
        const appContext = window.location.pathname.split('/')[1];
        fetch(`/${appContext}/api/empleado/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idEmpleado: txtIdEmpleado.value,
                nombre: txtNombre.value,
                apellidoP: txtApellidoPaterno.value,
                apellidoM: txtApellidoMaterno.value,
                genero: txtGenero.value,
                fechaDeNacimiento: txtFechaNacimiento.value,
                fechaIngreso: txtFechaIngreso.value,
                RFC: txtRFC.value,
                CURP: txtCURP.value,
                email: txtEmail.value,
                password: txtPassword.value,
                foto: txtFoto.value,
                calle: txtCalle.value,
                numero: txtNumero.value,
                colonia: txtColonia.value,
                ciudad: txtCiudad.value,
                puesto: txtPuesto.value,
                estado: txtEstado.value,
                codigoPostal: txtCodigoPostal.value,
                telefono: txtTelefono.value,
                permiso: txtPermiso.value,
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
        
        const limpiarFormulario = function(){
            // Limpiar los campos del formulario de registro de empleados
            txtIdEmpleado.value = 0;
            txtNombre.value = '';
            txtApellidoPaterno.value = '';
            txtApellidoMaterno.value = '';
            txtGenero.value = '';
            txtFechaNacimiento.value = '';
            txtRFC.value = '';
            txtCURP.value = '';
            txtEmail.value = '';
            txtPassword.value = '';
            txtFoto.value = '';
            txtCalle.value = '';
            txtNumero.value = '';
            txtColonia.value = '';
            txtCiudad.value = '';
            txtEstado.value = '';
            txtCodigoPostal.value = '';
            txtTelefono.value = '';
            txtPermiso.value = '';
            txtFechaIngreso.value = '';
            txtPuesto.value = '';
        }
    });
}
export const editarElementos = function (elemento){
    // Rellenar los campos del formulario con los datos del empleado a editar
    document.getElementById("txtIdEmpleado").value = elemento.idEmpleado;
    document.getElementById("txtNombre").value = elemento.nombre;
    document.getElementById("txtApellidoPaterno").value = elemento.apellidoP;
    document.getElementById("txtApellidoMaterno").value = elemento.apellidoM;
    document.getElementById("txtGenero").value = elemento.genero;
    document.getElementById("txtFechaNacimiento").value = elemento.fechaDeNacimiento;
    document.getElementById("txtRFC").value = elemento.RFC;
    document.getElementById("txtCURP").value = elemento.CURP;
    document.getElementById("txtEmail").value = elemento.email;
    document.getElementById("txtPassword").value = elemento.password;
    document.getElementById("txtCalle").value = elemento.calle;
    document.getElementById("txtNumero").value = elemento.numero;
    document.getElementById("txtColonia").value = elemento.colonia;
    document.getElementById("txtCiudad").value = elemento.ciudad;
    document.getElementById("txtEstado").value = elemento.estado;
    document.getElementById("txtCodigoPostal").value = elemento.codigoPostal;
    document.getElementById("txtTelefono").value = elemento.telefono;
    document.getElementById("txtPermiso").value = elemento.permiso;
    document.getElementById("txtFechaIngreso").value = elemento.fechaIngreso;
    document.getElementById("txtPuesto").value = elemento.puesto;
}

