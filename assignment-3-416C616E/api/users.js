const router = require('express').Router();

const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

const { generateAuthToken, requireAuthentication } = require('../lib/auth');

const { getBusinessesByOwnerID } = require('./businesses');
const { getReviewsByUserID } = require('./reviews');
const { getPhotosByUserID } = require('./photos');

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userID/businesses', requireAuthentication, function (req, res) {
  const mongoDB = req.app.locals.mongoDB;
  if (req.user != req.params.userID) {
    res.status(403).json({
      error: "Unauthorized to access that resource"
    });
  } else {
    const mysqlPool = req.app.locals.mysqlPool;
    const userID = req.params.userID;
    getBusinessesByOwnerID(userID, mysqlPool)
      .then((businesses) => {
        if (businesses) {
          res.status(200).json({ businesses: businesses });
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: "Unable to fetch businesses.  Please try again later. Error: " + err
        });
      });
  }
});

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userID/reviews', requireAuthentication, function (req, res) {
  const mongoDB = req.app.locals.mongoDB;
  if (req.user != req.params.userID) {
    res.status(403).json({
      error: "Unauthorized to access that resource"
    });
  } else {
    const mysqlPool = req.app.locals.mysqlPool;
    const userID = req.params.userID;
    getReviewsByUserID(userID, mysqlPool)
      .then((reviews) => {
        if (reviews) {
          res.status(200).json({ reviews: reviews });
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: "Unable to fetch reviews.  Please try again later."
        });
      });
  }
});

/*
 * Route to list all of a user's photos.
 */
router.get('/:userID/photos', requireAuthentication, function (req, res) {
  const mongoDB = req.app.locals.mongoDB;
  if (req.user != req.params.userID) {
    res.status(403).json({
      error: "Unauthorized to access that resource"
    });
  } else {
    const mysqlPool = req.app.locals.mysqlPool;
    const userID = req.params.userID;
    getPhotosByUserID(userID, mysqlPool)
      .then((photos) => {
        if (photos) {
          res.status(200).json({ photos: photos });
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: "Unable to fetch photos.  Please try again later."
        });
      });
  }
});

function validateUserObject(user) {
  return user && user.userID && user.name && user.email && user.password;
}

function insertNewUser(user, mongoDB) {
  return bcrypt.hash(user.password, 8)
    .then((passwordHash) => {
      const userDocument = {
        userID: user.userID,
        name: user.name,
        email: user.email,
        password: passwordHash
      };
      const usersCollection = mongoDB.collection('users');
      return usersCollection.insertOne(userDocument);
    })
    .then((result) => {
      return Promise.resolve(result.insertedId);
    });
}

router.post('/', function (req, res) {
  const mongoDB = req.app.locals.mongoDB;
  if (validateUserObject(req.body)) {
    insertNewUser(req.body, mongoDB)
      .then((id) => {
        res.status(201).json({
          _id: id,
          links: {
            user: `/users/${id}`
          }
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: "Failed to insert new user."
        });
      });
  } else {
    res.status(400).json({
      error: "Request doesn't contain a valid user."
    })
  }
});

router.post('/login', function (req, res) {
  const mongoDB = req.app.locals.mongoDB;
  if (req.body && req.body.userID && req.body.password) {
    getUserByID(req.body.userID, mongoDB, true)
      .then((user) => {
        if (user) {
          return bcrypt.compare(req.body.password, user.password);
        } else {
          return Promise.reject(401);
        }
      })
      .then((loginSuccessful) => {
        if (loginSuccessful) {
          return generateAuthToken(req.body.userID);
        } else {
          return Promise.reject(401);
        }
      })
      .then((token) => {
        res.status(200).json({
          token: token
        });
      })
      .catch((err) => {
        console.log(err);
        if (err === 401) {
          res.status(401).json({
            error: "Invalid credentials."
          });
        } else {
          res.status(500).json({
            error: "Failed to fetch user."
          });
        }
      });
  } else {
    res.status(400).json({
      error: "Request needs a user ID and password."
    })
  }
});

function getUserByID(userID, mongoDB, includePassword) {
  const usersCollection = mongoDB.collection('users');
  const projection = includePassword ? {} : { password: 0 };
  return usersCollection
    .find({ userID: userID })
    .project(projection)
    .toArray()
    .then((results) => {
      return Promise.resolve(results[0]);
    });
}

router.get('/:userID', requireAuthentication, function (req, res, next) {
  const mongoDB = req.app.locals.mongoDB;
  if (req.user != req.params.userID) {
    res.status(403).json({
      error: "Unauthorized to access that resource"
    });
  } else {
    getUserByID(req.params.userID, mongoDB)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: "Failed to fetch user."
        });
      });
  }
});

exports.router = router;