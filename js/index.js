// Need to show users

//! GLOBAL VARIABLES
const BOOKSURL = 'http://localhost:3000/books';
const ul = document.querySelector('#list');
const showPanel = document.querySelector('#show-panel');

//! HELPERS
const createBookList = book => {
    const li = document.createElement('li');
    li.textContent = book.title;
    ul.appendChild(li);
    li.addEventListener('click', () => displayBookInfo(book));
}

const displayBookInfo = book => {
    const image = document.createElement('img');
    image.src = book['img_url'];
    const description = document.createElement('p');
    description.textContent = book.description;
    const userList = document.createElement('ul');
    
    book.users.forEach(user => {
        const userListItem = document.createElement('li');
        userListItem.textContent = user.username;
        userList.append(userListItem);
    });
    while(userList.firstChild) {
        userList.removeChild(userList.lastChild);
    }

    const btn = document.createElement('button')
    btn.addEventListener('click', () => updateLikes(book))

    showPanel.append(image, description, userList, btn);
}

const updateLikes = book => {
    fetch(`${BOOKSURL}/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'users': [...book.users, {'id': 1, 'username': 'pouros'}]
        })
    })
    .then(resp => resp.json())
    .then(booksArr => booksArr.forEach(book => displayBookInfo(book)))
}


//! EXECUTE
document.addEventListener("DOMContentLoaded", function() {
    fetch(BOOKSURL)
    .then(resp => resp.json())
    .then(booksArr => booksArr.forEach(book => createBookList(book)))
    
});
