let btn = document.getElementById('submit-btn')
btn.addEventListener('click', validate)

function validate() {
  let name = document.getElementById('name').value
  let password = document.getElementById('password').value
  let confirm = document.getElementById('confirm').value

  if (name == '' || password.length < 6 || confirm !== password) {
    alert('Error: Password length must be at least 6 or invalid confirm ')
  }
}
