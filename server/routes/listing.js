const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
//const User = require("../models/User");
//const { model } = require("mongoose");

//configuration multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage});

//create listing
router.post("/create", upload.array("listingPhotos"), async(req, res) => {
    try {
        //take the info from the form
        const {creator, category, type, streetAddress, aptSuite, city, country, province, guestCount, bedCount, bedroomCount, bathroomCount, amenities, title, description, highlight, highlightDesc, price} = req.body;
        const listingPhotos = req.files

        if (!listingPhotos) {
            return res.status(400).send("No file uploaded (backend)")
        }
        
        const listingPhotoPaths = listingPhotos.map((file) => file.path)
        const newListing = new Listing({
            creator, category, type, streetAddress, aptSuite, city, country, province, guestCount, bedCount, bedroomCount, bathroomCount, amenities, listingPhotoPaths, title, description, highlight, highlightDesc,  price: parseFloat(price).toFixed(2)
        })

        await newListing.save();

        res.status(200).json(newListing)

    } catch (error) {
        res.status(409).json({message: "Fail to create lisitng (backend)", error: error.message});
        console.log(error)
    }
})

//get listings by category
router.get("/", async(req, res) => {

    const qCategory = req.query.category;

    try {
        let listings
        if(qCategory) {
            listings = await Listing.find({category: qCategory}).populate("creator")
        } else {
            listings = await Listing.find().populate("creator")
        }
        res.status(200).json(listings)
    } catch (error) {
        res.status(404).json({message: "Fail to create listing (backend)", error: error.message})
        console.log(error)
    }
})

//get listings by search
router.get("/search/:search", async(req, res) => {

    const {search} = req.params;

    try {
        let listings = []
        if(search === "all") {
            listings = await Listing.find().populate("creator")
        } else {
            listings = await Listing.find({
                $or: [
                    {category: {$regex: search, $options: "i"}},
                    {title: {$regex: search, $options: "i"}},
                ]
            }).populate("creator")
        }
        res.status(200).json(listings)
    } catch (error) {
        res.status(404).json({message: "Fail to fetch listing (backend)", error: error.message})
        console.log(error)
    }
})

//get listing details
router.get("/:listingId", async(req, res) => {
    try {
        const {listingId} = req.params;
        const listing = await Listing.findById(listingId).populate('creator');
        res.status(202).json(listing);

    } catch (error) {
        res.status(404).json({message: "Listing can not found (backend)", error: error.message})
    }
})

module.exports = router;