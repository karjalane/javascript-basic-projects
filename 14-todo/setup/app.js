// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editId = ''

// ****** SETUP ITEMS **********
const setupItems = () => {
  let items = getLocalStorage()
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value)
    })
    container.classList.add('show-container')
  }
}

const createListItem = (id, value) => {
  const element = document.createElement('article')
    // add class
    element.classList.add('grocery-item')
    // add id
    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `
    <p class="title">${ value }</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    `

    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')

    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    // append child
    list.appendChild(element)
}

// ****** FUNCTIONS **********
const addItem = (e) => {
  e.preventDefault()
  const value = grocery.value
  const id = new Date().getTime().toString()
  if (value && !editFlag) {
    createListItem(id, value)
    // display alert
    displayAlert('Item added', 'success')
    // show container
    container.classList.add('show-container')
    // add to local storage
    addToLocalStorage(id, value)
    // set back to dafault
    setBackToDefault()
  } else if (value && editFlag) {
    editElement.innerHTML = value
    displayAlert('Updated', 'success')
    // edit local storage
    editLocalStorage(editId, value)
    setBackToDefault()
  } else {
    displayAlert('Please enter value', 'danger')
  }
}

// display alert
const displayAlert = (text, action) => {
  alert.textContent = text
  alert.classList.add(`alert-${ action }`)

  // remove alert
  setTimeout(() => {
    alert.textContent = ''
    alert.classList.remove(`alert-${ action }`)
  }, 1000)
}

// set back to default
const setBackToDefault = () => {
  grocery.value = ''
  editFlag = false
  editId = ''
  submitBtn.textContent = 'submit'
}

const clearItems = () => {
  const items = document.querySelector('.grocery-item')

  if (items.length > 0) { items.forEach((item) => {
      list.removeChild(item)
    })
  }
  
  container.classList.remove('show-container')
  localStorage.removeItem('list')
  displayAlert('List discarded', 'success')
}

// delete function
const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement
  const id = element.dataset.id
  list.removeChild(element)

  if (list.children.length === 0) {
    container.classList.remove('show-container')
  }
  displayAlert('Item discarded', 'success')
  setBackToDefault()

  // remove from local storage
  removeFromLocalStorage(id)
}

// edit function
const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement

  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling

  // set form value
  grocery.value = editElement.innerHTML
  editFlag = true
  editId = element.dataset.id
  submitBtn.textContent = 'Edit'
}

// ****** EVENT LISTENERS **********
// submitform
form.addEventListener('submit', addItem)

// cleat items
clearBtn.addEventListener('click', clearItems)

// load items
window.addEventListener('DOMContentLoaded', setupItems)

// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {
  // console.log('Added to local storage')
  const item = { id, value }
  let items = getLocalStorage()
  console.log(items)

  items.push(item)
  localStorage.setItem('list', JSON.stringify(items))
}

const removeFromLocalStorage = (id) => {
  let items = getLocalStorage()
  items = items.filter((item) => {
    if (item.id !== id) {
      return item
    }
  })
  localStorage.setItem('list', JSON.stringify(items))
}

const editLocalStorage = (id, value) => {
 let items = getLocalStorage()
 items = items.map((item) => {
   if (item.id === id) {
     item.value = value
   }
   return item
 })
 localStorage.setItem('list', JSON.stringify(items))
}

const getLocalStorage = () => {
  return localStorage.getItem('list') 
    ? JSON.parse(localStorage.getItem('list'))
    : []
}