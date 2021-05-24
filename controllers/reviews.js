const Review = require("../models/review")
const Campground = require("../models/campground")

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user.id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash("success", "New review was created.")
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId)
    req.flash("success", "Review was deleted.")
    res.redirect(`/campgrounds/${id}`)
}
