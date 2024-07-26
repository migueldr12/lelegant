const login = function (event) {
  event.preventDefault();

  const userValue = document.getElementById('txtUser').value;
  const passValue = document.getElementById('txtPassword').value;
  const userInput = document.getElementById('txtUser');
  const passInput = document.getElementById('txtPassword');
  const blockAlert = document.getElementById('txtAlerta');

  userInput.classList.remove('is-invalid');
  passInput.classList.remove('is-invalid');
  blockAlert.style.display = 'none';

  if (userValue === '' && passValue === '') {
    userInput.classList.add('is-invalid');
    passInput.classList.add('is-invalid');
    blockAlert.style.display = 'block';
  } else if (passValue === '') {
    passInput.classList.add('is-invalid');
    blockAlert.style.display = 'block';
  } else {
    const appContext = window.location.pathname.split('/')[1];
    fetch(`/${appContext}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userValue,
        password: passValue,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
      })
      .then(data => {
        console.log(data);
        if (data !== null) {
          localStorage.setItem("usuario", JSON.stringify(data));
          console.log(localStorage);
          location.href = './admin/index.html';
        } else {
          Swal.fire({
            text: 'Usuario no encontrado',
            icon: 'info',
            confirmButtonText: 'Intentar de nuevo',
          }).then(result => {
            if (result.isConfirmed) {
              userInput.value = passInput.value = '';
            }
          });
        }
      })
      .catch(error => {
        // Manejar errores de red u otros errores
        console.error('Error en la solicitud:', error);
      });
  }
};