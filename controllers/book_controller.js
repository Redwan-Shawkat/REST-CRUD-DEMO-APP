/** @format */

const fs = require("fs");

module.exports.getBooks = (req, res) => {
  const data = fs.readFileSync("./books.json", "utf-8");
  return res.send(data);
};


module.exports.saveBook = (req, res) => {
  const data = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  const book = req.body;
  data.push(book);

  fs.writeFileSync("./books.json", JSON.stringify(data));
  return res.send({
    data: { ...book },
    message: "Book saved successfully!",
  });
};

module.exports.getBookById = (req, res) => {
  const data = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  const bookId = Number(req.params.bookId);
  return res.send(
    data?.find((item) => item.id === bookId) || {
      message: "No books found!",
    }
  );
};

module.exports.updateBookById = (req, res) => {
  const bookId = Number(req.params.bookId);
  const updateBook = req.body;
  const data = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  const updateData = data?.map((item) => {
    if (item.id == bookId) {
      return {
        ...updateBook,
      };
    }
    return item;
  });
  fs.writeFileSync("./books.json", JSON.stringify(updateData));
  return res.send({ message: "Book is updated successfully" });
};

module.exports.deleteBooksById = (req, res) => {
  const bookId = Number(req.params.bookId);
  const data = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  const updateData = data?.filter((item) => item.id != bookId);
  fs.writeFileSync("./books.json", JSON.stringify(updateData));
  return res.send({ message: "Book is deleted successfully!" });
};