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
  if (!event.target.checkValidity()) {
    event.preventDefault();
  } else {
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

    if (myLibrary.length) {
      const emptyMessage = document.querySelector('.empty-message');
      emptyMessage.remove();
    }

    handleCloseDialog();
    event.target.reset();
  }
};

// Handle click to remove a book
const handleRemoveButtonClick = event => {
  const bookId = Number(event.target.dataset.id);
  const libraryItem = document.querySelector(`[data-id="${bookId}"]`);

  myLibrary = myLibrary.filter(book => book.id !== bookId);
  libraryItem.remove();

  if (!myLibrary.length) {
    renderEmptyMessage();
  }
};

// Handle click to toggle read status
const handleToggleReadButtonClick = event => {
  const bookId = Number(event.target.dataset.id);
  const libraryItem = document.querySelector(
    `.library__item[data-id="${bookId}"]`
  );
  const readBadge = libraryItem.querySelector('.badge');

  if (readBadge.classList.contains('badge--success')) {
    readBadge.classList.remove('badge--success');
    readBadge.classList.add('badge--danger');
    readBadge.textContent = 'not read';
  } else {
    readBadge.classList.remove('badge--danger');
    readBadge.classList.add('badge--success');
    readBadge.textContent = 'read';
  }

  const selectedBook = myLibrary.find(book => book.id === bookId);
  selectedBook.toggleReadStatus();
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
       <span class="text-bold badge ${
         book.read ? 'badge--success' : 'badge--danger'
       }">${book.read ? 'read' : 'not read'}</span> •   
      <span class="text-bold">${book.title}</span> by
       <span>${book.author}</span> • <span>${book.pages}</span> pages
    </div>`
  );

  const toggleReadStatusButton = createButton('Toggle Read Status');
  toggleReadStatusButton.classList.add('button', 'button--primary');
  toggleReadStatusButton.dataset.id = book.id;
  toggleReadStatusButton.addEventListener('click', handleToggleReadButtonClick);

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

// Creates and returns an `li` element containing an empty message
const createEmptyMessage = text => {
  return `<li class="empty-message">${text}</li>`;
};

// Insert a empty message element into `#library-list`
const renderEmptyMessage = () => {
  libraryList.insertAdjacentHTML(
    'afterbegin',
    createEmptyMessage(
      'Your library is empty. Click on the “New Book” button above to add some books.'
    )
  );
};

// Insert each of the books into the `#library-list` element
const renderInitialLibrary = initialLibrary => {
  if (!initialLibrary.length) {
    renderEmptyMessage();
  } else {
    initialLibrary.forEach(book =>
      libraryList.insertAdjacentElement('beforeend', createLibraryItem(book))
    );
  }
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

// === MARK: Validation ===
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');

const titleErrorMessage = document.querySelector('.error-message.title');
const authorErrorMessage = document.querySelector('.error-message.author');
const pagesErrorMessage = document.querySelector('.error-message.pages');

const validateRequiredField = (field, errorMessage, errorMessageContainer) => {
  if (field.validity.valid) {
    errorMessageContainer.textContent = '';
  } else {
    if (field.validity.valueMissing) {
      errorMessageContainer.textContent = errorMessage;
    }
  }
};

titleInput.addEventListener('input', () =>
  validateRequiredField(
    titleInput,
    "Please enter the book's name.",
    titleErrorMessage
  )
);

authorInput.addEventListener('input', () =>
  validateRequiredField(
    authorInput,
    "Please enter the author's name.",
    authorErrorMessage
  )
);

pages.addEventListener('input', () =>
  validateRequiredField(
    pagesInput,
    'Please enter the number of pages in the book.',
    pagesErrorMessage
  )
);
