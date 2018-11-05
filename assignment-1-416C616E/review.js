class Review {
    constructor( businessID, userID, starRating, dollarSignRating, writtenReview ) {
        this.businessID = businessID
        this.userID = userID
        this.starRating = starRating
        this.dollarSignRating = dollarSignRating
        this.writtenReview = writtenReview
    }
}

module.exports = Review