const express = require('express');
const app = express();

// -----> Importing
const {
  getBooks, 
  saveBook, 
  getBookById, 
  updateBookById, 
  deleteBooksById
} = require('./controllers/book_controller');

// -----> Miiddleware 
app.use(express.json());

const port = 8080;


app.get('/', (req, res) => {
     console.log(req);
     return res.send("Home Page");
})

app.route("/books").get(getBooks).post(saveBook);

app.route("/books/:bookId").get(getBookById).put(updateBookById).delete(deleteBooksById);


app.listen(port, () => {
     console.log(`App is running at ${port}`);
})