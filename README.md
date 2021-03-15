# CodersCamp 2020 - Node.js Project

**The project was created as part of the 6th edition of the [CodersCamp](https://coderscamp.pl/) course.**

## Table of Contests
- [The project team](#the-project-team)
- [General info](#general-info)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Organization of work](#organization-of-work)

## The project team
Authors of this project are course participants who worked under the supervision of an experienced mentor.

**Authors:**
-   [Dominik Puchała](https://github.com/Suegro24) (Tech Lead)
-	[Kamila Grusza](https://github.com/kami3la) (Development Manager)
-	[Weronika Brzeczkowska-Kuzianik](https://github.com/brzeczkowskaw) (Product Owner)
-	[Adrianna Krupa](https://github.com/adax10/)
-	[Jędrzej Ratajczak](https://github.com/Mrozelek)
-	[Konrad Mierzejewski](https://github.com/KonradMierzejewski)

**Mentor:** [Filip Kuca](https://github.com/ruljin) 

## General info
Our project is an application for plant lovers. Users can share their plants as well as experpience with taking care of them with other users. This part of project is focused on backend features. Application is called MyPlants. 

## Features
-	User can create their profil and login. 
-   After logging in User can add notes to their profile, which would be kind of a journal about taking care of their plants. User may choose if the note is private (only he/she can see it) or public (all logged in users can see it).
-   User can create profiles for the plants their own. They can add pictures of them and discription. Also, comments may be added, showing the changes in plants' live. Users may 'like' those comments. Comments will be displayed according to the numeber of likes (most liked comment will be shown first). 
-   There is the databese of plants created. Users may also update it (their updates need to be accepted by administrator first). The idea of it is to create a collection of many plant speacies which can be owned at home with its description and tips how to take care of them. In front-end user will be able to use filter to search for the plant (by knowing their name, or choosing the environment they have at home, so our app will choose the plants which meet those conditions).
-   Users can add other user's profiles to their favourites, so they can follow their plants. 
-   There is a chat created. So far there are two channels. Main one, for general discussion about plants, where users can ask questions or share their experience. Second one is dedicated for trade, where users can sell or exchange their plants or equipment. 
-   Users can use a calendar when they can add events - for example reminders to water their plants. 
-   We have used authentication. Main database of plants can be seen by all users. Users' profiles, their plants, comments and notes as well as chat may be seen by logged in users. Admins can accept new plants in main database as well as update them. 

## Technologies
-   ESLint
-   Express.js
-   Heroku
-   Jest
-   Jira
-   MongoDB
-   Mongoose
-   Node.js
-   Scrum
-   TypeScript

## Setup
#### Demo
To view a demo click [here]( ).

#### Getting started
If you want to run the application on the local machine, follow these steps:
1. Clone down this repo
2. Install dependencies with the command: `npm install`
3. Start development server `npm start` 

The application will be available at `localhost:3000/`

#### Running tests
To run the application tests, follow these steps:
1. Install dependencies with the command: `npm install` (if you haven't already done so before)
2. Run the tests by running the command: `npm test`

## Organization of work
#### Jira
We used Jira, where we organized all our work. More precisely, we shared responsibilities for each sprint, exchanged comments and approved our tasks.