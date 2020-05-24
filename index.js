const express = require("express");
const uuid = require("uuid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const next = require("next");

const minako_password = process.env.password || "password";
const minako_username = process.env.username || "admin";
const minako_userid = process.env.userid || 1;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  server.use(require("body-parser").json());

  // Configure the local strategy for use by Passport.
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(
    new LocalStrategy(function (username, password, done) {
      if (!username || username !== minako_username) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!password || password !== minako_password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, {
        username: minako_username,
        id: minako_userid,
      });
    })
  );

  // Configure Passport authenticated session persistence.
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function (id, cb) {
    if (id === minako_userid) {
      cb(null, user);
    } else {
      return cb(err);
    }
  });

  // write db defaults
  db.defaults({
    posts: [
      {
        test: "test",
      },
    ],
  }).write();

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  server.use(passport.initialize());
  server.use(passport.session());

  server.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  server.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // app.get('/profile',
  //   require('connect-ensure-login').ensureLoggedIn(),
  //   function(req, res){
  //     res.render('profile', { user: req.user });
  //   });

  server.get("/api/posts", (req, res) => {
    res.send(db.get("posts"));
  });

  server.post("/api/posts", (req, res) => {
    console.log("body", req.body);
    // if (req.session && req.session.authenticated) {
    try {
      db.get("posts")
        .push({
          id: uuid.v1(),
          html: req.body.html,
          date: req.body.date,
          slug: req.body.slug,
          category: req.body.category,
          title: req.body.title,
          createdAt: req.body.createdAt,
          updatedAt: req.body.updatedAt,
        })
        .write();
      return res.sendStatus(201);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }

    // }
  });

  server.put("/api/post/:id", (req, res) => {
    try {
      const id = req.params.id;
      const html = req.body.html;
      const date = req.body.date;
      const slug = req.body.slug;
      const title = req.body.title;
      const category = req.body.category;
      const createdAt = req.body.createdAt;
      const updatedAt = req.body.updatedAt;
      db.get("posts")
        .find({ id: id })
        .assign({
          html: html,
          date: date,
          slug: slug,
          title: title,
          createdAt: createdAt,
          updatedAt: updatedAt,
          category: category
        })
        .write();
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  });

  server.delete("/api/post/:id", (req, res) => {
    const id = req.params.id;
    // if (req.session && req.session.authenticated) {
    try {
      db.get("posts")
        .find({ id: id })
        .remove().write();
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
    // } else {
    //   return res.sendStatus(401);
    // }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 1341);
});
