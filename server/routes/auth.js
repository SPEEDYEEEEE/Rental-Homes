const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

//configure multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage});

//register user route
router.post("/register", upload.single('profileImage'), async(req, res) => {
    try {
        //take info from the form
        const {firstName, lastName, email, password} = req.body;

        //to take image file
        const profileImage = req.file;
        if(!profileImage) {
            return res.status(400).send("No file Uploaded (backend)")
        }
        //path to uploded file
        const profileImagePath = profileImage.path;

        //check if user exist
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({message: "User already exist (backend)"});
        };

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            profileImagePath,
        });

        //save the new user
        await newUser.save();

        //send success msg
        res.status(200).json({message: "User registered successfully (backend)", user: newUser});

    } catch (error) {
        console.log(err);
        res.status(500).json({message: "Registration Failed (backend)", error: err.message});
    }
});

//login user route
router.post("/login", async (req, res) => {
    try {
      /* Take the infomation from the form */
      const { email, password } = req.body
  
      /* Check if user exists */
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(409).json({ message: "User doesn't exist!" });
      }
  
      /* Compare the password with the hashed password */
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials!"})
      }
  
      /* Generate JWT token */
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      delete user.password
  
      res.status(200).json({ token, user })
  
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err.message })
    }
  })

module.exports = router;