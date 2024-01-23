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

  if (userValue === '') {
    userInput.classList.add('is-invalid');
    blockAlert.style.display = 'block';
  } else if (passValue === '') {
    passInput.classList.add('is-invalid');
    blockAlert.style.display = 'block';
  } else {
    const appContext = window.location.pathname.split('/')[1];

    fetch(
      `/${appContext}/api/login/log?txtUser=${userValue}&txtPassword=${passValue}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
      })
      .then(data => {
        if (data > 0) {
          location.href = './admin/index.html';
        } else {
          Swal.fire({
            text: 'Usuario no encontrado',
            icon: 'info',
            confirmButtonText: 'Intentar de nuevo',
          }).then(result => {
            if (result.isConfirmed) {
              userInput.value = '';
              passInput.value = '';
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


