# mod18-nosql-snsapi
Module 18 Challenge - NoSQL Social Network API

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