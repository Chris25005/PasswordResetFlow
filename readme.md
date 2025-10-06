# Recipes App Backend Application

## Description

The Recipes App Backend Application is a RESTful API built with Node.js and Express. It allows users to manage their Recipes App, including creating, reading, updating, and deleting meal entries. The application uses MongoDB as its database to store Recipes data.

## Steps

1. Repo setup and Npm Initialization
   - Empty folder creation
   - npm init command
   - Empty repository creation on GitHub
   
2. Git Initialization
   - readme.md file creation
   - Git initialization with git init command
   - connect local repo with remote repo

   git init
   git remote add origin <remote-repo-URL>
   git add .
   git commit -m "commit message"
   git branch -M main
   git push -u origin main

3. Express Server Setup

   - Install express using npm install express
   - Create .gitignore file and add node_modules/ to it
   - Create server.js file
   - Import express
   - Create express app
   - Listen on a port for incoming requests
   - Setup a basic route to test the server

4. nodemon setup
5. MongoDB setup

   - Create a cluster on MongoDB Atlas
   - Create a database and collection
   - Get the connection string
   - Install mongoose using npm install mongoose
   - Connect to MongoDB using mongoose in server.js

6. dotenv setup

   - Install dotenv using npm install dotenv
   - Create a .env file to store environment variables
   - Load environment variables in server.js

7. MVC Architecture Setup -- Code Splitting

   - Split code from server.js to app.js

 /// 

```javascript
 // "POSTMAN"  
 // 'https://documenter.getpostman.com/view/45740328/2sB3HrkxUG'

//Recipe#1
  {
    "title": "Pasta",
    "description": "Delicious Italian pasta",
    "ingredients": ["Pasta", "Tomato", "Cheese"],
    "instructions": "Boil pasta, add sauce, serve hot",
    "cookingTime": 20
  }
//Recipe#2
  {
    "title": "Chicken Curry",
    "description": "Spicy Indian chicken curry",
    "ingredients": ["Chicken", "Onion", "Tomato", "Spices"],
    "instructions": "Cook chicken with spices and onion-tomato gravy",
    "cookingTime": 45
  }
//Recipe#3
  {
    "title": "Vegetable Soup",
    "description": "Healthy mixed vegetable soup",
    "ingredients": ["Carrot", "Beans", "Peas", "Corn"],
    "instructions": "Boil vegetables with water and seasoning",
    "cookingTime": 30
  }
  
```