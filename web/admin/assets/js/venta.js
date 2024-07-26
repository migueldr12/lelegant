document
  .getElementById("btnRegistroProducto")
  .addEventListener("click", function () {
    fetch("./modules/agregarVenta.html")
      .then((respuesta) => {
        return respuesta.text();
      })
      .then((datos) => {
        document.getElementById("contenedorPrincipal").innerHTML = datos;
        document.querySelector("footer").classList.remove("fixed-bottom");

        import("./ventas.js").then((obj) => {
          cm = obj;
          cm.inicializar();
        });
      });
  });
  
const registrosPorPagina = 5;
let paginaActual = 1;

const getAllCompras = function () {
    const appContext = window.location.pathname.split("/")[1];
    fetch(`/${appContext}/api/ventas/getAll`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        })
        .then((data) => {
            console.log(data);
            acomodarElementos(data, document.getElementById("tblVentas"));
            //          console.log(data);
        });
};



const acomodarElementos = function (elementos, tabla) {
    tabla.innerHTML = '';
    console.log(tabla, elementos);
    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = paginaActual * registrosPorPagina;
    
    const elementosActivos = elementos.filter(elemento => elemento.estatus === true);

    const elementosPagina = elementosActivos.slice(indiceInicial, indiceFinal);

    elementosPagina.forEach(elemento => {
        console.log(elemento)
        const total = elemento.cantidadVendida + elemento.precio;
            row =   `<tr>
                      <td>${elemento.cliente}</td>
                      <td>${elemento.fechaVenta}</td>
                      <td>${elemento.nombreProducto}</td>
                      <td>${elemento.cantidadVendida}</td>
                      <td>${elemento.precio}</td>
                      <td>${total.toFixed(2)}</td>
                      <td style = "display: none">${elemento.idVenta}</td>
                      <td><a class="btn" href="#" onclick='editarElemento(event, ${JSON.stringify(elemento)})'><i class="bi bi-pencil-fill m-2"></i></a><a class="btn" href="#" onclick="eliminarProducto(${elemento.idProducto})"><i class="bi bi-trash m-2"></i></a></td>
                    </tr>`;
            tabla.insertAdjacentHTML(
                "beforeend", row
            );
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
    
    tabla.innerHTML = '';
    
    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = paginaActual * registrosPorPagina;
    
    const elementosActivos = elementos.filter(elemento => elemento.estatus === true);

    const elementosPagina = elementosActivos.slice(indiceInicial, indiceFinal);

    elementosPagina.forEach(elemento => {
        if (elemento.estatus === true) {
            const total = elemento.cantidadVendida + elemento.precio;
            row =   `<tr>
                      <td>${elemento.cliente}</td>
                      <td>${elemento.fechaVenta}</td>
                      <td>${elemento.nombreProducto}</td>
                      <td>${elemento.cantidadVendida}</td>
                      <td>${elemento.precio}</td>
                      <td>${total.toFixed(2)}</td>
                      <td style = "display: none">${elemento.idVenta}</td>
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
getAllCompras();
