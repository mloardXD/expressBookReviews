const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let bookList = JSON.parse(JSON.stringify(books, null, 4))

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});


//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  ///Write your code here

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})

    .then((successMessage) => {
        return res.status(300).json({books: bookList});
      })
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here  
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})

    .then((successMessage) => {
        return res.status(300).json(bookList[req.params.isbn]);
      })
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  let a = req.params.author

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})

    .then((successMessage) => {
        for (const [key, value] of Object.entries(bookList)) {
            if (value["author"] == a){
                return res.status(300).json(bookList[key]);
            }
          }
          return res.status(300).json({message: "There is no book with that Author"});
      })
  
  
  
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let a = req.params.title
  
  for (const [key, value] of Object.entries(bookList)) {
    if (value["title"] == a){
        return res.status(300).json(bookList[key]);
    }
  }
  return res.status(300).json({message: "There is no book with that Title"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  
  return res.status(300).json(bookList[req.params.isbn]["reviews"]);
});

module.exports.general = public_users;

