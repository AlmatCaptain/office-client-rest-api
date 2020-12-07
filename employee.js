let table = document.getElementById('e-table')
var decoded = jwt_decode(myStorage.getItem('token'))
document.getElementById('addEmp').addEventListener('submit', add)

function getListOfEmployees() {
  fetch('http://localhost:8762/api/employees', {
    headers: new Headers({
      Authorization: 'Bearer ' + myStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
    .then((response) => response.json())
    .then((json) =>
      json.forEach((d) => {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let img = document.createElement('img')
        img.src = 'button.png'
        img.className = 'delx'
        img.setAttribute('onclick', `deleteEmployee(${d.id})`)

        let td3 = document.createElement('td')
        let label = document.createElement('label')
        let input = document.createElement('input')
        let span = document.createElement('span')
        input.setAttribute('type', 'checkbox')

        if (d.roles[0].authority == 'ADMIN')
          input.setAttribute('checked', 'checked')

        if (decoded.authorities[0] !== 'ADMIN') {
          input.setAttribute('disabled', 'disabled')
        }

        if (decoded.sub == d.username) {
          var info = document.getElementById('userInfo')
          info.innerHTML = `ID: ${d.id}<br>UN: ${d.username}`
          myStorage.setItem('id', d.id)
          myStorage.setItem('name', d.username)
        }

        input.setAttribute(
          'onclick',
          `changeRole(${d.id},"${d.roles[0].authority}")`
        )
        input.className = 'status'
        span.className = 'checkmark'
        label.className = 'container'
        label.appendChild(input)
        label.appendChild(span)
        td3.appendChild(label)
        table.appendChild(tr)
        td1.innerHTML = `${d.id}`
        tr.appendChild(td1)
        td2.innerHTML = `${d.username}`
        td2.appendChild(img)
        tr.appendChild(td2)
        tr.appendChild(td3)
        table.appendChild(tr)
      })
    )
}

getListOfEmployees()

async function changeRole(id, role) {
  if (decoded.authorities[0] !== 'ADMIN') {
    alert('Not allow: only ADMIN')
  } else {
    var requestOptions = {
      method: 'PATCH',
      headers: new Headers({
        Authorization: 'Bearer ' + myStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    }

    const response = await fetch(
      `http://localhost:8762/api/employees/admin/role/${id}?role=${role}`,
      requestOptions
    )

    if (response.status == 200) {
      window.location.reload()
    }
  }
}

function deleteEmployee(id) {
  if (decoded.authorities[0] !== 'ADMIN') {
    alert('Not allow: only ADMIN')
  } else {
    var requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Authorization: 'Bearer ' + myStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }

    fetch(`http://localhost:8762/api/employees/admin/delete/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.reload())
      .catch((error) => console.log('error', error))
  }
}

async function add(event) {
  if (decoded.authorities[0] !== 'ADMIN') {
    alert('Not allow: only ADMIN')
  } else {
    event.preventDefault()

    let gname = document.getElementById('name').value
    let gpass = document.getElementById('pass').value

    var raw = JSON.stringify({ username: gname, password: gpass })

    var requestOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + myStorage.getItem('token'),
        'Content-Type': 'application/json'
      }),
      body: raw
    }

    const response = await fetch(
      'http://localhost:8762/api/employees/admin/add',
      requestOptions
    )

    if (response.status == 200) {
      window.location.reload()
    }
  }
}


async function editUserName(idd, username) {
  let id = document.getElementById('id').value
  let name = document.getElementById('name').value
  if (decoded.authorities[0] !== 'ADMIN') {
    alert('Not allow: only ADMIN')
  } else {
    var requestOptions = {
      method: 'PATCH',
      headers: new Headers({
        Authorization: 'Bearer ' + myStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    }

    const response = await fetch(
      `http://localhost:8762/api/employees/admin/update/${id}?name=${name}`,
      requestOptions
    )

    if (response.status == 200) {
      window.location.reload()
    }
  }
}