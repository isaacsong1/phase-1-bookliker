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
    const title = document.createElement('h2');
    title.textContent = book.title;
    const subtitle = document.createElement('h2');
    subtitle.textContent = book.subtitle;
    const author = document.createElement('h2');
    author.textContent = book.author;
    const description = document.createElement('p');
    description.textContent = book.description;
    const userList = document.createElement('ul');
    
    book.users.forEach(user => {
        const userListItem = document.createElement('li');
        userListItem.textContent = user.username;
        userList.append(userListItem);
    });
    while(showPanel.firstChild) {
        showPanel.removeChild(showPanel.lastChild);
    }

    const btn = document.createElement('button')
    btn.textContent = 'LIKE';
    btn.addEventListener('click', () => updateLikes(book))

    const unlikeBtn = document.createElement('button');
    unlikeBtn.textContent = 'UNLIKE';
    unlikeBtn.addEventListener('click', () => removeLike(book))

    showPanel.append(image, title, subtitle, author, description, userList, btn);
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
    .then(book => displayBookInfo(book))

    // 
}

// const removeLike = book => {
//     fetch(`${BOOKSURL}/${book.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'users': [...book.users, {'id': 1, 'username': 'pouros'}]
//         })
//     })
// }

//! EXECUTE
document.addEventListener("DOMContentLoaded", function() {
    fetch(BOOKSURL)
    .then(resp => resp.json())
    .then(booksArr => booksArr.forEach(book => createBookList(book)))
    
});
