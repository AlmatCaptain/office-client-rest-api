document.getElementById('postData').addEventListener('submit', auth)
async function auth(event) {
  event.preventDefault()
  let name = document.getElementById('name').value
  let pass = document.getElementById('password').value

  const res = await fetch('http://localhost:8762/auth/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: name, password: pass })
  })

  const data = await res.text()
  if (res.status == 200) {
    console.log(data)
    myStorage.setItem('token', data)
    window.location = 'employees.html'
  }
}

// document.getElementById('submit').addEventListener(
//   'click',
//   (async () => {
//     const rawResponse = await fetch('http://localhost:8080/auth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username: 'almat', password: '123123' })
//     })
//     const content = await rawResponse.headers.json()

//     console.log(content)
//   })()
// )

// const content = rawResponse.json()

// console.log(content)

//   await fetch('http://localhost:8080/auth', {
//     method: 'POST',
//     body: JSON.stringify({
//       username: name,
//       password: pass
//     }),
//     headers: {
//       'Content-type': 'application/json'
//     }
//   })
//     .then((response) => console.log(response.json()))
//     .then((json) => console.log(json))
