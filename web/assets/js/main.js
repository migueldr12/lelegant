const login = function(event){
    event.preventDefault();

    const user = document.getElementById('txtUser').value;
    const pass = document.getElementById('txtPassword').value;
        
    const appContext = window.location.pathname.split('/')[1];

    fetch(`/${appContext}/api/login/log?txtUser=${user}&txtPassword=${pass}`)
        .then(response => {
            if (response.ok) {
                return response.json();  
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        })
        .then(data => {
            if(data > 0){
                location.href = "./admin/index.html";
            } else{
                alert('Usuario no encontrado');
            }
        })
        .catch(error => {
            // Manejar errores de red u otros errores
            console.error('Error en la solicitud:', error);
        });
};


