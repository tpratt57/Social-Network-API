# Social-Network-API  
<p align="center">
    <img src="https://img.shields.io/github/repo-size/tpratt57/e-commerce-back-end-OMR" />
<p align="center">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Javascript-yellow" />
    <img src="https://img.shields.io/badge/express-orange" />
</p>  




## Table of Contents
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Instilation](#Instilation)
- [Testing](#Testing)
- [Insomnia Screenshot](#insomnia-screenshot)
- [License](#License)
- [Contribution](#Contribution)
- [Questions](#Questions)


## Description  
The Social Network API is a web based application that uses a MongoDB database shell allowing it to handle large amounts of amorphous data and an Express.js server to route and connect. This application's inteded use is to allow users to share their thoughs and feeling on various subject matter and entertain discourse from other members.  

## Technologies Used  
* Express.js
* MongoDB
* Node.js
* Mongoose
* Javascript

## Instilation  
* Clone repo into local machine
* run npm i to install all required dependencies
* After all dependencies are installed, run "npm start" in terminal
* Open Insomnia Core to test all API routes  

## Testing  
### /api/users
* GET all users
* POST a new user
* // example data
{
    "username": "lernantino",
    "email": "lernantino@gmail.com"
}  


### /api/users/:userid
* GET a single user by it's _id
* PUT to update a user by it's _id
* DELETE to remove a user by it's _id

### /api/users/:userId/friends/:friendId
* POST to add a new friend to a user's friends list
* DELETE to remove a new friend from a user's friend list

### /api/thoughts
* GET to retrieve all thoughts
* POST to create a new thought
* // example data
{
"thoughtText": "Here's a cool thought...",
"username": "lernantino",
"userId": "5edff358a0fcb779aa7b118b"
}

### /api/thoughts/:thoughtId
* GET to get a single thought by its _id
* PUT to update a thought by its _id
* DELETE to remove a thought by its _id

### /api/thoughts/:thoughtId/reactions
* POST to create a reaction
// example data
{
"reactionBody":"Hell Yeah!!",
"username":"lernantino"
}

### /api/thoughts/:thoughtId/reactions/:reactionId
* DELETE remove a reaction by the reactionId


## Insomnia Screenshot  
![Desktop Screenshot 2022 09 04 - 20 12 56 80](https://user-images.githubusercontent.com/104174101/188342067-810e7cb4-1440-451b-88b8-f39afb561291.png)


## License 
This project is not under any license 

## Contribution 
Created By Trevor Pratt

## Questions 
Trevor Pratt, [Portfolio](https://tpratt57.github.io/Challenge-2-/)
[GitHub](https://github.com/tpratt57)
