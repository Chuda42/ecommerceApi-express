const emailInput = document.getElementById('emailInput');
const codeInput = document.getElementById('codeInput');
const passwordInput = document.getElementById('passwordInput');
const resetPasswordBtn = document.getElementById('resetBtn');

const loginRedirect = () => {
  window.location.href = '/login';
}

resetPasswordBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const token = codeInput.value;
  const newPassword = passwordInput.value;
  const response = await fetch(`/api/users/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, token, newPassword })
  });
  const data = await response.json();
  if (data.status === 'success') {
    Swal.fire({
      title: 'Info',
      text: 'Password reset successfully',
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