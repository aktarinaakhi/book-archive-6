//toggles
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('display-books').style.display = displayStyle;
}

const toggleBooksCount = displayStyle => {
    document.getElementById('books_count').style.display = displayStyle;
}
const toggleBooksError = displayStyle => {
    document.getElementById('books-error').style.display = displayStyle;
}

// search load from input field
const searchBook = () => {
    //show spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    toggleBooksCount('none');
    const searchField = document.getElementById('search-book');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => displaySearchBook(data.docs))

    //count book number api call
    const url2 = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url2)
        .then(Response => Response.json())
        .then(data => displayNumber(data.numFound))

}

//display total number of books
const displayNumber = number => {
    const displayBookNumber = document.getElementById('books_count');
    displayBookNumber.textContent = '';
    if (!number || number === 0) {
        toggleBooksCount('none');

    }
    else {
        const booksCountDiv = document.createElement('h5')
        booksCountDiv.innerHTML = `${number} books are found`;
        displayBookNumber.appendChild(booksCountDiv);
    }
}

//display result of search book
const displaySearchBook = books => {
    const displayBookDiv = document.getElementById('display-books');
    displayBookDiv.innerHTML = '';

    //if books are not found
    if (!books || books.length === 0) {
        toggleBooksError('block');
        toggleSpinner('none');
    }
    else {
        books?.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 shadow">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${book.title ? book.title : 'Not Available'}</h5>
                            <p class="card-text">Author : ${book.author_name ? book.author_name : 'Not Available'}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Published : ${book.first_publish_year ? book.first_publish_year : 'Not Available'}</small>
                        </div>
                </div>

                    `;
            displayBookDiv.appendChild(div);

        });
        toggleSpinner('none');
        toggleSearchResult('inline-flex');
        toggleBooksCount('block');
    }
}