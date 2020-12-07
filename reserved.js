let table = document.getElementById('r-table')
var decoded = jwt_decode(myStorage.getItem('token'))
var info = document.getElementById('userInfo')

info.innerHTML = `ID: ${myStorage.getItem('id')}<br>UN: ${myStorage.getItem(
  'name'
)}`

if (decoded.authorities[0] !== 'ADMIN') {
  document.getElementById('id').readOnly = true
  document.getElementById('emp-id').readOnly = true
  document.getElementById('editBtn').style.visibility = 'hidden'
}

getListOfReserved()

document.getElementById('addEmp').addEventListener('submit', add)
function getListOfReserved() {
  fetch('http://localhost:8762/reserves')
    .then((response) => response.json())
    .then((json) =>
      json.forEach((d) => {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        let img = document.createElement('img')
        let img2 = document.createElement('img')
        let input = document.createElement('input')
        let input2 = document.createElement('input')
        input2.setAttribute('type', 'date')
        let input3 = document.createElement('input')
        input3.setAttribute('type', 'date')

        img.src = 'button.png'
        img.className = 'delx'
        img2.src = 'interface2.png'
        img2.className = 'delx'

        if (decoded.authorities[0] !== 'ADMIN') {
          td1.innerHTML = `${d.id}`
          tr.appendChild(td1)
          td2.innerHTML = `${d.employeeId}`
          tr.appendChild(td2)
          td3.innerHTML = `${d.roomNumber}`
          tr.appendChild(td3)
          if (d.employeeId != myStorage.getItem('id')) {
            img.style.visibility = 'hidden'
            td4.innerHTML = `${d.date}`.replace(/,/g, '-')
            tr.appendChild(td4)
            td5.innerHTML = `${d.toDate}`.replace(/,/g, '-')
            img.setAttribute('onclick', `deleteRes(${d.id})`)
            td5.appendChild(img)
            tr.appendChild(td5)
          } else {
            input2.setAttribute('id', `date-${d.id}`)
            input2.valueAsDate = new Date(`${d.date}`.replace(/,/g, '-'))
            input2.stepUp(1)
            td4.appendChild(input2)
            tr.appendChild(td4)
            input3.setAttribute('id', `todate-${d.id}`)
            input3.valueAsDate = new Date(`${d.toDate}`.replace(/,/g, '-'))
            input3.stepUp(1)
            img.setAttribute('onclick', `deleteRes(${d.id})`)
            img2.setAttribute('onclick', `editReserve(${d.id},${d.roomNumber})`)
            td5.appendChild(input3)
            td5.appendChild(img2)
            td5.appendChild(img)
            tr.appendChild(td5)
          }
        } else {
          td1.innerHTML = `${d.id}`
          tr.appendChild(td1)
          td2.innerHTML = `${d.employeeId}`
          tr.appendChild(td2)
          td3.innerHTML = `${d.roomNumber}`
          tr.appendChild(td3)
          td4.innerHTML = `${d.date}`.replace(/,/g, '-')
          tr.appendChild(td4)
          td5.innerHTML = `${d.toDate}`.replace(/,/g, '-')
          img.setAttribute('onclick', `deleteRes(${d.id})`)
          td5.appendChild(img)
          tr.appendChild(td5)
        }

        table.appendChild(tr)
      })
    )
}

async function add(event) {
  event.preventDefault()
  let empid = document.getElementById('emp-id').value
  let room = document.getElementById('room-num').value
  let date = document.getElementById('date').value
  let todate = document.getElementById('toDate').value

  if (decoded.authorities[0] !== 'ADMIN') {
    empid = myStorage.getItem('id')
  }

  var raw = JSON.stringify({
    employeeId: empid,
    roomNumber: room,
    date: date,
    toDate: todate
  })

  var requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + myStorage.getItem('token'),
      'Content-Type': 'application/json'
    }),
    body: raw
  }

  const response = await fetch(
    'http://localhost:8762/api/reserves/add',
    requestOptions
  )

  if (response.status == 200) {
    window.location.reload()
  }
}

async function editReserve(resId, roomN) {
  let id = document.getElementById('id').value
  let empid = document.getElementById('emp-id').value
  let room = document.getElementById('room-num').value
  let date = document.getElementById('date').value
  let todate = document.getElementById('toDate').value

  if (decoded.authorities[0] !== 'ADMIN') {
    id = resId
    empid = myStorage.getItem('id')
    room = roomN
    date = document.getElementById(`date-${resId}`).value
    todate = document.getElementById(`todate-${resId}`).value
  }

  var raw = JSON.stringify({
    id: id,
    employeeId: empid,
    roomNumber: room,
    date: date,
    toDate: todate
  })

  var requestOptions = {
    method: 'PUT',
    headers: new Headers({
      Authorization: 'Bearer ' + myStorage.getItem('token'),
      'Content-Type': 'application/json'
    }),
    body: raw
  }

  const response = await fetch(
    `http://localhost:8762/reserves/update/${id}`,
    requestOptions
  )

  if (response.status == 200) {
    window.location.reload()
  }
}

function deleteRes(id) {
  var requestOptions = {
    method: 'DELETE',
    headers: new Headers({
      Authorization: 'Bearer ' + myStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  fetch(`http://localhost:8762/reserves/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => window.location.reload())
    .catch((error) => console.log('error', error))
}

function find() {
  table.innerHTML = `<tr>
  <th>ID</th>
  <th>Employee ID</th>
  <th>Room number</th>
  <th>Date</th>
  <th>To date</th>
</tr>`
  let e = document.getElementById('roomNum').value
  fetch(`http://localhost:8762/reserves/${e}`)
    .then((response) => response.json())
    .then((json) =>
      json.forEach((d) => {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        let img = document.createElement('img')
        let img2 = document.createElement('img')
        let input = document.createElement('input')
        let input2 = document.createElement('input')
        input2.setAttribute('type', 'date')
        let input3 = document.createElement('input')
        input3.setAttribute('type', 'date')

        img.src = 'button.png'
        img.className = 'delx'
        img2.src = 'interface2.png'
        img2.className = 'delx'

        if (decoded.authorities[0] !== 'ADMIN') {
          td1.innerHTML = `${d.id}`
          tr.appendChild(td1)
          td2.innerHTML = `${d.employeeId}`
          tr.appendChild(td2)
          td3.innerHTML = `${d.roomNumber}`
          tr.appendChild(td3)
          if (d.employeeId != myStorage.getItem('id')) {
            img.style.visibility = 'hidden'
            td4.innerHTML = `${d.date}`.replace(/,/g, '-')
            tr.appendChild(td4)
            td5.innerHTML = `${d.toDate}`.replace(/,/g, '-')
            img.setAttribute('onclick', `deleteRes(${d.id})`)
            td5.appendChild(img)
            tr.appendChild(td5)
          } else {
            input2.setAttribute('id', `date-${d.id}`)
            input2.valueAsDate = new Date(`${d.date}`.replace(/,/g, '-'))
            input2.stepUp(1)
            td4.appendChild(input2)
            tr.appendChild(td4)
            input3.setAttribute('id', `todate-${d.id}`)
            input3.valueAsDate = new Date(`${d.toDate}`.replace(/,/g, '-'))
            input3.stepUp(1)
            img.setAttribute('onclick', `deleteRes(${d.id})`)
            img2.setAttribute('onclick', `editReserve(${d.id},${d.roomNumber})`)
            td5.appendChild(input3)
            td5.appendChild(img2)
            td5.appendChild(img)
            tr.appendChild(td5)
          }
        } else {
          td1.innerHTML = `${d.id}`
          tr.appendChild(td1)
          td2.innerHTML = `${d.employeeId}`
          tr.appendChild(td2)
          td3.innerHTML = `${d.roomNumber}`
          tr.appendChild(td3)
          td4.innerHTML = `${d.date}`.replace(/,/g, '-')
          tr.appendChild(td4)
          td5.innerHTML = `${d.toDate}`.replace(/,/g, '-')
          img.setAttribute('onclick', `deleteRes(${d.id})`)
          td5.appendChild(img)
          tr.appendChild(td5)
        }
        table.appendChild(tr)
      })
    )
}
