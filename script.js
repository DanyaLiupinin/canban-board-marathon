const items = document.querySelectorAll('.item')
const placeholders = document.querySelectorAll('.placeholder')
let activeItem
let activePlaceholder

items.forEach((item) => {
    item.addEventListener('dragstart', dragstart)
    item.addEventListener('dragend', dragend)
})

function addListeners() {
    const items = document.querySelectorAll('.item')

    items.forEach((item) => {
        item.addEventListener('dragstart', dragstart)
        item.addEventListener('dragend', dragend)
    })
}

function dragstart(e) {
    activePlaceholder = e.target.closest('.placeholder')
    activeItem = e.target
    e.target.classList.add('item__draggable')

    setTimeout(() => {
        e.target.classList.add('item__hidden')
    }, 50)
}

function dragend(e) {
    e.target.classList.remove('item__draggable')
    e.target.classList.remove('item__hidden')
}

placeholders.forEach((placeholder) => {
    placeholder.addEventListener('dragover', dragover) // когда находимся над любым плейсхолдером
    placeholder.addEventListener('dragenter', dragenter) // когда заходим на территорию плейсхолдера
    placeholder.addEventListener('dragleave', dragleave) // когда ушли с территории плейсхолдера
    placeholder.addEventListener('drop', dragdrop) // когда отпустили
})

function dragover(e) {
    e.preventDefault()
}

function dragenter(e) {

    e.target.classList.add('placeholder__enter')
}

function dragleave(e) {

    e.target.classList.remove('placeholder__enter')
}

function dragdrop(e) {
    if (e.target !== activePlaceholder) {
        e.target.classList.remove('placeholder__enter')
        e.target.append(activeItem)
    }
}

// popup

const popup = document.querySelector('.popup')
const addButton = document.querySelector('.add-button')
const wrapper = document.querySelector('.popup__wrapper')
const input = document.querySelector('.popup__input')
const form = document.querySelector('.popup__form')
const todo = document.querySelector('.placeholder__start')
let itemCounter = 1

addButton.addEventListener('click', popupActive)

function popupActive() {
    popup.classList.add('popup_active')
    wrapper.classList.add('wrapper_active')
}

document.addEventListener('click', (e) => {
    if (e.target === wrapper) {
        closePopup()
        clearPopup()
    }
})

function closePopup() {
    popup.classList.remove('popup_active')
    wrapper.classList.remove('wrapper_active')
}

function clearPopup() {
    input.value = ''
}

form.addEventListener('submit', submitForm)

function submitForm(e) {
    e.preventDefault()
    const card = document.querySelector('.item').cloneNode()
    card.textContent = input.value
    card.id = String(itemCounter + 1)
    itemCounter = itemCounter + 1
    todo.append(card)
    addListeners()
    closePopup()
    clearPopup()
}