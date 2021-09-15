let myLibrary = [];


const addBookTitle = document.getElementById('title');
const addBookAuthor = document.getElementById('author');
const addBookPageCount = document.getElementById('page-count');
const addBookWasRead = document.getElementById('was-read');

const bookTable = document.querySelector('.table');
const btnAdd = document.querySelector('.add');

const READ_TEXT = 'Read';
const UNREAD_TEXT = 'Unread';


function Book() {
    this.id;
    this.title;
    this.author;
    this.numberOfPages;
    this.wasRead = false;
}
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.wasRead ? 'was read' : 'not yet read'}`;
}

function getNewId() {
    if (myLibrary.length == 0)
        return 0;
    return Math.max(myLibrary.map(book => book.id)) + 1;
}

function clearAddBookFields() {
    addBookTitle.value = '';
    addBookAuthor.value = '';
    addBookPageCount.value = '';
    addBookWasRead.value = '';
}



function addBookToLibrary() {

    let book = new Book();
    book.id = getNewId();
    book.title = addBookTitle.value;
    book.author = addBookAuthor.value;
    book.numberOfPages = addBookPageCount.value;
    book.wasRead = addBookWasRead.value;
    myLibrary.push(book);
    addBookToTable(book);
    clearAddBookFields();


}

function deleteBook(bookID) {
    let datarows = bookTable.querySelectorAll('tr');
    for(let i = 0; i < datarows.length; i++)
    {
        if(datarows[i].dataset.id == bookID) {
            bookTable.removeChild(datarows[i]);
            break;
        }
    }

    let bookIdx = myLibrary.indexOf(x=> x.id == bookID);
    if(bookIdx > -1)
        myLibrary.slice(bookIdx, 1);
}

function toggleRead(id)
{
    let book = getBookByID(id);
    book.wasRead = !book.wasRead;
    let row = getRowByID(id);

    let wasReadCell = row.querySelector('.was-read');
    wasReadCell.textContent = book.wasRead ? READ_TEXT : UNREAD_TEXT;

    let editButton = row.querySelector('.toggle-read');
    setReadToggleButtonText(editButton, book.wasRead);
}

function getBookByID(id)
{
    return myLibrary.find(book=> book.id == id);
}

function getRowByID(id)
{
    return Array.from( bookTable.querySelectorAll('tr')).find(row => row.dataset.id == id);
}

function setReadToggleButtonText(button,  wasRead)
{
    button.textContent = wasRead ? 'Mark Unread' : 'Mark Read';
}

function addBookToTable(book) {
    let bookRow = document.createElement('tr');
    bookRow.dataset.id = book.id;
    let rowTitle = document.createElement('td');
    let rowAuthor = document.createElement('td');
    let rowPageCount = document.createElement('td');
    let rowWasRead = document.createElement('td');
    let rowToggleRead = document.createElement('td');
    let rowDelete = document.createElement('td');

    rowTitle.classList.add('title');
    rowTitle.textContent = book.title;
    rowAuthor.classList.add('author');
    rowAuthor.textContent = book.author;
    rowPageCount.classList.add('page-count');
    rowPageCount.textContent = book.numberOfPages;
    rowWasRead.classList.add('was-read');
    rowWasRead.textContent = book.wasRead ? READ_TEXT : UNREAD_TEXT;

    let readToggleButton = document.createElement('button');
    setReadToggleButtonText(readToggleButton, book.wasRead);
    readToggleButton.dataset.id = book.id;
    readToggleButton.classList.add('toggle-read');
    readToggleButton.addEventListener('click', (e) => 
    {
        toggleRead(e.target.dataset.id)
    });
    rowToggleRead.appendChild(readToggleButton);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'
    deleteButton.dataset.id = book.id;
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', (e) => 
    {
        deleteBook(e.target.dataset.id)
    });
    rowDelete.appendChild(deleteButton);


    bookRow.appendChild(rowTitle);
    bookRow.appendChild(rowAuthor);
    bookRow.appendChild(rowPageCount);
    bookRow.appendChild(rowWasRead);
    bookRow.appendChild(rowToggleRead);
    bookRow.appendChild(rowDelete);
    bookTable.appendChild(bookRow);
}





btnAdd.addEventListener('click', addBookToLibrary);


let firstBook = new Book();
firstBook.id = getNewId();
firstBook.title = "A Song of Ice and Fire";
firstBook.author = 'George R.R. Martin';
firstBook.numberOfPages = 694;
firstBook.wasRead = true;
myLibrary.push(firstBook);
addBookToTable(firstBook);

console.log(getNewId());