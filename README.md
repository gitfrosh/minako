<a href="http://fvcproductions.com"><img src="https://avatars1.githubusercontent.com/u/4284691?v=3&s=200" title="FVCproductions" alt="FVCproductions"></a>

# minako. cms made simple

> minako is a super lightweight and basic CMS

> data is stored in a json file: headless and without database

> provides an REST API for your frontends to consume your posts

> enables you to write your posts in plain text or markdown

> requires minimal (but useful) metadata

> simplifies it all with just one admin user 


## Deployment & Usage

### Deployment using docker-compose
* store your credentials and user data in the environment info in your docker-compose.yml
* start the docker container with docker-compose up minako

### Deployment using node
* store your credentials and user data in the environment info in your .env file
* start your node application with node server.js

### Usage
* once your minako instance is running, login to http://localhost:1342
* write your first (e.g. blog) post, edit and delete it later however you like
* your posts will be exposed under two public endpoints once they get the status "published"
- **http://localhost:1342/api/published_posts**
- **http://localhost:1342/api/published_post/{id}**

---

## Contributing

> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/joanaz/HireDot2.git`

### Step 2

- install packages with `npm install` is required
- get your development server started with `node server.js`
- login to http://localhost:1342 with the default username "admin" and the password "password"
- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/joanaz/HireDot2/compare/" target="_blank">`https://github.com/joanaz/HireDot2/compare/`</a>.

---

## FAQ

- **why *minako*?**
    - 

---

## Donations

[![Support via BuyMeACoffee](https://cdn.buymeacoffee.com/buttons/default-orange.png)](https://www.buymeacoffee.com/SqYKLmJ7Z/)

---

## Credits


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**



