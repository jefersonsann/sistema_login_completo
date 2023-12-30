const form = document.getElementById('form')
const userName = document.getElementById('userName')
const password = document.getElementById('password')
const checkAutoLogin = document.getElementById('autoLogin')

const users = JSON.parse(localStorage.getItem('Users')) || []
const key = sessionStorage.getItem('key')

if (key) {
  location.href = './'
}

function errorExist(children, color) {
  const div = document.createElement('div')
  div.classList = 'form_erro'
  div.style.color = color
  div.innerText = children

  return div
}

function handleChangeUserName(event) {
  const errorDiv = userName.parentNode.querySelector('.form_erro')
  if (event.target) {
    if (errorDiv) {
      userName.parentNode.lastChild.remove()
    }
    userName.style.borderColor = 'white'
  }
}
function handleSubmitLogin(e) {
  e.preventDefault()

  const loginUser = users.some(
    (item) => item.userName === userName.value || item.email === userName.value,
  )
  const loginPass = users.some((item) => item.password === password.value)

  if (loginUser && loginPass) {
    form.innerText = 'Login realizado com sucesso!'
    if (checkAutoLogin.checked) {
      users.filter((item, key) => {
        if (item.userName === userName.value) {
          sessionStorage.setItem('key', key)
        }
      })
      return (location.href = './')
    }
  } else {
    const errorDiv = userName.parentNode.querySelector('.form_erro')
    if (loginUser) {
      userName.style.borderColor = '#04AA6D'

      password.style.borderColor = 'red'
      password.parentNode.appendChild(errorExist('Senha incorreta!', 'red'))
      if (errorDiv) {
        userName.parentNode.lastChild.remove()
      }
    } else {
      if (errorDiv) {
        userName.parentNode.lastChild.remove()
      }
      userName.style.borderColor = 'red'
      userName.parentNode.appendChild(errorExist('Usuario incorreto!', 'red'))

      password.value = ''
    }
  }
}

userName.addEventListener('change', handleChangeUserName)
form.addEventListener('submit', handleSubmitLogin)
