document.getElementById('signUp').addEventListener('submit', reg)
async function reg(event) {
  event.preventDefault()
  let gname = document.getElementById('rname').value
  let gpass = document.getElementById('rpassword').value
  alert(gpass + gname)
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({ username: gname, password: gpass })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  const response = await fetch(
    'http://localhost:8762/api/employees/registration',
    requestOptions
  )

  if (response.status == 200) {
    console.log('rega')
    window.location = 'login.html'
  }
}
