const express = require("express");
const Joi = require("joi");
const app = express();
const logger = require("./middleware/logger")
const auht = require("./auth");
const helmet = require("helmet")
const morgan = require("morgan")
const config = require("config")
const books = require("./routes/books")
const home = require("./routes/home")



app.use(express.json());
app.use(helmet());
app.use(express.urlencoded( {extended:true} ));
app.use(auht);
app.use(express.static("./public"));
app.set('view engine', 'pug');
app.use("/api/books", books);
app.use("/", home);


if (app.get('env') === 'development') {
  app.use(morgan("tiny"));
}  


// console.log(config.get("name"))
// console.log(config.get("mailserver.host"))
// console.log(config.get("mailserver.password"))


// http GET method
// app.get("/", (req, res) => {
//   res.render("index",{title:"my express app", greeting: "assalomu alaykum"})
// });

// const books = [
//   { id: 1, name: "clear code" },
//   { id: 2, name: "puthon" },
//   { id: 3, name: "Node js" },
// ];



// app.get("/api/books", (req, res) => {
//   res.send(books);
// });

// // app.get("/api/books/:year/:month", (req, res) => {
// //   res.send(req.query);
// // });

// app.get("/api/books/:id", (req, res) => {
//   const book = books.find((b) => b.id === parseInt(req.params.id));

//   if (!book) {
//     return res.status(404).send(`berilgan id li kitob topilmadi`);
//   }

//   res.send(book);
// });


// // http POST metodi
// app.post("/api/books", (req, res) => {
//   const {error} = validateBook(req.body)

//   if (error) {
//      return res.status(400).send(error);
//   }

//   const new_book = {
//     id: books.length + 1,
//     name: req.body.name,
//   };

//   books.push(new_book);

//   res.status(201).send(new_book);
// });


// // http PUT metodi
// app.put("/api/books/:id", (req, res) => {
//   // kitobni bazadan izlab topish
//   //agarda kitob mavjud bulmasa, 404 qaytarish
//   const book = books.find((b) => b.id === parseInt(req.params.id));
//   if (!book) {
//     return res.status(404).send(`berilgan id li kitob topilmadi`);
//   }
  
//   //agarda kitob topilsa, surovni valitatsiya qilish
//   // agarda kitob valitatsiyadan utmasa, 404 qaytarish
//   const {error} = validateBook(req.body)

//   if (error) {
//      return res.status(400).send(error.details[0].message);
//   }

//   //kitobni yangilash
//   book.name = req.body.name
//   // yangilangan kitobni qaytarish
//   res.send(book)

//   console.log(books);
// });


// app.delete("/api/books/:id", (req, res) =>{
//   // kitobni id buyicha topamiz
//   // agar topilmasa, 404 qaytaramiz
//   const book = books.find((b) => b.id === parseInt(req.params.id));
//   if (!book) {
//     return res.status(404).send(`berilgan id li kitob topilmadi`);
//   }

//   // topilsa u kitobni uchiramiz
//   const bookId = books.indexOf(book)
//   books.splice(bookId, 1)
//   // topilgan kitoblarni qaytarib beramiz
//   res.send(book)
// })


// function validateBook(book){
//   const Schema = Joi.object( {
//     name: Joi.string().required().min(3),
//   });

//   return Schema.validate(book)

// }


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} listening on`);
});


// virtualdars.com/api/categories 
