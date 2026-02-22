//import express model
const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

//mini router for navigatino
const router = express.Router();
const User = require("../models/user-model");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype] || "file";
    cb(null, name + "-" + Date.now() + "." + extension);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(null, true);
  }

  if (MIME_TYPE[file.mimetype]) {
    cb(null, true);
  } else {
    cb(null, false); // ❌ DO NOT throw error
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
//add user
router.post("/signup", multer({ storage: storage }).single("img"), (req, res) => {
  console.log("Here into signup", req.body);
  User.findOne({ email: req.body.email }).then((response) => {
    if (response) {
      res.json({ msg: "2" });
    } else {
      let verificationPromise;
      if (req.body.role === 'parent') {
        verificationPromise = User.findOne({ phone: req.body.childPhone, role: 'student' });
      } else {
        verificationPromise = Promise.resolve(true);
      }

      verificationPromise.then((doc) => {
        if (!doc) {
          return res.json({ msg: "4" });
        }
        bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
          req.body.password = cryptedPassword;
          if (req.file) {
            const url = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
            if (req.body.role === 'teacher') {
              req.body.cv = url;
            } else if (req.body.role === 'student') {
              req.body.photo = url;
            }
          }
          const user = new User(req.body);
          user.save().then(() => {
            res.json({ msg: "0" });
          }).catch(() => {
            res.json({ msg: "3" });
          });
        });
      });
    }
  });
});

// Login
router.post("/login", (req, res) => {
  console.log("Here into login", req.body);
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.json({ msg: "1" }); // User not found
    } else {
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) {
          res.json({ msg: "1" }); // Password mismatch
        } else {
          const token = jwt.sign({
            id: user._id,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
          }, 'your-secret-key', { expiresIn: '1h' });

          res.json({ msg: "0", user: token });
        }
      });
    }
  });
});

// make router exportable
module.exports = router;