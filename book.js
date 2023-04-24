import { query, db, where, getDocs, collection ,auth} from "./firebase.config.js";

async function fetchBooks(event) {
  event.preventDefault(); // prevent form submission

  const input = document.querySelector('input[type="text"]');
  const query1 = input.value.trim(); // get search query

  if (!query1) {
    alert("Please enter a search query!");
    return;
  }

  const coll = await collection(db, "booksCollections");

  const bookQuery = query(coll);

  const querySnapshot = await getDocs(bookQuery);
  let booksList = [];
  querySnapshot.forEach((doc) => {
    booksList.push(doc.data());
  });

  booksList =  booksList.filter(book =>{
    return book.title.toLowerCase().includes(query1.toLowerCase())
  })
  console.log(booksList)

  const root = document.querySelector(".books");
  root.innerHTML = ""

  booksList.forEach((book) => {
    const title = book.title;
    const author = book.authors ? book.authors : "Unknown Author";
    const image = book.image;
    const date = book.publishedDate;

    root.insertAdjacentHTML(
      "afterbegin",
      `<div class="book-item" data-bookname="${title}" data-author="${author}">
              <img src="${image}" alt="${title}">
              <div class="book-details ">
                <h3 style='color:white' class="book-title">${title}</h3>
                <p class="book-author">By ${author}</p>
              </div>
              <p class="book-date" >Published on ${date}</p>
              <button>Register</button>
      </div>`
    );
  });
}

document.addEventListener("click", async function (event) {
  const text = event.target.closest(".book-item");

  if (!text) return; // gaurd class

  try{
  await fetch("http://127.0.0.1:3001/sendmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail: auth.currentUser.email,
      subject: `you have taken this book ${text.dataset["bookname"]}`,
      text: `you have taken this book ${text.dataset["bookname"]} and the author was ${text.dataset["author"]}`,
    }),
  });
  alert("email sent")
} catch(error){
  console.log(error)
}
});

document.getElementById("searchForm").addEventListener("submit", fetchBooks);
