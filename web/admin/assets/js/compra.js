document
  .getElementById("btnRegistroProducto")
  .addEventListener("click", function () {
    import("./compras.js").then((obj) => {
          cm = obj
          cm.inicializar();
    });
  });
  
const registrosPorPagina = 5;
let paginaActual = 1;

const getAllCompras = function () {
    const appContext = window.location.pathname.split("/")[1];
    fetch(`/${appContext}/api/compras/getAll`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        })
        .then((data) => {
            console.log(data);
            acomodarElementos(data, document.getElementById("tblCompras"));
            //          console.log(data);
        });
};



const acomodarElementos = function (elementos, tabla) {
    tabla.innerHTML = '';
    console.log(tabla, elementos);
    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = paginaActual * registrosPorPagina;
    
    const elementosActivos = elementos.filter(elemento => elemento.estatusCompra === false);

    const elementosPagina = elementosActivos.slice(indiceInicial, indiceFinal);

    elementosPagina.forEach(elemento => {
        console.log(elemento)
        const subtotal = elemento.precioUnitarioCompra * elemento.cantidadComprada;
        const total = subtotal * 1.16;
            row =   `<tr>
                      <td>${elemento.idCompra}</td>
                      <td>${elemento.fechaCompra}</td>
                      <td>${elemento.nombreProducto}</td>
                      <td>${elemento.cantidadComprada}</td>
                      <td>${elemento.precioUnitarioCompra}</td>
                      <td>${subtotal}</td>
                      <td>${total.toFixed(2)}</td>
                      <td style = "display: none">${elemento.idCompra}</td>
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
    
    const elementosActivos = elementos.filter(elemento => elemento.estatusCompra === false);

    const elementosPagina = elementosActivos.slice(indiceInicial, indiceFinal);

    elementosPagina.forEach(elemento => {
        if (elemento.estatusCompra === false) {
            const subtotal = elemento.precioUnitarioCompra * elemento.cantidadComprada;
            const total = subtotal * 1.16;
            row =   `<tr>
                      <td>${elemento.idCompra}</td>
                      <td>${elemento.fechaCompra}</td>
                      <td>${elemento.nombreProducto}</td>
                      <td>${elemento.cantidadComprada}</td>
                      <td>${elemento.precioUnitarioCompra}</td>
                      <td>${subtotal}</td>
                      <td>${total.toFixed(2)}</td>
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
getAllCompras();

const editarElemento = function(event, elemento){
    console.log(elemento);
    event.preventDefault();
    const appContext = window.location.pathname.split("/")[1];
    
    fetch(`/${appContext}/api/compras/atender`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elemento),
      })
      .then((response) => {
        if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
      })
      .then((datos) => {
        console.log("ok");
      });
    
};