const database = require('../../lib/database.js');

const router = require('express').Router();
const validation = require('../../lib/validation');

exports.router = router;

/*
 * Schema describing required/optional fields of a photo object.
 */
const photoSchema = {
  userID: { required: true },
  businessID: { required: true },
  caption: { required: false },
  data: { required: true }
};


/*
 * Route to create a new photo.
 */
router.post('/', function (req, res, next) {
    if (validation.validateAgainstSchema(req.body, photoSchema)) {
        let photo = validation.extractValidFields(req.body, photoSchema);
        
        database.insertNewPhoto( photo )
            .then( (id) => {
                res.status(201).json({
                    id: id,
                    links: {
                        photo: '/photos/' + id
                    }
                });
            })
            .catch( (err) => {
                console.log(err);
                res.status(500).json({
                    error: "Error inserting photo."
                });
            });
    } else {
        res.status(400).json({
          error: "Request body is not a valid photo object"
        });
    }
});

/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoID', function (req, res, next) {
    const photoID = parseInt(req.params.photoID);
    
    database.getPhotoByID( photoID )
        .then( (photo) => {
            res.status(200).json(photo);
        })
        .catch( (err) => {
            console.log(err);
            res.status(500).json({
                error: "Error fetching photo."
            });
        });
});

/*
 * Route to update a photo.
 */
router.put('/:photoID', function (req, res, next) {
    const photoID = parseInt(req.params.photoID);
    
    if (validation.validateAgainstSchema(req.body, photoSchema)) {
        let updatedPhoto = validation.extractValidFields(req.body, photoSchema);
        
        database.getPhotoByID( photoID )
            .then( (photo) => {
                if ( photo.businessID == updatedPhoto.businessID ) {
                    database.updatePhotoByID( photoID, updatedPhoto )
                        .then( (updateSuccessful) => {
                            if ( updateSuccessful ) {
                                res.status(200).json({
                                    links: {
                                        photo: '/photos/' + photoID
                                    }
                                });
                            } else {
                                next();
                            }
                        })
                        .catch( (err) => {
                            res.status(500).json({
                                error: "Error updating photos."
                            });
                        });
                } else {
                    res.status(403).json({
                        error: "Updated photo must have the same businessID and userID"
                    });
                }
            })
            .catch( (err) => {
                res.status(500).json({
                    error: "Error fetching photo."
                });
            }); 
    } else {
        res.status(400).json({
            error: "Request body is not a valid photo object"
        });
    }
});

/*
 * Route to delete a photo.
 */
router.delete('/:photoID', function (req, res, next) {
    const photoID = parseInt(req.params.photoID);
    
    database.deletePhotoByID( photoID )
        .then( (deleteSuccessful) => {
            if ( deleteSuccessful ) {
                res.status(204).end();
            } else {
                next();
            }
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error deleting photo."
            });
        });
});
