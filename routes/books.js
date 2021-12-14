const express = require("express");
const Joi = require("joi");
const router = express.Router();


const books = [
    { id: 1, name: "clear code" },
    { id: 2, name: "puthon" },
    { id: 3, name: "Node js" },
  ];
  
  
  
  router.get("/", (req, res) => {
    res.send(books);
  });
  
  // app.get("//:year/:month", (req, res) => {
  //   res.send(req.query);
  // });
  
  router.get("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
  
    if (!book) {
      return res.status(404).send(`berilgan id li kitob topilmadi`);
    }
  
    res.send(book);
  });
  
  
  // http POST metodi
  router.post("/", (req, res) => {
    const {error} = validateBook(req.body)
  
    if (error) {
       return res.status(400).send(error);
    }
  
    const new_book = {
      id: books.length + 1,
      name: req.body.name,
    };
  
    books.push(new_book);
  
    res.status(201).send(new_book);
  });
  
  
  // http PUT metodi
  router.put("/:id", (req, res) => {
    // kitobni bazadan izlab topish
    //agarda kitob mavjud bulmasa, 404 qaytarish
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).send(`berilgan id li kitob topilmadi`);
    }
    
    //agarda kitob topilsa, surovni valitatsiya qilish
    // agarda kitob valitatsiyadan utmasa, 404 qaytarish
    const {error} = validateBook(req.body)
  
    if (error) {
       return res.status(400).send(error.details[0].message);
    }
  
    //kitobni yangilash
    book.name = req.body.name
    // yangilangan kitobni qaytarish
    res.send(book)
  
    console.log(books);
  });
  
  
  router.delete("/:id", (req, res) =>{
    // kitobni id buyicha topamiz
    // agar topilmasa, 404 qaytaramiz
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).send(`berilgan id li kitob topilmadi`);
    }
  
    // topilsa u kitobni uchiramiz
    const bookId = books.indexOf(book)
    books.splice(bookId, 1)
    // topilgan kitoblarni qaytarib beramiz
    res.send(book)
  })
  
  
  function validateBook(book){
    const Schema = Joi.object( {
      name: Joi.string().required().min(3),
    });
  
    return Schema.validate(book)
  
  }
  

  module.exports = router