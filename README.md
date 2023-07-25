# mod18-nosql-snsapi
Module 18 Challenge - NoSQL Social Network API

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Description
- Created file folder structure
- connections: connected to mongodb and mongoose
- index: initialize app and server, sync database
- models: user, thought, and reaction schema
- routes: index, apiroutes
- controllers: usercontroller and thoughtcontroller to export functions
- util: data and seeds, create data and sees dunny data
- connected models and created functions (get/add/remove/update X)
- passed relevant functions to routes and connected them with their respective route methods (get/post/delete/put)
- confirmed routes work through insomnia

## Video Demo Walkthrough



## Github Repo Link

https://github.com/kumih0/mod18-nosql-snsapi

### Pseudo Code (Seeds)
- create users
    - generate a set amount of users
    - generate random username
    - username ref for gen email

- thoughts
    - generate set total of all thoughts
    - generate random thoughtText
    - createdat gen random date
    - username from generated user array

- reactions
    - generate random set of reactions attached to generated thoughts array
    - username from generated user array 
    -createdat random date that is greater than or equal to thoughtdate
    - reactionbody randomreaction

- push reactions to thoughts array ?
- push thoughts to users array
- insertmany