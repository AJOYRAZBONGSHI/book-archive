document.getElementById("error-message").style.display = "none";
document.getElementById("spinner").style.display = "none";
document.getElementById("error-message2").style.display = "none";
// get data
const getResult = () => {
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  // data clear
  inputField.value = "";

  // manage empty search request
  if (searchText === "") {
    // please write something to display
    displayError();
  } else {
    // Display Spinner
    document.getElementById("spinner").style.display = "block";
    // Hide error
    document.getElementById("error-message").style.display = "none";
    // Clear Team Details
    document.getElementById("search-item").textContent = "";
    // Clear Search Result
    document.getElementById("book-container").textContent = "";
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data.docs));
  }
};

// error function
const displayError = () => {
  document.getElementById("error-message").style.display = "block";
  document.getElementById("spinner").style.display = "none";
  document.getElementById("error-message2").style.display = "none";
  document.getElementById("search-item").textContent = "";
  document.getElementById("book-container").textContent = "";
};

// display search data
const displayData = (books) => {
  // spinner display none
  document.getElementById("spinner").style.display = "none";
  // search items
  const searchItem = document.getElementById("search-item");
  searchItem.innerHTML = `<h3 class="text-info">Search result found ${books.length}</h3>`;
  // books show container
  const bookContainer = document.getElementById("book-container");

  if (books.length === 0) {
    // display error massage
    document.getElementById("error-message2").style.display = "block";
  } else {
    // display  all books
    books.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add = "col";
      div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top" alt="book">
            <div class="card-body">
                <h5 class="card-title">Book name: ${book?.title}</h5>
                <h5 class="card-title">Author name: ${book?.author_name}</h5>
                <h5 class="card-title">Publisher date: ${book?.first_publish_year}</h5>
            </div>
        </div>
    `;
      bookContainer.appendChild(div);
    });
  }
};
