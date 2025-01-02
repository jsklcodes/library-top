// References to the necessary HTML elements
const libraryList = document.querySelector('#library-list');
const addBookForm = document.querySelector('#add-book-form');

// === MARK: Utils ===
const generateId = (() => {
  let id = 0;
  return () => id++;
})();

// === MARK: Data ===
// Initial data structure containing instances of `Book`
let myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
  new Book('1984', 'George Orwell', 328, false),
  new Book('Pride and Prejudice', 'Jane Austen', 432, true),
  new Book('The Catcher in the Rye', 'J.D. Salinger', 234, false),
  new Book('To Kill a Mockingbird', 'Harper Lee', 281, true),
];

// === MARK: Book ===
// Constructor function for books
function Book(title, author, pages, read) {
  this.id = generateId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Method to toggle read status in `Book instances`
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
  return this.read;
};

// === MARK: Events ===
// Handle submission of the `#add-book-form`
const handleFormSubmit = event => {
  event.preventDefault();

  const [title, author, pages, read] = event.target.elements;
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );

  myLibrary.push(newBook);
  libraryList.insertAdjacentElement('beforeend', createLibraryItem(newBook));

  handleCloseDialog();
  event.target.reset();
};

// Handle click to remove a book
const handleRemoveButtonClick = event => {
  const bookId = Number(event.target.dataset.id);
  const libraryItem = document.querySelector(`[data-id="${bookId}"]`);
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  libraryItem.remove();
};

// === MARK: DOM ===
// Generic button creation
const createButton = text => {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
};

// Creates and returns an `li` element containing book information
const createLibraryItem = book => {
  const libraryItem = document.createElement('li');
  libraryItem.classList.add('library__item');
  libraryItem.dataset.id = book.id;
  libraryItem.insertAdjacentHTML(
    'afterbegin',
    `<div class="library__info">
       <span class="text-bold">${book.title}</span> by
       <span>${book.author}</span> • <span>${book.pages}</span> pages •
       <span class="text-bold">Not read</span>
    </div>`
  );

  const toggleReadStatusButton = createButton('Toggle Read Status');
  toggleReadStatusButton.classList.add('button', 'button--primary');

  const removeButton = createButton('Remove');
  removeButton.classList.add('button', 'button--outline');
  removeButton.dataset.id = book.id;
  removeButton.addEventListener('click', handleRemoveButtonClick);

  const libraryActions = document.createElement('div');
  libraryActions.classList.add('library__actions');

  libraryActions.append(toggleReadStatusButton, removeButton);
  libraryItem.appendChild(libraryActions);

  return libraryItem;
};

// Insert each of the books into the `#library-list` element
const renderInitialLibrary = initialLibrary => {
  initialLibrary.forEach(book =>
    libraryList.insertAdjacentElement('beforeend', createLibraryItem(book))
  );
};

addBookForm.addEventListener('submit', handleFormSubmit);
renderInitialLibrary(myLibrary);

// === MARK: Dialog ===
// Logic to make the `dialog` element interactive
const addBookDialog = document.querySelector('#add-book-dialog');
const openDialogButton = document.querySelector('#open-dialog-button');
const closeDialogButton = document.querySelector('#close-dialog-button');

const handleOpenDialog = () => addBookDialog.showModal();
const handleCloseDialog = () => addBookDialog.close();

openDialogButton.addEventListener('click', handleOpenDialog);
closeDialogButton.addEventListener('click', handleCloseDialog);
