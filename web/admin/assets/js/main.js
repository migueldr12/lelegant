$( document ).ready(function() {
    auth();
});
const logout = function() {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const appContext = window.location.pathname.split("/")[1];
    fetch(`/${appContext}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
        }).then(data =>{
            if(data === 1){
                
                localStorage.clear();
                window.location = '../index.html';
            }
        })
}
const auth = function (){
    const user = JSON.parse(localStorage.getItem("usuario"));
    if(user !== null){
        const appContext = window.location.pathname.split("/")[1];
        fetch(`/${appContext}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: user.lastToken
        }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
        }).then(data =>{
            if(data === null){
                window.location = '../index.html'
            }
        })
    } else {
        window.location = '../index.html'
    }
    
}


