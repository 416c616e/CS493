const database = require('../../lib/database.js');

const router = require('express').Router();
const validation = require('../../lib/validation');

exports.router = router;

/*
 * Schema describing required/optional fields of a business object.
 */
const businessSchema = {
  ownerID: { required: true },
  name: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  zip: { required: true },
  phone: { required: true },
  category: { required: true },
  subcategory: { required: true },
  website: { required: false },
  email: { required: false }
};

/*
 * Route to return a list of businesses.
 */
router.get('/', function (req, res) {
    database.getBusinessesCount()
        .then( (count) => {
            return database.getBusinessesPage( parseInt(req.query.page) || 1, count );
        })
        .then( (businessesInfo) => {
            businessesInfo.links = {};
            
            let { links, totalPages, pageNumber } = businessesInfo;
            
            if ( pageNumber < totalPages ) {
                links.nextPage = '/businesses?page=' + (pageNumber + 1);
                links.lastPage = '/businesses?page=' + totalPages;
            }
            
            if ( pageNumber > 1 ) {
                links.prevPage =  '/businesses?page=' + (pageNumber - 1);
                links.firstPage = '/businesses?page=1';
            }
            
            res.status(200).json(businessesInfo);
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error fetching businesses list."
            });
        });
});

/*
 * Route to create a new business.
 */
router.post('/', function (req, res, next) {
    if (validation.validateAgainstSchema(req.body, businessSchema)) {
        let business = validation.extractValidFields(req.body, businessSchema);

        database.insertNewBusiness( business )
            .then( (id) => {
                res.status(201).json({
                    id: id,
                    links: {
                        business: '/businesses/' + id
                    }
                });
            })
            .catch( (err) => {
                res.status(500).json({
                    error: "Error inserting business."
                });
            });
    } else {
        res.status(400).json({
          error: "Request body is not a valid business object"
        });
    }
});

/* 
 * Route to fetch info about a specific business.
 */
router.get('/:businessID', function (req, res, next) {
    const businessID = parseInt(req.params.businessID);

    database.getBusinessByID( businessID )
        .then( (business) => {
            if ( business ) {
                database.getReviewsByBusinessID( businessID )
                    .then( (reviews) => {
                        business.reviews = reviews;
                        
                        database.getPhotosByBusinessID( businessID )
                            .then( (photos) => {
                                business.photos = photos;
                                
                                res.status(200).json(business);
                            })
                            .catch( (err) => {
                                res.status(500).json({
                                    error: "Error fetching business photos."
                                });
                            });
                    })
                    .catch( (err) => {
                        res.status(500).json({
                            error: "Error fetching business reviews."
                        });
                    });
            } else {
                next();
            }
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error fetching business."
            });
        });
});

/*
 * Route to replace data for a business.
 */
router.put('/:businessID', function (req, res, next) {
    const businessID = parseInt(req.params.businessID);
    
    if (validation.validateAgainstSchema(req.body, businessSchema)) {
        let business = validation.extractValidFields(req.body, businessSchema);

        database.updateBusinessByID( businessID, business )
            .then( (updateSuccessful) => {
                if ( updateSuccessful ) {
                    res.status(200).json({
                        links: {
                            business: '/businesses/' + businessID
                        }
                    });
                } else {
                    next();
                }
            })
            .catch( (err) => {
                res.status(500).json({
                    error: "Error updating business."
                });
            });
    } else {
        res.status(400).json({
          error: "Request body is not a valid business object"
        });
    }
});

/*
 * Route to delete a business.
 */
router.delete('/:businessID', function (req, res, next) {
    const businessID = parseInt(req.params.businessID);
    
    database.deleteBusinessByID( businessID )
        .then( (deleteSuccessful) => {
            if ( deleteSuccessful ) {
                res.status(204).end();
            } else {
                next();
            }
        })
        .catch( (err) => {
            res.status(500).json({
                error: "Error deleting business."
            });
        });
});
