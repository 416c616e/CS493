// Provides category container class
const Category = require('./category')

// Provides subcategory container class
const Subcategory = require('./subcategory')

class Business {
    constructor( ownerUserID, name, streetAddress, city, state, zipCode, phoneNumber, categories, subcategories, website, email ) {
        this.id = -1
        this.ownerUserID = ownerUserID
        this.name = name
        this.streetAddress = streetAddress
        this.city = city
        this.state = state
        this.zipCode = zipCode
        this.phoneNumber = phoneNumber
        this.categories = categories
        this.subcategories = subcategories
        this.website = website
        this.email = email
    }
}

module.exports = Business