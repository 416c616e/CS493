const database = require('../../lib/database.js');

const router = require('express').Router();

exports.router = router;

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userID/businesses', function (req, res) {
    const userID = parseInt(req.params.userID);

    database.getUserBusinesses( userID )
        .then( (businesses) => {
            res.status(200).json(businesses);
        })
        .catch( (err) => {
            console.log(err);
            res.status(500).json({
                error: "Error fetching users' businesses."
            });
        });
});

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userID/reviews', function (req, res) {
    const userID = parseInt(req.params.userID);

    database.getUserReviews( userID )
        .then( (reviews) => {
            res.status(200).json(reviews);
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error fetching users' reviews."
            });
        });
});

/*
 * Route to list all of a user's photos.
 */
router.get('/:userID/photos', function (req, res) {
    const userID = parseInt(req.params.userID);

    database.getUserPhotos( userID )
        .then( (photos) => {
            res.status(200).json(photos);
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error fetching users' photos."
            });
        });
});
