const router = require("express").Router();

const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

//get trip list 
router.get("/:userId/trips", async(req, res) => {
    try {
        const {userId} = req.params;
        const trips = await Booking.find({customerId: userId}).populate("customerId hostId listingId");
        res.status(202).json(trips);

    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Cannot find trips (backend)!", error: error.message});
    }
})

//add listing to wishlist 
router.patch("/:userId/:listingId", async (req, res) => {
    try {
        const {userId, listingId} = req.params;
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");
        const favListing = user.wishList.find((item) => item._id.toString() === listingId);

        if (favListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save();
            res.status(200).json({message: "Listing is removed from wishlist (backend)", wishList: user.wishList})
        } else {
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({message: "Listing is added to wishlist (backend)", wishList: user.wishList})
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({error: error.message})
    }
})

//get property list 
router.get("/:userId/properties", async(req, res) => {
    try {
        const {userId} = req.params;
        const properties = await Listing.find({creator: userId}).populate("creator");
        res.status(202).json(properties);

    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Cannot find properties (backend)!", error: error.message});
    }
})

module.exports = router;

//get reservation list 
router.get("/:userId/reservations", async(req, res) => {
    try {
        const {userId} = req.params;
        const reservations = await Booking.find({hostId: userId}).populate("customerId hostId listingId");
        res.status(202).json(reservations);

    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Cannot find reservations (backend)!", error: error.message});
    }
})

module.exports = router;
