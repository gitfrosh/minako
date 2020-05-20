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

  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  server.use(require("body-parser").urlencoded({ extended: true }));

  server.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  server.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // app.get('/profile',
  //   require('connect-ensure-login').ensureLoggedIn(),
  //   function(req, res){
  //     res.render('profile', { user: req.user });
  //   });

  server.get("/posts", (req, res) => {
    // res.send(db.get("posts"), { user: req.user });
    res.send(db.get("posts"));
  });

  // app.get("/posts", (req, res) => {
  //   // if (req.session && req.session.authenticated) {
  //   res.send(db.get("posts"));
  //   // } else {
  //   //   return res.sendStatus(401);
  //   // }
  // });

  server.post("/posts", (req, res) => {
    // if (req.session && req.session.authenticated) {
    db.get("posts")
      .push({
        id: uuid.v1(),
        html: "test",
        date: "2020-09-01",
        slug: "/hello/hello",
      })
      .write();
    //   return res.sendStatus(401);
    // }
  });

  server.delete("/posts", (req, res) => {
    // if (req.session && req.session.authenticated) {
    try {
      db.get("posts").remove().write();
    } catch (e) {
      res.send(e);
      // console.error(e);
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
