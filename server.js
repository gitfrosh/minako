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
const ExtractJWT = require("passport-jwt").ExtractJwt;
const next = require("next");

require("dotenv").config();

const secret = process.env.secret || "top_secret";
const minako_password = process.env.password || "password";
const minako_username = process.env.username || "admin";
const minako_userid = process.env.userid || 1;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
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
        secretOrKey: secret,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      },
      async (token, done) => {
        try {
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
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          return res.send(info);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return res.send(error);
          const body = { id: user.id, username: user.username };
          const token = jwt.sign({ user: body }, secret);
          return res.json({ token });
        });
      } catch (e) {
        return res.sendStatus(500).send({
          success: false,
          message: "Login failed",
        });
      }
    })(req, res, next);
  });

  server.get("/api/logout", function (req, res) {
    try {
      req.logout();
      return res.json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.json({
        success: false,
        message: "Logout failed",
      });
    }
  });

  server.get(
    "/api/posts",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const posts = db.get("posts");
        res.send(posts);
      } catch (e) {
        console.error(e);
        return res.sendStatus(500).json({
          success: false,
          message: e,
        });
      }
    }
  );

  server.post(
    "/api/posts",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        db.get("posts")
          .push({
            id: uuid.v1(),
            html: req.body.html,
            date: req.body.date,
            status: req.body.status,
            slug: req.body.slug,
            category: req.body.category,
            title: req.body.title,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
          })
          .write();
        return res.status(201).json({
          success: true,
        });
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          success: false,
          message: e,
        });
      }
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
        const status = req.body.status;
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
            status: status,
            slug: slug,
            title: title,
            createdAt: createdAt,
            updatedAt: updatedAt,
            category: category,
          })
          .write();
        return res.json({
          success: true,
        });
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          success: false,
          message: e,
        });
      }
    }
  );

  server.get(
    "/api/post/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const id = req.params.id;
      try {
        const post = db.get("posts").find({ id: id });
        return res.send(post);
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          success: false,
          message: e,
        });
      }
    }
  );

  server.delete(
    "/api/post/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const id = req.params.id;
      try {
        const response = db.get("posts").remove({ id: id }).write();
        console.log(response);
        return res.json({
          success: true,
        });
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          success: false,
          message: e,
        });
      }
    }
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // //Handle errors
  // server.use(function (err, req, res, next) {
  //   res.status(err.status || 500);
  //   res.json({ error: err });
  // });

  server.listen(process.env.CMS_PORT || 1340);
});
