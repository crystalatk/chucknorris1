'use strict';


const showModal = document.querySelector('#showModal');
const closeModal = document.querySelector('#closeModal');

showModal.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);

function toggleModal() {
    const modalOverlay = document.querySelector("#overlay");
    modalOverlay.classList.toggle("visible");
}

function getQuote(category) {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    get(url).then(function (response) {
        updateBody(response.value);
    });
}

function getCategories() {
    const url = 'https://api.chucknorris.io/jokes/categories'
    get(url).then(function (response) {
        buildCategoryList(response);
    })
}

function updateBody(quote) {
    const modal = document.querySelector('#modal');

    // Find and remove any existing paragraphs.
    const paragraphs = document.querySelectorAll('p');
    if (paragraphs.length >0) {
        paragraphs.forEach(function (paragraph) {
            paragraph.remove();
        })
    }
    const paragraph = document.createElement('p');
    paragraph.setAttribute("id", "currentQuote")
    paragraph.innerHTML = quote;
    modal.appendChild(paragraph);
}

function buildCategoryList(categoryList) {
    // Filter out the 'explicit' and 'celbrity' category
    const filteredList = categoryList.filter(function (category) {
        return category !== 'explicit' && category !== 'celebrity';
    })
    const form = document.querySelector('#changeQuote')
    const categorySelect = document.createElement('select');
    filteredList.map(function (category) {
        const categoryOption = document.createElement('option');
        categoryOption.value = category;
        categoryOption.text = category;
        categorySelect.appendChild(categoryOption);
    });
    form.appendChild(categorySelect);

    const showQuoteButton = document.querySelector('#showModal');
    const dropDown = document.querySelector('select');
    showQuoteButton.addEventListener('click', function (event) {
        console.log("Button is clicked! Shit is going down!");
        const currentQuote = document.querySelector('#currentQuote');
        currentQuote.innerHTML = "Loading awesome quote!";
        getQuote(dropDown.value);
    })
}

getCategories();
getQuote('dev');
