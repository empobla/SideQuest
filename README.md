<p align='center'>
<img src='public/images/logos/logo.png'>
</p>

# SideQuest D&D
SideQuest D&D website repository for tracking changes and pushing to production.

---
## Index
- [Dependency List](#dependency-list)
- [Versions](#versions)
    - [Alpha](#sidequest-dd-alpha)
    - [Release 1.0](#sidequest-dd-release-10)
---

## Dependency List
---
([Back to top](#index))

### Data dependencies:
- **mongodb**: For connecting to MongoDB
- **mongoose**: Middleware for MongoDB

### Media dependencies:
- **cloudinary**: For image uploads
- **multer**: For handling `enctype="multipart/form-data"`
    
### Production dependencies:
- **dotenv**: For allowing .env files and usage through process.env.VAR for delicate data
- **compression**: For compressesing files and optimizing website for user use
- **helmet**: For securing website data

### Security dependencies:
- **body-parser**: For limiting the request body payload the user can submit
- **express-rate-limit**: For limiting the amount of requests per window of time a user can make
- **express-mongo-sanitize**: For replacing '$' and '.' from user inputs to prevent NoSQL injection attacks

### User dependencies:
- **express-session**: For handling sessions
- **express-validator**: For validating and sanitizing user inputs
- **connect-mongo**: MongoDB session store        
- **mongoose-bcrypt**: For hashing and salting passwords and sensitive information
- **passport**: For authenticating info and passwords through strategies
    - **passport-local**: Local strategy for passport
    - **passport-local-mongoose**: Local strategy for mongoose passport

### Flash messages:
- **connect-flash**: Provides methods for flash messages

### PDF Dependencies:
- **pdflib**: For editing and rendering pdfs programatically

### WYSIWYG Editors:
- **webpack**: For compiling ckeditor5 javascript files into client-side usable javascript modules
- **ckeditor5**: For the WYSIWYG editor

## Versions
--- 
([Back to top](#index))

These are the versions that have existed for SideQuest D&D website, with some pictures and a description of each version.

### SideQuest D&D Alpha
This was the first release of SideQuest D&D. It was released August 4, 2020. This version of the website was not very popular and was in a primitively functional state.

This release offered the following functionalities:
- Announcement creation and display in homepage
- Hero creation and modification
- Story creation and modification
- Character creation and modification
- Spell creation and modification
- Markdown text editor (pagedown)
- PDF generation and display of character sheet
- Superficial admin user management

This release had the following problems:
- DM had to create heroes for the users
- Hero creation UI was non-intuitive and 100% manual
- UI overall was ugly
- Admin section was unintuitive and had very restricted functionality

SideQuest D&D Alpha can no longer be found in this repository.

<details>

<summary markdown='span'>Images</summary>

#### **Home Page**
<p align='center'>
<img src='public/images/readme/versions/alpha/home.png'>
</p>

#### **Hero View**
<img src='public/images/readme/versions/alpha/hero/hero0.png'>

|  |  |
|------------|-------------|
| <img src='public/images/readme/versions/alpha/hero/hero1.jpeg' width='100%'> | <img src='public/images/readme/versions/alpha/hero/hero2.jpeg' width='100%'> |



#### **Hero Spells View**
|  |  |
|------------|-------------|
| <img src='public/images/readme/versions/alpha/hero/herospells0.png' width='100%'> | <img src='public/images/readme/versions/alpha/hero/herospells1.png' width='100%'>


#### **Story View**
<img src='public/images/readme/versions/alpha/story/0.jpeg'>

#### **Edit Hero Spells**
|  |  |
|------------|-------------|
| <img src='public/images/readme/versions/alpha/edit_spells/0.png'> | <img src='public/images/readme/versions/alpha/edit_spells/1.png'>
| <img src='public/images/readme/versions/alpha/edit_spells/2.png'> | <img src='public/images/readme/versions/alpha/edit_spells/3.png'>

#### **Edit Story**
<img src='public/images/readme/versions/alpha/edit_story/0.jpeg'>

</details>

### SideQuest D&D Release v1.0.0
---
([Back to top](#index))

This is the current stable released version of SideQuest D&D. It has a completely reworked UI and has many more features than the [alpha](#sidequest-dd-alpha) version offered. Users liked this version a lot and used it much more.

The most popular pages of this release are the Characters and Story pages.

This release offered the following functionalities:
- Improved UI:
    - Responsive design for all screens
    - Improved hero view UI
    - Improved character view UI
    - Improved story view UI
- New additions:
    - Race and Class creation
    - Map section
    - DM Notes section
    - Comment section
    - Search bar for stories, characters, maps, spells, races, classes, and notes
    - Dedicated DM and Admin Sections
    - WYSIWYG Text Editors (CKEditor5)
- Improved security:
    - Validation and sanitization of all input fields (Prevent XSS attacks)
    - Body-parsing to limit user input payloads (prevent DoS attacks)
    - Rate-limiting to limit amount of user requests in a time window (prevent DoS and Brute Force attacks)
    - Further sanitization of strings starting with '$' and '.' to prevent NoSQL injection attacks
    - Default production render page as to not show actual errors to users
- Re-designed hero schema
- More intutive character creation, many things were made automatic
- Dedicated spell page for spell creation, lookup, and editing
- Ajax implementation for spells
- More expansive Admin permisions and functionality
- Templatable code
- GitHub deployment

<details>

<summary markdown='span'>Images</summary>

#### **Home Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/home.png'>
</p>

#### **Hero Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/heroes.png'>
</p>

#### **Hero View**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/heroview.png'>
</p>

#### **Character Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/characters.png'>
</p>

#### **Character View**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/characterview.png'>
</p>

#### **Story Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/stories.png'>
</p>

#### **Story View**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/storyview.png'>
</p>

#### **Map Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/maps.png'>
</p>

#### **Map View**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/mapsview.png'>
<img src='public/images/readme/versions/1.0.0/templateview.png'>
</p>

#### **Login Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/login.png'>
</p>

#### **Signup Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/signup.png'>
</p>

#### **User Account Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/useraccountview.png'>
</p>

#### **Edit Hero**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/useredithero0.png'>
<img src='public/images/readme/versions/1.0.0/useredithero1.png'>
<img src='public/images/readme/versions/1.0.0/useredithero2.png'>
<img src='public/images/readme/versions/1.0.0/useredithero3.png'>
<img src='public/images/readme/versions/1.0.0/useredithero4.png'>
</p>

#### **Spells Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/spells.png'>
<img src='public/images/readme/versions/1.0.0/spellcreator.png'>
</p>

#### **Edit Character Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/usereditcharacters.png'>
</p>

#### **Edit Story Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/usereditstory.png'>
</p>

#### **Edit Map Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/usereditmaps.png'>
</p>

#### **Admin Account Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/adminview.png'>
</p>

#### **Admin Users Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/adminusers.png'>
</p>

#### **Admin User Edit**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/adminuseredit.png'>
</p>

#### **Admin and DM Announcement Edit**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/adminannouncements.png'>
</p>

#### **Admin Races Edit**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/admineditrace.png'>
</p>

#### **Admin Classes Edit**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/admineditclass.png'>
</p>

#### **DM Account Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/dmview.png'>
</p>

#### **DM Note Page**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/dmnotes.png'>
</p>

#### **DM Note Creator**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/dmnotecreate.png'>
</p>

#### **DM Note Viewer**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/dmnoteview.png'>
</p>

#### **DM Note Editor**
<p align='center'>
<img src='public/images/readme/versions/1.0.0/dmnoteedit.png'>
</p>
</details>

**Fun Fact**: This project is composed of 11,272 lines of code.
