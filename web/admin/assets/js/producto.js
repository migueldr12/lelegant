let cm = null; // Change const to let
document
  .getElementById("btnRegistroProducto")
  .addEventListener("click", function () {
    fetch("./modules/agregarProducto.html")
      .then((respuesta) => {
        return respuesta.text();
      })
      .then((datos) => {
        document.getElementById("contenedorPrincipal").innerHTML = datos;

        import("./productos.js").then((obj) => {
          cm = obj;
          cm.inicializar();
        });
      });
  });
  
const registrosPorPagina = 5;
let paginaActual = 1;

const getAllProductos = function () {
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
            console.log(data);
            acomodarElementos(data, document.getElementById("tblProductos"));
            //          console.log(data);
        });
};



const acomodarElementos = function (elementos, tabla) {

    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = paginaActual * registrosPorPagina;
    
    const elementosActivos = elementos.filter(elemento => elemento.estatus === true);
    
    console.log(elementosActivos);
    
    const elementosPagina = elementosActivos.slice(indiceInicial, indiceFinal);

    elementosPagina.forEach(elemento => {
        if (elemento.estatus === true) {
            row =   `<tr>
                      <td>${elemento.nombreProducto}</td>
                      <td>${elemento.descripcion}</td>
                      <td>${elemento.marca}</td>
                      <td>${elemento.genero}</td>
                      <td>${elemento.cantidad}</td>
                      <td>${elemento.precioSugerido}</td>
                      <td>${elemento.codigoBarras}</td>
                      <td style = "display: none">${elemento.idProducto}</td>
                      <td><a class="btn" href="#" onclick='editarElemento(event, ${JSON.stringify(elemento)})'><i class="bi bi-pencil-fill m-2"></i></a><a class="btn" href="#" onclick="eliminarProducto(${elemento.idProducto})"><i class="bi bi-trash m-2"></i></a></td>
                    </tr>`;
            tabla.insertAdjacentHTML(
                "beforeend", row
            );
        }
    });
    
    const mostrarBotonesPaginacion = function (totalRegistros, tablaB) {
        console.log(totalRegistros, registrosPorPagina)
        const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);

        console.log(totalPaginas)

        // Limpia los botones de paginación antes de volver a generarlos
        const paginationRow = document.getElementById('paginationRow');
        paginationRow.innerHTML = '';

        // Agrega los botones de paginación
        for (let i = 1; i <= totalPaginas; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('btn', 'btn-secondary', 'mx-1');
            button.addEventListener('click', function () {
                paginaActual = i;
                if(i > 1){
                    acomodarElementosNuevos(elementos, tablaB);
                } else {
                    acomodarElementos(elementos, tablaB)
                }
                mostrarBotonesPaginacion(totalRegistros, tablaB);
            });
            if(paginaActual === i){
                    button.disabled = true;
                }
            paginationRow.appendChild(button);
        }
    };
    
    mostrarBotonesPaginacion(elementosActivos.length, tabla);
        
};

const acomodarElementosNuevos = function (elementos, tabla) {

    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = paginaActual * registrosPorPagina;
    
    const elementosActivos = elementos.filter(elemento => elemento.estatus === true);

    const elementosPagina = elementosActivos.slice(indiceInicial, indiceFinal);

    elementosPagina.forEach(elemento => {
        if (elemento.estatus === true) {
            row =   `<tr>
                      <td>${elemento.nombreProducto}</td>
                      <td>${elemento.descripcion}</td>
                      <td>${elemento.marca}</td>
                      <td>${elemento.genero}</td>
                      <td>${elemento.cantidad}</td>
                      <td>${elemento.precioSugerido}</td>
                      <td>${elemento.codigoBarras}</td>
                      <td style = "display: none">${elemento.idProducto}</td>
                      <td><a class="btn" href="#" onclick='editarElemento(event, ${JSON.stringify(elemento)})'><i class="bi bi-pencil-fill m-2"></i></a><a class="btn" href="#" onclick="eliminarProducto(${elemento.idProducto})"><i class="bi bi-trash m-2"></i></a></td>
                    </tr>`;
            tabla.insertAdjacentHTML(
                "beforeend", row
            );
        }
    });
    
    const mostrarBotonesPaginacion = function (totalRegistros, tablaB) {
        console.log(totalRegistros, registrosPorPagina)
        const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);

        console.log(totalPaginas)

        // Limpia los botones de paginación antes de volver a generarlos
        const paginationRow = document.getElementById('paginationRow');
        paginationRow.innerHTML = '';

        // Agrega los botones de paginación
        for (let i = 1; i <= totalPaginas; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('btn', 'btn-secondary', 'mx-1');
            button.addEventListener('click', function () {
                paginaActual = i;
                acomodarElementosNuevos(elementos, tablaB);
                mostrarBotonesPaginacion(totalRegistros, tablaB);
            });
            paginationRow.appendChild(button);
        }
    };
    
    mostrarBotonesPaginacion(elementosActivos.length, tabla);
        
};

const editarElemento = function(event, elemento){
    event.preventDefault();
    fetch("./modules/agregarProducto.html")
      .then((respuesta) => {
        return respuesta.text();
      })
      .then((datos) => {
        document.getElementById("contenedorPrincipal").innerHTML = datos;
        document.querySelector("footer").classList.remove("fixed-bottom");

        import("./productos.js").then((obj) => {
          cm = obj;
          cm.inicializar();
          cm.editarElementos(elemento);
        });
      });
    
};

getAllProductos();

const eliminarProducto = function (id) {
  const appContext = window.location.pathname.split("/")[1];

  Swal.fire({
    title: "Eliminacion",
    text: "Seguro que quieres eliminar este registro",
    icon: "question",
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/${appContext}/api/producto/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
        })
        .then((data) => {
          if (data > 0) {
            Swal.fire({
              title: "Eliminado",
              text: "Registro eliminado correctamente",
              icon: "success",
            }).then(() => {
                window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Ocurrio un error",
              icon: "error",
            });
          }
        });
    }
  });
};