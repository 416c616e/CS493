// Alan Neads (ONID neadsa)

// Express setup
const express = require('express')
const app = express()

// Middleware parsing
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Provides business container class
const Business = require('./business')

// Provides review container class
const Review = require('./review')

// Provides review container class
const Image = require('./image')

// Provides category container class
const Category = require('./category')

// Provides subcategory container class
const Subcategory = require('./subcategory')

// Get the web server listen port, or use 3000
const listen_port = (process.env.PORT == undefined) ? 3000 : process.env.PORT

// Setup console logging
var consoleLogger = function (req, res, next) {
    console.log("Received request: " + req.method + " at " + req.originalUrl )
    next()
}

// Add the middleware to Express
app.use(consoleLogger)


// Data Containers
var Categories = []
var Subcategories = []
var Businesses = []
var Reviews = []
var Images = []


/***********************************************************
 *
 * Categories
 *
 ***********************************************************/

// Categories GET
app.get('/categories', function( req, res, next ) {
    res.status(200).json(Categories.filter(x => !!x))
})

// Specific category GET
app.get('/categories/:id', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive integer"})
        return
    } 
    
    if ( Categories[req.params.id] !== undefined ) {
        res.status(200).json(Categories[req.params.id])
    } else {
        res.status(404).json({ error: "Category not found" })
    }
})

// Categories POST
app.post('/categories', function( req, res, next ) {
    if ( typeof req.body.name !== "string"  ) {
        res.status(400).json({ error: "Category name not specified" })
        return
    }
    
    if ( req.body.name.length <= 0 ) {
        res.status(400).json({ error: "Category name empty" })
        return
    }
    
    var newCategory = new Category(req.body.name)
    newCategory.id = Categories.push(newCategory) - 1
    
    Subcategories[newCategory.id] = []
    
    res.status(200).end()
})

// Categories PUT
app.put('/categories/:id', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive integer" })
        return
    }
    
    if ( typeof req.body.name !== "string"  ) {
        res.status(400).json({ error: "Category name not specified" })
        return
    }
    
    if ( req.body.name.length <= 0 ) {
        res.status(400).json({ error: "Category name empty" })
        return
    }

    if ( Categories[req.params.id] === undefined ) { 
        var newCategory = new Category(req.body.name)
        newCategory.id = req.params.id
        Categories[req.params.id] = newCategory
        
        Subcategories[newCategory.id] = []
    } else if ( Categories[req.params.id] instanceof Category ) {
        Categories[req.params.id].name = req.body.name
    } else {
        res.status(404).json({ error: "Index lead to invalid category" })
    }
    
    res.status(200).end()
})

// Specific category DELETE
app.delete('/categories/:id', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive integer"})
        return
    } 
    
    if ( Categories[req.params.id] !== undefined ) {
        Categories[req.params.id] = undefined
        Subcategories[req.params.id] = undefined
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Category not found" })
    }
})


/***********************************************************
 *
 * Subcategories
 *
 ***********************************************************/
 
// Specific category subcategories GET
app.get('/categories/:id/subcategories', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive integer"})
        return
    } 
    
    if ( Categories[req.params.id] !== undefined ) {
        res.status(200).json(Subcategories[req.params.id].filter(x => !!x))
    } else {
        res.status(404).json({ error: "Category not found" })
    }
})

// Specific category subcategory GET
app.get('/categories/:id/subcategories/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Subcategory ID must be a positive integer"})
        return
    } 
    
    if ( Categories[req.params.id] !== undefined ) {
        if ( Subcategories[req.params.id][req.params.idtwo] !== undefined ) {
            res.status(200).json(Subcategories[req.params.id][req.params.idtwo])
        } else {
            res.status(404).json({ error: "Subcategory not found" })
        }
    } else {
        res.status(404).json({ error: "Category not found" })
    }
})

// Specific category subcategories POST
app.post('/categories/:id/subcategories', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive` integer"})
        return
    } 
    
    if ( Categories[req.params.id] !== undefined ) {
        if ( typeof req.body.name !== "string"  ) {
            res.status(400).json({ error: "Subcategory name not specified" })
            return
        }
        
        if ( req.body.name.length <= 0 ) {
            res.status(400).json({ error: "Subcategory name empty" })
            return
        }
        
        var newSubcategory = new Subcategory(req.params.id, req.body.name)
        newSubcategory.id = Subcategories[req.params.id].push(newSubcategory) - 1
        
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Category not found" })
    }
})

// Specific category subcategories PUT
app.put('/categories/:id/subcategories/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Subcategory ID must be a positive integer"})
        return
    }
    
    if ( typeof req.body.name !== "string"  ) {
        res.status(400).json({ error: "Subcategory name not specified" })
        return
    }
    
    if ( req.body.name.length <= 0 ) {
        res.status(400).json({ error: "Subcategory name empty" })
        return
    }
    
    if ( Categories[req.params.id] !== undefined ) {
        if ( Subcategories[req.params.id][req.params.idtwo] === undefined ) { 
            var newSubcategory = new Subcategory(req.params.id, req.body.name)
            newSubcategory.id = req.params.idtwo
            Subcategories[req.params.id][req.params.idtwo] = newSubcategory
        } else if ( Categories[req.params.idtwo] instanceof Category ) {
            Subcategories[req.params.idtwo][req.params.id].name = req.body.name
        } else {
            res.status(404).json({ error: "Index lead to invalid subcategory" })
        }
        
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Category not found" })
    }
})

// Specific category subcategories DELETE
app.delete('/categories/:id/subcategories/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Category ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Subcategory ID must be a positive integer"})
        return
    } 
    
    if ( Categories[req.params.id] !== undefined ) {
        if ( Subcategories[req.params.id][req.params.idtwo] !== undefined ) {
            Subcategories[req.params.id][req.params.idtwo] = undefined
            res.status(200).end()
        } else {
            res.status(404).json({ error: "Subcategory not found" })
        }
    } else {
        res.status(404).json({ error: "Category not found" })
    }
})

/***********************************************************
 *
 * Businesses
 *
 ***********************************************************/
 
// Businesses GET
app.get('/businesses', function( req, res, next ) {
    res.status(200).json(Businesses.filter(x => !!x))
})


// Specific business GET
app.get('/businesses/:id', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( Businesses[req.params.id] !== undefined ) {
        var output = {
            reviews: Reviews[req.params.id],
            images: Images[req.params.id]
        }
        
        output = Object.assign(Businesses[req.params.id], output)
        
        res.status(200).json(output)
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Businesses POST
app.post('/businesses', function( req, res, next ) {
    if ( req.body.ownerUserID === undefined || req.body.ownerUserID < 0 ) {
        res.status(400).json({ error: "Business OwnerUserID invalid" })
        return
    }
    
    if ( typeof req.body.name !== "string"  ) {
        res.status(400).json({ error: "Business name not specified" })
        return
    }
    
    if ( typeof req.body.streetAddress !== "string"  ) {
        res.status(400).json({ error: "Business street address not specified" })
        return
    }
    
    if ( typeof req.body.city !== "string"  ) {
        res.status(400).json({ error: "Business city not specified" })
        return
    }
    
    if ( typeof req.body.state !== "string"  ) {
        res.status(400).json({ error: "Business state not specified" })
        return
    }
    
    if ( typeof req.body.zipCode !== "string"  ) {
        res.status(400).json({ error: "Business zip code not specified" })
        return
    }
    
    if ( typeof req.body.phoneNumber !== "string"  ) {
        res.status(400).json({ error: "Business phone number not specified" })
        return
    }
    
    if ( typeof req.body.categories !== "string" || req.body.categories.length < 2 ) {
        res.status(400).json({ error: "Business categories not specified" })
        return
    }
    
    if ( typeof req.body.subcategories !== "string" || req.body.subcategories.length < 2 ) {
        res.status(400).json({ error: "Business subcategories not specified" })
        return
    }
    
    var website = (req.body.website === undefined) ? "" : req.body.website
    var email = (req.body.email === undefined) ? "" : req.body.email
    
    var businessCategories = []
    var businessSubcategories = []
    
    var decodedCategories = JSON.parse(req.body.categories)
    var decodedSubcategories = JSON.parse(req.body.subcategories)
    
    var invalidCategories = false
    var invalidSubcategories = false
    
    decodedCategories.forEach( function( val ) {
        if ( isNaN(val) || Categories[val] === undefined ) {
            invalidCategories = true
        } else {
            businessCategories.push(Categories[val])
        }
    })
    
    decodedSubcategories.forEach( function( key, val ) {
        if ( key === undefined
        || key.id === undefined
        || isNaN(key.id)
        || key.categoryID === undefined
        || isNaN(key.categoryID)
        || Subcategories[key.categoryID] === undefined
        || Subcategories[key.categoryID][key.id] === undefined ) {
            invalidSubcategories = true
        } else {
            businessSubcategories.push(Subcategories[key.categoryID][key.id])
        }
    })
    
    if ( invalidCategories ) {
        res.status(400).json({ error: "Business categories invalid" })
        return
    }
    
    if ( invalidSubcategories ) {
        res.status(400).json({ error: "Business subcategories invalid" })
        return
    }
    
    var newBusiness = new Business(
        req.body.ownerUserID,
        req.body.name,
        req.body.streetAddress,
        req.body.city,
        req.body.state,
        req.body.zipCode,
        req.body.phoneNumber,
        businessCategories,
        businessSubcategories,
        website,
        email
    )
    newBusiness.id = Businesses.push(newBusiness) - 1
    
    Reviews[newBusiness.id] = []
    Images[newBusiness.id] = []
    
    res.status(200).end()
})

// Businesses PUT
app.put('/businesses/:id', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( req.body.ownerUserID === undefined || req.body.ownerUserID < 0 ) {
        res.status(400).json({ error: "Business OwnerUserID invalid" })
        return
    }
    
    if ( typeof req.body.name !== "string"  ) {
        res.status(400).json({ error: "Business name not specified" })
        return
    }
    
    if ( typeof req.body.streetAddress !== "string"  ) {
        res.status(400).json({ error: "Business street address not specified" })
        return
    }
    
    if ( typeof req.body.city !== "string"  ) {
        res.status(400).json({ error: "Business city not specified" })
        return
    }
    
    if ( typeof req.body.state !== "string"  ) {
        res.status(400).json({ error: "Business state not specified" })
        return
    }
    
    if ( typeof req.body.zipCode !== "string"  ) {
        res.status(400).json({ error: "Business zip code not specified" })
        return
    }
    
    if ( typeof req.body.phoneNumber !== "string"  ) {
        res.status(400).json({ error: "Business phone number not specified" })
        return
    }
    
    if ( typeof req.body.categories !== "string" || req.body.categories.length < 2 ) {
        res.status(400).json({ error: "Business categories not specified" })
        return
    }
    
    if ( typeof req.body.subcategories !== "string" || req.body.subcategories.length < 2 ) {
        res.status(400).json({ error: "Business subcategories not specified" })
        return
    }
    
    var website = (req.body.website === undefined) ? "" : req.body.website
    var email = (req.body.email === undefined) ? "" : req.body.email
    
    var businessCategories = []
    var businessSubcategories = []
    
    var decodedCategories = JSON.parse(req.body.categories)
    var decodedSubcategories = JSON.parse(req.body.subcategories)
    
    var invalidCategories = false
    var invalidSubcategories = false
    
    decodedCategories.forEach( function( val ) {
        if ( isNaN(val) || Categories[val] === undefined ) {
            invalidCategories = true
        } else {
            businessCategories.push(Categories[val])
        }
    })
    
    decodedSubcategories.forEach( function( key, val ) {
        if ( key === undefined
        || key.id === undefined
        || isNaN(key.id)
        || key.categoryID === undefined
        || isNaN(key.categoryID)
        || Subcategories[key.categoryID] === undefined
        || Subcategories[key.categoryID][key.id] === undefined ) {
            invalidSubcategories = true
        } else {
            businessSubcategories.push(Subcategories[key.categoryID][key.id])
        }
    })
    
    if ( invalidCategories ) {
        res.status(400).json({ error: "Business categories invalid" })
        return
    }
    
    if ( invalidSubcategories ) {
        res.status(400).json({ error: "Business subcategories invalid" })
        return
    }
    
    if ( Businesses[req.params.id] === undefined ) {
        var newBusiness = new Business(
            req.body.ownerUserID,
            req.body.name,
            req.body.streetAddress,
            req.body.city,
            req.body.state,
            req.body.zipCode,
            req.body.phoneNumber,
            businessCategories,
            businessSubcategories,
            website,
            email
        )
        newBusiness.id = req.params.id
        Businesses[req.params.id] = newBusiness
        Reviews[newBusiness.id] = []
        Images[newBusiness.id] = []
    } else if ( Businesses[req.params.id] instanceof Business ) {
        if ( Businesses[req.params.id].ownerUserID != req.body.ownerUserID ) {
            res.status(403).json({ error: "Business not owned by your user ID" })
        }
        
        Businesses[req.params.id].ownerUserID = req.body.ownerUserID
        Businesses[req.params.id].name = req.body.name
        Businesses[req.params.id].streetAddress = req.body.streetAddress
        Businesses[req.params.id].city = req.body.city
        Businesses[req.params.id].state = req.body.state
        Businesses[req.params.id].zipCode = req.body.zipCode
        Businesses[req.params.id].phoneNumber = req.body.phoneNumber
        Businesses[req.params.id].categories = businessCategories
        Businesses[req.params.id].subcategories = businessSubcategories
        Businesses[req.params.id].website = website
        Businesses[req.params.id].email = email
    } else {
        res.status(404).json({ error: "Business not found" })
    }
    
    
    res.status(200).end()
})

// Specific business DELETE
app.delete('/businesses/:id', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    } 
    
    if ( Businesses[req.params.id] !== undefined ) {
        if ( Businesses[req.params.id].ownerUserID != req.body.ownerUserID ) {
            res.status(403).json({ error: "Business not owned by your user ID" })
        }
        
        Businesses[req.params.id] = undefined
        Reviews[req.params.id] = undefined
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})


/***********************************************************
 *
 * Reviews
 *
 ***********************************************************/
 
// Specific business reviews GET
app.get('/businesses/:id/reviews', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    } 
    
    if ( Reviews[req.params.id] !== undefined ) {
        res.status(200).json(Reviews[req.params.id].filter(x => !!x))
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business specific review GET
app.get('/businesses/:id/reviews/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Review ID must be a positive integer"})
        return
    } 
    
    if ( Reviews[req.params.id] !== undefined ) {
        if ( Reviews[req.params.id][req.params.idtwo] !== undefined ) {
            res.status(200).json(Reviews[req.params.id][req.params.idtwo])
        } else {
            res.status(404).json({ error: "Review not found" })
        }
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business review POST
app.post('/businesses/:id/reviews', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.body.userID) || req.body.userID < 0 ) {
        res.status(400).json({ error: "User ID must be a positive integer"})
        return
    }
    
    if ( req.body.starRating < 0 || req.body.starRating > 5 ) {
        res.status(400).json({ error: "Star rating out of range" })
        return
    }
    
    if ( req.body.dollarSignRating < 1 || req.body.dollarSignRating > 4 ) {
        res.status(400).json({ error: "Dollar sign rating out of range" })
        return
    }
        
    if ( Reviews[req.params.id] !== undefined ) {
        if ( Reviews[req.params.id][req.body.userID] !== undefined ) {
            res.status(403).json({ error: "User review exists" })
            return
        }
        
        var writtenReview = (req.body.writtenReview === undefined) ? "" : req.body.writtenReview
        
        var newReview = new Review(req.params.id, req.body.userID, req.body.starRating, req.body.dollarSignRating, writtenReview)
        Reviews[req.params.id][req.body.userID] = newReview
        
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business review PUT
app.put('/businesses/:id/reviews/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Review ID must be a positive integer"})
        return
    }
    
    if ( req.body.starRating < 0 || req.body.starRating > 5 ) {
        res.status(400).json({ error: "Star rating out of range" })
        return
    }
    
    if ( req.body.dollarSignRating < 1 || req.body.dollarSignRating > 4 ) {
        res.status(400).json({ error: "Dollar sign rating out of range" })
        return
    }
    
    if ( Reviews[req.params.id] !== undefined ) {
        var writtenReview = (req.body.writtenReview === undefined) ? "" : req.body.writtenReview
        
        if ( Reviews[req.params.id][req.params.idtwo] === undefined ) {
            var newReview = new Review(req.params.id, req.body.userID, req.body.starRating, req.body.dollarSignRating, writtenReview)
            Reviews[req.params.id][req.body.userID] = newReview
        } else if ( Reviews[req.params.id][req.params.idtwo] instanceof Review ) { 
            if ( Reviews[req.params.id][req.params.idtwo].userID != req.body.userID ) {
                res.status(403).json({ error: "Review not owned by your user ID" })
                return
            }
            Reviews[req.params.id][req.body.userID].starRating = req.body.starRating
            Reviews[req.params.id][req.body.userID].dollarSignRating = req.body.dollarSignRating
            Reviews[req.params.id][req.body.userID].writtenReview = writtenReview
        } else {
            res.status(404).json({ error: "Business not found" })
        }
        
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business review DELETE
app.delete('/businesses/:id/reviews/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Review ID must be a positive integer"})
        return
    }
    
    if ( Reviews[req.params.id] !== undefined ) {
        if ( Reviews[req.params.id][req.params.idtwo] !== undefined ) {
            if ( Reviews[req.params.id][req.params.idtwo].userID != req.body.userID ) {
                res.status(403).json({ error: "Review not owned by your user ID" })
                return
            }
            
            Reviews[req.params.id][req.params.idtwo] = undefined
            res.status(200).end()
        } else {
            res.status(404).json({ error: "Review not found" })
        }
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})


/***********************************************************
 *
 * Images
 *
 ***********************************************************/
 
// Specific business images GET
app.get('/businesses/:id/images', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    } 
    
    if ( Images[req.params.id] !== undefined ) {
        res.status(200).json(Images[req.params.id].filter(x => !!x))
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business specific review GET
app.get('/businesses/:id/images/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Image ID must be a positive integer"})
        return
    } 
    
    if ( Images[req.params.id] !== undefined ) {
        if ( Images[req.params.id][req.params.idtwo] !== undefined ) {
            res.status(200).json(Images[req.params.id][req.params.idtwo])
        } else {
            res.status(404).json({ error: "Image not found" })
        }
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business image POST
app.post('/businesses/:id/images', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.body.userID) || req.body.userID < 0 ) {
        res.status(400).json({ error: "User ID must be a positive integer"})
        return
    }
    
    if ( typeof req.body.filePath !== "string"  ) {
        res.status(400).json({ error: "Image file path not specified" })
        return
    }
        
    if ( Images[req.params.id] !== undefined ) {
        var caption = (req.body.caption === undefined) ? "" : req.body.caption
        
        var newImage = new Image(req.params.id, req.body.userID, req.body.filePath, caption)
        newImage.id = Images[req.params.id].push(newImage) - 1
        
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business image PUT
app.put('/businesses/:id/images/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Image ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.body.userID) || req.body.userID < 0 ) {
        res.status(400).json({ error: "User ID must be a positive integer"})
        return
    }
    
    if ( typeof req.body.filePath !== "string"  ) {
        res.status(400).json({ error: "Image file path not specified" })
        return
    }
    
    if ( Images[req.params.id] !== undefined ) {
        var caption = (req.body.caption === undefined) ? "" : req.body.caption
        
        if ( Images[req.params.id][req.params.idtwo] === undefined ) {
            var newImage = new Image(req.params.id, req.body.userID, req.body.filePath, caption)
            Images[req.params.id][req.body.userID] = newImage
        } else if ( Images[req.params.id][req.params.idtwo] instanceof Image ) {
            if ( Images[req.params.id][req.params.idtwo].userID != req.body.userID ) {
                res.status(403).json({ error: "Image not owned by your user ID" })
                return
            }
            
            Images[req.params.id][req.body.userID].filePath = req.body.filePath
            Images[req.params.id][req.body.userID].caption = caption
        } else {
            res.status(404).json({ error: "Business not found" })
        }
        
        res.status(200).end()
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})

// Specific business image DELETE
app.delete('/businesses/:id/images/:idtwo', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    if ( isNaN(req.params.idtwo) || req.params.idtwo < 0 ) {
        res.status(400).json({ error: "Image ID must be a positive integer"})
        return
    }
    
    if ( Images[req.params.id] !== undefined ) {
        if ( Images[req.params.id][req.params.idtwo] !== undefined ) {
            if ( Images[req.params.id][req.params.idtwo].userID != req.body.userID ) {
                res.status(403).json({ error: "Image not owned by your user ID" })
                return
            }
            
            Images[req.params.id][req.params.idtwo] = undefined
            res.status(200).end()
        } else {
            res.status(404).json({ error: "Image not found" })
        }
    } else {
        res.status(404).json({ error: "Business not found" })
    }
})


/***********************************************************
 *
 * User
 *
 ***********************************************************/
 
// Users businesses GET
app.get('/user/:id/businesses', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    res.status(200).json(Businesses.filter(x => !!x).filter(x => x.ownerUserID == req.params.id))
})

// Users business reviews GET
app.get('/user/:id/reviews', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    var output = []
    
    Reviews.forEach( function( val, key ) {
        if ( val !== undefined ) {
            val.forEach( function( val2, key2 ) {
                if ( val2.userID == req.params.id ) {
                    output.push(val2)
                }
            })
        }
    })
    
    res.status(200).json(output)
})

// Users business images GET
app.get('/user/:id/images', function( req, res, next ) {
    if ( isNaN(req.params.id) || req.params.id < 0 ) {
        res.status(400).json({ error: "Business ID must be a positive integer"})
        return
    }
    
    var output = []
    
    Images.forEach( function( val, key ) {
        if ( val !== undefined ) {
            val.forEach( function( val2, key2 ) {
                if ( val2.userID == req.params.id ) {
                    output.push(val2)
                }
            })
        }
    })
    
    res.status(200).json(output)
})

// Index page response
app.get('/', (req, res) => res.send('Welcome to the review site!') )


// Start listening
app.listen( listen_port, () => console.log('Review-Site is listening on port ' + listen_port) )