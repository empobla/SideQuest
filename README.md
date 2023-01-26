<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Portfolio][moreinfo-shield]][moreinfo-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/empobla/SideQuest">
    <img src="public/images/logos/logo.png" alt="Logo" width="200">
  </a>

<h3 align="center">SideQuest</h3>

  <p align="center">
    A web app created to work as a wiki for a personal Dungeons and Dragons campaign and a character and story manager.
    <br />
    <br />
    ·
    <a href="https://sidequest.demo.emilioppv.com">View Demo</a>
    ·
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#abilities-mastered">Abilities Mastered</a></li>
    <li><a href="#dependency-list">Dependency List</a></li>
    <li><a href="#versions">Versions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![SideQuest Screen Shot][product-screenshot]](https://sidequest.demo.emilioppv.com)

SideQuest is a web app created to work as a wiki for a personal Dungeons and Dragons campaign and a character and story manager. It is made to facilitate and enhance the Dungeons and Dragons players' experience and facilitate worldbuilding and session creation for the Dungeon Master that runs the Dungeons and Dragons campaign. The main objective of this fullstack development project was to practice and perfect my overall backend development skills.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![MongoDB][MongoDB]][Mongo-url]
[![Express][Express.js]][Express-url]
[![Pug][Pug.js]][Pug-url]
[![Node][Node.js]][Node-url]
[![Heroku][Heroku]][Heroku-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This project requires Node.js, MongoDB, and Cloudinary. A MongoDB server must be set up locally or in the cloud before using this project. Also, a Cloudinary account must be setup.
* Install npm:
  ```sh
  npm install npm@latest -g
  ```
* Install [MongoDB Community Server][MongoDB-community-url] or set up [MongoDB Atlas][MongoDB-atlas-url]. Instructions for MongoDB Community Server can be found [here][MongoDB-instructions-url].
* Setup a [Cloudinary][Cloudinary-url] account by following the first step on [this tutorial][Cloudinary-instructions-url].

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/empobla/SideQuest.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. In the project's directory, create a `.env` file with the following keys:
   ```text
   DB=<MONGODB_URI>

   SECRET=<CREATE_A_SECRET>
  
   CLOUDINARY_NAME=<CLOUDINARY_NAME>
   CLOUDINARY_API_KEY=<CLOUDINARY_API_KEY>
   CLOUDINARY_API_SECRET=<CLOUDINARY_API_SECRET_KEY>
   ```
   _Note: Replace everything in between `<>` with your actual keys, and create a secret key._
  
4. Start the server in development mode!
   ```sh
   npm run devstart
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Announcements
- [x] CRUD
  - [x] Hero
  - [x] Story
  - [x] Character
  - [x] Spell
  - [x] Maps
- [x] Pagedown markdown text editor
  - [x] Update editor to be CKEditor5 WYSIWYG
- [x] PDF generation and display of character sheet
- [x] Admin Panel
  - [x] User management
- [x] UI
  - [x] Responsive design for all screens
  - [x] Improve hero view
  - [x] Improve character view
  - [x] Improve story view
- [x] DM Panel
  - [x] Race and Class CRUD
  - [x] Notes
- [x] Comments
- [x] Search
- [x] Templatable CSS using variables

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ABILITIES MASTERED -->
## Abilities Mastered

* Fullstack Web Development
* Web Security
* Ajax
* Webpack
* Implementation of WYSIWYG text editors (such as CKEditor)
* PDF creation and manipulation through JavaScript
* Use of APIs
* JavaScript DOM and CSS manipulation
* Templatable CSS
* Application and use of Regular Expressions
* Responsive web design
* Version control (GitHub)
* Wireframing
* Deployment to platforms such as Heroku

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- DEPENDENCY LIST -->
## Dependency List

### Data dependencies:
* **mongodb**: For connecting to MongoDB
* **mongoose**: Middleware for MongoDB

### Media dependencies:
* **cloudinary**: For image uploads
* **multer**: For handling `enctype="multipart/form-data"`
    
### Production dependencies:
* **dotenv**: For allowing .env files and usage through process.env.VAR for delicate data
* **compression**: For compressesing files and optimizing website for user use
* **helmet**: For securing website data

### Security dependencies:
* **body-parser**: For limiting the request body payload the user can submit
* **express-rate-limit**: For limiting the amount of requests per window of time a user can make
* **express-mongo-sanitize**: For replacing '$' and '.' from user inputs to prevent NoSQL injection attacks

### User dependencies:
* **express-session**: For handling sessions
* **express-validator**: For validating and sanitizing user inputs
* **connect-mongo**: MongoDB session store        
* **mongoose-bcrypt**: For hashing and salting passwords and sensitive information
* **passport**: For authenticating info and passwords through strategies
    * **passport-local**: Local strategy for passport
    * **passport-local-mongoose**: Local strategy for mongoose passport

### Flash messages:
* **connect-flash**: Provides methods for flash messages

### PDF Dependencies:
* **pdflib**: For editing and rendering pdfs programatically

### WYSIWYG Editors:
* **webpack**: For compiling ckeditor5 javascript files into client-side usable javascript modules
* **ckeditor5**: For the WYSIWYG editor

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- VERSIONS -->
## Versions

These are the versions that have existed for SideQuest D&D website, with some pictures and a description of each version.

### SideQuest D&D Alpha
This was the first release of SideQuest D&D. It was released August 4, 2020. This version of the website was not very popular and was in a primitively functional state.

This release offered the following functionalities:
* Announcement creation and display in homepage
* Hero creation and modification
* Story creation and modification
* Character creation and modification
* Spell creation and modification
* Markdown text editor (pagedown)
* PDF generation and display of character sheet
* Superficial admin user management

This release had the following problems:
* DM had to create heroes for the users
* Hero creation UI was non-intuitive and 100% manual
* UI overall was ugly
* Admin section was unintuitive and had very restricted functionality

SideQuest D&D Alpha can no longer be found in this repository.

<details>

<summary markdown='span'>Images</summary>

#### **Home Page**
<p align='center'>
<img src='README/images/versions/alpha/home.png'>
</p>

#### **Hero View**
<img src='README/images/versions/alpha/hero/hero0.png'>

|  |  |
|------------|-------------|
| <img src='README/images/versions/alpha/hero/hero1.jpeg' width='100%'> | <img src='README/images/versions/alpha/hero/hero2.jpeg' width='100%'> |



#### **Hero Spells View**
|  |  |
|------------|-------------|
| <img src='README/images/versions/alpha/hero/herospells0.png' width='100%'> | <img src='README/images/versions/alpha/hero/herospells1.png' width='100%'>


#### **Story View**
<img src='README/images/versions/alpha/story/0.jpeg'>

#### **Edit Hero Spells**
|  |  |
|------------|-------------|
| <img src='README/images/versions/alpha/edit_spells/0.png'> | <img src='README/images/versions/alpha/edit_spells/1.png'>
| <img src='README/images/versions/alpha/edit_spells/2.png'> | <img src='README/images/versions/alpha/edit_spells/3.png'>

#### **Edit Story**
<img src='README/images/versions/alpha/edit_story/0.jpeg'>

</details>

### SideQuest D&D Release v1.0.0

This is the current stable released version of SideQuest D&D. It has a completely reworked UI and has many more features than the [alpha](#sidequest-dd-alpha) version offered. Users liked this version a lot and used it much more.

The most popular pages of this release are the Characters and Story pages.

This release offered the following functionalities:
* Improved UI:
    * Responsive design for all screens
    * Improved hero view UI
    * Improved character view UI
    * Improved story view UI
* New additions:
    * Race and Class creation
    * Map section
    * DM Notes section
    * Comment section
    * Search bar for stories, characters, maps, spells, races, classes, and notes
    * Dedicated DM and Admin Sections
    * WYSIWYG Text Editors (CKEditor5)
* Improved security:
    * Validation and sanitization of all input fields (Prevent XSS attacks)
    * Body-parsing to limit user input payloads (prevent DoS attacks)
    * Rate-limiting to limit amount of user requests in a time window (prevent DoS and Brute Force attacks)
    * Further sanitization of strings starting with '$' and '.' to prevent NoSQL injection attacks
    * Default production render page as to not show actual errors to users
* Re-designed hero schema
* More intutive character creation, many things were made automatic
* Dedicated spell page for spell creation, lookup, and editing
* Ajax implementation for spells
* More expansive Admin permisions and functionality
* Templatable code
* GitHub deployment

<details>

<summary markdown='span'>Images</summary>

#### **Home Page**
<p align='center'>
<img src='README/images/versions/1.0.0/home.png'>
</p>

#### **Hero Page**
<p align='center'>
<img src='README/images/versions/1.0.0/heroes.png'>
</p>

#### **Hero View**
<p align='center'>
<img src='README/images/versions/1.0.0/heroview.png'>
</p>

#### **Character Page**
<p align='center'>
<img src='README/images/versions/1.0.0/characters.png'>
</p>

#### **Character View**
<p align='center'>
<img src='README/images/versions/1.0.0/characterview.png'>
</p>

#### **Story Page**
<p align='center'>
<img src='README/images/versions/1.0.0/stories.png'>
</p>

#### **Story View**
<p align='center'>
<img src='README/images/versions/1.0.0/storyview.png'>
</p>

#### **Map Page**
<p align='center'>
<img src='README/images/versions/1.0.0/maps.png'>
</p>

#### **Map View**
<p align='center'>
<img src='README/images/versions/1.0.0/mapsview.png'>
<img src='README/images/versions/1.0.0/templateview.png'>
</p>

#### **Login Page**
<p align='center'>
<img src='README/images/versions/1.0.0/login.png'>
</p>

#### **Signup Page**
<p align='center'>
<img src='README/images/versions/1.0.0/signup.png'>
</p>

#### **User Account Page**
<p align='center'>
<img src='README/images/versions/1.0.0/useraccountview.png'>
</p>

#### **Edit Hero**
<p align='center'>
<img src='README/images/versions/1.0.0/useredithero0.png'>
<img src='README/images/versions/1.0.0/useredithero1.png'>
<img src='README/images/versions/1.0.0/useredithero2.png'>
<img src='README/images/versions/1.0.0/useredithero3.png'>
<img src='README/images/versions/1.0.0/useredithero4.png'>
</p>

#### **Spells Page**
<p align='center'>
<img src='README/images/versions/1.0.0/spells.png'>
<img src='README/images/versions/1.0.0/spellcreator.png'>
</p>

#### **Edit Character Page**
<p align='center'>
<img src='README/images/versions/1.0.0/usereditcharacters.png'>
</p>

#### **Edit Story Page**
<p align='center'>
<img src='README/images/versions/1.0.0/usereditstory.png'>
</p>

#### **Edit Map Page**
<p align='center'>
<img src='README/images/versions/1.0.0/usereditmaps.png'>
</p>

#### **Admin Account Page**
<p align='center'>
<img src='README/images/versions/1.0.0/adminview.png'>
</p>

#### **Admin Users Page**
<p align='center'>
<img src='README/images/versions/1.0.0/adminusers.png'>
</p>

#### **Admin User Edit**
<p align='center'>
<img src='README/images/versions/1.0.0/adminuseredit.png'>
</p>

#### **Admin and DM Announcement Edit**
<p align='center'>
<img src='README/images/versions/1.0.0/adminannouncements.png'>
</p>

#### **Admin Races Edit**
<p align='center'>
<img src='README/images/versions/1.0.0/admineditrace.png'>
</p>

#### **Admin Classes Edit**
<p align='center'>
<img src='README/images/versions/1.0.0/admineditclass.png'>
</p>

#### **DM Account Page**
<p align='center'>
<img src='README/images/versions/1.0.0/dmview.png'>
</p>

#### **DM Note Page**
<p align='center'>
<img src='README/images/versions/1.0.0/dmnotes.png'>
</p>

#### **DM Note Creator**
<p align='center'>
<img src='README/images/versions/1.0.0/dmnotecreate.png'>
</p>

#### **DM Note Viewer**
<p align='center'>
<img src='README/images/versions/1.0.0/dmnoteview.png'>
</p>

#### **DM Note Editor**
<p align='center'>
<img src='README/images/versions/1.0.0/dmnoteedit.png'>
</p>
</details>

**Fun Fact**: This project is composed of 11,272 lines of code.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

This project is property of Emilio Popovits Blake. All rights are reserved. Modification or redistribution of this code must have _explicit_ consent from the owner.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Emilio Popovits Blake - [Contact](https://emilioppv.com/contact)

Project Link: [https://github.com/empobla/SideQuest](https://github.com/empobla/SideQuest)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [[CKEditor5] Quick Start](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/quick-start.html)
* [[CKEditor5] Advanced Setup](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html)
* [[CKEditor5] Configuration](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html)
* [[CKEditor5] Config Class](https://ckeditor.com/docs/ckeditor5/latest/api/module_utils_config-Config.html)
* [[CKEditor5] Getting and Saving Data](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/saving-data.html)
* [[ui.dev] WebPack](https://ui.dev/webpack/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/emilio-popovits

[product-screenshot]: README/images/versions/1.0.0/home.png

[MongoDB]: https://img.shields.io/badge/mongodb-ffffff?style=for-the-badge&logo=mongodb&logoColor=47a248
[Mongo-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=ffffff
[Express-url]: https://expressjs.com/
[Pug.js]: https://img.shields.io/badge/pug.js-a86454?style=for-the-badge&logo=pug&logoColor=000000
[Pug-url]: https://pugjs.org
[Node.js]: https://img.shields.io/badge/node.js-090c15?style=for-the-badge&logo=nodedotjs&logoColor=339933
[Node-url]: https://nodejs.org
[Heroku]: https://img.shields.io/badge/heroku-430098?style=for-the-badge&logo=heroku&logoColor=ffffff
[Heroku-url]: https://www.heroku.com/

[MongoDB-community-url]: https://www.mongodb.com/try/download/community
[MongoDB-atlas-url]: https://www.mongodb.com/atlas/database
[MongoDB-instructions-url]: https://www.mongodb.com/docs/manual/administration/install-community
[Cloudinary-url]: https://cloudinary.com/
[Cloudinary-instructions-url]: https://cloudinary.com/documentation/how_to_integrate_cloudinary#1_create_your_account_and_set_up_your_product_environment

[moreinfo-url]: https://emilioppv.com/portfolio/sidequest
[moreinfo-shield]: https://img.shields.io/badge/more%20info-1b1f24?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAApVBMVEUbHyQbHyQbHyRnam2sra+vsbKys7Wsrq+goqQwNDgaHyQaIilbXWGChIZMT1OYmpwYQFoaICYXRF8WUHQZLjwvMzdwcnaztLZ1d3pcX2IaICUXTG0WUHMXS2sXSGcWT3MaKjcpLTFVWFyFh4lTVllvcnWpqqwYOEwZM0QXTW4XTnAaJS8lKS3IycoYPlYaIyt4e36rra60tba5urutr7BQU1cAAAB8HBV3AAAAAnRSTlOR/KrCyFQAAAABYktHRDZHv4jRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wEZCiUZVutNzgAAAGpJREFUCNdjYGBkggNGBmQeiM+EAjC5zCwsrGzsHJwQLhc3ExMPLxMfP5OAIBODkLCIqBi/uASHpJS0jCyDnLyCopIyh4qqmrqGphYDk5Q2WLGOrh63PsgoA0NDI2NDE1PsFqFw0RyJ6gUAuK4HVipJCoQAAAAuelRYdGRhdGU6Y3JlYXRlAAAImTMyMDLWNTDUNTINMTSwMja3MjLVNjCwMjAAAEFRBQlQZi6pAAAALnpUWHRkYXRlOm1vZGlmeQAACJkzMjAy1jUw1DUyDTE0sDI2tzIy1TYwsDIwAABBUQUJeVmGIQAAAABJRU5ErkJggg==