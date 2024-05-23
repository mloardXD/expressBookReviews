const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let bookList = JSON.parse(JSON.stringify(books, null, 4))

let users = [
    // {
    //     "username": "test",
    //     "password": "test123"
    // }
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userswithsamename = users.filter((user)=>{
        return user.username === username
    });
    if(userswithsamename.length > 0){
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const user = req.body.username;
    if (!user) {
        return res.status(400).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: user
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken, user
    }
    return res.status(200).send("User successfully logged in");

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  
    const user = req.session.authorization['user']
    let bookID = req.params.isbn
    let review = req.query.review

    bookList[bookID]["reviews"][user] = review
  return res.status(200).json("The review for book with ISBN " + bookID + " has been added");
});

// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    
      const user = req.session.authorization['user']
      let bookID = req.params.isbn
      let review = req.query.review
      console.log(bookList[bookID]["reviews"][user])
      delete bookList[bookID]["reviews"][user]
      console.log(bookList[bookID]["reviews"][user])
    return res.status(200).json("Review for the ISBN " + bookID + " posted by user " + user + " deleted.");
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;