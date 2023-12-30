const form = document.getElementById('form')
const userName = document.getElementById('userName')
const _name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const ConfirmPassword = document.getElementById('ConfirmPassword')

let users = JSON.parse(localStorage.getItem('Users')) || []

const newUser = () => {
  const id = Math.floor(Math.random() * 10000000)
  const user = {
    _id: id,
    userName: userName.value,
    name: _name.value,
    email: email.value,
    password: password.value,
    date: new Date(),
  }

  const formBtn = document.querySelector('.form_btn')
  formBtn.setAttribute('disabled', true)
  form.setAttribute('disabled', true)

  setTimeout(() => {
    try {
      users.push(user)
      localStorage.setItem('Users', JSON.stringify(users))
      location.reload()
    } catch (error) {
      throw new error('Erro: ' + error)
    } finally {
      formBtn.removeAttribute('disabled', false)
      form.removeAttribute('disabled', false)
      location.href = './login.html'
    }
  }, 3000)
}

async function handleSubmit(e) {
  e.preventDefault()
  await newUser()
}

function errorExist(children, color) {
  const div = document.createElement('div')
  div.classList = 'form_erro'
  div.style.color = color
  div.innerText = children

  return div
}

function userNameExist(e) {
  if (users.some((item) => item.userName === e.target.value)) {
    userName.style.borderColor = 'red'
    userName.parentNode.lastChild.remove()
    userName.parentNode.appendChild(
      errorExist('Nome de usuario já existente.', 'red'),
    )
  } else {
    userName.style.borderColor = '#04AA6D'
    userName.parentNode.lastChild.remove()
    userName.parentNode.appendChild(
      errorExist('Nome de usuario disponivel', '#04AA6D'),
    )
  }
  return e.target.value
}

function changeEmail(e) {
  const emailExist = users.some((item) => item.email === e.target.value)
  const errorDiv = email.parentNode.querySelector('.form_erro')

  if (emailExist) {
    email.parentNode.appendChild(
      errorExist('Email digitado já cadastrado', 'red'),
    )
    email.style.borderColor = 'red'
  } else {
    if (errorDiv) {
      email.parentNode.removeChild(errorDiv)
    }
    email.style.borderColor = '#04AA6D'
  }
  return
}

function chandePassword(e) {
  if (e.target.value.length >= 3) {
    ConfirmPassword.removeAttribute('disabled')
  } else {
    ConfirmPassword.setAttribute('disabled', true)
  }
  return
}

function changeConfirmPassword(e) {
  const errorDiv = ConfirmPassword.parentNode.querySelector('.form_erro')

  if (password.value !== e.target.value) {
    ConfirmPassword.style.borderColor = 'red'
    if (!errorDiv && ConfirmPassword.value.length > 3) {
      const errorElement = errorExist('Senha diferente da digitada acima')
      errorElement.classList.add('error-div') // Adiciona uma classe ao elemento injetado
      ConfirmPassword.parentNode.appendChild(errorElement)
    }
  }

  if (password.value === e.target.value) {
    ConfirmPassword.style.borderColor = '#04AA6D'

    if (errorDiv) {
      ConfirmPassword.parentNode.removeChild(errorDiv) // Remove o elemento injetado
    }
  }

  return e.target.value
}

// Ouvintes de eventos
userName.addEventListener('change', userNameExist)
email.addEventListener('change', changeEmail)
password.addEventListener('change', chandePassword)
ConfirmPassword.addEventListener('change', changeConfirmPassword)
form.addEventListener('submit', handleSubmit)
