var mysql = require('mysql');

var maxMySQLConnections = 10;

var mysqlHost = process.env.MYSQL_HOST;
var mysqlPort = process.env.MYSQL_PORT || '3306';
var mysqlUser = process.env.MYSQL_USER;
var mysqlPass = process.env.MYSQL_PASSWORD;
var mysqlDb   = process.env.MYSQL_DATABASE;

var mysqlPool = mysql.createPool({
    connectionLimit:    maxMySQLConnections,
    host:               mysqlHost,
    port:               mysqlPort,
    user:               mysqlUser,
    password:           mysqlPass,
    database:           mysqlDb
});

mysqlPool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) console.log(error);
  if (error) throw error;
  console.log('== MySQL client successfully connected to the database');
});

module.exports = {
    /*
     *
     * PHOTOS RELATED DATABASE
     *
     */
    getUserBusinesses: function( userID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM businesses WHERE ownerID = ?;", [ userID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    getUserReviews: function( userID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM reviews WHERE userID = ?;", [ userID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    getUserPhotos: function( userID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM photos WHERE userID = ?;", [ userID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
     
    /*
     *
     * BUSINESS RELATED DATABASE
     *
     */
    getBusinessesCount: function() {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT COUNT(*) as count FROM businesses;", function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results[0].count);
                }
            });
        });
    },

    getBusinessesPage: function( page, count ) {
        return new Promise( (resolve, reject) => {
            const numPerPage = 10;
            const lastPage = Math.ceil( count / numPerPage );
            
            page = page < 1 ? 1 : page;
            page = page > lastPage ? lastPage : page;
            
            const offset = (page - 1) * numPerPage;
            
            mysqlPool.query( "SELECT * FROM businesses ORDER BY id LIMIT ?,?;", [ offset, numPerPage ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve({
                        businesses: results,
                        pageNumber: page,
                        totalPages: lastPage,
                        pageSize: numPerPage,
                        totalCount: count
                    });
                }
            });
        });
    },
    
    getBusinessByID: function( businessID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM businesses WHERE id = ?;", [ businessID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    
    getReviewsByBusinessID: function( businessID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM reviews WHERE businessID = ?;", [ businessID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    getPhotosByBusinessID: function( businessID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM photos WHERE businessID = ?;", [ businessID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    insertNewBusiness: function( business ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "INSERT INTO businesses SET ?;", business, function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },
    
    updateBusinessByID: function( businessID, business ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "UPDATE businesses SET ? WHERE id = ?;", [ business, businessID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    },
    
    deleteBusinessByID: function( businessID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "DELETE FROM businesses WHERE id = ?;", [ businessID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    },
    
    /*
     *
     * REVIEWS RELATED DATABASE
     *
     */
    getReviewByID: function( reviewID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM reviews WHERE id = ?;", [ reviewID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    
    insertNewReview: function( review ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "INSERT INTO reviews SET ?;", review, function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },
    
    updateReviewByID: function( reviewID, review ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "UPDATE reviews SET ? WHERE id = ?;", [ review, reviewID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    },
    
    deleteReviewByID: function( reviewID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "DELETE FROM reviews WHERE id = ?;", [ reviewID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    },
    
    
    /*
     *
     * PHOTOS RELATED DATABASE
     *
     */
    getPhotoByID: function( photoID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "SELECT * FROM photos WHERE id = ?;", [ photoID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    
    insertNewPhoto: function( photo ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "INSERT INTO photos SET ?;", photo, function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },
    
    updatePhotoByID: function( photoID, photo ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "UPDATE photos SET ? WHERE id = ?;", [ photo, photoID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    },
    
    deletePhotoByID: function( photoID ) {
        return new Promise( (resolve, reject) => {
            mysqlPool.query( "DELETE FROM photos WHERE id = ?;", [ photoID ], function( err, results ) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    },
};