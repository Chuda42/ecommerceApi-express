const emailInput = document.getElementById('email');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');

const loginRedirect = () => {
  window.location.href = '/login';
}

resetPasswordBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const response = await fetch(`/api/users/sendResetPassword?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (data.status === 'success') {
    Swal.fire({
      title: 'Info',
      text: 'Check your email to reset your password',
      icon: 'info'
    });
    setTimeout(function() {
      loginRedirect()
    }, 4000);
  } else {
    swal.fire({
      title: 'Error',
      text: `${data.error}`,
      icon: 'error'
    })
  }
});