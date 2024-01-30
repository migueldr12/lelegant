document.getElementById('btnRegistroProducto').addEventListener('click', function(){
   fetch('./modules/agregarProducto.html')
   .then(respuesta => {
        return respuesta.text();
   })
   .then(datos =>{
       document.getElementById('contenedorPrincipal').innerHTML = datos;
   })
});

