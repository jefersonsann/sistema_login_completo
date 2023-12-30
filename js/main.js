const navLinks = document.querySelector('.navLinks')
const userName = document.querySelector('.userName')
const userImage = document.querySelector('.userImage')
const formImage = document.querySelector('#formImage')
const formImageBtn = document.querySelector('.btnSetImage')
const btnCancelImage = document.querySelector('.btnCancelImage')
const formName = document.querySelector('#formName')
const formNameBtn = document.querySelector('#formName button')

setTimeout(() => {
  const newName = document.querySelector('#newName')
  return newName
}, 100)

const users = JSON.parse(localStorage.getItem('Users')) || []
const key = sessionStorage.getItem('key')

let user = users[key]

function insertNewName(propName) {
  const input = document.createElement('input')
  input.type = 'text'
  input.id = 'newName'
  input.name = 'newName'
  input.value = propName

  return input
}

if (user) {
  navLinks.innerHTML = `
    <div class="navLink">
      <a href="./">logout</a>
    </div>
  `

  function handleClickImage() {
    formImage.style.display = 'flex'
  }

  function handleSetImage(urlImage) {
    users[key].avatar
      ? (userImage.style.backgroundImage = `url(${urlImage})`)
      : (formImage.style.display = 'flex')
  }
  handleSetImage(users[key].avatar)

  function handleSubmitImage(event) {
    event.preventDefault()
    const formImageinput = document.querySelector('#formImage input')

    if (formImageinput.value !== '') {
      users[key].avatar = formImageinput.value
      localStorage.setItem('Users', JSON.stringify(users))
      handleSetImage(users[key].avatar)
      formImageBtn.style.display = 'none'
      formImage.style.display = 'none'
    }
  }

  // Obtendo e setando nome na home page!
  formName.appendChild(insertNewName(user.name))

  function handleNewName() {
    if (newName.value !== user.name) formNameBtn.style.display = 'block'
    else formNameBtn.style.display = 'none'
  }

  function submitNewName(e) {
    e.preventDefault()

    users[key].name = newName.value
    localStorage.setItem('Users', JSON.stringify(users))
    formNameBtn.style.display = 'none'
  }

  function handleLogout() {
    sessionStorage.removeItem('key')
  }

  navLinks.children[0].children[0].addEventListener('click', handleLogout)
  userImage.addEventListener('click', () => (formImage.style.display = 'flex'))
  btnCancelImage.addEventListener('click', () => location.reload())
  formImage.addEventListener('submit', handleSubmitImage)
  newName.addEventListener('change', handleNewName)
  formName.addEventListener('submit', submitNewName)
} else {
  location.href = './login.html'
}
