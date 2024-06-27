const express = require('express');
const fs = require('fs');
const app = express();

// -----> Miiddleware 
app.use(express.json());

const port = 8080;

app.get('/', (req, res) => {
     console.log(req);
     return res.send("Home Page");
})

app.get('/books', (req, res) => {
     const data = fs.readFileSync('./books.json', 'utf-8');
     return res.send(data);
})

app.get("/books/:bookId", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  const bookId = Number(req.params.bookId);
  return res.send(
    data?.find((item) => item.id === bookId) || { message: "No books found!" }
  );
});

app.post("/books", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  const book = req.body;
  data.push(book);

  fs.writeFileSync("./books.json", JSON.stringify(data));
  return res.send({
    data: { ...book },
    message: "Book saved successfully!",
  });
});

app.put("/books/:bookId", (req,res) => {
	const bookId = Number(req.params.bookId); 
	const updateBook = req.body; 
	const data = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
	const updateData = data?.map(item => {
	if (item.id == bookId) {
		return {
			... updateBook,
		}
	}
	return item;
})
fs.writeFileSync("./books.json",JSON.stringify(updateData));
return res.send({message: 'Book is updated successfully'})
})

app.delete('/books/:bookId', (req,res) => {
	const bookId = Number (req.params.bookId);
	const data = JSON.parse(fs.readFileSync("./books.json","utf-8"));
	const updateData = data?.filter((item) => item.id != bookId);
	fs.writeFileSync("./books.json",JSON.stringify(updateData));
	return res.send({message: "Book is deleted successfully!" })
})

app.listen(port, () => {
     console.log(`App is running at ${port}`);
})