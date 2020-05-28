const express = require("express");
const uuid = require("uuid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const jwt = require("jsonwebtoken");

//We use this to extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const next = require("next");

const secret = process.env.secret || "top_secret";
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
  server.use(require("body-parser").urlencoded({ extended: false }));

  server.use(passport.initialize());

  // write db defaults
  db.defaults({
    posts: [
      {
        test: "test",
      },
    ],
  }).write();

  //This verifies that the token sent by the user is valid
  passport.use(
    new JWTstrategy(
      {
        //secret we used to sign our JWT
        secretOrKey: secret,
        //we expect the user to send the token as a query parameter with the name 'secret_token'
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      },
      async (token, done) => {
        try {
          //Pass the user details to the next middleware
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Create a passport middleware to handle User login
  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        if (!username || username !== minako_username) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!password || password !== minako_password) {
          console.log("esgdg");

          return done(null, false, { message: "Incorrect password." });
        }

        //Send the user information to the next middleware
        return done(
          null,
          {
            username: minako_username,
            id: minako_userid,
          },
          { message: "Logged in Successfully" }
        );
      }
    )
  );

  server.post("/api/login", async (req, res) => {
    console.log("LOGIN")
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          return res.send(info);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return res.send(error);
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { id: user.id, username: user.username };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user: body }, secret);
          //Send back the token to the user
          return res.json({ token });
        });
      } catch (error) {
        return res.send(error);
      }
    })(req, res, next);
  });

  server.get("/api/logout", function (req, res) {
    try {
      req.logout();
      return res.json({
        success: true
      });

    } catch(e) {
      console.log(e)
      return res.json({
        message: "Logout failed"
      });
    }
  });

  server.get(
    "/api/posts",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send(db.get("posts"));
    }
  );

  server.post(
    "/api/posts",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
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
    }
  );

  server.put(
    "/api/post/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
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
            category: category,
          })
          .write();
        return res.sendStatus(204);
      } catch (e) {
        console.error(e);
        return res.sendStatus(500);
      }
    }
  );

  server.get(
    "/api/post/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const id = req.params.id;
      // if (req.session && req.session.authenticated) {
      try {
        
        return res.send(db.get("posts").find({ id: id }))
      } catch (e) {
        console.error(e);
        return res.sendStatus(500);
      }
      // } else {
      //   return res.sendStatus(401);
      // }
    }
  );

  server.delete(
    "/api/post/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const id = req.params.id;
      // if (req.session && req.session.authenticated) {
      try {
        db.get("posts").find({ id: id }).remove().write();
        return res.sendStatus(204);
      } catch (e) {
        console.error(e);
        return res.sendStatus(500);
      }
      // } else {
      //   return res.sendStatus(401);
      // }
    }
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  //Handle errors
  server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
  });

  server.listen(process.env.CMS_PORT || 1340);
});
