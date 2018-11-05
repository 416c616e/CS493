const database = require('../../lib/database.js');

const router = require('express').Router();
const validation = require('../../lib/validation');

exports.router = router;

/*
 * Schema describing required/optional fields of a review object.
 */
const reviewSchema = {
  userID: { required: true },
  businessID: { required: true },
  dollars: { required: true },
  stars: { required: true },
  review: { required: false }
};


/*
 * Route to create a new review.
 */
router.post('/', function (req, res, next) {
    if (validation.validateAgainstSchema(req.body, reviewSchema)) {
        let review = validation.extractValidFields(req.body, reviewSchema);
        
        database.insertNewReview( review )
            .then( (id) => {
                res.status(201).json({
                    id: id,
                    links: {
                        review: '/review/' + id
                    }
                });
            })
            .catch( (err) => {
                if ( err.code == 'ER_DUP_ENTRY' ) {
                    res.status(403).json({
                        error: "User has already posted a review of this business"
                    });
                } else {
                    console.log(err);
                    res.status(500).json({
                        error: "Error inserting review."
                    });
                }
            });
    } else {
        res.status(400).json({
          error: "Request body is not a valid review object"
        });
    }
});

/*
 * Route to fetch info about a specific review.
 */
router.get('/:reviewID', function (req, res, next) {
    const reviewID = parseInt(req.params.reviewID);
    
    database.getReviewByID( reviewID )
        .then( (review) => {
            res.status(200).json(review);
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error fetching review."
            });
        });
});

/*
 * Route to update a review.
 */
router.put('/:reviewID', function (req, res, next) {
    const reviewID = parseInt(req.params.reviewID);
    
    if (validation.validateAgainstSchema(req.body, reviewSchema)) {
        let updatedReview = validation.extractValidFields(req.body, reviewSchema);
        
        database.getReviewByID( reviewID )
            .then( (review) => {
                if ( review.businessID == updatedReview.businessID ) {
                    database.updateReviewByID( reviewID, updatedReview )
                        .then( (updateSuccessful) => {
                            if ( updateSuccessful ) {
                                res.status(200).json({
                                    links: {
                                        review: '/reviews/' + reviewID
                                    }
                                });
                            } else {
                                next();
                            }
                        })
                        .catch( (err) => {
                            res.status(500).json({
                                error: "Error updating reviews."
                            });
                        });
                } else {
                    res.status(403).json({
                        error: "Updated review must have the same businessID and userID"
                    });
                }
            })
            .catch( (err) => {
                res.status(500).json({
                    error: "Error fetching review."
                });
            }); 
    } else {
        res.status(400).json({
            error: "Request body is not a valid review object"
        });
    }
});

/*
 * Route to delete a review.
 */
router.delete('/:reviewID', function (req, res, next) {
    const reviewID = parseInt(req.params.reviewID);
    
    database.deleteReviewByID( reviewID )
        .then( (deleteSuccessful) => {
            if ( deleteSuccessful ) {
                res.status(204).end();
            } else {
                next();
            }
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error deleting review."
            });
        });
});
