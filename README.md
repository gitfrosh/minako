# minako

> minako is a super lightweight and basic CMS

> data is stored in a json file: headless and without database

> API-first! minako provides a REST API for your frontends to consume your posts

> suitable for e.g. small personal blogs 

> enables you to write your posts in plain text or markdown or even include HTML tags

> requires minimal (but useful) post metadata

> simplifies it all with just one admin user and one entity type

## Deployment & Usage

### Deployment using docker-compose
* store your credentials and user data in the environment data in your docker-compose.yml
* start the docker container with `docker-compose up minako`

### Deployment using node
* move into the app folder `cd app`
* create an .env file and store your credentials and user data in there
* install Next.js globally `npm i -g next`
* install dependencies with `npm install`
* build the Next.js build with `npm run build`
* start your node application with `npm run prod` or `npm run prod_win`

### Usage
* once your minako instance is running, login to http://localhost:1342
* write your first (e.g. blog) post; edit and delete it later however you like from the minako UI
* your posts will be exposed under two public endpoints once they get the status "published"
  *  **http://localhost:1340/api/published_posts**
  *  **http://localhost:1340/api/published_post/{id}**
* adding, editing and deleting your posts can also be done via the provided REST API if you login first and provide the issued bearer token
  *  **http://localhost:1340/api/login** (POST)
  *  **http://localhost:1340/api/posts** (GET, POST)
  *  **http://localhost:1340/api/post/{id}** (GET, PUT, DELETE)

---

## Contributing

> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/gitfrosh/minako.git`

### Step 2

- move into the app folder `cd app`
- install packages with `npm install` is required
- get your development server started with `npm run dev`
- login to http://localhost:1340 with the default username "admin" and the password "password"
- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/gitfrosh/minako/compare" target="_blank">`https://github.com/gitfrosh/minako/compare`</a>.

---

## Q&A

- **Why another CMS?**
    - I know there are (probably) hundreds of CMS around, but there were either out of date, much too complex for my use case or did not follow a combined API-first and headless approach.

- **Is this production-ready?**
    - probably not, though it is used on <a href="https://rike.dev" target="_blank">rike.dev</a>. Be careful about your db.json, it's the only copy of your (blog) posts!

- **Will there be more functionalities?**
    - I am planning so, though I will strictly refuse to bloat it.

- **Why 'minako'?**
    - because it starts with "min" like in "minimal" is the name of my favourite Sailor Moon character.


---

## Built with
* <a href="https://github.com/vercel/next.js" target="_blank">Next.js</a>
* <a href="https://github.com/nodejs" target="_blank">Node.js</a>
* <a href="https://github.com/milligram/milligram" target="_blank">Milligram</a>
* <a href="https://github.com/jaredhanson/passport" target="_blank">Passport</a>
* <a href="https://github.com/HarryChen0506/react-markdown-editor-lite" target="_blank">React Markdown Editor Lite</a>
and others

## Donations

[![Support via BuyMeACoffee](https://cdn.buymeacoffee.com/buttons/default-orange.png)](https://www.buymeacoffee.com/SqYKLmJ7Z/)

---

## Credits


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**



