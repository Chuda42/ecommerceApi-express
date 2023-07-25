// Select all the buttons with the class 'userDeleteBtn'
const btns = document.querySelectorAll('.userDeleteBtn');
const btnsModifyRole = document.querySelectorAll('.userModifyRoleBtn');

// Loop through the buttons
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const userId = btn.getAttribute('userId')
    const url = `/api/users/${userId}`;
    fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status === 200){
        window.location.replace('/modifyUser')
        return
      }
      throw new Error('User not found or you are the owner');
    }).catch(error => {
      swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      })
      console.error(error);
    });
  });
})

btnsModifyRole.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const userId = btn.getAttribute('userId')
    const url = `/api/users/premium/${userId}`;
    fetch(url, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status === 200){
        window.location.replace('/modifyUser')
        return
      }
      throw new Error('User have not the required documents');
    }).catch(error => {
      swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      })
      console.error(error);
    });
  });
})