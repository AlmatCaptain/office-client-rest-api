const btn = document.getElementById('room')
let ul = document.getElementById('post')
var decoded = jwt_decode(myStorage.getItem('token'))

var info = document.getElementById('userInfo')
info.innerHTML = `ID: ${myStorage.getItem('id')}<br>UN: ${myStorage.getItem(
  'name'
)}`

function getListOfRooms() {
  fetch('http://localhost:8762/api/rooms')
    .then((response) => response.json())
    .then((json) =>
      json.forEach((d) => {
        let li = document.createElement('li')
        let p = document.createElement('p')
        let br = document.createElement('br')
        let span = document.createElement('span')
        let img = document.createElement('img')
        img.src = 'interface.png'
        img.className = 'del-btn'
        img.setAttribute('onclick', `deleteBtn(${d.number})`)
        p.innerHTML = 'Room'
        span.innerHTML = `${d.number}`
        li.className = 'room-style'
        li.appendChild(p)
        li.appendChild(br)
        li.appendChild(span)
        li.appendChild(br)
        li.appendChild(img)
        ul.appendChild(li)
      })
    )
}

function deleteBtn(id) {
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

    fetch(`http://localhost:8762/api/rooms/admin/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.reload())
      .catch((error) => console.log('error', error))
  }
}

document.getElementById('addRoom').addEventListener('submit', add)

async function add(event) {
  if (decoded.authorities[0] !== 'ADMIN') {
    alert('Not allow: only ADMIN')
  } else {
    event.preventDefault()
    let number = document.getElementById('roomNum').value

    var raw = JSON.stringify({ number: number })

    var requestOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + myStorage.getItem('token'),
        'Content-Type': 'application/json'
      }),
      body: raw
    }

    const response = await fetch(
      'http://localhost:8762/api/rooms/admin/add',
      requestOptions
    )

    if (response.status == 200) {
      window.location.reload()
    }
  }
}

getListOfRooms()
